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
        console.log("data");
      const patient = await Patient.findById(id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
        console.log("No data");
      res.status(500).json({ error: 'Error fetching patient details' });
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
  
  app.post('/api/patients/:id/authorize', async (req, res) => {
    const { treatment, insurancePlan, diagnosisCode, dateOfService } = req.body;
    const patientId = req.params.id;
  
    try {
      // Check if the patient exists first
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
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
      res.status(400).json({ error: 'Failed to submit authorization request' });
    }
  });
  



// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
