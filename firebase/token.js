var jwt = require('jsonwebtoken');

const key = 'sdfdfbhdftrevfg'

module.exports = {
    createUserToken: (email) => {
        console.log(email)
        return jwt.sign({
            email: email,
        },
        key)
    },
    decodeToken: (token) => {
       return jwt.verify(token, key);
    }
}

