
//http://localhost:3000/

'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import {SecretInput} from "./components/SecretInput";
import { RadioGroupFiles } from "./components/RadioGroupFiles";
import { RadioGroupQType } from "./components/RadioGroupQType";

function App() {
  //const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [openAI_API_Key, setOpenAI_API_Key] = useState("");
  const [langSearchAPI_Key, setLangSearchAPI_Key] = useState("");
  const [lectureFile, setLectureFile] = useState<File | null>(null);
  const [radioValue, setRadioValue] = useState<string>("oneDocument");
  const [ppFile1, setPPFile1] = useState<File | null>(null);
  const [ppFile2, setPPFile2] = useState<File | null>(null);
  const [qType, setQType] = useState<string>("MCQ");

const handleOpenAI_API_Key_Change = (value: string) => {
    setOpenAI_API_Key(value);
  };
  const handleLangSearchAPI_Key_Change = (value: string) => {
    setLangSearchAPI_Key(value);
  };
const handleRadioChange = (value: string) => {
    setRadioValue(value);
  }

const handleQtypeChange = (value: string) => {
    setQType(value);
  }
  
  const baseUrl="http://127.0.0.1:5000"

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:5000/api/data")
  //     .then(response => setData(response.data.message))
  //     .catch(error => console.error("Error fetching data:", error));
  // }, []);

  async function handleGetResults() {
    if (!openAI_API_Key || !langSearchAPI_Key) {
      alert("Please enter both API keys.");
      return;
    }
    if (!lectureFile) {
      alert("Please upload the lecture file.");
      return;
    }
    if (radioValue === "oneDocument" && !ppFile1) {
      alert("Please upload the pastpaper file.");
      return;
    }
    if (radioValue === "twoDocument" && (!ppFile1 || !ppFile2)) {
      alert("Please upload both pastpaper files.");
      return;
    }
    console.log("Get results button clicked");
    const formData = new FormData();
    formData.append("lectureFile", lectureFile);
    if (ppFile1) formData.append("ppFile1", ppFile1);
    if (ppFile2) formData.append("ppFile2", ppFile2);
    formData.append("numDocuments", radioValue === "oneDocument" ? "1" : "2");
    formData.append("qType", qType);
    //formData.append("openAI_API_Key", openAI_API_Key);
    //formData.append("langSearchAPI_Key", langSearchAPI_Key);
    axios.post(baseUrl + "/results", formData, {
      headers: {
        'Authorization': `openAI_API_Key ${openAI_API_Key}, langSearchAPI_Key ${langSearchAPI_Key}`,
      },
      responseType: 'blob' // Important
    })
    .then((response) => {
      // Handle the response data (which is a Blob)
      const blob = new Blob([response.data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'results.html'; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error fetching the results:', error);
      alert("An error occurred while fetching the results. Please try again.");
    });
    // const response = await fetch(baseUrl + "/get_results", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     "openAI_API_Key": openAI_API_Key,
    //     "langSearchAPI_Key": langSearchAPI_Key,
    //     "numDocuments": radioValue === "oneDocument" ? 1 : 2,
    //     "lectureFileName": lectureFile ? lectureFile.name : null,
    //     "ppFile1Name": ppFile1 ? ppFile1.name : null,
    //     "ppFile2Name": ppFile2 ? ppFile2.name : null, 
    //     "qType": qType
    //   })
    // })
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const blob= await response.blob();
    // const url = URL.createObjectURL(blob);
    
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "hello.html"; // Specify the filename
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    
    // // Clean up the URL object
    // URL.revokeObjectURL(url);

  }

return (
  <div className="flex flex-col items-center space-y-6 p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-[rgb(0,51,102)]">
        Assessment question generator
      </h1>
      <p className="text-muted-foreground">{data}</p>
    </div>

    <div className="w-full space-y-4">
      <div>
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)] space-y-2">Enter your OpenAI API key</h2>
        <text className="text-sm text-[rgba(0, 0, 0, 0.7)] space-y-1">You can get your API key <a href="https://itso.hkust.edu.hk/services/it-infrastructure/azure-openai-api-service" target="_blank" className="text-blue-600 underline">here</a></text>
        <SecretInput onChange={handleOpenAI_API_Key_Change} />
      </div>

      <div>
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)]">Enter your LangSearch API key</h2>
        <text className="text-sm text-[rgba(0, 0, 0, 0.7)] space-y-1">You can get your API key <a href="https://docs.langsearch.com/use-cases/using-langsearch-in-langchain" target="_blank" className="text-blue-600 underline">here</a></text>
        <SecretInput onChange={handleLangSearchAPI_Key_Change} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)] space">Upload your lecture notes file</h2>
        <FileUpload onUpload={setLectureFile} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)]">Upload your pastpaper file(s)</h2>
         <div className="space-y-1">
         <RadioGroupFiles onChange={handleRadioChange} />
        
        {radioValue === "oneDocument" ? (
          <FileUpload onUpload={setPPFile1} />
        ) : (
          <>
            <FileUpload onUpload={setPPFile1} />
            <FileUpload onUpload={setPPFile2} />
          </>
        )}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)]">Select question type</h2>
         <div className="space-y-1">
         <RadioGroupQType onChange={handleQtypeChange} />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleGetResults()}
          className="w-full px-4 py-2 bg-[rgb(0,51,102)] text-white rounded-md hover:bg-[rgb(0,41,82)] transition-colors"
        >
          Get results
        </button>
      </div>
    </div>
  </div>
);

}
export default App;
