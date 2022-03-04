const { verifyToken } = require("../firebase/NotyFirestoreConnection");

module.exports = {
    authMiddleware: async function (req, res, next) {
        if(req.headers["token"]) {
            const idToken = req.headers["token"]
            try {
                const user = await verifyToken(idToken);
                if(user) {
                    req.user = user
                }
            } catch (err) {}
        }
        if (!req.user) {
            res.status(401).send(JSON.stringify('Not Authorized'));
        }
        else {
            next()
        }
        
    }
}