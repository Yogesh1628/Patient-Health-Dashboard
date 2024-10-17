import React, { useState } from 'react';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    medicalHistory: '',
    medications: '',
    condition: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);  
    const formattedData = {
      ...formData,
      age: parseInt(formData.age),
      medications: formData.medications.split(',').map((med) => med.trim()),
    };

    fetch('http://localhost:4000/api/addPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Patient added successfully');
        setFormData({   
          name: '',
          age: '',
          medicalHistory: '',
          medications: '',
          condition: '',
        });
        setIsSubmitting(false);  // Re-enable the button after submission
      })
      .catch((err) => {
        console.error('Failed to add patient', err);
        setIsSubmitting(false);  // Re-enable the button even if there's an error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Patient</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}  // Disable the input fields during submission
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Medical History</label>
        <input
          type="text"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Medications (comma-separated)</label>
        <input
          type="text"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Condition</label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <button type="submit" disabled={isSubmitting}> 
        {isSubmitting ? 'Submitting...' : 'Add Patient'}
      </button>
    </form>
  );
};

export default AddPatient;
