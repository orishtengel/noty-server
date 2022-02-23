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
const { verifyToken } = require("./firebase/NotyFirestoreConnection");

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
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

const httpServer = http.createServer(app);

httpServer.listen(port, function() {
    console.log(`http/ws server listening on ${port}`);
});