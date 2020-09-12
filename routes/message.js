const express = require('express')
const messageModel = require('../models/message')
const router = express.Router();

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
