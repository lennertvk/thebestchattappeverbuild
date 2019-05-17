const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.set('useFindAndModify', false);

const User = new Schema({});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);