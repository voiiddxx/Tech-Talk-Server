const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    memeber:{
        type:[]
    },
    
});
const ChatModel = mongoose.model("ChatModel" , chatSchema );
module.exports = ChatModel;
