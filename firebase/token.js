var jwt = require('jsonwebtoken');

const key = 'sdfdfbhdftrevfg'

module.exports = {
    createUserToken: (email) => {
        return jwt.sign({
            email: email,
        },
        key)
    },
    decodeToken: (token) => {
       return jwt.verify(token, key);
    }
}

