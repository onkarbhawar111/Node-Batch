import React from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState('')

  function handleChange(e) {
    setFile(e.target.files[0])
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!file){
      alert('Please select a file')
      return ;
    }

    const formData = new FormData();
    formData.append('file', file)

    axios.post('http://localhost:3001/upload', formData, 
      {
        Headers:{
        'Content-Type':'multipart/form-data'
      }
    }
    )
      .then(() => alert('File Uploaded successfully'))
      .catch(err => alert('File not Uploaded...'))

      setUploadedFilePath()
  }

  return (
    <div>
      <h2>React + Node + Multer</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name='file' onChange={handleChange} />
        <button type='submit'>Upload</button>
      </form>

      <div>
        {
          uploadedFilePath && <div>
            <p>Uploaded file is: </p>
            <img src={`http:localhost:3001/${uploadedFilePath}`} alt="" />
          </div>
        }
      </div>
    </div>
  )
}

export default App