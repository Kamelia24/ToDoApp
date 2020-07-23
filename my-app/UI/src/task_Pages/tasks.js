import React from 'react';
import axios from 'axios';
import M from 'materialize-css';
const Task = (tasks) => {
    console.log(tasks.tasks)
    function removeTask(task) {
        console.log(task)
        axios.post('http://localhost:5000/removeTask', { id: task.taskID }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                console.log(res);
                M.toast({ html: "Successfully removed task", classes: 'success' });
                window.location.reload(false);
            }).catch((err) => {
                console.log(err);
                M.toast({ html: "Error removing task", classes: 'fail' });
            })
    }
    return (
        tasks["tasks"].map((task) => <tr key={task.id + 2}>

            <td >{task.title}</td>

            <td  >{task.description}</td>

            <td  >{task.date_created}</td>
            {task.status === "coming" ? (
                <td style={{ color: 'red' }}>{task.deadline}</td>
            ) : (
                    <td  >{task.deadline}</td>
                )}

            {task.status === "finished" ? (
                <div></div>
            ) : (
                    <td  ><input type="checkbox" className="checkmark" onClick={() => removeTask(task)}></input></td>
                )}


        </tr>
        )
    )

}
export default Task;