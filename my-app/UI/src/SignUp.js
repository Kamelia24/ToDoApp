import React  from "react";
//import { render } from "@testing-library/react";


function SignUpForm(){
    
    return (
      <form >
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" placeholder="Username" />
  <br></br>
      <label for="pass">Password:</label>
      <input type="password" id="pass" name="pass" placeholder="Password" />
  <br></br>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="First name" />
      <br></br>
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" placeholder="Age" />
  <br></br>
      <input type="submit" value="Submit" />
    </form>
    );
    
  }
  export default SignUpForm;