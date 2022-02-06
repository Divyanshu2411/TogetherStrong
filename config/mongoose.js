const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/togetherStrong_development');

const db= mongoose.connection;

db.on('error', console.error.bind(console,'Error in Connecting' ));

db.once('open', function(){
    console.log('Databse ::MongoDb is connected');
})

module.exports= db;