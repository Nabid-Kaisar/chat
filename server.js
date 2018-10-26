//importing modules

const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
var socket = require("socket.io");

const session = require("express-session");

// using middlewares

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "js", "css"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};
app.use(require("body-parser").json());
app.use(express.static("build", options));

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

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile("index.html", {
    root: "./build/"
  });
});
//Register
app.post("/postRegisterInfo", (req, res) => {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  let sql = `INSERT INTO userdata( username, email, password) VALUES ("${
    post.username
  }", "${post.email} ","${post.password}")`;
  let sqlExist = `SELECT * FROM userdata WHERE username = "${post.username}"`;

  //already existed user or not
  let checkExist = db.query(sqlExist, (err, result) => {
    if (err) {
      //any server-db error
      console.log(err);
      res.json({ success: "swr" }); //sending swr means something went wrong
    } else {
      if (result.length > 0) {
        //there is something with same username found
        console.log("Username already Exist!");
        res.json({ success: "ae", message: "Already exist" }); //sending ae means already exist username
      } else {
        let query = db.query(sql, err => {
          if (err) {
            res.json({ success: "swr", message: "Could not create User" });
          } else {
            res.json({ success: "ok", message: "New User added" }); //sending ok means new user registered
          }
        });
      }
    }
  });
});

//Login and session start
app.post("/postLoginInfo", (req, res) => {
  let uname = req.body.username;
  let pass = req.body.password;
  let sql = `SELECT username,password,email FROM userdata WHERE username = "${uname}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("below this line results");
    console.log(results);
    if (results.length > 0) {
      var fetchedUserName = results[0];
      console.log("below this line results");
      console.log(results);
      if (results[0].password === pass) {
        req.session.success = true;
        req.session.user = {
          username: fetchedUserName
        };
        //  res.send(req.session.user);
        res.send({
          success: true
        });
        // res.redirect('/');
      } else {
        res.send({
          success: false
        });
      }
    } else {
      res.json({ success: false });
    }
  });
});

//add Chat data if session active
app.post("/sendmsg", (req, res) => {
  if (req.session.user) {
    let uname = req.session.user.username.username;
    let msg = req.body.chatmsg;
    let t = new Date().toLocaleTimeString();

    //let post = {  body: req.body.body, title: req.body.title};
    let sql = `INSERT INTO globalchat (id, username, chatmsg, time) VALUES (NULL, '${uname}', '${msg}', '${t}')`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Could not create post" });
      } else {
        res.json({ success: true, message: "New post added" });
      }
      //console.log(result);
    });
  } else {
    res.send({
      success: false
    });
  }
});

//test session

app.get("/secret", (req, res, next) => {
  if (req.session.user) {
    //res.send("You are logged IN")
    res.send({
      success: true,
      name: req.session.user.username
    });
  } else {
    res.send({ success: false, name: "please login to continue" });
  }
});

//Logout
app.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.send({
      success: true
    });
  });
});

//check Login Status
app.get("/status", (req, res) => {
  //console.log(req.session.user)
  if (req.session.user) {
    res.send({
      login: true
    });
  } else {
    res.send({
      login: false
    });
  }
});

//getting recent top 50 chatmsg with timeout
app.get("/recentchat", (req, res) => {
  let sql = `SELECT * FROM globalchat ORDER BY id DESC LIMIT 10`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;

    //console.log(results);

    res.send({
      success: true,
      data: results
    });
  });
});

app.get("/home", (req, res) => {
  //res.send("this is home page");
  res.redirect("http://localhost:3000");
});

server = app.listen("5000", () => {
  console.log("Server started on port 5000");
});

//using socekts
io = socket(server);

io.on("connection", socket => {
  socket.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
