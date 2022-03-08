const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const compression = require('compression');


const port = process.env.PORT || "4000";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use(compression())
app.use(express.static('public'))

const userRoutes = require("./users/users.routes");
const applicationRoutes = require("./applications/applications.routes");
const authRoutes = require("./auth/auth.routes");
const { start } = require("./workers/notification.worker");

app.use('/users', userRoutes)
app.use('/apps', applicationRoutes)
app.use('/auth', authRoutes)

const httpServer = http.createServer(app);


start()


httpServer.listen(port, function() {
    console.log(`http/ws server listening on ${port}`);
});

