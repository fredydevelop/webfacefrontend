import { useEffect,useState } from "react";
import axios from "axios";





 function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


/* The CSRF comoponent rendering in the form */
const Csrftoken=()=>{
    const[csrftoken, setCsrftoken]=useState("")

    const fetchData = async()=>{
        try{
            await axios.get(`${process.env.REACT_APP_API_URL}/csrf-token/`)
        }
        catch(err){
            console.log(err)
        }
    }
    

    
    useEffect(()=>{
        fetchData();
        const token = getCookie("csrftoken")
        setCsrftoken(token)
    },[])

    return(
        <>
        {csrftoken  && <input  type="hidden" value={csrftoken} name="csrftokenmalware"/>}
        </>
    );
}

export default Csrftoken;