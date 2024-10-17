import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/getPatients')
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => console.error('Failed to fetch patients', err));
  }, []);

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient._id}>
              <Link to={`/patients/${patient._id}`}>
                <h3>{patient.name}</h3>
                <p>Age: {patient.age}</p>
                <p>Condition: {patient.condition}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No patients available</p>
        )}
      </ul>
    </div>
  );
};

export default PatientList;
