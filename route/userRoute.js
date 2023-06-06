const express = require('express');
const { userModel } = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

// User Register route
userRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password, dob, bio } = req.body;
        const searchUser = await userModel.find({ email })
        if (searchUser.length >= 1) {
            res.status(409).send({
                msg: 'User already registered.'
            })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const user = new userModel({ name, email, password: hash, dob, bio })
                await user.save()
                res.status(200).send({
                    msg: "Registered Successfully!"
                })
            })
        }
    } catch (error) {
        res.status(404).send({
            msg: error.message
        })
    }
});


// User Login route
userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).send({ "err": "No user found with this email" })
        }

        bcrypt.compare(password, user.password).then(function (result) {
            if (result) {
                const token = jwt.sign({ id: user._id }, process.env.secret_key, { expiresIn: '1h' });
                res.status(200).send({ "msg": "You have been logged in successfully", "token": token })
            }
            else {
                res.status(400).send({ "alert": "wrong password alert" })
            }
        });
    }
    catch (err) {
        res.status(401).send({
            msg: err.message
        })
    }
});

module.exports = { userRouter }