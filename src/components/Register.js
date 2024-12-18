import { useState,} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/Register.css"
import axios from 'axios';
import Csrftoken from './Csrftoken';
import Cookies from "js-cookie";



const Register = () => {

  const [error, setError] = useState("") // The Error notification on the form
  // const [status, setStatus] = useState(false)  // The status of the registration
  const [Formdata, setFormdata]=useState({
    email:"",
    password:"",
    confirmPassword:""

  }) // The state for the register form
  const navigate = useNavigate()
  const {email, password, confirmPassword} = Formdata


function handlechange(e){
        e.preventDefault();

        setFormdata({
          ...Formdata,[e.target.name]:e.target.value
        })
}


  
const handlesubmit= async (e) => {
  e.preventDefault()

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
 
const responses = await axios.post(
  `${process.env.REACT_APP_API_URL}/newaccount/`,
  {
    "email":email,
    "password" :password,
    "confirmPassword" : confirmPassword,
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
    // setStatus(true)
    navigate('/register_image')
    //console.log("succesful registration")
  }
  else if (responses.data.error){
    // setStatus(false)
    setError (responses.data.error)   
  }
}


return (
    <div id='overall-box'>
        <div id='register-wrapper'>
        {/* {status && (
            navigate('/login/')
        )}  */}

            <form action='' id='signup-form' method="post" onSubmit={(e)=>handlesubmit(e)}>
              <Csrftoken/>
                <h2 id='signup-header'> Sign Up </h2>
              
              { error ? (<p className = {`error-message  ${error ? "": "hidden"}`}> {error} </p>): null} 
                <p className='paragraph'> <label htmlFor="regemail" className='alllabels'> Email </label>
                <input type="email" id ="regemail" name="email" required onChange={(e)=>handlechange(e)} value={email} placeholder='email'/> </p>

                <p className='paragraph'> <label htmlFor="first-password" className='alllabels'> Password </label>
                <input type="password" id="first-password" name='password' required onChange={(e)=>handlechange(e)} value={password} placeholder='password'/></p>

                <p className='paragraph'> <label htmlFor="confrim-Pass" className='alllabels'> Confirm Password </label>
                <input type="password" id="confrim-Pass" name='confirmPassword' required onChange={(e)=>handlechange(e)} value={confirmPassword} placeholder='Confirm password'/></p>              
                <div id='seperator'>

                <p className='buton-paragraph paragraph'>  <button id='submitbtn' type='submit'> Sign Up</button></p>

                <p className='already-member-paragraph paragraph'> <span id='member'>Already a member? </span> <Link to='/login' id='remv-underline'> Login </Link> </p>

                </div>

            </form>

        </div>     
        
    </div>
  );

}

export default Register;
