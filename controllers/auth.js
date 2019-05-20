//user model laden (registreren en inloggen) 
const User = require('../models/User');
// resuire de webtokens
const jwt = require('jsonwebtoken');
//ook het passport requiren
//const passport=require('../passport/passport');

//methode signup creeeren
const signup = async(req,res,next)=>{
    // username & password komt uit body UI
    let username = req.body.username;
    let password = req.body.password;

    //aanmaak van een user object
    const user = new User({username: username});
    //wachtwoord word geset (geencrypteerd)
    await user.setPassword(password);
    //saven via mongoose
   await user.save().then(result=>{
       let token =jwt.sign({
           uid:result._id,
       }, "MyVerySecretWord");
        res.json({
            "status":"succes",
            "data":{
                "token": token
            }
        })
    }).catch(error=>{
        res.json({
            "status":"error"
        })
    });
};
module.exports.signup=signup;

//methode login creeeren
const login = async(req,res,next)=>{
const user = await User.authenticate()(req.body.username,req.body.password).then (result=> {
//als er geen user is terug gekomen

    if (!result.user){
        return res.json({
            "status":"Failed",
            "message":"Failed to login"
    })
}
    let token =jwt.sign({
        uid:result.user._id,
    }, "MyVerySecretWord");
    console.log(token);
    
    res.json({
        "status":"Succes",
        "data":{
            "user":result,
            "token":token
        } 
    })
}).catch(error=>{
    res.json({
        "status":"error, failed to login"
    })
});
};


module.exports.login=login;


//methode profile update email creeeren

const update = async(req,res,next)=>{
    let token =  jwt.verify(req.body.token,"MyVerySecretWord").uid;
//komt uit frontend
let username=req.body.username;

let skill =req.body.skill

if (username==""){
    User.findOneAndUpdate({
        _id:token 
     }, {
          $push: { skills: skill }},
     ).then(result => {
     
         res.json({
             "status":"succes",
             "data":{
                 "user":result
             } 
         })
     }).catch(err=>{
         
         res.json({
             "status":"error, niet geupdate"
         })
     })
     
     }else if (skill==""){
        User.findOneAndUpdate({
            _id:token 
         }, {
             username: username,}
         ).then(result => {
         
             res.json({
                 "status":"succes",
                 "data":{
                     "user":result
                 } 
             })
         }).catch(err=>{
             
             res.json({
                 "status":"error, niet geupdate"
             })
         })
    
}else {
    User.findOneAndUpdate({
        _id:token 
     }, {
         username: username,
         $push: { skills: skill }},
    
     ).then(result => {
     
         res.json({
             "status":"succes",
             "data":{
                 "user":result
             } 
         })
     }).catch(err=>{
         
         res.json({
             "status":"error, niet geupdate"
         })
     })


}
}


module.exports.update=update;

