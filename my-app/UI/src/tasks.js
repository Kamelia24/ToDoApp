import React, { useState,useEffect } from 'react';
import axios from 'axios';
const Task =()=>{
    /*state = {
        isLoading: true,
        Tasks: [],
        errors: null
    }*/
    let [isLoading,setIsLoading]=useState("false");
    let [Tasks,setTasks]=useState("");
    useEffect(() => {
        let Tasks;
        console.log(localStorage.getItem("jwt"))
        axios.get('http://localhost:5000/getTasks',{
            headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => {
            console.log("res",res)
            Tasks=res.data["info"];
            /*this.setState({
                Tasks,
                isLoading:false
            })*/
            setIsLoading("false");
            setTasks(Tasks);
            console.log(Tasks,isLoading)
        })
        .catch((error) => {
            console.log("errorrrr:",error)
            //this.setState({error,isLoading:false})
            setIsLoading("false");
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
            
            <React.Fragment>
                {true ? (
                Tasks.map((Task)=> <tr>
                    <td >{Task.title}</td>
          
                    <td >{Task.description}</td>
          
                    <td >{Task.dateCreated}</td>
          
                    <td >{Task.deadline}</td>
          
                    <td ><input type="checkbox" className="checkmark"></input></td>
          
                </tr>)
                ) : (
            <tr>
                <td>Loading...</td>
            </tr>
            )}
        
        </React.Fragment>
        )
    
}
export default Task;