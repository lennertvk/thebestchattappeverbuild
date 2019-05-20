const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const Save = new Schema({
    message: String,
    username: String,
    token : String
});

module.exports = mongoose.model('messages', Save);