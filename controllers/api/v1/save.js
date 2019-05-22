const Save = require('../../../models/Messages');
const jwt = require('jsonwebtoken');


const save = async(req,res,next)=>{

    let test = req.body.message;
    let username = req.body.username;
    let token =  jwt.verify(req.body.token,"MyVerySecretWord").uid;
    let messageto = req.body.messageto;
    const save = new Save({message: test, username: token, token: token, messageto: messageto});
   await save.save().then(result=>{
       let token =jwt.sign({
           uid:result._id,
           username: "jdflkqjsdlm",
           message: "djflkmqsjlkf"
       }, "MyVerySecretWord");
        res.json({
            "status":"succes",
            "data":{
                "token": token,
                "message": "testmessage",
                "username": token,
                "messageto": to
            }
        })
    }).catch(error=>{
        res.json({
            "status":"error"
        })
    });
};
module.exports.save = save;


const getAll= (req, res) => {
    Save.find({}, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : docs
            })
        }
    });

    
  }

module.exports.getAll = getAll;

const getOne= (req, res) => {
    //let id = 'testtt';
    let id = req.params.id;
    Save.find({_id: id}, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : {
                    "id" : id,
                    "docs" : docs
                }
            })
        }
    });
}

module.exports.getOne = getOne;


const deletebyid= function (req, res) {
    let id = req.params.id;
    Save.deleteOne( { _id: id }, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : {
                    "id" :    id
                }
            })
        }
    });
}

module.exports.deletebyid = deletebyid;


const updatebyid = function (req, res) {
    let updatemessage = req.body.updatedmessage;
    var id = req.params.id;
    Save.updateOne( { _id: id }, {$set: { message: updatemessage}}, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : {
                    "id" :    id
                }
            })
        }
    });
}

module.exports.updatebyid = updatebyid;
