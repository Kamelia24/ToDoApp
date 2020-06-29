const express = require('express');
const router = express.Router();
const controller=require('./controller.js');

router.post('/checkUser',controller.checkUser); 
router.post('/addUser',controller.addUser); 
router.get('/addTask',controller.addTask); 
router.get('/getTasks',controller.getTasks); 
//router.get('/',controller.);
module.exports = router;