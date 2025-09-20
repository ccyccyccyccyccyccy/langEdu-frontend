// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

//http://localhost:3000/

'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import {SecretInput} from "./components/SecretInput";
import { RadioGroupComponent } from "./components/RadioGroup";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [openAI_API_Key, setOpenAI_API_Key] = useState("");
  const [langSearchAPI_Key, setLangSearchAPI_Key] = useState("");
  const [lectureFile, setLectureFile] = useState<File | null>(null);
  const [radioValue, setRadioValue] = useState<string>("oneDocument");
  const [ppFile1, setPPFile1] = useState<File | null>(null);
  const [ppFile2, setPPFile2] = useState<File | null>(null);

const handleOpenAI_API_Key_Change = (value: string) => {
    setOpenAI_API_Key(value);
  };
  const handleLangSearchAPI_Key_Change = (value: string) => {
    setLangSearchAPI_Key(value);
  };
const handleRadioChange = (value: string) => {
    setRadioValue(value);
  }
  
  const baseUrl="http://127.0.0.1:5000"

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then(response => setData(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

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
    const response = await fetch(baseUrl + "/get_results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "openAI_API_Key": openAI_API_Key,
        "langSearchAPI_Key": langSearchAPI_Key,
        "numDocuments": radioValue === "oneDocument" ? 1 : 2,
        "lectureFileName": lectureFile ? lectureFile.name : null,
        "ppFile1Name": ppFile1 ? ppFile1.name : null,
        "ppFile2Name": ppFile2 ? ppFile2.name : null
      })
    })
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob= await response.blob();
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "hello.html"; // Specify the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);

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
         <RadioGroupComponent onChange={handleRadioChange} />
        
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
