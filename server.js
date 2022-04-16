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
const make = require('./middleware/make')

//----------------- Controller Modules ------------

const StoreStateControllers = require('./controllers/StoreStateControllers');
const adminControllers = require('./controllers/adminControllers');
const loginController = require('./controllers/loginController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController')
const createUserController = require('./controllers/createUserController')
const monitorContoller = require('./controllers/monitorContoller')


//---------------- Configuration -------------------

mongoose.connect('mongodb+srv://Alpha-Bank:LnjwowGcQ7pqTC1H@cluster0.shqua.mongodb.net/ESP_project' , (error)=> {
    console.log('connected to DataBase')
    console.log(error)
});
app.set('view engine','ejs')


//---------------- Public Middleware ---------------
app.use(bodyparser.urlencoded({extended:true}));
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
global.LOCDanger = [];
global.isDanger = [];
global.GOVDanger = [];
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    
    next();
}); 
app.use(make);


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

function getSensor(res) {
  res.write(`data: ${JSON.stringify({gov : global.GOVDanger ,loc: global.LOCDanger, danger: global.isDanger})} \n\n`)
  setTimeout(() => getSensor(res), 1000)
    
}

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app is listening to port ${port}`);
})