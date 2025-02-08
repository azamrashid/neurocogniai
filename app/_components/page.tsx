"use client"
import Image from 'next/image';
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import DonutVisitorsChart from "./charts/donnut-visitors";
import DonutAccuracyChart from "./charts/donnut-accuracy";
import LineVisitorsChart from "./charts/line-visitors";
import RadarModelChart from "./charts/radar-model";
import { UserButton } from "@clerk/clerk-react";


export default function MainPage() {

  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientID, setPatientID] = useState<string>("");

  interface DoctorInfo {
    doctorID: number; // or number, depending on your data
    doctor_Name?: string;
    doctor_Specialisation?: string;
  }

  interface PatientInfo {
    patientName: string;
    patientAge: number;
    patient_Decease: string;
    checkup_Date: string; // Store as string (ISO format), convert when needed
    doctorID: number; // ✅ Ensure doctorID is included
  }

  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);

  
  const formattedDate = patientInfo?.checkup_Date
  ? new Date(patientInfo.checkup_Date).toLocaleDateString()
  : "N/A";

  // Handle image upload and create a preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Store image for uploading
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setPreview(previewURL); // Show image preview
      setUploadProgress(0);  // Reset progress bar
    }
  };

  // Fetch patient info and doctor info
  const fetchPatientInfo = async () => {
    if (!patientID) {
      setError("Please enter a valid Patient ID.");
      setPatientInfo(null); // Clear previous patient info
      setDoctorInfo(null); // Clear previous doctor info
      return;
    }

    try {
      // Fetch patient info
      const patientResponse = await axios.get(
        `http://116.58.21.135:5001/patients/${patientID}`, 
        /* {
          headers: {
            //"ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        } */
      );
      setPatientInfo(patientResponse.data);
      

      // Extract doctorID from patient info and fetch doctor info
      const doctorID = patientResponse.data.doctorID;
      if (doctorID) {
        const doctorResponse = await axios.get(
          `http://116.58.21.135:5001/doctors/${doctorID}`, 
          /*{
            headers: {
            //  "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          } */
        );
       
        setDoctorInfo(doctorResponse.data);
      } else {
        setDoctorInfo(null);
      }

      setError(null); // Clear any errors
    } catch (err) {
      console.error("Error fetching patient or doctor info:", err);
      setError("Patient not found. Please check the Patient ID.");
      setPatientInfo(null); // Clear previous patient info
      setDoctorInfo(null); // Clear previous doctor info
    }
  };

// Handle image upload
  const handleUpload = () => {
    if (image) {
      setLoading(true);
      setShowResults(false);
      // Simulate image upload and progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 10; // Increment the progress bar
        });
      }, 500); // Adjust interval as per your needs
    }
  };

  // Handle prediction submission
  const handlePrediction = async () => {
    if (!image) {
      setError("Please upload an image before proceeding.");
      return;
    }

    if (!doctorInfo || !doctorInfo.doctorID) {
      setError("Doctor information is missing. Please fetch valid patient and doctor details.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("patientID", patientID); // Dynamic patient ID
    formData.append("doctorID", doctorInfo.doctorID.toString()); // Hardcoded doctor ID
    formData.append("api_key", "cfb54e3cf640e7babb25c423027f0afe"); // API key for authentication

    try {
      const response = await axios.post("http://116.58.21.135:5001/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data.result);
      setConfidence(response.data.confidence);
      setError(null); // Clear any previous errors
      setShowResults(true); // Display the Result
    } catch (err) {
      console.error("Prediction error:", err);
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="bg-[#010D2D] text-white font-sans flex flex-col min-h-screen top-0" >
      <header className="flex items-center justify-between p-4 bg-[#010D2D]">
      {/* Left: User Button */}
      <div className="px-2 flex items-center justify-center">
        <UserButton />
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/Logo.png" alt="NeuroCongniAI Header" width={300} height={130} />
      </div>
      {/* Right: Navigation Links */}
<nav>
  <ul className="flex space-x-6 text-white">
    <li>
      <Link href="/" className="hover:underline  hover:bg-blue-500 px-2 py-1 rounded transition duration-300">
        Home
      </Link>
    </li>
    <li>
      <Link href="http://ncai-assistant.streamlit.app/" className="hover:underline hover:bg-blue-500 px-2 py-1 rounded transition duration-300" target="_blank">              
        Neuro Analyzer
      </Link>
    </li>
    <li>
      <Link href="/tools" className="hover:underline  hover:bg-blue-500 px-2 py-1 rounded transition duration-300">
        Tools
      </Link>
    </li>
  </ul>
</nav>
      
    </header>
        <div className="flex flex-1 p-4">
          <div className="w-1/4 space-y-4">
           <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              
              <div className="mb-4">
          <label htmlFor="patientID" className="block mb-2 font-semibold">
            Enter Patient ID:
          </label>
          <input
            id="patientID"
            type="text"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            className="w-full p-2 border rounded bg-sky-950 text-white placeholder-gray-300"
          />
          <button
            onClick={fetchPatientInfo}
            className="mt-2 w-full bg-sky-950 text-white py-2 rounded-lg border border-white hover:bg-blue-500"
          >
            Get Patient Info
          </button>
        </div>
        {/* Display Patient Info */}
        {patientInfo && (
          <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
            <h3 className="font-semibold mb-2 text-left">Patient Information</h3>
            <p><strong>Name:</strong> {patientInfo.patientName}</p>
            <p><strong>Age:</strong> {patientInfo.patientAge}</p>
            <p><strong>Disease:</strong> {patientInfo.patient_Decease}</p>
            <p><strong>Checkup Date:</strong> {formattedDate}</p>
          </div>
        )}

        {/* Display Doctor Info */}
        {doctorInfo && (
          <div className="p-4 rounded mt-4  bg-[#0b1e3d] border border-sky-700">
            <h3 className="font-semibold mb-2 text-left">Doctor Information</h3>
            <p><strong>Name:</strong> {doctorInfo.doctor_Name}</p>
            <p><strong>Specialisation:</strong> {doctorInfo.doctor_Specialisation}</p>
          </div>
        )}

        {/* Error Display */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      
      </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <Image
                src="/brain.jpg"
                alt="Brain scan images"
                className="w-full"
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* IMAGE UPLOAD / PROGRESS BAR SECTION */} 

          <div className="flex-1 space-y-4">
  <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
    <div className="flex flex-col items-center">
      <p className="mb-2">{uploadProgress}%</p>
      
      <div className="flex items-center w-full space-x-2">
        {/* Image Upload */}
        <div className="flex-shrink-0">
          <label
            htmlFor="fileUpload"
            className="px-6 py-2 bg-sky-950 rounded-lg border border-white cursor-pointer hover:bg-blue-500 transition duration-300 text-center inline-block"
          >
            MRI Scan
          </label>
          <input id="fileUpload" type="file" onChange={handleImageChange} className="hidden" />
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-8 flex items-center">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-sky-950 rounded-lg border border-white cursor-pointer hover:bg-blue-500 transition duration-300 text-center"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  </div>

  {/* Image Preview or brain-model.gif */}
  <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded flex justify-center mb-4">
    {uploadProgress === 100 && preview ? (
      <img
        src={preview}
        alt="Image Preview"
        className="border rounded"
        style={{ width: "250px", height: "250px", objectFit: "cover" }}
      />
    ) : (
      <Image
        src="/brain-model.gif"
        alt="Hero_image"
        className="max-h-full mx-auto"
        width={400}
        height={400}
        unoptimized
      />
    )}
  </div>


        {/* Prediction Button */}
          
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <div className="flex justify-between items-center">
                <div className='font-serif'>
                  <p>Current Activity: Normal</p>
                  <p>Diagnosis: <strong> {prediction} </strong></p>
                  <p>Accuracy: <strong>{((confidence ?? 0) * 100).toFixed(2)}% </strong></p>
                  
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                  onClick={handlePrediction}
                  className="px-10 py-1 bg-sky-950 rounded-lg border border-white text-white  hover:bg-blue-500 transition duration-300 text-center"
                  >
                  Generate Report
                  </button>
        
                  <button className="px-10 py-1 bg-sky-950 rounded-lg border border-white  hover:bg-blue-500 transition duration-300 text-center">Download Report</button>
                </div>
              </div>
        {/* Display the Prediction Result */}
        {showResults && (
      <div className="mt-4">
        <h3 className="font-bold">Results:</h3>

        {prediction !== "Non-Demented" ? (
          <>
            <ul className="list-disc list-inside">
              <li>
                Decreased functional connectivity between the default mode network (DMN) and the hippocampus.
              </li>
              <li>
                Amyloid Beta Deposition: Amyloid PET scan showed evidence of amyloid beta deposition in brain regions 
                consistent with Alzheimer&apos;s Disease.
              </li>
            </ul>
            <p className="mt-4">
              <strong>Interpretation:</strong> The fMRI findings suggest abnormalities in brain regions commonly implicated in 
              Alzheimer&apos;s disease. The decreased functional connectivity between the DMN and hippocampus is a well-established 
              biomarker for AD.
            </p>
            <p className="mt-4">
              <strong>Diagnosis:</strong> Based on the fMRI results and other clinical assessments, Petri Hiljainen may be at 
              increased risk for Alzheimer&apos;s Disease. Further evaluation, including neuropsychological testing and 
              cognitive assessments, is recommended to confirm the diagnosis.
            </p>
          </>
        ) : (
          <p className="mt-4">
            <strong>Interpretation:</strong> The fMRI findings suggest that brain regions have no found any abnormalities caused by 
            Alzheimer&apos;s disease.
          </p>
        )}
      </div>
    )
}

            </div>
          </div>
          <div className="w-1/4 space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2 p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <DonutAccuracyChart />
              </div>
              <div className="w-1/2 p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <DonutVisitorsChart />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <LineVisitorsChart />
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <RadarModelChart />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
