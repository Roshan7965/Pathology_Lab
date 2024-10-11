const Test = require('../Models/testModels');

exports.postTest= async (req,res)=>{
    try{
        const body = req.body;
        const isDataExist = await Test.findOne({name:body.name});
        if(isDataExist){
            res.status(202).json({
                "status":"fail",
                "message":"Data Already Exist"
            })
        }else{
            const dataEnter = await Test.create(body);
            res.status(200).json({
                message:"Added successfully",
                status:"success",
                data:dataEnter
            })
        }

    }catch(err){
        res.status(404).json({
            error:err,
            status:"fail",
            "message":"Technical Falut"
        })
    }
}

exports.getTest = async(req,res)=>{
    try{
        const testData = await Test.find({});
        if(testData){
            res.status(200).json({
                message:"Tests available",
                status:"success",
                data:testData
            })
        }else{
            res.status(202).json({
                message:"No Test available",
                status:"fail",
                data:testData
            })
        }
    }catch(err){
        res.status(404).json({
            error:err,
            status:"fail",
            "message":"Technical Falut"
        })
    }
}

exports.getTestById = async(req,res)=>{
    const {id}= req.params;
    
    try{
        const testData = await Test.findById(id);
        if(testData){
            res.status(200).json({
                message:"Tests available",
                status:"success",
                data:testData
            })
        }else{
            res.status(202).json({
                message:"No Test available",
                status:"fail",
                data:testData
            })
        }
    }catch(err){
        res.status(404).json({
            error:err,
            status:"fail",
            "message":"Technical Falut"
        })
    }
}
