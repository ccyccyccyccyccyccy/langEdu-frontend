
//http://localhost:3000/

'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import {SecretInput} from "./components/SecretInput";
import { TextInput } from "./components/TextInput";
import { RadioGroupFiles } from "./components/RadioGroupFiles";
import { QType } from "./components/RadioGroupQType";

function App() {
  const [programmingLang, setProgrammingLang] = useState("");
  const [data, setData] = useState("");
  const [openAI_API_Key, setOpenAI_API_Key] = useState("");
  const [langSearchAPI_Key, setLangSearchAPI_Key] = useState("");
  const [hfAPI_Key, setHfAPI_Key] = useState("");
  const [lectureFile, setLectureFile] = useState<File | null>(null);
  const [radioValue, setRadioValue] = useState<string>("oneDocument");
  const [ppFile1, setPPFile1] = useState<File | null>(null);
  const [ppFile2, setPPFile2] = useState<File | null>(null);
  const [qType, setQType] = useState<string>("Multiple choice question");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numDocuments, setNumDocuments] = useState<number>(0);

const handleOpenAI_API_Key_Change = (value: string) => {
    setOpenAI_API_Key(value);
  };
  const handleLangSearchAPI_Key_Change = (value: string) => {
    setLangSearchAPI_Key(value);
  };
  const handleHfAPI_Key_Change = (value: string) => {
    setHfAPI_Key(value);
  };
  const handleRadioChange = (value: string) => {
    setRadioValue(value);
  }

const handleQtypeChange = (value: string) => {
    setQType(value);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
  if (!baseUrl) {
    console.error("BASE_URL is not defined");
  }

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:5000/api/data")
  //     .then(response => setData(response.data.message))
  //     .catch(error => console.error("Error fetching data:", error));
  // }, []);
  async function handleGetResults() {
    if (isLoading) {
      return;
      
    }
    
    
    if (!openAI_API_Key || !langSearchAPI_Key) {
      alert("Please enter both API keys.");
      return;
    }
    if (!lectureFile) {
      alert("Please upload the lecture file.");
      return;
    }
    if (radioValue === "oneDocument" && !ppFile1) {
      setNumDocuments(0);

    }
    if (radioValue === "twoDocument" && (!ppFile1 || !ppFile2)) {
      alert("Please upload both pastpaper files.");
      return;
    }
    if (radioValue === "oneDocument" && ppFile1) {
      setNumDocuments(1);
    }
    if (radioValue === "twoDocument" && ppFile1 && ppFile2) {
      setNumDocuments(2);
    }
    if (numDocuments > 0 && (!hfAPI_Key)) {
      alert("Please enter HuggingFace API key.");
      return;
    }
    if (qType === "Coding question" && !programmingLang) {
      alert("Please enter the target programming language.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("lectureFile", lectureFile);
    if (ppFile1) formData.append("ppFile1", ppFile1);
    if (ppFile2) formData.append("ppFile2", ppFile2);
    formData.append("numDocuments", numDocuments.toString());
    formData.append("qType", qType);
    formData.append("programmingLanguage", programmingLang);
  axios.post(baseUrl + "/results", formData, {
    headers: {
      'Openai-Api-Key': openAI_API_Key,
      'Langsearch-Api-Key': langSearchAPI_Key, 
      'Hf-Api-Key': hfAPI_Key
    }
  })
  .then((response) => {
    console.log("Response received:", response.data);
    const blob = new Blob([String(response.data.message)], { type: 'text/html' });
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
    console.log('Full error response:', error.response);
    console.log('Raw data:', error.response?.data);
    alert(error.response?.data?.error || 'An error occurred while fetching the results.');
  })
  .finally(() => {
    setIsLoading(false);
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

      <div>
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)]">Enter your HuggingFace token</h2>
        <text className="text-sm text-[rgba(0, 0, 0, 0.7)] space-y-1">You can get your token <a href="https://www.learnhuggingface.com/extras/setup" target="_blank" className="text-blue-600 underline">here</a></text>
        <SecretInput onChange={handleHfAPI_Key_Change} />
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
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Question:</span>
            <FileUpload onUpload={setPPFile1} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Answer:</span>
            <FileUpload onUpload={setPPFile2} />
          </div>
        </div>
          </>
        )}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-[rgba(0, 0, 0, 1)]">Select question type</h2>
      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        <div className="w-full md:w-auto">
          <QType onChange={handleQtypeChange} />
        </div>
        {qType === "Coding question" && (
          <div className="w-full md:w-[450px]">
            <TextInput onChange={(value) => setProgrammingLang(value)} />
          </div>
        )}
      </div>
      </div>

      <div className="pt-4">
      <button
        onClick={() => handleGetResults()}
        className="w-full px-4 py-2 bg-[rgb(0,51,102)] text-white rounded-md hover:bg-[rgb(0,41,82)] transition-colors flex items-center justify-center gap-2"
      >
        Get results
        {isLoading && <Spinner variant="circle-filled" />}
      </button>
    </div>
    </div>
  </div>
);

}
export default App;
