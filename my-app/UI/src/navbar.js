import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
function Navbar() {
    const history = useHistory();
    let [isAdmin, setIsAdmin] = useState(false);
    let [isLoggedin,setIsLoggedIn]=useState(false);
    useEffect(() => {
        setIsAdmin(localStorage.getItem("role"));
        console.log(localStorage.getItem("jwt"))
        setIsLoggedIn(localStorage.getItem("jwt"));
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                {isLoggedin?(
                <Link to="/AddTasks" style={{ color: 'green', textDecoration: 'none' }}>ToDoApp</Link>
                ):(
                    <Link to="/" style={{ color: 'green', textDecoration: 'none' }}>ToDoApp</Link>
                )}
                </div>
            {isAdmin === "true" ? (
                <a className="nav-item"
                    onClick={() => {
                        history.push("/ShowUsers")
                    }}
                >Other users</a>
            ) : (
                    <div></div>
                )}
                {isLoggedin?(
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown" style={{ Align: 'right', marginLeft: '10px' }}>
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <div className="dropdown-item"><Link to="/AddTasks" style={{ color: 'black', textDecoration: 'none' }}>New task</Link></div>
                        <div className="dropdown-item" ><Link to="/FinishedTasks" style={{ color: 'black', textDecoration: 'none' }}>Finished tasks</Link></div>
                        <a className="dropdown-item" onClick={() => {
                            localStorage.clear()
                            history.push("/")
                        }}>Log out</a>
                    </div>
                </li>
            </ul>
            ):(
                <div>
                <Link to="/SignIn" style={{color:'black',textDecoration: 'none',paddingRight:'5px' }}>Sign In</Link>
                <Link to="/SignUp" style={{color:'black',textDecoration: 'none',paddingLeft:'5px',borderLeftColor: '#bbbbbb',borderLeftStyle:'solid',borderLeftWidth:'2px'}}>Sign Up</Link>
                </div>
            )}
        </nav>
    )
}
export default Navbar;