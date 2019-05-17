//user model laden (registreren en inloggen) 
const Save = require('../../../models/Messages');
// resuire de webtokens
const jwt = require('jsonwebtoken');
//ook het passport requiren
//const passport=require('../passport/passport');

//methode signup creeeren
const save = async(req,res,next)=>{
    // username & password komt uit body UI
    //let test = document.getElementById('input').value;
    //let test = "fdkmjsqflksjd";
    //let username = req.body.username;
    let test = req.body.message;

    //aanmaak van een user object
    const save = new Save({message: test});
    //wachtwoord word geset (geencrypteerd)
    //await user.setPassword(password);
    //saven via mongoose
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
                "message": "testmessage"
            }
        })
    }).catch(error=>{
        res.json({
            "status":"error"
        })
    });
};
module.exports.save=save;