const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

//authentication using passport

passport.use('local', new LocalStrategy ({
        usernameField: 'userName'
        },            //callback function
        function(userName, password, done){
            console.log("reached local strategy");
            console.log(userName,password);
            //find the user and establish the identity
            User.findOne({userName: userName}, function(err, user){
                if(err){
                    console.log(err);
                    return done(err);
                }

                //done inbuilt function skeletion -> done(error, user, info)
                else if(!user || user.password!=password){
                    console.log('Invalid Username/Password');
                    return done(null,false);
                }
                else{
                    console.log("we got here")
                    return done(null,user);

                    console.log("we should not get here");
                }
            } ); 
        }
    )
);

//serailising the user : to decide which key to be kept in cookies
passport.serializeUser(function(user, done){
    console.log("passport serialiser called");
    done(null,user.id);
});

//deserialising the user from the key in the cookies
passport.deserializeUser(function(id,done){

    console.log("passport deserialiser called");

    User.findById(id,function(err, user){
        if(err) {
            console.log(err);
            return done(err);
        }

        return done(null, user);
    });
});

module.exports=passport;

//Understanding serailise deserialise
/* 

o/p of the console logs
we got here == retrun done(null,user) in passport.use
passport serialiser called
{ userName: '12', password: '12' }
sign in success
passport deserialiser called

*/

/**
 * basically, after passport.use finish it's work, it calls serialiser. It determines which data of the user object should be stored in the session.
 * after that it goes to execute the function specfied in router,here, userControl.createSession in users.js. 
 * 
 * Deserialiser helps in getting the whole object back
 */


/*
passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});

 */