
function getSignup(req, res) {
    res.render('signup');
}

function getLogin(req,res){
    res.render('login')
}
function postSignup(req,res){
    res.send('new signup')
}
function postLogin(req,res){
    res.send('user login')
}

module.exports = {
    getSignup,
    getLogin,
    postSignup,
    postLogin
}