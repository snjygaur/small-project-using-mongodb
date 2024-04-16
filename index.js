const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine","ejs");           
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main().then(()=>{
    console.log("server is stablish succesfully")
})
.catch((err)=>{
    console.log(err);
});


app.listen(port,()=>{
    console.log("shiva is listning");
});


// index route

app.get("/users",async(req,res)=>{
    let  chats =  await chat.find();
     res.render("index.ejs",{chats});
})

// new chat route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

// adding new chat then route
app.post("/users",(req,res)=>{
    let {form,msg,to} = req.body;
    let  chats =  chat.find();
    newchat = new chat({
        form:form,
        msg:msg,
        to:to,
        created_at: new Date(),
    });
    newchat.save().then(()=>{
        console.log("file is saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/users");
   
})

// Edit route

app.get("/users/:id/edit", async(req,res)=>{
    let {id} = req.params;
 let  chats = await chat.findById(id);
 res.render("edit.ejs",{chats});
});

//  after edit messasge 

app.put("/users/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg:updatedmsg} = req.body;
    newchat = await chat.findByIdAndUpdate(id,{msg:updatedmsg},{runValidators:true,new:true});
    res.redirect("/users");
})

// destroy route
app.delete("/users/:id/DELETE",async(req,res)=>{
    let {id} = req.params;
   let chatTobedeleted = await chat.findByIdAndDelete(id);
    res.redirect("/users");

    
})