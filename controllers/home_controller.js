const Post = require('../model/post');

module.exports.home = function(req, res){
    Post.find(function(err,post){
        if(err){
            console.log(err);
        }
        console.log(post);
        return res.render('home',{
            title: "Home",
            posts:post
        });
    });
        
    }