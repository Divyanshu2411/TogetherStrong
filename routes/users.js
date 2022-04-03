const express = require('express');
const router= express.Router();
const passport = require('passport');
const userControl= require('../controllers/user_controller');

console.log('user loaded');
router.get('/profile',userControl.profile); //this become localhost:3000/users/profile
router.get('/signup',userControl.signup);
router.get('/signin',userControl.signin);

router.post('/create', userControl.create);

//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), userControl.createSession);

module.exports= router;