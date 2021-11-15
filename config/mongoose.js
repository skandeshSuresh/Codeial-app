const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/codeial_developement');

const db=mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to MongoDB"));

db.once('open', function(){
    console.log('connected to database :: MongoDB');

});

module.exports=db;