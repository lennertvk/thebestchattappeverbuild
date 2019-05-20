const Allusers = require('../../../models/Allusers');
const jwt = require('jsonwebtoken');

let emailvantoken =  jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1Y2UzMTI1NGQxYWI2NjNhMDAzYmM0YWEiLCJpYXQiOjE1NTgzODUyMzd9.Y1UXV2WWT6zZW1pJQJwKuSuPvxlkLll5YpE38XmoZQE","MyVerySecretWord").uid;


const getAllUsers= (req, res) => {
    Allusers.find({}, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : docs,
                "emailadres": emailvantoken
            })
        }
    });

    
  }

module.exports.getAllUsers = getAllUsers;