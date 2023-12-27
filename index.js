const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/authrouter");
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



// STATRING THE SERVER
app.listen(PORT , (req , res)=>{
    console.log(`Server is running at ${PORT}`);
})