const User = require('../models/user');
const { v4: uuidv4} = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  await User.create({ name, email, password });
  return res.render('home');
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email, password });
  // In a real application, you should hash the password and compare it with the hashed password in the database

  if (!user || user.password !== password) {
    res.errors = 'Invalid email or password';
    return res.render('login', { errors: res.errors });
  }

  //stateful
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie('sessionId', sessionId);

  //stateless
  const token  = setUser(user);
  // res.cookie('uid', token);
  res.cookie('token', token);
  // return res.json({token})


  return res.redirect('/'); 
}



module.exports = {
    handleUserSignup,
    handleUserLogin,
    };