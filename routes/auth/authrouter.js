const express = require("express");
const User = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();


// CREATING API FOR REGISTERING THE USER


authRouter.post("/register" , async(req , res)=>{
    try {
        const {username , email , password} = req.body;

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json("User Already Exist with this email");
        }
        
        const existUsername = await User.findOne({username});
        if(existUsername){
            return res.status(400).json("Username not available");
        }
        
        const hashPassword = await bcrypt.hash(password , 10);

        let user = new User({
            username,
            email,
            password:hashPassword
        });

        user = await user.save();
        res.json(user);

    } catch (error) {
        return res.status(500).json(error);
    }
});


// CREATING API FOR LOGIN THE USER

authRouter.post("/login" , async (req , res)=>{
    try {
        const {username , password} = req.body;

        const existUser = await User.findOne({username});
        if(!existUser){
            return res.status(404).json("Invalid username");
        }
        else{
            const isMatch = await bcrypt.compare(password , existUser.password);
            if(!isMatch){
                return res.status(401).json("Invalid Password");
            }
            else{
                const token =  jwt.sign({id:existUser._id} , "Securekey");
                res.json({...existUser._doc , token});
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = authRouter;
