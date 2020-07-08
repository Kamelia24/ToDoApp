import React,{useState}  from "react";
import {Link,useHistory} from 'react-router-dom';
//import { render } from "@testing-library/react";
import axios from 'axios';
const SignUpForm=()=>{
    const history=useHistory();
    /*constructor(props) {
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserAge = this.onChangeUserAge.bind(this);
        this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            age: '',
            username:'',
            password:''
        }
    }
    onChangeUserName(e) {
        this.setState({ name: e.target.value })
    }
    onChangeUserUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangeUserAge(e) {
        this.setState({ age: e.target.value })
    }
    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()*/
        /*const params = new URLSearchParams();
        params.append('name', this.state.name);
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        params.append('age',this.state.age)*/
        /*const userObject = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            age: this.state.age
        };
console.log(userObject)
        axios.post('http://localhost:5000/addUser', userObject)
            .then((res) => {
                console.log("in Axios",userObject)
                history.push('/SignIn')
            }).catch((error) => {
                console.log(error)
            });
            //axios({method:'post',url:'http://localhost:5000/addUser',data:userObject});
            console.log(userObject)
        this.setState({ name: '', age: '' ,username: '',password: ''})
    }*/
    const [name,setName]=useState("");
    const [age,setAge]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const signUpRequest=(e)=>{
        e.preventDefault();
        const userObject = {
            name:name,
            username:username,
            password:password,
            age:age
        };
        axios.post('http://localhost:5000/addUser', userObject)
        .then((res) => {
            console.log("in Axios",userObject,res)
            history.push('/LogIn')
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <form onSubmit={(e)=>signUpRequest(e)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username"
            value={username}
            name="username"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username" />
            <br></br>

            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass"
            name="pass"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password" />
            <br></br>

            <label htmlFor="name">Name:</label>
            <input type="text" id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="First name" />
            <br></br>

            <label htmlFor="age">Age:</label>
            <input type="number" id="age"
            name="age"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            placeholder="Age" />
            <br></br>

            <input type="submit" value="Submit" />
        </form>
    );
}
export default SignUpForm;