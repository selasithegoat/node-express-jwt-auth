const User = require('../models/User');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};
    
    // duplicate error code
    if (err.code === 11000){
        errors.email = "That email is already registered";
        return errors
    }

    // validation of errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

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
        const errors = handleErrors(err);
        res.status(400).json({errors});
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