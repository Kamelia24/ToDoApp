const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller.js');
const userController = require('./controllers/userController.js');
const requireLogin = require('./middleware/requireLogin')
router.post('/checkUser', userController.checkUser);
router.post('/addUser', userController.addUser);
router.post('/addTask', requireLogin, controller.addTask);
router.post('/getTasks', requireLogin, controller.getTasks);
router.get('/getNumberOfTasks', requireLogin, controller.getNumOfTasks);
router.post('/removeTask', requireLogin, controller.removeTask)
module.exports = router;