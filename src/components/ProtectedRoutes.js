// import React from "react";
import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../style/ProtectedRoutes.css"



const ProtectedRoutes= ({children})=>{
const [isAuthenticated, setIsAuthenticated]= useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(true); 

useEffect (()=>{
        const checkAuth = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/check_auth/`, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get("csrftoken"),
              },
              withCredentials: true,
            });
            
            if (response.data.isAuthenticated) {
              setIsAuthenticated(true);
            } 
            else{
              setIsAuthenticated(false)
            }
            
          } 
          
          catch (error) {
            setError("Error checking authentication");
            setIsAuthenticated(false)

          } 

          finally {
            setLoading(false); // Ensure loading is set to false after the check
          }
        };
    
        checkAuth();
      }, []);



      if (loading) {
        return <div className="load"></div>;
      }
    
      if (error || !isAuthenticated) {
        return <Navigate to="/login/" replace={true} />;
      }
     

      
      return children;

}

export default ProtectedRoutes;