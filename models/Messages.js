const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const Save = new Schema({
    message: String
});

module.exports = mongoose.model('Save', Save);