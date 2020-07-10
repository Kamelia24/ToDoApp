const jwt = require('jsonwebtoken');
const{JWT_SECRET} = require('./keys')
const { Client} = require('pg');
client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
    port:process.env.DB_PORT
});
client.connect();
module.exports=(req,res,next)=>{
    const {authorization} =req.headers;
    console.log("auth")
    if(!authorization){
       return res.json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
          return  res.json({error:"you must be logged in auth"})
        }
        const {id}=payload
     console.log("auth finish")
            client.query(`Select * from public.users where id='${id}'`)
            .then(userData=>{
            req.user=userData.rows;
            //res.send("success")
            console.log(req.user);
            next()
        })  
    })
}