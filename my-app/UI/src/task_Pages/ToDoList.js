import React, { useState, useEffect } from 'react';
import Tasks from "./Tasks";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
function ToDoList() {
    const history = useHistory();
    let number;
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([]);
    let [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        axios.post('http://localhost:5000/getNumberOfTasks', { userID: "no" }, {
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
                setIsAdmin(localStorage.getItem("role"))
                console.log(localStorage.getItem("role"))
                setPagination(pag)
                movePage(1)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: "I think you haven't logged in", classes: 'fail' })
                history.push("/");
            });
    }, [])
    function movePage(i) {
        if (i === undefined) { i = 1 }
        axios.post('http://localhost:5000/getTasks', { num: i - 1, userID: "no" }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res)
                if (res.data["info"].length == 0) {
                    setTasks([{id:1,title:"no tasks added",description: "---",date_created: "---",deadline: "---",status:""}])
                } else {
                    setTasks(res.data["info"]);
                }

                setIsLoading(false);
                console.log(tasks, isLoading)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
                M.toast({ html: "I think you haven't logged in", classes: "fail" })
                history.push("/");
                setIsLoading(false);
                console.log(isLoading);
            });
    }

    return (
        <div id="taskContainer">



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
                        <Tasks tasks={tasks} />
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
export default ToDoList;