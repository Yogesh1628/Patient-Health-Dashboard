This project is a full-stack web application designed to help healthcare providers manage patient data and submit prior authorization requests, streamlining the approval process for treatments and procedures.

The dashboard allows healthcare professionals to:

View and search a list of patients with their basic details (name, age, condition).
Add new patients, capturing medical history, current condition, and medications.
Submit prior authorization requests with detailed information such as treatment, insurance plan, and diagnosis codes.
Search for patients by name, age, or condition to easily access health records.

Technologies Used:
Frontend: React (Vite), CSS , Tailwind CSS , Javascript
Backend: Node.js, Express.js
Database: MongoDB Atlas for cloud dev.for patient and authorization request data
Deployment: Deployment on Vercel (frontend and Backend )for live testing.



Video Demonstration of project :
[![Watch the video]](https://drive.google.com/file/d/1Wnc6cb4_UQSy6mEY81XE_SvZ8VQOVV7I/view?usp=drive_link)



*****-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*****
API Documentation :

Endpoints Overview:

a. Get All Patients: Endpoint: /api/getPatients
    Method: GET
    Description: Retrieves a list of all patients in the database.


b. Get Patient by ID: Endpoint: /api/getPatients/:id
    Method: GET
    Description: Fetches details of a specific patient based on the patient ID.


c. Add New Patient: Endpoint: /api/addPatients
    Method: POST
    Description: Adds a new patient to the database.
    Body Parameters:
        name: (string) Name of the patient
        age: (number) Age of the patient
        medicalHistory: (string) Medical history of the patient
        medications: (array) List of medications
        condition: (string) Medical condition of the patient

        
d. Submit Authorization Request: Endpoint: /api/patients/:id/authorize
      Method: POST
      Description: Submits an authorization request for a patient.
      Body Parameters:
          treatment: (string) Treatment details
          insurancePlan: (string) Patient's insurance plan
          diagnosisCode: (string) Diagnosis code
          dateOfService: (date) Date of the service

          
e. Get Authorization by Patient ID: Endpoint: /api/getAuthPatients/:id
      Method: GET
      Description: Fetches authorization details of a specific patient by patient ID.
      
f. Get Authorized Patients details: Endpoint: /api/getAuthPatients
      Method: GET
      Description: Fetches authorization details of all patients present in AuthCollection


      
*****-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*****
Installation Guide :

1. Clone the Repository:
    a. Go to the GitHub repository page and clone the repository to your local machine.
    b. Once cloned, navigate to the repository folder using a terminal or code editor.
  
2. Install Dependencies:
    a. After navigating to the project directory, install the necessary dependencies for both the frontend and backend.
    b. For the frontend, ensure you have Node.js installed and run the command to install all the required dependencies.
    c. Similarly, navigate to the backend folder and install all necessary backend dependencies using Node.js or another package manager.
   
3. Setup Environment Variables:
    a. Create an .env file in the backend folder.
    b. Add the MongoDB connection string and any other required environment variables, such as the server port, to this file.
    c. Replace placeholders in the MongoDB connection string with your database credentials.


Run the Application:
    a. Once everything is set up, run the backend server using the appropriate command (e.g., npm start).
    b. Then, run the frontend using a development server (e.g., npm run dev) to see the application in your browser.



