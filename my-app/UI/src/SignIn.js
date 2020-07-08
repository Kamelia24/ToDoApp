import React,{useState} from "react";
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
const SignInForm = () => {
    const history=useHistory();
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const signInRequest=(e)=>{
        e.preventDefault();
        const userObject = {
            username:username,
            password:password
        };
        axios.post('/checkUser', userObject)
        .then((res) => {
            //localStorage.setItem("jwt",res.token)
            //localStorage.setItem("user",JSON.stringify(res.user))
            console.log(res)
            localStorage.setItem("jwt",res.data.token)
            localStorage.setItem("userID",res.data.userID)
            //console.log(localStorage.getItem("jwt"))
            history.push('/ToDoList')
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)} />

            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass"
            name="pass"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
            <br></br>

            <input type="submit" value="Submit"  onClick={(e)=>signInRequest(e)}/>
        </form>
    );       
}
export default SignInForm;

