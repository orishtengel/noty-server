const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const fs = require('fs')
const compression = require('compression');
const { signup } = require("./firebase/NotyFirebaseConnection");


const port = process.env.PORT || "4000";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use(compression())
app.use(express.static('public'))

const userService = require("./user_service");
const { verifyToken, getCourse, getUsers, getUser, getCourses } = require("./firebase/NotyFirestoreConnection");
const { decodeToken, createUserToken } = require("./firebase/token");

// app.use(function (req, res, next) {
//     console.log(req.rawHeaders.token)
//     if(req.cookies["notytoken"]) {
//         req.rawHeaders.token = decodeToken(req.cookies["notytoken"])
//     }
//     if(req.headers["token"]) {
//         req.rawHeaders.token = decodeToken(req.headers["token"])
//     }
//     next()
// })

// AUTH FUNCTIONS

app.post("/signup", async (req, res) => {
    try {
      const user = await userService.addUser(req.body.email, req.body.password);
      console.log(user)
      res.status(201).json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
});
app.post("/verify", async (req, res) => {
    const { email, idToken } = req.body;
    try {
        const user = await verifyToken(idToken,email);
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});
  
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.authenticate(email, password);
        if(user) {
            let token = createUserToken(req.body.email, user.name, user.admin)
            res.cookie('notytoken', token)
            res.status(200).send({
                user: user,
                token: token
            })
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

//USER FUNCTIONS 
app.post("/getUser", async (req, res) => {
    if(req.userToken) {
        let user = await getUser(req.email)
        if(user) {
            user.email = req.email
            res.status(200).send(user)
        }
        else {
            res.status(400)
        }
    }
});

app.get('/getUsers', async function (req, res) {
    if(req.userToken){
         let arr = []
         arr = await getUsers()
         if(arr) {
             res.status(200).send(arr)
         }
         else {
             res.status(400)
         }
     }
 })

 //COURSE FUNCTIONS
 app.get('/getCourses', async function (req, res) {
    // if(req.userToken){
         let arr = []
         arr = await getCourses()
         if(arr) {
             res.status(200).send({ok:true, data:arr})
         }
         else { 
             res.status(400)
         }
    //  }
 })



const httpServer = http.createServer(app);

httpServer.listen(port, function() {
    console.log(`http/ws server listening on ${port}`);
});