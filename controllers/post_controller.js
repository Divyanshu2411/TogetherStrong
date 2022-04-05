const Post = require('../model/post');


module.exports.post= function(req, res){
    return res.render('post',{
        title:"Post"
    });
}

module.exports.create= function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id //this only works when the user is signed in
    },
    function (err, post){
        if(err){
            console.log(err);
            return;
        }

        return res.redirect('back');
    });
    console.log("Create post is called");
    console.log(req.body);
    // console.log(req.user);
    // return res.redirec t('/post');
    return;
}