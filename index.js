const express = require('express');
const app= express();
const port= 3000;


app.listen(port, function(err){
    if(err){
        console.log(`Erorr: ${err}`);
        return;
    }

    console.log(`Port is up and running on port : ${port}`);
})