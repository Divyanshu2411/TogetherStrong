const express = require('express');
const router= express.Router();
const passport = require('passport');

const postController= require('../controllers/post_controller');

router.get('/',postController.post);

router.post('/new-post',passport.checkAuthentication,postController.create);

module.exports= router;