const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const Allusers = new Schema({
    username: String
});

module.exports = mongoose.model('users', Allusers);