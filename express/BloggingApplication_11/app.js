// use (-D) like this -> npm i nodemon -D      it can create devDependices that will use in development 
//when project is live only dependices install not devdeendicies install
//we are going to live this application in aws .. so aws says the file name to start application name should be app.js.


require('dotenv').config();


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


const Blog = require('./models/blog');

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MoNGO_URL).then(e => console.log("mongodb connected"));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));


app.get("/", async (req,res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));