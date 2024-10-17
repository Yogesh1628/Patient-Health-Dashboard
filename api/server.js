import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Models
const Patient = mongoose.model('Patient', {
  name: String,
  age: Number,
  medicalHistory: String,
  medications: [String],
  condition: String,
});

const AuthorizationRequest = mongoose.model('AuthorizationRequest', {
  patientId: String,
  treatment: String,
  insurancePlan: String,
  diagnosisCode: String,
  dateOfService: Date,
  status: { type: String, default: 'Pending' },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/getPatients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});


// Route to get patient by ID
app.get('/api/getPatients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the patient details by patient ID
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Fetch the authorization requests for the patient using the same patient ID
    const authRequests = await AuthorizationRequest.find({ patientId: id });

    // Send the response containing both patient details and authorization requests
    res.json({
      patientDetails: patient,
      authorizationRequests: authRequests
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: 'Error fetching patient and authorization details' });
  }
});

  

app.post('/api/addPatients', async (req, res) => {
    const { name, age, medicalHistory, medications, condition } = req.body;
  
    // Check if all required fields are present
    if (!name || !age || !medicalHistory || !medications || !condition) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const newPatient = new Patient({
      name,
      age,
      medicalHistory,
      medications,
      condition,
    });
  
    try {
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error creating patient:', error);  
      res.status(400).json({ error: 'Failed to create patient', details: error.message });
    }
  });
  


  // Route to get all Authorization Requests
app.get('/api/getAuthRequests', async (req, res) => {
  try {
    const authRequests = await AuthorizationRequest.find();
    
    res.json(authRequests);
  } catch (error) {
    console.error('Error fetching authorization requests:', error);
    res.status(500).json({ error: 'Error fetching authorization requests' });
  }
});


  // POST: Add an authorization request for a patient by ID
app.post('/api/patients/:id/authorize', async (req, res) => {
  const { treatment, insurancePlan, diagnosisCode, dateOfService } = req.body;
  const patientId = req.params.id;

  try {
    // Check if the patient exists first
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if there's an existing auth form for this patient with a status other than 'Completed'
    const existingRequest = await AuthorizationRequest.findOne({
      patientId: patientId,
      status: { $ne: 'Completed' }  // Any status except 'Completed'
    });

    if (existingRequest) {
      return res.status(400).json({
        error: 'An authorization request already exists for this patient and is not completed.'
      });
    }

    // If no such request exists, create a new authorization request
    const newRequest = new AuthorizationRequest({
      patientId: patientId,
      treatment,
      insurancePlan,
      diagnosisCode,
      dateOfService,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Failed to submit authorization request', error);
    res.status(500).json({ error: 'Failed to submit authorization request', details: error.message });
  }
});

  
  app.get('/api/authRequests/:patientId', async (req, res) => {
    const { patientId } = req.params;
  
    try {
      // Find the authorization request for the given patient ID
      const authRequest = await AuthorizationRequest.findOne({ patientId });
  
      if (!authRequest) {
        return res.status(404).json({ error: 'Authorization request not found for this patient' });
      }
  
      // Fetch the patient details based on patient ID from the authorization request
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Combine the patient details with the authorization request details
      const result = {
        patient,
        authRequest,
      };
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching patient and authorization details' });
    }
  });
  



// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
