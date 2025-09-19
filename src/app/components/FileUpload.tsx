// components/FileUpload.tsx
import { useState } from "react";

export default function FileUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
