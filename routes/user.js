const express = require('express')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const registerValidation = require('../validation/register')
const loginValidation = require('../validation/login')
const router = express.Router();


router.post('/register', async (req, res) => {
    const { errors, isValid } = registerValidation(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }
    const user = await userModel.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json("Email already exists");
    }
    const hashedpassword = await bycrypt.hash(req.body.password, 5);
    const registerUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedpassword
    })
    try {
        const postResult = await registerUser.save();
        return res.json(postResult);
    } catch (err) {
        res.json(err);
    }
})


router.post('/login', async (req, res) => {

    const { errors, isValid } = loginValidation(req.body);
    if (!isValid) {
        res.status(400).json(errors)
    }

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        res.status(400).json("Invalid Email or password")
    }
    const matchedUser = await bycrypt.compare(req.body.password, user.password)
    if (matchedUser) {
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };
        jwt.sign(payload, "Hey There How Are You?",
            {
                expiresIn: 300
            },
            (err, token) => {
                console.log(err);
                console.log(token)
                res.cookie('token', token, { maxAge: 300 })
                res.json("done")
            })
    } else {
        res.status(400).json("Invalid Email or Password")
    }
})

module.exports = router