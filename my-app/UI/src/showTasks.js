import React from 'react';
import Task from "./tasks";
import { Link} from "react-router-dom";
function showTask(){
    return(
        <div id="taskContainer">
            <div>
                
            </div>
            <h1 align="center">Your active tasks</h1>
            <table id="todo">
                <thead>
                    <tr  key={0}>
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
export default showTask;