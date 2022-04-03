const express = require('express');
const cookieParser = require('cookie-parser');
const app= express();

const port= 3000;

const ejsLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo'); //iske documentations se dekho, version me cheeze badal gayi. https://stackoverflow.com/questions/65524022/connect-mongo-autoremoveinterval-does-not-work-correctly

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());



//layout settings, remember the plurlal stuff
app.use(ejsLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//static files
app.use(express.static('./assets'));

//mongo  store is used to store the session cookie in the db
app.use(session({
    name: 'TogetherStrong',
    //TODO change the secret before deployment in production mode
    secret:'Itisasecret',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100) //in ms
    },

    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/togetherStrong_development',
            autoRemove: 'disabled'
        },

        function(err){ //callback function
            console.log(err||"connect-mongo setup ✅ ")
        }
    )

}));
app.use(passport.initialize());
console.log("passport initalise called");
app.use(passport.session());
console.log("passport session called");

app.use(passport.setAuthenticatedUser); 


//use express routers
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Erorr: ${err}`);
        return;
    }

    console.log(`Port is up and running on port : ${port}`);
})