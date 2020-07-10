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
    addTask:async function(req,result){
        console.log("income:",req.body);
        let title=req.body.title;
        let description=req.description;
        userID=req.user[0].id;
        //let location=req.body.location;
        let deadline=req.body.deadline;
        let hasUserIs;
        try{
            res=await client.query(`SELECT * FROM public.users WHERE id='${userID}'`)
            if(res.rows[0]===undefined){
                hasUserIs=body;
                console.log(hasUserIs);
            }
        }catch(err){
            console.log("err",err)
        }  
        if(typeof hasUserIs !='string'){
            console.log("addTask")
            try{
                res=await client.query(`insert into public.tasks
                ("userID",title,description,date_created,deadline)
                values('${userID}','${title}','${description}',current_timestamp,'${deadline}')`);
                console.log("adding")
               return result.status(200).json({res:"success"})
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
            console.log({body:res.rows})
            if(res.rows===undefined){
                Tasks.title="no tasks added";
                Tasks.description="---";
                Tasks.dateCreated="---";
                Tasks.deadline="---";
                Tasks.id=1;

            }else{
                Tasks=res.rows;
            }
            tasksList=Tasks;
            console.log(tasksList)
            result.json({info:tasksList})
        }catch(err) {
            console.log ('get tasks:',err);
            result.status(204).json({err:err})
        }
    }
}