const Allusers = require('../../../models/Allusers');
const jwt = require('jsonwebtoken');

const getAllUsers= (req, res) => {
    Allusers.find({}, (err, docs) =>{
        if(!err){
            res.json({
                "status"    : "succes",
                "data"      : docs
            })
        }
    });

    
  }

module.exports.getAllUsers = getAllUsers;