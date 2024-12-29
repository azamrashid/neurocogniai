import Image from 'next/image';

export default function MainPage() {
  return (
    <>
      <div className="bg-[#010D2D] text-white font-sans flex flex-col min-h-screen top-0" >
        <header className="relative flex items-center p-4 bg-[#010D2D]">
          <Image
            src="/Header.png"
            alt="NeuroCongniAI Header"
            width={1440}
            height={130}
            />
          
        </header>
        <div className="flex flex-1 p-4">
          <div className="w-1/4 space-y-4">
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <h2 className="text-lg font-bold">Doctor Information</h2>
              <div className="flex items-center mt-2">
                <img
                  src="/profile.svg"
                  alt="profile_image"
                  width="100"
                  height="100"
                />
                <div className="ml-4">
                  <p>Dr. Juha Mikael</p>
                  <p>Neurologist</p>
                  <p>ID: 789654321</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <h2 className="text-lg font-bold">Patient Information</h2>
              <p>Medical ID: 123456789</p>
              <p>Name: Petri Hiljainen</p>
              <p>Age: 65</p>
              <p>Gender: Male</p>
              <p>Last Visit Date: 20/10/2024</p>
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <Image
                src="/brain.svg"
                alt="Brain scan images"
                className="w-full"
                width="200"
                height="200"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <div className="flex flex-col items-center">
                <p className="mb-2">100%</p>
                <div className="flex items-center justify-between w-full">
                  <button className="text-white border border-sky-700 whitespace-nowrap px-5">
                    fMRI Scan
                  </button>
                  <div className="h-1 w-full bg-sky-700 rounded-full mx-4">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <button className="px-10 py-1 bg-sky-950 rounded-lg border border-white">
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <Image
                src="/brain-model.gif"
                alt="Hero_image"
                className="w-full"
                width="500"
                height="500"
              />
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <div className="flex justify-between items-center">
                <div className='font-serif'>
                  <p>Current Activity: Normal</p>
                  <p>Diagnosis: Alzheimer&apos;s</p>
                  <p>Accuracy: 95%</p>
                  <p>Sensitivity: 84%</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-10 py-1 bg-sky-950 rounded-lg border border-white">Generate Report</button>
                  <button className="px-10 py-1 bg-sky-950 rounded-lg border border-white">Download Report</button>
                </div>
              </div>

              <h3 className="mt-4 font-bold">Results:</h3>
              <ul className="list-disc list-inside">
                <li>
                  Decreased functional connectivity between the default mode network (DMN) and the hippocampus.
                </li>
                <li>
                  Amyloid Beta Deposition: Amyloid PET scan showed evidence of amyloid beta deposition in brain regions consistent with Alzheimer&apos;s Disease.
                </li>
              </ul>
              <p className="mt-4">
                Interpretation: The fMRI findings suggest abnormalities in brain regions commonly implicated in Alzheimer&apos;s disease. The decreased functional connectivity between the DMN and hippocampus is a well-established biomarker for AD.
              </p>
              <p className="mt-4">
                Diagnosis: Based on the fMRI results and other clinical assessments, Petri Hiljainen may be at increased risk for Alzheimer&apos;s Disease. Further evaluation, including neuropsychological testing and cognitive assessments, is recommended to confirm the diagnosis.
              </p>
            </div>
          </div>
          <div className="w-1/4 space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2 p-4 bg-[#0b1e3d] border border-sky-700 rounded">
                <Image
                  src="/circle.svg"
                  alt="Circular chart"
                  className="w-full"
                  width="100"
                  height="100"
                />
              </div>
              <div className="w-1/2 p-4 bg-[#0b1e3d] border border-sky-700 rounded">
                <Image
                  src="/circle.svg"
                  alt="Circular chart"
                  className="w-full"
                  width="100"
                  height="100"
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <Image
                src="/dashboard.svg"
                alt="Bar chart"
                className="w-full"
                width="100"
                height="100"
              />
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Mon</span>
                  
                  <div className="w-full h-1 bg-sky-700 rounded-full ml-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '20%' }}
                    ></div>
                  </div>
                  <span>123</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tue</span>
                  
                  <div className="w-full h-1 bg-sky-700 rounded-full ml-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                  <span>220</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Wed</span>
                  
                  <div className="w-full h-1 bg-sky-700 rounded-full ml-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                  <span>723</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#0b1e3d] border border-sky-700 rounded">
              <Image
                src="/zigzag.svg"
                alt="Line chart"
                className="w-full"
                width="200"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
