const express = require("express");
const ChatModel = require("../../models/chats/chat");

const chatRouter = express.Router();


// CREATING API FOR CHAT CREATION

chatRouter.post("/create-chat" , async(req , res)=>{
    try {
        let chatModel = new ChatModel({
            memeber:[req.body.senderId , req.body.reciverId]
        });

        chatModel = await chatModel.save();
        res.json(chatModel);


    } catch (error) {
        return res.status(500).json(error);
    }
})


// API FOR GETTING THE CHAT
chatRouter.get("/get-chat/:userId" , async(req , res)=>{
    try {
        const chat = await ChatModel.find({
        memeber: {$in: [req.params.userId]}
        });
        res.json(chat);
    } catch (error) {
        return res.status(500).json(error);
    }
})



// API FOR GETTING THE CHAT OF SPECIFIC USER
chatRouter.get("/find/:firstId/:secondid" , async(req , res)=>{
    try {
        const chat = await ChatModel.findOne({
            memeber : {$all: [req.params.firstId , req.params.secondid]}
        });
        res.json(chat);
    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = chatRouter;
