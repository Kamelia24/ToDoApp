import React from 'react';
import './css/App.css';
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage"
import SignUp from "./user_Pages/SignUp";
import SignIn from "./user_Pages/SignIn";
import ToDoList from "./task_Pages/ToDoList";
import AddTasks from "./task_Pages/AddTasks";
import ShowUsers from "./task_Pages/ShowUsers";
import FinishedTasks from "./task_Pages/FinishedTasks";
function Home() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ToDoList" component={ToDoList} />
            <Route path="/AddTasks" component={AddTasks} />
            <Route path="/ShowUsers" component={ShowUsers} />
            <Route path="/FinishedTasks" component={FinishedTasks} />
        </Switch>
    );
}
export default Home;
