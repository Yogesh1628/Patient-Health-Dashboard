import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  

const PatientDetail = ({ id: propId }) => {
  const { id: paramId } = useParams();  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = propId || paramId;  
  
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/api/getPatients/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError('Failed to fetch patient details.');
          } else {
            setPatient(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching patient:', err);
          setError('Failed to fetch patient details.');
          setLoading(false);
        });
    } else {
      setError('No patient ID provided.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>No patient found</p>;
  }

  return (
    <div className="patient-detail">
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Medical History: {patient.medicalHistory}</p>
      <p>Medications: {patient.medications.join(', ')}</p>
      <p>Condition: {patient.condition}</p>
    </div>
  );
};

export default PatientDetail;
