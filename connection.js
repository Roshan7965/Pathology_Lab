const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pathology-backend').then(()=>{
    console.log("mongo Db connection is successful ");
}).catch((error)=>{
    console.log("something went wrong! "+error.message);
})