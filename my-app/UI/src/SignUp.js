import React,{Component}  from "react";
//import { render } from "@testing-library/react";
import axios from 'axios';

class SignUpForm extends Component{

    constructor(props) {
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
        e.preventDefault()
        /*const params = new URLSearchParams();
        params.append('name', this.state.name);
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        params.append('age',this.state.age)*/
        const userObject = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            age: this.state.age
        };
console.log(userObject)
        axios.post('http://localhost:4000/addUser', userObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });
            //axios({method:'post',url:'http://localhost:4000/addUser',data:params});

        this.setState({ name: '', age: '' ,username: '',password: ''})
    }
render(){
    return (
      <form  onSubmit={this.onSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={this.state.username} name="username" onChange={this.onChangeUserUsername} placeholder="Username" />
  <br></br>
      <label htmlFor="pass">Password:</label>
      <input type="password" id="pass" name="pass" value={this.state.password} onChange={this.onChangeUserPassword} placeholder="Password" />
  <br></br>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChangeUserName} placeholder="First name" />
      <br></br>
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" name="age" value={this.state.age} onChange={this.onChangeUserAge} placeholder="Age" />
  <br></br>
      <input type="submit" value="Submit"/>
    </form>
    );
}
  }
  export default SignUpForm;