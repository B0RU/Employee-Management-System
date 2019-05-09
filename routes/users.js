const express = require('express');

const bcrypt = require('bcryptjs');
const passport = require('passport')
const router = express.Router();
const User = require('../models/user.model');

let errors = [];

//GET login
router.get('/login', (req, res) => {
    res.render('authForms/login', {
        error: req.flash('error'),
        success: req.flash('success_msg')
    });
});


//GET register
router.get('/register', (req, res) => {
    res.render('authForms/register')
});


//POST login
router.post('/login', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res);
});

//POST register
router.post('/register', (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = 0;

    if (password != password2) {
        req.flash('matchError', 'passwords don\'t match');
        errors++;
    }

    if (password.length < 6) {
        req.flash('lengthError', 'password must be 6 characters at least');
        errors++;
    }

    if (errors > 0) {
        res.render('authForms/register', {
            matchError: req.flash('matchError'),
            lengthError: req.flash('lengthError')
        })
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                req.flash('error', 'Email already Exists');
                res.render('authForms/register', {
                    error: req.flash('error')
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/user/login');
                            })
                            .catch(err => console.log(err))

                    })
                })
            }
        })
    }



});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
})

module.exports = router;