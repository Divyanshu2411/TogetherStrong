const User = require('../model/user');

module.exports.profile=function(req, res){
    return res.render('users', {
        title:"Users"
    });
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    };
    
    return res.render('signup',{
        title:'SIGN UP'
    });
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    
    
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

    return res.redirect('/user/profile');
}

module.exports.destroySession =function(req,res){
    req.logout();
    return res.redirect('/');
}

/*
An instance of a model is called a document. Creating them and saving to the database is easy.

const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

});
*/