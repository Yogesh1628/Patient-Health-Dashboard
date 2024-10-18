# Patient Health Dashboard

This project is a **full-stack web application** designed to help healthcare providers manage patient data and submit prior authorization requests, streamlining the approval process for treatments and procedures.

### **Key Features:**
The dashboard allows healthcare professionals to:
- View and search a list of patients with their basic details (name, age, condition).
- Add new patients, capturing medical history, current condition, and medications.
- Submit prior authorization requests with detailed information such as treatment, insurance plan, and diagnosis codes.
- Search for patients by name, age, or condition to easily access health records.

---

## **Technologies Used:**
- **Frontend:** React (Vite), CSS, Tailwind CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (for patient and authorization request data)
- **Deployment:** Vercel (for both frontend and backend)

---
## **Video Demonstration of the Project:**

#### Video 1: Full Project Demonstration
[![Watch Video 1](https://drive.google.com/uc?export=view&id=1Wnc6cb4_UQSy6mEY81XE_SvZ8VQOVV7I)](https://drive.google.com/file/d/1Wnc6cb4_UQSy6mEY81XE_SvZ8VQOVV7I/view?usp=drive_link)

#### Video 2: Another U.I for same project
[![Watch Video 2](https://drive.google.com/uc?export=view&id=1pEPKJwa151JKT4mYAQvol6F3wYeZoHrL)](https://drive.google.com/file/d/1pEPKJwa151JKT4mYAQvol6F3wYeZoHrL/view?usp=drive_link)

---

## **API Documentation:**

### **Endpoints Overview:**

**a. Get All Patients:**
- **Endpoint:** `/api/getPatients`
- **Method:** `GET`
- **Description:** Retrieves a list of all patients in the database.

**b. Get Patient by ID:**
- **Endpoint:** `/api/getPatients/:id`
- **Method:** `GET`
- **Description:** Fetches details of a specific patient based on the patient ID.

**c. Add New Patient:**
- **Endpoint:** `/api/addPatients`
- **Method:** `POST`
- **Description:** Adds a new patient to the database.
- **Body Parameters:**
  - `name`: (string) Name of the patient
  - `age`: (number) Age of the patient
  - `medicalHistory`: (string) Medical history of the patient
  - `medications`: (array) List of medications
  - `condition`: (string) Medical condition of the patient

**d. Submit Authorization Request:**
- **Endpoint:** `/api/patients/:id/authorize`
- **Method:** `POST`
- **Description:** Submits an authorization request for a patient.
- **Body Parameters:**
  - `treatment`: (string) Treatment details
  - `insurancePlan`: (string) Patient's insurance plan
  - `diagnosisCode`: (string) Diagnosis code
  - `dateOfService`: (date) Date of the service

**e. Get Authorization by Patient ID:**
- **Endpoint:** `/api/getAuthPatients/:id`
- **Method:** `GET`
- **Description:** Fetches authorization details of a specific patient by patient ID.

**f. Get All Authorized Patients:**
- **Endpoint:** `/api/getAuthPatients`
- **Method:** `GET`
- **Description:** Fetches authorization details of all patients present in the Authorization Collection.

---

## **Installation Guide:**

1. **Clone the Repository:**
   - Go to the GitHub repository page and clone the repository to your local machine.
   - Once cloned, navigate to the repository folder using a terminal or code editor.

2. **Install Dependencies:**
   - After navigating to the project directory, install the necessary dependencies for both the frontend and backend.
   - For the frontend, ensure you have Node.js installed and run the command to install all required dependencies.
   - Similarly, navigate to the backend folder and install all necessary backend dependencies using Node.js or another package manager.

3. **Setup Environment Variables:**
   - Create an `.env` file in the backend folder.
   - Add the MongoDB connection string and any other required environment variables, such as the server port, to this file.
   - Replace placeholders in the MongoDB connection string with your database credentials.

4. **Run the Application:**
   - Once everything is set up, run the backend server using the appropriate command (e.g., `npm start`).
   - Then, run the frontend using a development server (e.g., `npm run dev`) to see the application in your browser.

---

