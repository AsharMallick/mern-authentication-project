const express = require('express');
const { login, register, logout, getMyDetails } = require("../controllers/Auth");
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();


router.post('/login', login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", isAuthenticated, getMyDetails);

module.exports = router