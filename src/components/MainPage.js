import "../style/Mainpage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const MainPage = ()=>{
    const navigate= useNavigate();
    const [csrftoken , setCsrftoken]= useState("")
    
    useEffect(() => {
      const token= Cookies.get("csrftoken")
      setCsrftoken(token)
     
    }, [])
    

     const logout= async () => {
        try{
            
            const response= await axios.post(`${process.env.REACT_APP_API_URL}/logout/`,
                { 
                    header:{
                        "Accept": "applications/json",
                        "Content-Type" : "application/json",
                        "X-CSRFToken": csrftoken

                }
                    , withCredentials:true
            
                });

            if (response.data.message){
                // setResponse(respns.data.message)
                navigate("/login",{ state: { refresh: true }, replace:true})
            }

        }
        catch(e){
            console.log(`Error ${e}`)
        }
        
        

     }

    return(
        <div id='main'>
            
            <div className='main-wrapper'>
                <button onClick={logout} id='main-logoutBtn'> Log Out</button>
                
                <h1 id='heading'>Welcome to your Dashboard</h1>

                
                <div className='main-video'>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/axdNmaV18hw?si=zGdOrSIVXzymddBc"
                    title="YouTube video player"
                    style={{ border: 'none' }}  // Replaces frameBorder
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                    
                </iframe>
                </div>


                {/* {response && <Navigate to="/" replace={true} />} */}
            </div>

        </div>
    );
}

export default MainPage;