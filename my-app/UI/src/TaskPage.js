import React from 'react';
//import logo from './logoCheckBox.png';
import ReactDOM from 'react-dom';
import { Route,Switch,Link} from "react-router-dom";
import ShowTask from "./showTasks";
import addTask from "./addTask";
function addTasksTable(){
    
    return(
        <Switch>
        <Route path="/ToDoList" component={ShowTask} />
        <Route path="/AddNewTask" component={addTask} />
        </Switch>
    )
    
}

export default addTasksTable;
