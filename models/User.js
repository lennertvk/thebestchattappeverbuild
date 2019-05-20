const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.set('useFindAndModify', false);

const User = new Schema({
    id: {type: Number},
    username : {type: String},
    skills: {type: Array} 
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);