import React, { useState, useEffect } from 'react';
import Task from "./tasks";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import axios from 'axios';
function ShowTask() {
    const history = useHistory();
    let number;
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState([]);
    let [pagination, setPagination] = useState([<button className="active" key={1} onClick={() => movePage(1)}>{1}</button>]);
    /* const movePage = (i) => {
         axios.post('http://localhost:5000/getTasks', { num: i }, {
             headers: {
                 'Authorization': "Bearer " + localStorage.getItem("jwt")
             }
         })
             .then((res) => {
                 console.log("res", res.data)
             })
             .catch((error) => {
                 console.log("errorrrr:", error)
             });
     }*/

   
    useEffect(() => {
        axios.get('http://localhost:5000/getNumberOfTasks', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res.data.num)
                let pag = [];
                number = res.data.num;
                for (let i = 1; i <= number / 10 + 1; i++) {
                    pag.push(<button key={i} onClick={() => movePage(i)}>{i}</button>)
                }
                setPagination(pag)
            })
            .catch((error) => {
                console.log("errorrrr:", error)
            });
    }, [])

 function movePage(i) {
        if (i == undefined) { i = 1 }
        axios.post('http://localhost:5000/getTasks', { num: i }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("res", res)
                setIsLoading(false);
                setTasks(res.data["info"]);
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
                <button className="button1" ><Link to="/AddTasks">New task</Link></button>
                <button className="button1"
                    onClick={() => {
                        localStorage.clear()
                        history.push("/")
                    }}
                >Log out</button>
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
export default ShowTask;