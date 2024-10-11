const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:String
    },
    fasting:{
        required:true,
        type:String
    },
    imgLink:{
        type:String,
        default: "https://cms-img.coverfox.com/doctor-hand-taking-blood-sample-tube-1114244621-1200x628-8.jpg",
    },
    normalRange:{
        required:true,
        type:String
    },
    abnormalRange:{
        required:true,
        type:String
    }
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
}
);

const repo = mongoose.model('test',Schema);
module.exports = repo;