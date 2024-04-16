const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    form:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,

    },
    msg:{
        type:String,
        maxLenth:50,
    },
    created_at:{
        type:Date,
        required:true,
    },
});


const chat = mongoose.model("chat",chatSchema);

module.exports = chat;