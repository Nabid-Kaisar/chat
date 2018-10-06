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

app.get('/home', (req, res) =>{
  //res.send("this is home page");
  res.redirect('http://localhost:3000');
})

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
