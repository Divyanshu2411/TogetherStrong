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
if(req.body.password!=req.body.confPass){
    return res.redirect('back');
}
}

//get the signin data
module.exports.createSession= function(req,res){

}