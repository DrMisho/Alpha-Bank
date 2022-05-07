/*
Version: 1.2.0
(c) 2021-2022 Misho
This program has been written by: eng. Mustafa Misho
for Graduation project
*/

//----------------- Main Modules ------------------

const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');



//------------------ Middelware Modules -----------

const authESPMiddleware = require('./middleware/authESPMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const redirectIfNotAuthenticatedMiddleware = require('./middleware/redirectIfNotAuthenticatedMiddleware')
const redirectIfNotAdminMiddleware = require('./middleware/redirectIfNotAdminMiddleware')

//----------------- Controller Modules ------------

const StoreStateControllers = require('./controllers/StoreStateControllers');
const adminControllers = require('./controllers/adminControllers');
const loginController = require('./controllers/loginController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController')
const createUserController = require('./controllers/createUserController')
const monitorContoller = require('./controllers/monitorContoller')

//---------------- Models --------------------------
const ESP = require('./models/esp');

//---------------- Configuration -------------------

mongoose.connect('mongodb+srv://Alpha-Bank:LnjwowGcQ7pqTC1H@cluster0.shqua.mongodb.net/ESP_project' , (error)=> {
    console.log('connected to DataBase')
    console.log(error)
});
app.set('view engine','ejs')




//---------------- Public Middleware ---------------
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat'
}))

global.n = 0
global.loggedIn = null;
global.isAdmin = false;
global.username = null;
global.role = 4;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    
    next();
}); 



//-------------- ESP HTTP Request -------------------

app.post('/ESP', authESPMiddleware , StoreStateControllers );


//-------------- Public HTTP Requests ---------------

app.get('/', redirectIfAuthenticatedMiddleware, loginController )


//-------------- Users Requests ---------------------

app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController )
app.get('/logout', redirectIfNotAuthenticatedMiddleware, logoutController )
app.get('/monitor', redirectIfNotAuthenticatedMiddleware ,monitorContoller )


//-------------- Admin ------------------------------
app.get('/create', redirectIfNotAdminMiddleware, adminControllers)
app.post('/create', redirectIfNotAdminMiddleware, createUserController )

app.get('/getSensor',function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    getSensor(res)
  })

async function getSensor (res) {
  var gov = []
  var loc = []
  var danger = []
  var error, esp = await ESP.find({})
  if(error)
  {
    console.log(error);
  }
  esp.forEach((e)=>{
    gov.push(e.Governorate);
    loc.push(e.LOC);
    danger.push(e.Status);
  })

  res.write(`data: ${JSON.stringify({gov : gov ,loc: loc, danger: danger})} \n\n`)

  setTimeout(() => getSensor(res), 500)
  
}
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app is listening to port ${port}`);
})