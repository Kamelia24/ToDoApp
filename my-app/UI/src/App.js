import React from 'react';
//import logo from './logoCheckBox.png';
import './App.css';
import { Route,Switch} from "react-router-dom";
import HomePage from "./homePage"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ToDoList from "./showTasks";
import addTask from "./addTask";
//import HomePage from "./index";
function Home() {
  return (
    
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/LogIn" component={SignIn} />
        <Route path="/Register" component={SignUp} />
        <Route path="/ToDoList" component={ToDoList}/>
        <Route path="/AddNewTask" component={addTask} />
        </Switch>
  );
}




export default Home;
