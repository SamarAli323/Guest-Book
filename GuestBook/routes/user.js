const express = require('express')
const bycrypt = require('bcryptjs')
const userModel = require('../models/user')
const registerValidation = require('../validation/register')
const loginValidation = require('../validation/login')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post('/register', async (req, res) => {
    console.log(req.body)
    const { errors, isValid } = registerValidation(req.body);
    if (!isValid) {
        return res.json({error : errors});
    }
    const user = await userModel.findOne({ email: req.body.email })
    if (user) {
        return res.json({error : {email : "Email already exists"}});
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
        return res.json({error : errors})
    }

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.json({error:{email:"Invalid Email or password"}})
    }
    const matchedUser = await bycrypt.compare(req.body.password, user.password)
    if (matchedUser) {
        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        }
        jwt.sign(payload, "Hey There How Are You?",
        {
            expiresIn: 259200
        },
        (err, token) => {
            return res.json({user,"token":token})
        })
    } else {
        res.json({error:{email:"Invalid Email or password"}})
    }
})

module.exports = router