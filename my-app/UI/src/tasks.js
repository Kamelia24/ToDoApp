import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Switch} from "react-router-dom";
let Tasks=[
    {title:"cleaning",description:"clean the room",dateCreated:"17.06.20",deadline:"19.06.20",status:"active"},
    {title:"trash",description:"take out the trash",dateCreated:"18.06.20",deadline:"20.06.20",status:"active"}];
let output=Tasks.map((Tasks)=> <tr>
    <td>{Tasks.title}</td>
    <td>{Tasks.description}</td>
    <td>{Tasks.dateCreated}</td>
    <td>{Tasks.deadline}</td>
    <td><input type="checkbox" class="checkmark"></input></td>
    </tr>);
function addTasks(){
     
    return(
       
        output
    )

}

export default addTasks;