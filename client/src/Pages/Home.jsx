import React, { useState, useRef } from "react";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
const [count, setCount] = useState(0)
const [fileUpload, setFileUpload] = useState({})

const inputFile = useRef(null);

const handleReset = () => {
  if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";

  }
};

const handleFileUpload = (e)=>{
  e.preventDefault()
  const formData = new FormData()
  formData.append('file', fileUpload)
  e.preventDefault()
  fetch('/api/upload/new', {
    method:'POST',
    body: formData
  })
  .then(r=>r.json())
  .then(data => console.log(data))
}

  return (
    <div> 
      <h1>nGram Input</h1>
      <form onSubmit={handleFileUpload}>
        <input 
          ref={inputFile} 
          type="file" 
          id="myFile" 
          name="filename" 
          onChange={(event) =>{
              const file = event.target.files[0]['name']
              if (file && file.endsWith("csv")){
                console.log(event.target.files[0])
                setFileUpload(event.target.files[0])
                
              }
              else{
                
                alert("Uploaded file must be CSV")
                handleReset()
              }
            
        }}/>
       <input type="submit" />
        
      </form>
      <div>
    <a href="https://vite.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  </div>
  <h1>Vite + React</h1>
  <div className="card">
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
    <p>
      Edit <code>src/App.jsx</code> and save to test HMR
    </p>
  </div>
  <p className="read-the-docs">
    Click on the Vite and React logos to learn more
  </p></div>
  )
}

export default Home