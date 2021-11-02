import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import axios from "axios";

const ForgetPassword =() => {
    
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = (response) =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1 , 3}\.[0-9]{1,3}\.[0-9]{1,3\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
            return
        }
        axios({
            method: "POST",
            url: "http://localhost:7000/api/forgot-password",
            data: {tokenId: response.tokenId}
        }).then(response => {
            console.log("password reset link send successfully.." ,response);        
        })
    
       fetch('/reset-password',{
           method: "post",
           headers:{
               "Content-Type":"application/json"
           },
           body: JSON.stringify({
               email
           })
       }).then(res=>res.json())
       .then(data=>{
           console.log(data);
           if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
       }).catch(err=>{
           console.log(err)
       });
    }

    return (
        <>
        <h1>Forgot password</h1>

        <form action="" method="post" >
            <lable for="email">Email1/username</lable>
            <input type="email" name="email" id="email"  />
            <br/>
            <input type="submit" value="submit" />
        </form>
        </>
    )
}

export default ForgetPassword