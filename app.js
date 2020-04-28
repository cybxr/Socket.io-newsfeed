const express = require('express');
const bodyparser = require('body-parser');
const Time = 1000*60*60*2
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
app=express();

var sessionMiddleware = session({
  name:"Demo",
  resave: false,
  saveUninitialized: false,
  secret: "",
  cookie:{
      maxAge:Time,
      sameSite: true
  
 }})
global.sessionMiddleware = sessionMiddleware;

global.database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo"
});


app.use(bodyparser.urlencoded({
    extended:true
}))


app.use(sessionMiddleware);



/* Template engine*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


app.use('/images',express.static('public'));




require('./routes/index.js')(app)
require('./routes/profile.js')(app)

server = app.listen(7000);

const io= require('socket.io')(server);

/* Socket */
require('./feed/sockets.js')(io);
