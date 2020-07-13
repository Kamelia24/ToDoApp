import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import {useHistory} from "react-router-dom";
const Task =()=>{
    const history=useHistory();
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
            M.toast({html: "I think you haven't logged in"})
            history.push("/");
            setIsLoading(false);
            console.log(isLoading);
        });
    }, [])
    function removeTask(task){
        console.log(task)
        axios.post('http://localhost:5000/removeTask',{id:task.id},{
            headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res)=>{
            console.log(res);
            M.toast({html:"Successfully removed task"});
            history.push('/ToDoList')
        }).catch((err)=>{
            console.log(err);
            M.toast({html:"Error removing task"});
        })
    }
        return (
            
            
                !isLoading ? (
                tasks.map((task)=> <tr key={task.id+2}>
                    
                    <td >{task.title}</td>
          
                    <td  >{task.description}</td>
          
                    <td  >{task.date_created}</td>
                    {task.status == "coming" ? (
                        <td  style={{ color: 'red' }}>{task.deadline}</td>
                    ):(
                        <td  >{task.deadline}</td>
                    )}
                    
          
                    <td ><input type="checkbox" className="checkmark" onClick={removeTask(task)}></input></td>
          
                </tr>)
                ) : (
            <tr key={1}> 
            
                <td >Loading...</td>
            </tr>
            )
        
        
        )
    
}
export default Task;