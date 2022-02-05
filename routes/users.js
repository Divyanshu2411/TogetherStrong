const express = require('express');
const router= express.Router();

const userControl= require('../controllers/user_controller');

console.log('user loaded');
router.get('/profile',userControl.profile); //this become localhost:3000/users/profile

module.exports= router;