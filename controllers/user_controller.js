const User = require('../model/user');

module.exports.profile=function(req, res){
    console.log(req.cookies);
    if(typeof(req.cookies)==="undefined"){
        console.log("No cookies exist");
        res.redirect("back");
    }

    User.findOne({_id:req.cookies.user_id}, function(err, user){
        if(err) console.log(err);
        if(!user) {
            console.log("Please Sign In");
            res.redirect("back");
        }
        console.log(user);

        return res.render('users', {
            title:"Users",
            email: user.email,
            userName: user.userName,
            name: user.name
        });
    })
    
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
User.findOne({userName: req.body.userName}, function(err,user){
    if(err) console.log(err);

    if(!user)  { console.log("user don't exist");res.redirect('back'); } //if user doesn't exist

    if(user){
        if(user.password!=req.body.password) { console.log("password wrong");res.redirect('back'); }//if password not same

        //handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/user/profile');
    }
})
}