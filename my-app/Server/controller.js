require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
    checkUser:async function(req,result){
        console.log("income:",req.body);
        let outp={};
        let userPassword;
        let password=req.body.password;
        let isCorrect;
        try{
            res=await client.query(`SELECT password FROM public.users WHERE username='${req.body.username}'`)
            userPassword=res.rows[0];
            console.log("result:",userPassword,password);
        }catch (err) {
              console.log (err)
        }
        try{
            res=await bcrypt.compare(password, userPassword.password)
            isCorrect=res;
            console.log(res)
        }catch(err){
            console.log('in bcrypt:',err)
        }
        if(userPassword!=undefined && isCorrect){
            result.send('correct')
        }else{outp="Incorect username or password,please try again!";
        result.send(outp);
        }
    },
    addUser:async function(req,res){
        console.log("income:",req.body);
        //console.log("result:",result)
        //res.json({"send data":req.body})
        let username=req.body.username;
        let body=req.body;
        let hasUserIs;
        try{
            res=await client.query(`SELECT * FROM public.users WHERE username='${username}'`)
            if(res.rows[0]===undefined){
                hasUserIs=body;
                console.log("no users here")
            }
        }catch(err){
            result.send('User already exists')
        }  
        if(typeof hasUserIs !='string'){
            console.log("getting ready for import")
            //let username=body.username;
            let password=body.password;
            let age=body.age;
            let name=body.name;
            let hashedPassword;
            console.log(username,password,age,name)
            if(age<10 || age >90){result.send("Age is not valid!");}
            try{
                res=await bcrypt.hash(password, saltRounds)
                hashedPassword = res;
                console.log("hashing the pass")
            }catch(err){
                console.log('hash pass:',err)
            }
            try{
                res=await client.query(`insert into public.users
                (name,username,password,age)
                values('${name}','${username}','${hashedPassword}',${age})`);
            console.log("inserting the data")
            }catch(err) {
                console.log ('insert user info:',err);
            }
        }
        
    },
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
    getTasks:async function(req,res){
        console.log(req)
        /*try{
            res=await client.query(`select * from public.tasks
            where userID='${userID}'`);
            res.send(res.rows)
        }catch(err) {
            console.log ('insert user info:',err);
        }*/
        res.json({info: [
            {title:"cleaning",description:"clean the room",dateCreated:"17.06.20",deadline:"19.06.20",status:"active"},
            {title:"trash",description:"take out the trash",dateCreated:"18.06.20",deadline:"20.06.20",status:"active"}]})
    }
}