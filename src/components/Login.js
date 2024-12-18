import { useState,useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import "../style/Login.css"
import axios from 'axios';
import Cookies from "js-cookie";
import Csrftoken from './Csrftoken';





const Login = () => {
    
    const [loginData, setLogindata]= useState({
      "email" : "",
      "password" : ""
    })
    const [imageload,setImageLoad]= useState(false);
    const [logMessage, setMessage]= useState("");
    const navigate = useNavigate();

    const {email , password}= loginData


     useEffect(()=>{
          const img = new Image();
          img.src = 'https://marketplace.canva.com/tBCLI/MAFKS4tBCLI/1/s2/canva-friends-busking-together-in-the-street-MAFKS4tBCLI.jpg';
          img.onload = () => {
              setImageLoad(true);
          };
      
          const interval = setInterval(() => {
              if (!imageload) {
                  img.src = 'https://marketplace.canva.com/tBCLI/MAFKS4tBCLI/1/s2/canva-friends-busking-together-in-the-street-MAFKS4tBCLI.jpg';
                  img.onload = () => {
                      setImageLoad(true);
                  };
              } else {
                  clearInterval(interval);
              }
          }, 2000);
      
          return () => clearInterval(interval);
      },[imageload]);
      
    
    


      function handlechange(e){
        e.preventDefault();
        setLogindata({
          ...loginData,[e.target.name]:e.target.value
        })
      }
     
    

         const handlesubmit = async (e) => {
             e.preventDefault()

            try {
             const responses = await axios.post(`${process.env.REACT_APP_API_URL}/signin/`,
                {
                 "email": email,
                 "password": password
                },
                {
                 headers: {
                       "Accept": "application/json",
                       'Content-Type': 'application/json',
                       'X-CSRFToken': Cookies.get("csrftoken")
                     },
                      withCredentials: true,
                });

               if (responses.data.message){
                 setMessage(" Login successful")
                  navigate("/verify/")

               }
               
            }
            catch(error){
            console.log(error)

            }
         }

       
       
        return (
        <div className="overall-box">
            
            <div className='img-Box'>
                {imageload ? (<img src="https://marketplace.canva.com/tBCLI/MAFKS4tBCLI/1/s2/canva-friends-busking-together-in-the-street-MAFKS4tBCLI.jpg"  alt="Loaded" loading='lazy'/>) : (<div className="loading"></div>)}
            </div>
            
            <div id='login-box'>

                <div id="login-box-wrapper">

                    <form action='' id='login-form' method="POST" onSubmit={(e)=>handlesubmit(e)}>
                        <Csrftoken/>
                        <h2 id='login-header'>Login</h2>
                        {logMessage && (<span id='errorMsg'>{logMessage}</span>)}

                        <p className='login-paragraph'> <label htmlFor="email" className='labels'> Email </label>
                        <input type="email" id ="email" name="email" required onChange={(e)=>handlechange(e)} value={email} placeholder='Email'/> </p>
                
                        <p className='login-paragraph'> <label htmlFor="logpassword" className='labels'> Password </label>
                        <input type="password" id="logpassword" name='password' required onChange={(e)=>handlechange(e)} value={password} placeholder='password'/></p>
                        <button id="submitbutton" type="submit"> Submit</button>
                            
                        <p id="notyet" className='login-paragraph'> Not yet a member ? <Link to='/register' className="no-underline"> Sign Up </Link> </p>
                        <p id="notyet" className='login-paragraph'> <Link to='/forgot-pass' className="no-underline">  Forgot password</Link> </p>

                    </form>
                </div>         
            </div>
        </div>
      )
}

export default Login;