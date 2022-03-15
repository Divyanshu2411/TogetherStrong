const express = require('express');
const router= express.Router();

const userControl= require('../controllers/user_controller');

console.log('user loaded');
router.get('/profile',userControl.profile); //this become localhost:3000/users/profile
router.get('/signup',userControl.signup);
router.get('/signin',userControl.signin);

router.post('/create', userControl.create);
router.post('/create-session',userControl.createSession);
router.post('/signout',userControl.signout);
module.exports= router;