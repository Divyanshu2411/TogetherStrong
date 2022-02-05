const express = require('express');
const app= express();
const port= 3000;

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Erorr: ${err}`);
        return;
    }

    console.log(`Port is up and running on port : ${port}`);
})