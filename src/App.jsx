import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import AuthorizationForm from './components/AuthorizationForm';
import PatientDetail from './components/PatientDetail';
import SearchPatient from './components/SearchPatient';  
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/authorization-form" element={<AuthorizationForm />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/search-patient" element={<SearchPatient />} />  
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
