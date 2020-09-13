const express = require('express')
const messageModel = require('../models/message')
const router = express.Router();
const key = "Hey There How Are You?"
const jwt = require('jsonwebtoken')


router.use(async (req, res, next) => {
    const token = req.cookies.token
    console.log(req.cookies.token)
    if (!token) {
        return res.status(401).json("you're not logged in please login first")
    }
    var payload
    try {
        payload = jwt.verify(token, key)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            console.log("fvvfdvv")
            return res.status(401).end()
        }
        console.log("2rgregregrre")
        return res.status(400).end()
    }
    /*if (payload.exp <= Date.now()) {
        console.log(payload.exp)
        console.log("3fffrrefef")
        return res.status(400).end()
    }*/
    //console.log("done")
    next()
})


router.get('/', async (req, res) => {
    try {
        const getResult = await messageModel.find({}).populate('user');
        return res.json(getResult);
    } catch (err) {
        res.json(err);
    }
});

router.post('/', async (req, res) => {
    const message = new messageModel(req.body)
    /*userId: req.body.userId,
    message: req.body.message
})*/
    try {
        const postResult = await message.save();
        return res.json(postResult);
    } catch (err) {
        res.json(err);
    }
});

router.patch('/:messageId', async (req, res) => {
    try {
        const patchResult = await messageModel.findByIdAndUpdate(req.params.messageId, { userId: req.body.userId, message: req.body.message }, { new: true });
        return res.json(patchResult);
    } catch (err) {
        res.json(err);
    }
})

router.patch('/:messageId/reply', async (req, res) => {
    try {
        const updateResult = await messageModel.findByIdAndUpdate(req.params.messageId, {
            '$addToSet': {
                reply: {
                    userId: req.body.userId,
                    message: req.body.message,
                },
            },
        },
            { new: true });
        return res.json(updateResult)
    } catch (err) {
        console.log(err);
    }
})



router.delete('/:messageId', async (req, res) => {
    try {
        const deleteResult = await messageModel.findByIdAndDelete(req.params.messageId);
        return res.json("Deleted Sucessfully");
    } catch (err) {
        res.json(err);
    }
})
module.exports = router
