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

        this.setState({ name: '', age: '' ,username: '',password: ''})
    }
render(){
    return (
      <form  onSubmit={this.onSubmit}>
      <label for="username">Username:</label>
      <input type="text" id="username" value={this.state.username} name="username" onChange={this.onChangeUserUsername} placeholder="Username" />
  <br></br>
      <label for="pass">Password:</label>
      <input type="password" id="pass" name="pass" value={this.state.password} onChange={this.onChangeUserPass} placeholder="Password" />
  <br></br>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChangeUserName} placeholder="First name" />
      <br></br>
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" value={this.state.age} onChange={this.onChangeUserAge} placeholder="Age" />
  <br></br>
      <input type="submit" value="Submit"/>
    </form>
    );
}
  }
  export default SignUpForm;