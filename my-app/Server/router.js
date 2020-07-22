const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller.js');
const userController = require('./controllers/userController.js');
const requireLogin = require('./middleware/requireLogin');
const requireAdmin = require('./middleware/requireAdmin');
router.post('/checkUser', userController.checkUser);
router.post('/addUser', userController.addUser);
router.post('/addTask', requireLogin, controller.addTask);
router.post('/getTasks', requireLogin, controller.getTasks);
router.post('/getNumberOfTasks', requireLogin, controller.getNumOfTasks);
router.post('/removeTask', requireLogin, controller.removeTask);
router.post('/getUsers', requireLogin, requireAdmin, controller.getUsers);
router.get('/getNumberOfUsers',requireLogin,requireAdmin,controller.getNumOfUsers)
module.exports = router;