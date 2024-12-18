import React, { useRef, useState, useCallback,useEffect } from "react";
import Webcam from "react-webcam";
import "../style/WebcamCapture.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Csrftoken from "./Csrftoken";



const WebcamCapture = () => {

// const [status, setStatus]= useState(false)
const [imageSrc, setImageSrc] = useState(null);
const webcamRef = useRef(null);
const [latestCsrfToken, setlatestCsrfToken]= useState("")

const navigate=useNavigate()

useEffect(()=>{
const token= Cookies.get("csrftoken")
setlatestCsrfToken(token)
},[])


  const videoConstraints = {
     width: 400,
     height: 400,
     facingMode: "user",
   };



const capture = useCallback(() => {
    const imageLocation = webcamRef.current.getScreenshot();
    setImageSrc(imageLocation);
    webcamRef.current.video.srcObject
    .getVideoTracks()
    .forEach((track) => track.stop());
}, [webcamRef]);




   const PicCancel= ()=>{
     if (imageSrc){
       setImageSrc(null)
     }
   }

   const getUniqueFilename = () => {
     return `image_${Date.now()}.jpg`; // Unique filename based on current timestamp
   };
  

   const picture_upload = async (e) => {
     e.preventDefault()
    try{
    const base64Response = await fetch(imageSrc);
    const blob = await base64Response.blob();
    const formData = new FormData();
    const filename = getUniqueFilename();
    const file = new File([blob], filename, { type: 'image/jpeg' });

    formData.append('profile_image', file);

    console.log(formData)
  
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/upload_image/`,
        formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': latestCsrfToken
        },
        withCredentials: true,
      });

      if (response.data.message){
        // setStatus(true)
        navigate("/login")
      } 
    }
    catch(error){
      console.log(error)
    }
}



    return  (

      <div className="wrapper">
        <h2 className="confirm-header">Take a photo</h2>
        <div className="overall-container">
    
          <div id="container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam"/>
            
          </div>
    
          <div id="button-wrapper">
              {/* {status && (navigate("/login"))} */}
                
              <form action="" method="POST" id="webcapture" onSubmit={picture_upload}> 
                <Csrftoken/>
                <button id="capturebutton-submit">Submit</button>    
              </form>
    
                  <div id="otherBtns">
                    <button id="capture-button" onClick={(e)=>capture(e)}>Take Picture</button>
    
                    <button id="capturebutton-cancel" onClick={(e)=>PicCancel(e)}>Cancel</button>
                  </div>
            </div>
                
          </div>
      </div>
    );

};

export default WebcamCapture;
