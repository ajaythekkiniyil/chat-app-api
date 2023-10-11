const express = require('express')
const router = express.Router()
const conversationModel = require('../model/conversation')
const messageModel = require('../model/message')
const userModel = require('../model/user')

router.post('/new-conversation', (req, res) => {
    const { sender, receiver } = req.body

    const newConversation = new conversationModel({
        participants: [sender, receiver],
    });
    newConversation.save()
        .then(resp => {
            res.status(200).json('new conversation created')
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// get all chat of a user
router.get('/get-all-chat/:userId', (req, res) => {
    const userId = req.params.userId

    conversationModel.find(
        {
            participants: { $in: [userId] }
        }
    )
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/new-message', async (req, res) => {
    const { conversationId, sender, text } = req.body
    console.log();

    const newMessage = new messageModel(
        {
            "conversationId": conversationId,
            "sender": sender,
            "text": text
        }
    )

    await newMessage.save()
        .then(resp => {
            res.status(200).json('new message saved')
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

// get all message based on conversationId
router.get('/messages/:conversationId', (req, res) => {
    const conversationId = req.params.conversationId

    messageModel.find({ "conversationId": conversationId })
        .then(resp => {
            res.status(200).json({ resp })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// getall members based on name or *
router.post('/all-members', async (req, res) => {
    const { name } = req.body
    const selectQuery = (name==='*') ? {} : {name: {$regex: '^' + name}}
    const users = await userModel.find(selectQuery).select({ name: 1, _id: 1 })

    return res.status(200).json(users)
})
module.exports = router