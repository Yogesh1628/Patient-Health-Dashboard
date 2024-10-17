import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientDetail = ({ id: propId }) => {
  const { id: paramId } = useParams();
  const [patient, setPatient] = useState(null);
  const [authRequests, setAuthRequests] = useState([]); // For authorization requests
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = propId || paramId;

  useEffect(() => {
    if (id) {
      // Fetch patient and authorization requests by ID from the backend
      fetch(`http://localhost:4000/api/getPatients/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError('Failed to fetch patient details.');
          } else {
            setPatient(data.patientDetails);  // Store patient details
            setAuthRequests(data.authorizationRequests);  // Store authorization requests
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
      <hr></hr>
      <br></br>
      <h3>Authorization Requests:</h3>
      {authRequests.length > 0 ? (
        <ul>
          {authRequests.map((request) => (
            <li key={request._id}>
              <p>Treatment: {request.treatment}</p>
              <p>Insurance Plan: {request.insurancePlan}</p>
              <p>Diagnosis Code: {request.diagnosisCode}</p>
              <p>Date of Service: {new Date(request.dateOfService).toLocaleDateString()}</p>
              <p>Status: {request.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No authorization requests found for this patient.</p>
      )}
    </div>
  );
};

export default PatientDetail;
