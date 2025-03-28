import React, { useState, useRef } from "react";

function Home() {
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

  fetch(`https://ngram-analysis.onrender.com/api/ngram/upload/new`, {
    method:'POST',
    body: formData
  })
  .then(r=>r.blob())
  // .then(setDownload(true))
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word_frequencies.csv'; // fallback filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  })
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