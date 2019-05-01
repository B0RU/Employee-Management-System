const express = require ('express');

const bcrypt = require ('bcryptjs');
const passport = require ('passport')
const router = express.Router();
const User = require ('../models/user.model');

let errors = [];

//GET login
router.get('/login', (req, res) => {
    res.render('authForms/login');
});


//GET register
router.get('/register', (req, res) => {
    res.render('authForms/register');
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
    const {name, email, password, password2} = req.body;
    
            const newUser = new User ({
                name,
                email,
                password
            });

            bcrypt.genSalt(12, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        res.redirect('/user/login');
                    })
                    .catch(err => console.log(err))
                    
                })
            })

});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
})

module.exports = router;