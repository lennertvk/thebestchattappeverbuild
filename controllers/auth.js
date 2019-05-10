//user model laden (registreren en inloggen) 
const User = require('../models/User');
// resuire de webtokens
const jwt = require('jsonwebtokens');
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
           username:result.username
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
const user = await User.authenticate()(req.body.username,req.body.password).then (result => {
    res.json({
        "status":"succes ingelogd",
        "data":{
            "user":result,
            "message":result
        } 

    })
}).catch(error=>{
    res.json({
        "status":"error, inloggen lukt niet"
    })
});
};


module.exports.login=login;
