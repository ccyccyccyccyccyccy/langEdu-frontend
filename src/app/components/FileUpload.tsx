// components/FileUpload.js
import { SetStateAction, useState } from 'react';

export default function FileUpload(baseUrl: { baseUrl: string}) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    
    const res = await fetch(`${baseUrl.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('File uploaded successfully');
    } else {
      setMessage(`Error: ${data.error}`);
    }
    if (message){
      console.log(message)
    }
    else{
      console.log("No message")
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
