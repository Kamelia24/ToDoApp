import React from 'react';
function addTask(){
 return(
     <div id="addTask">
         <h1>Add new task:</h1>
    <form >
    <label for="title">Title*:</label>
    <input type="text" id="title" name="title" placeholder="title" required/>
<br></br>
    <label for="description">Description:</label>
    <input type="text" id="description" name="description" placeholder="description" />
<br></br>
    <label for="location">Location:</label>
    <input type="text" id="location" location="location" placeholder="location" />
    <br></br>
    <label for="deadline">Deadline:</label>
    <input type="number" id="deadline" name="deadline" placeholder="deadline" />
<br></br>
    <input type="submit" value="Add task"/>
  </form>
  </div>
 )
}
export default addTask;