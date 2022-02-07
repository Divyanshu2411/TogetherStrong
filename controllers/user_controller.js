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