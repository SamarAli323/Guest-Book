const express = require('express');
const port = process.env.PORT || 8000
const mongoose = require('mongoose');
const mongoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GuestBook'
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const user = require('./routes/user')
const message = require('./routes/message')
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user', user);
app.use('/message', message);



mongoose.connect(mongoosePort, ({ useNewUrlParser: true, useUnifiedTopology: true }))
    .then(console.log(`Database Connected succefully`))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`app is Listening on Port ${port} `);
})