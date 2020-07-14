import React from 'react';
import Task from "./tasks";
import { Link, useHistory } from "react-router-dom";
function ShowTask() {
    const history = useHistory();
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
                    <Task />
                </tbody>
            </table>
        </div>
    )
}
export default ShowTask;