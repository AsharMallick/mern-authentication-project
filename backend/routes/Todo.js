const express = require('express');
const router = express.Router();
const {getTodos, newTodo, deleteTodo, updateTodo} = require('../controllers/Todo')
const {isAuthenticated} = require('../middlewares/auth')
router.get('/all',isAuthenticated, getTodos);
router.post('/new', isAuthenticated, newTodo);
router.delete('/delete/:id', isAuthenticated, deleteTodo)
router.put('/update/:id', isAuthenticated, updateTodo)

module.exports = router;