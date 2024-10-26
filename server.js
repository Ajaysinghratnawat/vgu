const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const passport = require("passport");
const localstrat = require("passport-local");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const path = require("path");
const nodemailer = require("nodemailer");
const Register = require("./models/registered.js");




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOpt = {
    secret: "secret",
    resave : false,
    saveUninitialized : true,
    cookie : {
      expires: Date.now() + (7*24*60*60*100),
      maxAge: 7*24*60*60*100,
      httpOnly: true
    }
  }
  app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
  app.use(session(sessionOpt));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localstrat(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/solo');};
    main().then(()=>{
      console.log("connection successful")
  }).catch(err => console.log(err));

  

//jouosososo



app.get("/alls", async (req,res)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "ajaysinghratnawat34@gmail.com",
      pass: "cmdpwctafixrzsve",
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name : "Airathon",
      address: "ajaysinghratnawat34@gmail.com"
    }, // sender address
    to: "wantsomefriesss@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "You can do better to save the earth", // plain text body
     // html body
  });

  console.log("Message sent: %s", info.messageId);
} )




  app.get("/demouser",(req,res)=>{
    res.render("signup.ejs")
  })

  app.post("/signup",async (req,res)=>{
    
    try{
      let {username, email, password} = req.body;
    const newUser = new User({email,username});
    let fobo = await User.register(newUser, password);
    console.log(fobo);
    res.redirect("/login")
    }catch(e){
      // res.send(e);
      return res.status(500).render("signup.ejs", { error: e.message });
    }
      
   
      
  });


app.get("/login",(req,res)=>{
  res.render("login.ejs")
});

  app.post("/login",passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}),
async(req,res)=>{
  res.render("challenges.ejs")
});

app.get("/register",(req,res)=>{
  res.render("register.ejs")
});

app.post("/register",async (req,res)=>{
   res.send("Thank you for registering") ;
  
});

app.get("/", (req,res)=>{
    res.send("hello")
});






app.listen(3000, ()=>{
    console.log("port is listening")
});