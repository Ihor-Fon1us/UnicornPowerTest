const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    id: {
        type: String, required: true,
    },
    token: {
        type: String, required: true,
    },  
  }, { timestamps: true });
  

module.exports = mongoose.model('Token', TokenSchema);