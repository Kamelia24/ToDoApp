import React,{Component} from "react";
import axios from 'axios';
class SignInForm extends Component{
    constructor(props) {
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
        const userObject = {
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
            console.log(userObject)
        this.setState({ name: '', age: '' ,username: '',password: ''})
    }
    render (){
        return (
            <form onSubmit={this.onSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Username"  value={this.state.username} onChange={this.onChangeUserUsername} />
  <br></br>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="Password" value={this.state.password} onChange={this.onChangeUserPassword} />
  <br></br>
      
            <input type="submit" value="Submit" />
            </form>
        );
    }
 
        
}
export default SignInForm;

