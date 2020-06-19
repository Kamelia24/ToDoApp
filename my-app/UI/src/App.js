import React from 'react';
//import logo from './logoCheckBox.png';
import './App.css';
import { Route,Switch} from "react-router-dom";
import HomePage from "./homePage"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
//import HomePage from "./index";
function Home() {
  return (
    
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
    </Switch>
  );
}
/*function SignIn(){
  return(
    <div className="signIn">
      <button class="button" onClick={() => history.push('/SignIn')}>Sign In</button>
    </div>
  )
}
function SignUp(){
  return(
    <div className="signUp">
      <button class="button" onClick={() => history.push('/SignUp')}>Sign Up</button>
    </div>
  );
}*/



export default Home;
