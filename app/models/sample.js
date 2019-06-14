const mongoose = require('mongoose');

const sampleSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now}
});

module.exports = function () {
    return mongoose.model('Sample', sampleSchema);
};
