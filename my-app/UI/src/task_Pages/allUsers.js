import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
import AllTasks from './allTasks';
function ShowUsers() {
    const history = useHistory();
    let number;
    let [ShowUser, setShowUser] = useState(false);
    //let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([]);
    let [users, setUsers] = useState([])
    let [userID, setUserID] = useState(1)
    let [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsAdmin(localStorage.getItem("role"))
        axios.get('http://localhost:5000/getNumberOfUsers', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res.data.num)
                let pag = [];
                number = res.data.num;
                for (let i = 1; i < number / 10 + 1; i++) {
                    pag.push(<button key={i} onClick={() => getUsers(i)}>{i}</button>)
                }
                setPagination(pag)
                getUsers(1)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: error, classes: 'fail' })
                history.push("/");
            });
    }, [])
    function getUsers(page) {
        axios.post('http://localhost:5000/getUsers', { num: page }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("users:", res.data.data)
                let user = res.data.data;
                setUsers(user)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: error, classes: 'fail' })
                history.push("/");
            });
    }
function changeView(id){
    setUserID(id);
    setShowUser(true)
}
    return (
        <div id="taskContainer">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand"><Link to="/AddTasks" style={{ color: 'green', textDecoration: 'none' }}>ToDoApp</Link></a>
                {isAdmin === "true" ? (
                    <a className="nav-item  mr-auto"
                        onClick={() => {
                            setShowUser(false)
                            history.push("/AllUsers")
                        }}
                    >Other users</a>
                ) : (
                        <div></div>
                    )}
                <ul className="navbar-nav">
                    <li className="nav-item dropdown" style={{ Align: 'right', marginLeft: '10px' }}>
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" ><Link to="/ToDoList" style={{ color: 'black', textDecoration: 'none' }}>My tasks</Link></a>
                            <a className="dropdown-item" onClick={() => {
                                localStorage.clear()
                                history.push("/")
                            }}>Log out</a>
                        </div>
                    </li>
                </ul>
            </nav>
            {!ShowUser ? (
                <div>
                    <h1 align="center">Users</h1>
                    <table id="todo">
                        <thead>
                            <tr key={0}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => <tr key={user.id + 2} onClick={() => changeView(user.id)}>
                                <td >{user.id}</td>
                                <td >{user.name}</td>
                                <td >{user.username}</td>
                                <td >{user.age}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="topnav">
                        {pagination.map((pagination) => pagination)}
                    </div>
                </div>
            ) : (
                
                    <AllTasks userID={userID} />
                )}
        </div>
    )
}
export default ShowUsers;