import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css'
const SignUpForm = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const signUpRequest = (e) => {
        e.preventDefault();
        const userObject = {
            name: name,
            username: username,
            password: password,
            age: age
        };
        axios.post('http://localhost:5000/addUser', userObject)
            .then((res) => {
                console.log("in Axios", userObject, res)
                history.push('/LogIn')
            }).catch((error) => {
                console.log(error)
                M.toast({ html: 'User already exists' })
            });
    }
    return (
        <form onSubmit={(e) => signUpRequest(e)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            <br></br>

            <label htmlFor="name">Name:</label>
            <input type="text" id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name" />
            <br></br>

            <label htmlFor="age">Age:</label>
            <input type="number" id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age" />
            <br></br>

            <input type="submit" value="Submit" />
        </form>
    );
}
export default SignUpForm;