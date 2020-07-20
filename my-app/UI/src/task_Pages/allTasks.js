import React, { useState, useEffect } from 'react';
import Task from "./tasks";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
function ShowUserTasks() {
    const history = useHistory();
    let number;
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([]);
    let [users, setUsers] = useState([])
    let [userID, setUserID] = useState(1)
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res.data.data)
                let user = [];
                //user = res.data.num;
                for (let i = 1; i <= res.data.data.length; i++) {
                    user.push(<button key={res.data.data[i - 1].id} onClick={() => setUserID(res.data.data[i - 1].id), () => getNumOfPages(res.data.data[i - 1].id)}>{res.data.data[i - 1]["username"]}</button>)
                }
                setUsers(user)
                getNumOfPages(userID)
                //getUserTasks(userID)

            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: "I think you haven't logged in" })
                history.push("/");
            });

    }, [])
    function getNumOfPages(userID) {
        axios.post('http://localhost:5000/getNumberOfTasks', { userID }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res.data.num)
                let pag = [];
                number = res.data.num;
                for (let i = 1; i < number / 10 + 1; i++) {
                    pag.push(<button key={i} onClick={() => getUserTasks(i)}>{i}</button>)
                }

                setPagination(pag)
                getUserTasks(userID, 1)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: "I think you haven't logged in" })
                history.push("/");
            });
    }
    function getUserTasks(userID, i) {
        if (i === undefined) { i = 1 }
        axios.post('http://localhost:5000/getTasks', { num: i - 1, userID }, {
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
                M.toast({ html: "I think you haven't logged in" })
                history.push("/");
                setIsLoading(false);
                console.log(isLoading);
            });
    }
    return (
        <div id="taskContainer">
            <div>
                <button className="button1" ><Link to="/ToDoList">My tasks</Link></button>
                <button className="button1"
                    onClick={() => {
                        localStorage.clear()
                        history.push("/")
                    }}
                >Log out</button>
            </div>
            <div className="topnav">
                {users.map((users) => users)}
            </div>
            <h1 align="center">Your active tasks</h1>
            <table id="todo">
                <thead>
                    <tr key={0}>
                        <th  >Title</th>
                        <th >Description</th>
                        <th >Date Created</th>
                        <th >Deadline</th>
                        <th >Finished</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading ? (
                        <Task tasks={tasks} />
                    ) : (
                            <tr key={1}>

                                <td >Loading...</td>
                            </tr>
                        )}
                </tbody>
            </table>
            <div className="topnav">
                {pagination.map((pagination) => pagination)}
            </div>
        </div>
    )
}
export default ShowUserTasks;