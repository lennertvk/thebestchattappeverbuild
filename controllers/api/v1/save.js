const Save = require('../../../models/Messages');
const jwt = require('jsonwebtoken');


const save = async(req,res,next)=>{

    let test = req.body.message;
    let username = req.body.username;
    let token =  jwt.verify(req.body.token,"MyVerySecretWord").uid;

    const save = new Save({message: test, username: token, token: token});

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
                "username": token
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