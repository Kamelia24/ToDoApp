import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const addTask =()=>{
    const history=useHistory();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [location,setLocation]=useState("");
    const [deadline,setDeadline]=useState("");
    const Post=(e)=>{
        e.preventDefault();
        const userObject = {
            title,
            description,
            location,
            deadline
        };
        axios.post('http://localhost:5000/addTask', userObject)
            .then((res) => {
                console.log("in Axios",userObject,res)
                history.push('/ToDoList')
            }).catch((error) => {
                console.log(error)
            });
    }
 return(
     <div id="addTask">
         <h1>Add new task:</h1>
    <form  onSubmit={(e)=>Post(e)}>
    <label for="title">Title*:</label>
    <input type="text" id="title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    name="title"
    placeholder="title" required/>
<br></br>
    <label for="description">Description:</label>
    <input type="text" id="description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    name="description" 
    placeholder="description" />
<br></br>
    <label for="location">Location:</label>
    <input type="text" id="location"
    value={location}
    onChange={(e)=>setLocation(e.target.value)}
    name="location"
    placeholder="location" />
    <br></br>
    <label for="deadline">Deadline:</label>
    <input type="number" id="deadline"
    value={deadline}
    onChange={(e)=>setDeadline(e.target.value)}
    name="deadline"
    placeholder="deadline" />
<br></br>
    <input type="submit" value="Add task"/>
  </form>
  </div>
 );
}
export default addTask;