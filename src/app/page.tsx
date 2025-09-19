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

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [openAI_API_Key, setOpenAI_API_Key] = useState("");
  const [langSearchAPI_Key, setLangSearchAPI_Key] = useState("");
const handleOpenAI_API_Key_Change = (value: string) => {
    setOpenAI_API_Key(value);
  };
  const handleLangSearchAPI_Key_Change = (value: string) => {
    setLangSearchAPI_Key(value);
  };

  
  const baseUrl="http://127.0.0.1:5000"

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then(response => setData(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  async function handleDownload() {
    console.log("Download button clicked");
    const response = await fetch(baseUrl + "/download/hello.pdf", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob= await response.blob();
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "hello.pdf"; // Specify the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);

  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div>
      <h1>Flask + Next.js Integration</h1>
      <p>{data}</p>
    </div>
      <h1 className="text-2xl font-bold">Enter your api key</h1>
      <SecretInput onChange={handleOpenAI_API_Key_Change} />
      <h1 className="text-2xl font-bold">Enter your langsearch api key</h1>
      <SecretInput onChange={handleLangSearchAPI_Key_Change} />
 
      <div className="mt-4">
        <FileUpload baseUrl="http://127.0.0.1:5000"></FileUpload>
        </div>
        <div className="mt-4">
        <button onClick={() => handleDownload()}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >Download</button>
        </div>
    </div>
  );
}

export default App;
