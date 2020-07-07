import React,{useState} from "react";
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
const SignInForm =()=>{
    const history=useHistory();
    /*constructor(props) {
        super(props)
        this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            password:''
        }
    }
    onChangeUserUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        /*const params = new URLSearchParams();
        params.append('name', this.state.name);
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        params.append('age',this.state.age)*/
        /*const userObject = {
            username: this.state.username,
            password: this.state.password
        };
console.log(userObject)
        axios.post('/checkUser', userObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });
            /*axios({method:'post',url:'http://localhost:5000/checkUser',data:userObject});*/
            /*console.log(userObject)
        this.setState({ name: '', age: '' ,username: '',password: ''})
    }*/
    
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const Post=(e)=>{
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
            <input type="text" id="username" name="username" placeholder="Username"  value={username} onChange={(e)=>setUsername(e.target.value)} />
            <br></br>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <br></br>
            <input type="submit" value="Submit"  onClick={(e)=>Post(e)}/>
        </form>
    );       
}
export default SignInForm;

