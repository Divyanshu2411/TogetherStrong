const User = require('../model/user');

function set_cookie(name, value) {
    document.cookie = name +'='+ value +'; Path=/;';
  }
  function delete_cookie(name,res) {
    res.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }


module.exports.profile=function(req, res){

    /**NOTE
     * If you execute the mongoose code, and try to return else wala part outside the if else block, 
     * to since callback hai, asynchoronous hoga and won't wait for mongoose ka answer and error dikha dega. to ye dhyan rakh lena.
     */
    console.log(req.cookies);
    if(typeof(req.cookies)==="undefined" ||req.cookies.user_id==''){
        console.log("No cookies exist");
        res.redirect("back");
    }

    else{
        
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

module.exports.signout= function(req,res){
    res.cookie('user_id',"");
    res.redirect("/user/signin");
}

// myCookie.Expires = DateTime.Now.AddDays(-1d);
// Response.Cookies.Add(myCookie);