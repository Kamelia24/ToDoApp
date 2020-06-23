import React from "react";
import axios from 'axios';
function SignInForm(){
        return (
            <form >
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Username" />
  <br></br>
            <label for="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="Password" />
  <br></br>
      
            <input type="submit" value="Submit" />
            </form>
        );
 
        
}
export default SignInForm;

