import React, { useState } from 'react';
import PatientDetail from './PatientDetail';  

const SearchPatient = () => {
  const [formData, setFormData] = useState({
    id: '',  
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientId, setPatientId] = useState(null);  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.id) {
      setPatientId(formData.id);  
      setError(null);  
      setIsSubmitting(false);
      resetForm();  
    } else {
      setError('Patient ID is required');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="search-patient">
      <form onSubmit={handleSubmit}>
        <h2>Search Patient</h2>

        
        <div className="form-group">
          <label>Patient ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={isSubmitting}  
            required 
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}  

      {patientId && (
        <div>
          <h3 style={{marginLeft : "15px"}}>Patient Details:</h3>
          <PatientDetail id={patientId} /> 
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
