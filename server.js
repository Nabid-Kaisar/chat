//importing modules

const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const session = require("express-session");

// using middlewares

app.use(require("body-parser").json());

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(253402300000000) }
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatdata"
});

//Register
app.post("/postRegisterInfo", (req, res) => {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  let sql = "INSERT INTO userdata SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Could not create User" });
    }
    //console.log(result);
    res.json({ success: true, message: "New User added" });
  });
});

//Login and session start
app.post("/postLoginInfo", (req, res) => {
  let uname = req.body.username;
  let pass = req.body.password;
  let sql = `SELECT username,password,email FROM userdata WHERE username = "${uname}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    const fetchedUserName = results[0];
    //console.log(results[0]);
    if (results[0].password === pass) {
      //req.session.success = true;

      req.session.user = {
        username: fetchedUserName
      };
      //  res.send(req.session.user);
      res.send({
        success: true
      });
      // res.redirect('/');
    } else {
      res.send("wrong usrename or password");
    }

    // res.send({
    //   success:true,
    //   data : results
    // });
  });
});

//add Chat data if session active
app.post('/sendmsg', (req,res)=>{
if (req.session.user) {
  

  let uname =  req.session.user.username.username;
  let msg = req.body.chatmsg;
  let t = new Date().toLocaleTimeString();

  //let post = {  body: req.body.body, title: req.body.title};
  let sql = `INSERT INTO globalchat (id, username, chatmsg, time) VALUES (NULL, '${uname}', '${msg}', '${t}')`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Could not create post" });
    }
    //console.log(result);
    res.json({ success: true, message: "New post added" });
  });

}else{
  res.send({
    success:false
  })
}
});




//test session

app.get("/secret", (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    //res.send("You are logged IN")
    res.send({
      name: req.session.user.username
    });
  } else {
    res.send("Please login to continue");
  }
});

//Logout
app.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.send(
      "You have been logged out of your session. Please login to contiune"
    );
  });
});



app.get("/home", (req, res) => {
  //res.send("this is home page");
  res.redirect("http://localhost:3000");
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
