const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const mongojs = require('mongojs');
const db = mongojs('mongodb://alik:alik@ds161346.mlab.com:61346/signaculum');

// Register
router.post('/register', (req, res, next) => {
    let newUser = req.body;

    //Verify
    if (!newUser) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(newUser, function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'Failes to register new User' });
            } else {
                res.json({ success: true, msg: 'User registered' });
            }
        });
    }
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    db.users.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// Profile
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.json({ user: req.user });
// });

module.exports = router;