const express = require('express');
const router = express.Router();
const controller=require('./controller.js');
const userController=require('./userController.js');
const requireLogin = require('./requireLogin')
router.post('/checkUser',userController.checkUser); 
/*router.get('/protected',requireLogin, (req,res)=>{
    res.send("hello user")
});*/
router.post('/addUser',userController.addUser); 
router.post('/addTask',requireLogin,controller.addTask); 
router.get('/getTasks',requireLogin,controller.getTasks); 
module.exports = router;