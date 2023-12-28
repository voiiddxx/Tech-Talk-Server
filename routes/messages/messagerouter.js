const express = require("express");
const Message = require("../../models/chats/message");

const messageRouter = express.Router();

// CREATING API FOR SENDING THE MESSAGES

messageRouter.post("/add-message" , async(req , res)=>{
    try {
        const {chatId , senderId , text} = req.body;

        let message = new Message({
            chatId,
            senderId,
            text
        });
        message = await message.save();
        res.json(message);

    } catch (error) {
        return res.status(500).json(error);
    }
});

// CREATING API FOR GETTING THE MESSAGES

messageRouter.get("/get-message/:chatId" , async(req , res)=>{
    try {
        const {chatId} = req.params;
        const message  = await Message.find({chatId});
        res.json(message);
        
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = messageRouter;
