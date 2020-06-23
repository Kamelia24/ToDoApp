import React from 'react';
import Tasks from "./tasks";
import { Route,Switch,Link} from "react-router-dom";
function showTask(){
    return(
        
            <div id="taskContainer">
        <div>
            <div class="button1" ><Link to="/AddNewTask">New task</Link></div>
        
        </div>
    <h1 align="center">Your active tasks</h1>
    <table id="todo">
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Deadline</th>
            <th>Finished</th>
        </tr>
        <Tasks />
    </table>
    </div>
    )
}
export default showTask;