const express = require('express');
const port = process.env.PORT || 8000
const mongoose = require('mongoose');
const mongoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GuestBook'
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const user = require('./routes/user')
const message = require('./routes/message')
const key = process.env.KEY || "How are you guys?"
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user', user);
app.use((req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json("you're not logged in please login first")
    }
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
      return res.status(400).end()
    }
    var payload
    try {
        payload = jwt.verify(token, key)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    next()
})
app.use('/message', message);



mongoose.connect(mongoosePort, ({ useNewUrlParser: true, useUnifiedTopology: true }))
    .then(console.log(`Database Connected succefully`))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`app is Listening on Port ${port} `);
})