import React, { useState, useRef } from "react";

function Home() {
const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
const [fileUpload, setFileUpload] = useState({})
const [gramCount, setGramCount] = useState(null)

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
  formData.append('ngram', gramCount)
  e.preventDefault()

  
  fetch(API_URL?`${API_URL}/api/ngram/upload/new`:"/api/ngram/upload/new", {
    method:'POST',
    body: formData
  })
  .then(r=>r.blob())
  // .then(setDownload(true))
  .then(blob => blob.text().then(text => {
  const lines = text.trim().split('\n');

  // Skip header and check if there's at least one more line
  if (lines.length > 1) {
    const url = window.URL.createObjectURL(new Blob([text]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word_frequencies.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } else {
    alert("Please ensure the upload rows are not empty and that the nGram is less than 5");
  }
}))
.catch(err => console.error("Error handling blob response:", err));
    

}


  return (
    <div> 
      <h1>nGram Input</h1>
      <form onSubmit={handleFileUpload}>
        <label style={{padding:"10px", justifyContent:"left", textAlign:"left"}}>Enter Word Count</label>
        <input type="text" style={{width:"150px"}} onChange={(e)=> setGramCount(e.target.value)} required/>
        <br></br>
        <br></br>
        <input 
          ref={inputFile} 
          type="file" 
          id="myFile" 
          name="filename" 
          onChange={(event) =>{
              const file = event.target.files[0]['name']
              if (file && file.endsWith("csv")){
                setFileUpload(event.target.files[0])
              }
              else{
                
                alert("Uploaded file must be CSV")
                handleReset()
              }
            
        }}/>
       <input type="submit" />
        
      </form>

      

  </div>
  )
}

export default Home