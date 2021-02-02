const mongoose = require('mongoose');

const phonebookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: String,
});

module.exports = mongoose.model('Phonebooks', phonebookSchema)