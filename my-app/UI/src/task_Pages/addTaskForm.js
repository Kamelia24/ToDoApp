import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
const AddTask = () => {
    const history = useHistory();
    const [location, setLocation] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const Taskadd = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            location,
            deadline
        };
        axios.post('http://localhost:5000/addTask', taskData, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log("in Axios", taskData, res)
                history.push('/ToDoList')
            }).catch((error) => {
                console.log(error)
                M.toast({ html: "I think you haven't logged in" })
                history.push("/");
            });
    }
    return (
        <div id="addNewTask">
            <h1>Add task:</h1>
            <form onSubmit={(e) => Taskadd(e)}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title" />
                <br></br>

                <label htmlFor="description">Description:</label>
                <input type="text" id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description" />
                <br></br>

                <label htmlFor="location">Location:</label>
                <input type="text" id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location" />
                <br></br>

                <label htmlFor="deadline">Deadline:</label>
                <input type="date" id="deadline"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Deadline" />
                <br></br>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
export default AddTask;