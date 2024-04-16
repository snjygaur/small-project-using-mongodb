const mongoose = require("mongoose");
const chat = require("./models/chat.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main().then(()=>{
    console.log("server is stablish succesfully")
})
.catch((err)=>{
    console.log(err);
});

let allinsertMany=( [
    {form:"akilesh",to:"harsh",msg:" u go college",created_at:new Date()},
    {form:"harsh",to:"akilesh",msg:" no",created_at:new Date()},
    {form:"akilesh",to:"harsh",msg:"attendance ka",created_at:new Date()},
    {form:"harsh",to:"akilesh",msg:"i know",created_at:new Date()},
]);

 chat.insertMany(allinsertMany);
