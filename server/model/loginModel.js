const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

    email:{
        type:String,
        required : [true,"Email is required"],
        unique:true,
        trim:true
    },

    password:{
        type:String,
        required : [true,"Password is required"]
    },

    loginType:{
        type:String,
        required : [true,"Type is required to check who is going to access"]
    }

});

const loginModel = mongoose.model("login",loginSchema);

module.exports = loginModel;