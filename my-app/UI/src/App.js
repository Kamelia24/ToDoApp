import React from 'react';
import './css/App.css';
import { Route, Switch } from "react-router-dom";
import HomePage from "./homePage"
import SignUp from "./user_Pages/SignUp";
import SignIn from "./user_Pages/SignIn";
import ToDoList from "./task_Pages/showTasks";
import AddTasks from "./task_Pages/addTaskForm";
import AllTasks from "./task_Pages/allTasks";
function Home() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/LogIn" component={SignIn} />
            <Route path="/Register" component={SignUp} />
            <Route path="/ToDoList" component={ToDoList} />
            <Route path="/AddTasks" component={AddTasks} />
            <Route path="/AllTasks" component={AllTasks} />
        </Switch>
    );
}




export default Home;
