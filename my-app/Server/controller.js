require('dotenv').config();
const { Client} = require('pg');
console.log(process.env.DB_HOST);
client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
    port:process.env.DB_PORT
});
client.connect();
module.exports={
    addTask:async function(){
        console.log("income:",req.body);
        let title=req.body.title;
        let description=req.description;
        //let location=req.body.location;
        let deadline=req.body.deadline;
        let hasUserIs;
        try{
            res=await client.query(`SELECT * FROM public.users WHERE username='${username}'`)
            if(res.rows[0]===undefined){
                hasUserIs=body;
            }
        }catch(err){
            
        }  
        if(typeof hasUserIs !='string'){
            
            try{
                res=await client.query(`insert into public.tasks
                (userID,title,description,date_created,deadline)
                values('${userID}','${title}','${description}','curren_timestamp','${deadline}')`);
            }catch(err) {
                console.log ('insert user info:',err);
            }
        }
    },
    getTasks:async function(req,result){
       console.log(req.user[0].id)
       userID=req.user[0].id;
       let Tasks={};
       let tasksList=[];
        try{
            res=await client.query(`select * from public.tasks
            where "userID"='${userID}'
            order by deadline asc`);
            console.log({body:res.rows.body})
            if(res.rows.body===undefined){
                Tasks.title="no tasks added";
                Tasks.description="---";
                Tasks.dateCreated="---";
                Tasks.deadline="---";

            }else{
                Tasks=res.rows.body;
            }
            tasksList.push(Tasks);
            console.log(tasksList)
            result.json({info:tasksList})
        }catch(err) {
            console.log ('get tasks:',err);
        }

        /*result.json({info: [
            {title:"cleaning",description:"clean the room",dateCreated:"17.06.20",deadline:"19.06.20",status:"active"},
            {title:"trash",description:"take out the trash",dateCreated:"18.06.20",deadline:"20.06.20",status:"active"}]})*/
    }
}