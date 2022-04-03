const User = require('../model/user');

module.exports.profile=function(req, res){
    return res.render('users', {
        title:"Users"
    });
}

module.exports.signup=function(req,res){
    return res.render('signup',{
        title:'SIGN UP'
    });
}

module.exports.signin=function(req,res){
    return res.render('signin',{
        title:'SIGN IN'
    });
}


//get the signup data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confPass){  return res.redirect('back');    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log("error signing up user 1"); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("error siginup user 2"); console.log(err); return;}
                return res.redirect('/user/signin');
            })
        }

        if(user){ return res.redirect('back');  }
    });

}

//get the signin data
module.exports.createSession= function(req,res){
    console.log(req.body);
    console.log('sign in success');

    return res.redirect('/');
}