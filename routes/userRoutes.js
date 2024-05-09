const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {

    try {
        const { username, password } = req.body
        const user = await User.findUserByUsername(username) 
        
        if (user) {
            return res.status(404).send({ error: 'Username already exists'})
        }

        const newUser = await User.createUser(username, password) 
        res.status(200).json({ 
            message: 'User created',
            user: 
            {
                id: newUser._id,
                username: newUser.username
            }
        })

    } catch (error) {
        res.status(500).send({ message: 'error'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findUserByUsername(username)

        if(!user) {
            res.status(404).send({message: "User not found"})
        }

        const matchUserPassword = await bcrypt.compare(password, user.password)
        if(!matchUserPassword) {
            return res.status(404).send({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'secret_key',
            { expiresIn: '24h'}
        )

        res.status(200).json({ message: 'Login successful', token: token })

    } catch(error) {
        res.status(500).send({ message: 'failed to login'})
    }
})

module.exports = router;