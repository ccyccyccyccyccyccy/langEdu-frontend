// components/FileUpload.tsx
import { useState } from "react";

export default function FileUpload({ onUpload }: { onUpload: (file: File) => void }) {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.split('.').length < 2) {
        alert("Please upload a valid file.");
        return;
      }
      if (file.name.split('.').length > 2) {
        alert("It is not allowed to have multiple dots in the file name. Please rename your file and try again.");
        return;
      } 
      if (file.name.split('.').pop()?.toLowerCase() !== 'pdf') {
        alert("Please upload a PDF file.");
        return;
      }
      onUpload(file);
      setFileName(file.name);
    }
  };

  
  return (
<div>
  <input
    type="file"
    onChange={handleFileChange}
    className="text-sm md:w-[130px] text-white
               file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-[rgb(0,51,102)] file:text-white
               hover:file:bg-[rgb(0,41,82)]
               transition"
   />
  {fileName && <p className="mt-2 text-sm text-gray-500">{fileName}</p>}
</div>

  );
}
