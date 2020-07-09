import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
const Task =()=>{
    /*state = {
        isLoading: true,
        Tasks: [],
        errors: null
    }*/
    let [isLoading,setIsLoading]=useState(true);
    let [tasks,setTasks]=useState([]);
    useEffect(() => {
        //let Tasks;
        console.log(localStorage.getItem("jwt"))
        axios.get('http://localhost:5000/getTasks',{
            headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => {
            console.log("res",res)
            //tasks=;
            /*this.setState({
                Tasks,
                isLoading:false
            })*/
            setIsLoading(false);
            setTasks(res.data["info"]);
            console.log(tasks,isLoading)
        })
        .catch((error) => {
            console.log("errorrrr:",error)
            //this.setState({error,isLoading:false})
            M.toast({html: error})
            setIsLoading(false);
            console.log(isLoading);
        });
    }, [])
/*let Tasks=[
    {title:"cleaning",description:"clean the room",dateCreated:"17.06.20",deadline:"19.06.20",status:"active"},
    {title:"trash",description:"take out the trash",dateCreated:"18.06.20",deadline:"20.06.20",status:"active"}];
*/
/*let output=Tasks.map((Task)=> <tr>
    <td >{Task.title}</td>
    
    <td >{Task.description}</td>
    
    <td >{Task.dateCreated}</td>
    
    <td >{Task.deadline}</td>
    
    <td ><input type="checkbox" className="checkmark"></input></td>
    
    </tr>);*/
    
 
        //const { Tasks ,isLoading } = this.state;
        //console.log(this.state)
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