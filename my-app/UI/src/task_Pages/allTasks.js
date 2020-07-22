import React, { useState, useEffect } from 'react';
import Task from "./tasks";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
function ShowUserTasks(id) {
    let userID = id.userID;
    const history = useHistory();
    let number;
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([]);
    useEffect(() => {
        console.log(userID);
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
    }, [])
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
            <h1 align="center">Active tasks</h1>
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