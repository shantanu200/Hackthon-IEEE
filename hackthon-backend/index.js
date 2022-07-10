import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const url = `mongodb+srv://shantanu200:jayabhusari@mongodbcluster.f3t5i.mongodb.net/hackthon?retryWrites=true&w=majority`;

mongoose.connect(url,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => {
    console.log(`DB Connected`);
});

const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    education:String,
    city:String,
    age:String,
    hobbies:String,
    des:String,
    profession:String
},{timeStamps:true});

const User = new mongoose.model("User",UserSchema);

const PORT = 8080;

app.post("/login",function(req,res){
    if(!req.body) res.send(400);

    const {email,password} = req.body;

    User.findOne({email:email},function(err,user){
       if(user){
        res.json({
            msg: "User found succesfully",
            user: user
        });
       }else{
        res.json("Error Ocurred");
       }
    })
})

app.post("/register",function(req,res){
    if(!req.body) res.send(400);
    
    const {firstname,lastname,email,password,education,city,age,hobbies,des,profession} = req.body;

    const user = new User({
        firstname,
        lastname,
        email,
        password,
        education,
        city,
        age,
        hobbies,
        des,
        profession
    });
    
    user.save().then((user)=>{
        res.json("Data is added to Database");
    }).catch(() => {
        res.json("Error Ocured");
    });
});

const contactSchema = mongoose.Schema({
    name:String,
    email:String,
    message:String
},{timeStamps:true});

const Contact = new mongoose.model("Contact",contactSchema);

app.post("/contact",function(req,res){
    if(!req.body) res.send(400);

    const {name,email,message} = req.body;
   
    const contact = new Contact({
        name,
        email,
        message
    });

    contact.save().then((contact)=>{
        res.json("Your Query is posted");
    }).catch((err)=> {
        res.json("Error Ocuured");
    });
});

app.get("/record",function(req,res){
    User.find({},(err,users)=>{
        if(err){
            res.json(err);
        }else{
            res.json(users);
        }
    })
});

app.get("/sendChat/:id",function(req,res){
    let id = req.params.id;

    User.findOne({id:id},function(err,user){
        if(err){
            res.json(err);
        }else{
            res.json(user);
        }
    })
});

const ChatSchema = mongoose.Schema({
    message:String
},{timeStamps:true});



app.post("/chatSave",function(req,res){

})

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
})

