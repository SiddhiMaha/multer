const express = require('express');
const { registerUser, loginUser,getAllUsers,getUserById} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(getAllUsers);

router.route('/users/:id').get(getUserById);
module.exports = router;