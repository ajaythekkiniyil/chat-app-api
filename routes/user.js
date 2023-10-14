const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')
const bcrypt = require('bcryptjs')

router.post('/signup', async (req, res) => {
    console.log('signup call', req.body);
    const { name, password } = req.body
    const newUser = new UserModel(
        {
            name: name,
            password: password
        }
    )
    await newUser.save()
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.post('/login', async (req, res) => {
    // this is user entered values
    const { name, password } = req.body

    const user = await UserModel.findOne({ 'name': name })

    if (!user) {
        return res.status(401).json('user not found')
    }

    // user.password is encrypted value
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(200).json({ status: false, message: 'incorrect credentials' })
    }

    return res.status(200).json({ status: true, message: 'verified', user })
})

// user details
router.get('/userId/:userId', (req, res) => {
    const userId = req.params.userId
    UserModel.findOne({ _id: userId })
        .then(matchUser => {
            return res.status(200).json({ name: matchUser.name })
        })
        .catch(err => res.status(500).json({ status: false, error: err, message: 'no user' }))
})

module.exports = router