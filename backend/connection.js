const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://roshan_3517:R8iY2zIgpJK9WoO1@cluster0.vyacl.mongodb.net/pathology-backend').then(()=>{
    console.log("mongo Db connection is successful ");
}).catch((error)=>{
    console.log("something went wrong! "+error.message);
})
