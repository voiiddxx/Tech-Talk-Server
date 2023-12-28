const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/authrouter");
const chatRouter = require("./routes/chats/chatroute");
const messageRouter = require("./routes/messages/messagerouter");
require("dotenv").config();

const PORT = 3091;

const app = express();


// mongoose connection
mongoose.connect(process.env.DATABASE).then((res)=>{
    console.log("Databse gets connected");
}).catch((e)=>{
    console.log(e);
});

// ADDING ALL THE MIDDLEWARES
app.use(express.json());
app.use(authRouter);
app.use(chatRouter);
app.use(messageRouter);



// STATRING THE SERVER
app.listen(PORT , (req , res)=>{
    console.log(`Server is running at ${PORT}`);
})