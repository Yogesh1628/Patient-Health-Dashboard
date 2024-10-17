import React, { useState } from 'react';

const AuthorizationForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',  
    treatment: '',
    insurancePlan: '',
    diagnosisCode: '',
    dateOfService: '',
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

    fetch(`http://localhost:4000/api/patients/${formData.patientId}/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        treatment: formData.treatment,
        insurancePlan: formData.insurancePlan,
        diagnosisCode: formData.diagnosisCode,
        dateOfService: formData.dateOfService,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Authorization submitted successfully');
        setFormData({  
          patientId: '',
          treatment: '',
          insurancePlan: '',
          diagnosisCode: '',
          dateOfService: '',
        });
        setIsSubmitting(false);  // Re-enable the button after submission
      })
      .catch((err) => {
        console.error('Failed to submit authorization', err);
        setIsSubmitting(false);  // Re-enable the button even if there's an error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Prior Authorization</h2>

      {/* Patient ID input field */}
      <div className="form-group">
        <label>Patient ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          disabled={isSubmitting}  // Disable the input fields during submission
          required  // Make it required
        />
      </div>

      <div className="form-group">
        <label>Treatment</label>
        <input
          type="text"
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          disabled={isSubmitting}
          required  // Make it required
        />
      </div>

      <div className="form-group">
        <label>Insurance Plan</label>
        <input
          type="text"
          name="insurancePlan"
          value={formData.insurancePlan}
          onChange={handleChange}
          disabled={isSubmitting}
          required  // Make it required
        />
      </div>

      <div className="form-group">
        <label>Diagnosis Code</label>
        <input
          type="text"
          name="diagnosisCode"
          value={formData.diagnosisCode}
          onChange={handleChange}
          disabled={isSubmitting}
          required  // Make it required
        />
      </div>

      <div className="form-group">
        <label>Date of Service</label>
        <input
          type="date"
          name="dateOfService"
          value={formData.dateOfService}
          onChange={handleChange}
          disabled={isSubmitting}
          required  // Make it required
        />
      </div>

      <button type="submit" disabled={isSubmitting}> 
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AuthorizationForm;
