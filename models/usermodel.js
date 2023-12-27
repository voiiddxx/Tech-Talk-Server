const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    avatar:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
    }
});

const User = mongoose.model("User" , userSchema);

module.exports = User;
