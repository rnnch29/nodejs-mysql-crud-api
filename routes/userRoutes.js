const express = require('express');
const router = express.Router();
const user = require('../controllers/userController')

router.get('/users', user.getAllUsers);
router.get('/users/:id', user.getUserById);

router.post('/users', user.createUser);
router.put('/users/:id', user.updateUser);

router.delete('/users/:id', user.deleteUser);

module.exports = router;