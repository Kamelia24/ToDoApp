import React from 'react';
import './App.css';
import { Route,Switch} from "react-router-dom";
import HomePage from "./homePage"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ToDoList from "./showTasks";
import AddTasks from "./addTaskForm";
function Home() {
    return (
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/LogIn" component={SignIn} />
        <Route path="/Register" component={SignUp} />
        <Route path="/ToDoList" component={ToDoList}/>
        <Route path="/AddTasks" component={AddTasks} />
        </Switch>
    );
}




export default Home;
