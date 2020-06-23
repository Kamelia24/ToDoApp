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
    checkUser:async function(){

    },
    addUser:async function(req,result){
        console.log("income:",req.body);
        let username=req.body.username;
        let body=req.body;
        let hasUserIs;
        try{
            res=await client.query(`SELECT * FROM public.users WHERE username='${username}'`)
            if(res.rows[0]===undefined){
                hasUserIs=body;
            }
        }catch(err){
            result.send('User already exists')
        }  
        if(typeof hasUserIs !='string'){
            let username=body.username;
            let password=body.password;
            let age=body.age;
            let name=body.name;
            let hashedPassword;
            console.log(username,password,age,name)
            if(age<10 || age >90){result.send("Age is not valid!");}
            try{
                res=await bcrypt.hash(password, saltRounds)
                hashedPassword = res;
            }catch(err){
                console.log('hash pass:',err)
            }
            try{
                res=await client.query(`insert into public.users
                (name,username,password,age)
                values('${name}','${username}','${hashedPassword}',${age})`);
            }catch(err) {
                console.log ('insert user info:',err);
            }
        }
    },
    addTask:async function(){

    },
    getTasks:async function(){

    }
}