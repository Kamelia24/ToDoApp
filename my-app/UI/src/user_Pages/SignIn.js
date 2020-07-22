import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css'
const SignInForm = () => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const signInRequest = (e) => {
        e.preventDefault();
        const userObject = {
            username: username,
            password: password
        };
        axios.post('/checkUser', userObject)
            .then((res) => {
                console.log(res)
                localStorage.setItem("jwt", res.data.token);
                localStorage.setItem("userID", res.data.userID);
                localStorage.setItem("role", res.data.isAdmin);
                M.toast({ html: 'Successfull login', classes: 'success' })
                history.push('/ToDoList')
            }).catch((error) => {
                console.log(error)
                M.toast({ html: 'Incorrect data', classes: "fail" })
            });
    }
    return (
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <br></br>

            <input type="submit" value="Submit" onClick={(e) => signInRequest(e)} />
        </form>
    );
}
export default SignInForm;

