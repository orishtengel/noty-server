const express = require("express");
const { createUser, verifyToken } = require("../firebase/NotyFirestoreConnection");
const { addUser, authenticate } = require("../user_service");

const authRoutes = express.Router()

authRoutes.post("/signup", async (req, res) => {
    try {
      const user = await addUser(req.body.email, req.body.password, req.body.name, req.body.phone);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

authRoutes.post("/createUser", async (req, res) => {
    try {
    
      const user = createUser(req.body.name,req.body.email, req.body.phone);
      if(user)
          res.status(201).json({ok:true});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

authRoutes.post("/verify", async (req, res) => {
    const { email, idToken } = req.body;
    try {
        const user = await verifyToken(idToken,email);
        if(user) {
            res.status(200).send({
                user: user,
                token: token
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRoutes.post("/signin", async (req, res) => {
    
    const { email, password } = req.body;
    console.log(email)
    try {
        const user = await authenticate(email, password);
        if(user) {
            res.status(200).send({
                user: user,
                token: token
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = authRoutes


