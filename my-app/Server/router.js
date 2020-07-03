const express = require('express');
const router = express.Router();
const controller=require('./controller.js');
const requireLogin = require('./requireLogin')
router.post('/checkUser',controller.checkUser); 
router.get('/protected',requireLogin, (req,res)=>{
    res.send("hello user")
});
router.post('/addUser',controller.addUser); 
router.get('/addTask',controller.addTask); 
router.get('/getTasks',controller.getTasks); 
//router.get('/',controller.);
module.exports = router;