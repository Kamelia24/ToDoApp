import React from 'react';
import axios from 'axios';
class Task extends React.Component{
    state = {
        isLoading: true,
        Tasks: [],
        errors: null
      }
      componentDidMount(){
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
                this.setState({
                    Tasks,
                    isLoading:false
                })
                 console.log(Tasks)
            })/*.then(Tasks=>{
                
                console.log(this.state)
            }
            )*/.catch((error) => {
                console.log("errorrrr:",error)
                this.setState({error,isLoading:false})
            });
            
           
        }
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
    
    render() {
        const { Tasks ,isLoading } = this.state;
        console.log(this.state)
    return(
        <React.Fragment>
        {!isLoading ? (
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
    }
export default Task;