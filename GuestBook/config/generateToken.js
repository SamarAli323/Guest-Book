const jwt = require('jsonwebtoken')
const generateToken = (res, payload) => {
    jwt.sign(payload, "Hey There How Are You?",
        {
            expiresIn: 259200
        },
        (err, token) => {
            console.log(err);
            //console.log(res.cookie('token', token, { expires: new Date(Date.now() + 10800) }))
            res.cookie('token', token, { maxAge: 259200 * 1000 })
            res.json("done")
        })
}
module.exports = generateToken;