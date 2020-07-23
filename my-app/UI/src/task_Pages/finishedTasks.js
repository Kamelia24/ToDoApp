import React, { useState, useEffect } from 'react';
import Task from "./tasks";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
function ShowFinTask() {
    const history = useHistory();
    let number;
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([]);
    let [dateFrom, setDateFrom] = useState(new Date());
    let [dateTo, setDateTo] = useState(new Date());
    let [isAdmin, setIsAdmin] = useState(false);
    const DatesAdd = (e) => {
        e.preventDefault();
        setIsAdmin(localStorage.getItem("role"));
        axios.post('http://localhost:5000/getNumOfFinTasks', { dateFrom, dateTo }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res.data.num)
                let pag = [];
                number = res.data.num;
                for (let i = 1; i < number / 10 + 1; i++) {
                    pag.push(<button key={i} onClick={() => movePage(i)}>{i}</button>)
                }
                setPagination(pag)
                movePage(1)
            })
            .catch((error) => {
                console.log(typeof dateFrom)
                console.log("errorrrr:", error)
                M.toast({ html: error, classes: 'fail' })
                history.push("/");
            });
    }
    function movePage(i) {
        if (i === undefined) { i = 1 }
        axios.post('http://localhost:5000/getFinishedTasks', { num: i - 1, dateFrom, dateTo }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res)
                setTasks(res.data["info"]);
                setIsLoading(false);
                console.log(tasks, isLoading)
            })
            .catch((error) => {

                console.log("errorrrr:", error)
                M.toast({ html: error, classes: "fail" })
                history.push("/");
                setIsLoading(false);
                console.log(isLoading);

            });
    }

    return (
        <div id="taskContainer">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand"><Link to="/AddTasks" style={{ color: 'green', textDecoration: 'none' }}>ToDoApp</Link></div>

                {isAdmin === "true" ? (
                    <a className="nav-item"
                        onClick={() => {
                            history.push("/AllUsers")
                        }}
                    >Other users</a>
                ) : (
                        <div></div>
                    )}

                <ul className="navbar-nav mr-auto">


                    <li className="nav-item dropdown" style={{ Align: 'right', marginLeft: '10px' }}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">


                            <div className="dropdown-item" ><Link to="/AddTasks" style={{ color: 'black', textDecoration: 'none' }}>New task</Link></div>
                            <div className="dropdown-item" ><Link to="/FinishedTasks" style={{ color: 'black', textDecoration: 'none' }}>Finished tasks</Link></div>
                            <a className="dropdown-item" onClick={() => {
                                localStorage.clear()
                                history.push("/")
                            }}>Log out</a>
                        </div>

                    </li>


                </ul>
            </nav>

            {!isLoading ? (
                <div>
                    <h1 align="center">Your finished tasks</h1>

                    <table id="todo">
                        <thead>
                            <tr key={0}>
                                <th  >Title</th>
                                <th >Description</th>
                                <th >Date Created</th>
                                <th >Deadline</th>

                            </tr>
                        </thead>
                        <tbody>

                            <Task tasks={tasks} />

                        </tbody>
                    </table>
                    <div className="topnav">
                        {pagination.map((pagination) => pagination)}
                    </div>
                </div>
            ) : (
                    <div>
                        <h1>Select dates</h1><br></br>
                        <form onSubmit={(e) => DatesAdd(e)}>
                            <label htmlFor="dateFrom">From:</label>
                            <input type="date" id="dateFrom"
                                name="dateFrom"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                placeholder="dateFrom" />
                            <br></br>
                            <label htmlFor="dateTo">To:</label>
                            <input type="date" id="dateTo"
                                name="dateTo"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                placeholder="dateTo" /><br></br>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>

                )}
        </div>
    )
}
export default ShowFinTask;