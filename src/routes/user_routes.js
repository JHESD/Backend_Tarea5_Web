const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');

router.post('/register', userController.createUser);
router.post('/register-admin', userController.createAdmin);
router.get('/users', userController.getUsers);
router.post('/login', userController.loginUser);

module.exports = router;
