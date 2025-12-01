const User = require('../models/User');

function getSignup(req, res) {
    res.render('signup');
}

function getLogin(req,res){
    res.render('login')
}

async function postSignup(req,res){
    const {email, password} = req.body

    try{
        const user = await User.create({email, password});
        res.status(201).json(user);
    }catch(err){
        console.log(err);
        res.status(400).send('error, user not created');
    }
}

async function postLogin(req,res){
    const {email, password} = req.body
    console.log(email, password);
    res.send('user login')
}

module.exports = {
    getSignup,
    getLogin,
    postSignup,
    postLogin
}