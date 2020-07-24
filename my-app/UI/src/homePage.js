import React, { useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
function HomePage() {
  const history=useHistory();
  if(localStorage.getItem("jwt")){
    history.push('/ToDoList')
  }
  return (
    <div className="Logo">
      <header className="App-header">
        <img src="./checkBox.jpg" className="App-logo" alt="logo" />
        <p>If you have a tendency to forget what are your tasks this app is perfect for you !<br></br>
          Welcome to ToDO :) <br></br> An app where you can write each of your tasks.
          </p>
        <div className="signIn">
          <button className="button"><Link to="/SignIn">Sign In</Link></button>
        </div>
        <p>Or if you haven't registered yet:</p>
        <div className="signUp">
          <button className="button"><Link to="/SignUp">Sign Up</Link></button>
        </div>
      </header>
    </div>
  )
}
export default HomePage;