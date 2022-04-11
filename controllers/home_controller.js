const Post = require('../model/post');

module.exports.home = function(req, res){

    //normal finding the user id
    // Post.find(function(err,post){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log(post);
    //     return res.render('home',{
    //         title: "Home",
    //         posts:post
    //     });
    // });

    //but we want to populate it with the user, so we will have to use the populate method that does another query to the db and populates the whole user document.

    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            title: "Home",
            posts:posts
        });
    })
        
    }