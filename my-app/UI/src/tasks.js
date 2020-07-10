import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { Link} from "react-router-dom";
const Task =()=>{
    let [isLoading,setIsLoading]=useState(true);
    let [tasks,setTasks]=useState([]);
    useEffect(() => {
        console.log(localStorage.getItem("jwt"))
        axios.get('http://localhost:5000/getTasks',{
            headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => {
            console.log("res",res)
            setIsLoading(false);
            setTasks(res.data["info"]);
            console.log(tasks,isLoading)
        })
        .catch((error) => {
            console.log("errorrrr:",error)
            M.toast({html: error})
            setIsLoading(false);
            console.log(isLoading);
        });
    }, [])
        return (
            
            
                !isLoading ? (
                tasks.map((task)=> <tr key={task.id+2}>
                    <td >{task.title}</td>
          
                    <td  >{task.description}</td>
          
                    <td  >{task.dateCreated}</td>
          
                    <td  >{task.deadline}</td>
          
                    <td ><input type="checkbox" className="checkmark"></input></td>
          
                </tr>)
                ) : (
            <tr key={1}> 
            
                <td >Loading...</td>
            </tr>
            )
        
        
        )
    
}
export default Task;