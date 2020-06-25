import React from 'react';
import axios from 'axios';
//import ReactDOM from 'react-dom';
//import { Route,Switch} from "react-router-dom";

async function addTasks(){
    let Tasks;
    try{
let res =await axios.get('http://localhost:4000/getTasks')
            /*.then((res) => {
                console.log("res",res)
                
                
            }).catch((error) => {
                console.log("errorrrr:",error)
            });*/
            Tasks=res.data["info"];
            console.log(Tasks)
/*let Tasks=[
    {title:"cleaning",description:"clean the room",dateCreated:"17.06.20",deadline:"19.06.20",status:"active"},
    {title:"trash",description:"take out the trash",dateCreated:"18.06.20",deadline:"20.06.20",status:"active"}];
*/
let output=Tasks.map((Task)=> <tr>
    <td >{Task.title}</td>
    
    <td >{Task.description}</td>
    
    <td >{Task.dateCreated}</td>
    
    <td >{Task.deadline}</td>
    
    <td ><input type="checkbox" className="checkmark"></input></td>
    
    </tr>); 
    return(
       
        output
    )
    }catch(err){
        console.log("Error!")
    }

}

export default addTasks;