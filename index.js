const express = require('express');
const cookieParser = require('cookie-parser');
const app= express();
const port= 3000;
const ejsLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

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

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Erorr: ${err}`);
        return;
    }

    console.log(`Port is up and running on port : ${port}`);
})