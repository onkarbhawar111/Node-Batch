import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedFilePath(res.data.file);

    } catch (err) {
      console.error(err);
      alert('File upload failed');
    }
  }
  // console.log("Path:::", uploadedFilePath)

  return (
    <div style={{ padding: '20px' }}>
      <h2>React + Express + Multer File Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {uploadedFilePath && (
        <div>
          <h3>Uploaded file:</h3>
          <img src={`http://localhost:3001${uploadedFilePath}`} alt="Uploaded" width="300" />
          <p>{uploadedFilePath}</p>
        </div>
      )}
    </div>
  );
}

export default App;
