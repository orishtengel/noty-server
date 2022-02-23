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

app.post('/signup', async function(req, res) {
    let user = await signup(req.body.email, req.body.password)
    if(user)
        res.status(200).send({ok:true})
    else
        res.status(401).send(JSON.stringify(error));
})

const httpServer = http.createServer(app);

httpServer.listen(port, function() {
    console.log(`http/ws server listening on ${port}`);
});