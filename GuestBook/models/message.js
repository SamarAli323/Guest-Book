const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required: [true, 'user is required'] },
    message: {type:String},
    reply:[{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required: [true, 'user is required'] },
        message: {type:String}
    }]
})

const messageModel = mongoose.model('message',messageSchema);
module.exports = messageModel;