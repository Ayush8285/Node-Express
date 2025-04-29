const { Router } = require('express');
const User = require("../models/user");

const router = Router();


router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie('token', token);
        return res.redirect("/");
    } catch (error) {
        console.error('Error during signin:', error); // Log it for debug
        return res.render('signin', {
            error: 'Incorrect Email or Password'
        });
    }
});


router.post('/signup', async (req, res) => {
    const { fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});


router.get('/logout', (req,res) => {
    res.clearCookie('token').redirect("/");
})




module.exports = router;


