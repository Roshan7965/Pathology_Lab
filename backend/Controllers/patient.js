const Patient = require('../Models/patientModels');
const Test = require('../Models/testModels');

exports.postPatient = async(req,res)=>{
    try{
        const body = req.body;
        const newUser = await Patient.create(body);
        if(newUser){
            res.status(200).json({
            data:newUser,
            "message":"Patient Added Successfully"
        })
        }else{
            res.json({
                "error":"Some Technical Issue",
                "message":"fail in Patient posting"
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

exports.getPatientById =  async(req,res)=>{
    try{
        const {id} = req.params;
        const isUser = await Patient.findById(id);
        if(isUser){
            res.status(200).json({
                data:isUser,
                "message":"Patient get Successfully"
            })
        }else{
            res.status.json({
                message:"No such Patient Exist",

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
exports.getPatientByStatus = async(req,res)=>{
    try{
        const {statusFind} = req.params;
        const isData = await Patient.find({status:statusFind});
        res.status(200).json({
            message:"fetched Success",
            data:isData
        })

    }catch(err){
        res.status(404).json({
            error:err,
            status:"fail",
            "message":"Technical Falut"
        })
    }
}

exports.updatePatient = async(req,res)=>{
    try{
        const body = req.body;
        const {id} = req.params;

        const updatedPatient = await Patient.updateOne({_id:id},body);
        if(updatedPatient){
            res.status(200).json({
                message:"updated Successfully",
                data:updatedPatient
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

exports.getpatientTestDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const isPatientData = await Patient.findById(id);
        // console.log(isPatientData)
        if(isPatientData){
            const testDetail = await Test.findById(isPatientData.test);
            res.status(200).json({
                message:"get data Successfully",
                patient:isPatientData,
                test:testDetail
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

exports.deletePatient =  async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedUser = await Patient.deleteOne({_id:id});
        if(deletedUser.deletedCount>0){
            res.status(200).json({
                message:"patient deleted Successfully",
                deletedUser:deletedUser
            })
        }else{
            res.status.json({
                "message":"patient doesnt exist"
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