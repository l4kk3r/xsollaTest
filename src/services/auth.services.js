const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const config = require('@root/config.json')

module.exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const userData = req.body
        
        const userWithSameEmail = await User.findOne({
                email: userData.email
        })
        if (userWithSameEmail) return res.status(409).json({ message: 'Пользователь с данным email уже существует' })

        const newUser = new User(userData)
        await newUser.save()
        
        res.status(201).send()
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports.clientLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { email, password } = req.body

        let user = await User.findOne({
           email
        }).select("+password")
        if (!user) return res.status(422).json({ message: 'Пользователь с данным email или паролем не существует'})

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'Пользователь с данным email или паролем не существует'})
        
        req.session.userRole = user.role
        req.session.userId = user._id
    
        res.status(204).send()
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports.serverLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const { email, password } = req.body

        let user = await User.findOne({
           email
        }).select("+password")
        if (!user) return res.status(422).json({ message: 'Пользователь с данным email или паролем не существует'})

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'Пользователь с данным email или паролем не существует'})

        const accessToken = jwt.sign({ _id: user._id }, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '2m' } )
        const refreshToken = jwt.sign({ _id: user._id }, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' } )
     
        res.json({ accessToken, refreshToken })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports.renewToken = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }

        const refreshToken = req.body.refreshToken

        let data;
        try {
            data = await jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET)
        } catch {
            return res.json({ message: 'refreshToken неккоректен или истёк'})
        }

        const accessToken = await jwt.sign({ _id: data._id }, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '2m' } )

        res.json({ accessToken })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports.logout = async (req, res) => {
    try {
        await req.session.destroy()

        res.status(204).send()
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}