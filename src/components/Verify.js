import React, { useRef, useState, useCallback,useEffect } from "react";
import Webcam from "react-webcam";
import "../style/verify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Csrftoken from "./Csrftoken";



const Verify = () => {

  let timeoutId;
  const [latestCsrfToken, setlatestCsrfToken]= useState("")
  const [status, setStatus]= useState(false)
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);
  const [error, setError] = useState("");
  const navigate= useNavigate()


  useEffect(()=>{
    const token= Cookies.get("csrftoken")
    console.log("CSRF Token was fetched:", token); // Check if the token is fetched
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




  const PicCancel= (e)=>{
    if (imageSrc) {
      setImageSrc(null);
    
    }
  }



  const getUniqueFilename = () => {
    return `image_${Date.now()}.jpg`; // Unique filename based on current timestamp
  };
  

  const Timing= ()=>{
    timeoutId= setTimeout(() => {
      navigate("/login")
    }, 2000);


    return ()=>clearTimeout(timeoutId)
    
  }




  const picture_upload = async (e) => {

    e.preventDefault()    
    if (!imageSrc) {
      setError("Please take a picture before submitting.");
      return;
  }
  try{
      const base64Response = await fetch(imageSrc);
      const blob = await base64Response.blob();
      const formData = new FormData();
      const filename = getUniqueFilename();
      const file = new File([blob], filename, { type: 'image/jpeg' });

      formData.append('profile_image', file);
      console.log([...formData.entries()]);
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/check_owner/`,formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': latestCsrfToken
          },
          withCredentials: true,
        });

        if (response.data.message){
          setStatus(true)
          navigate("/mainpage")

        }
        if (response.data.error) {
          setError(response.data.error); // Show error message
          setStatus(false);
          Timing();
        }
    }
    catch (error) {
  console.log(error)
 }
    
      
}


  return (

    <div className="wrapper">
      <h2 className="confirm-header">Confirm your Identity</h2>
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

            {!status && <span id="errorMsg">{error}</span>} 
              
                <form action="" method="POST" id="webcapture" onSubmit={picture_upload}> 
                  <Csrftoken/>
                    <button id="capturebutton-submit" >Submit</button>
                </form>

                <div id="otherBtns">
                    <button id="capture-button" onClick={()=>capture()}>Take Picture</button>

                    <button id="capturebutton-cancel" onClick={()=> PicCancel()}>Restart</button>
                </div>
          </div>
            
      </div>
    </div>



  
  );
};


export default Verify;
