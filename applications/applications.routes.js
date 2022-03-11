const express = require("express");
const { authMiddleware } = require("../auth/auth");
const { getApplications, addSubscribe, getSubscriptions, getSubscriptionsById, deleteSubscribe, getSubscriptionsByIdAndEmail } = require("../firebase/NotyFirestoreConnection");


const applicationRoutes = express.Router()

applicationRoutes.use(authMiddleware)

applicationRoutes.get('/getApplications', async function (req, res) {
    let arr = []
    arr = await getApplications()
    // console.log(arr)
    if(arr) {
        res.status(200).send({ok:true, data:arr})
    }
    else { 
        res.status(500)
    }
 })

 applicationRoutes.post("/getSubscribeById", async (req, res) => {
    try {
        const { id } = req.body
        let resp = await getSubscriptionsByIdAndEmail(id, req.user.email)
        if(resp) {
            res.status(200).send({ok: true, data: resp})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

 applicationRoutes.post("/addSubscribe", async (req, res) => {
    try {
        let resp = await addSubscribe({ ...req.body, email: req.user.email })
        if(resp) {
            res.status(200).send({ok: true})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

applicationRoutes.post("/deleteSubscribe", async (req, res) => {
    try {
        const { idWebsite, idSubscribe } = req.body
        let resp = await deleteSubscribe(idWebsite, idSubscribe)
        if(resp) {
            res.status(200).send({ok: true})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = applicationRoutes


