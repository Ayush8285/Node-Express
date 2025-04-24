//For server side rendering, we will use EJS , pug or handlebars for template engine.
//For client side rendering, we will use React, Vue or Angular 
//we use uuid to generate unique short id for each url and put that in the cookie
// and we use cookie-parser to parse the cookie in the request headers with the help of uuid
//  (but this is stateful)
//now we are using jsonwebtoken to generate a token and put that in the cookie (this is stateless)


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectMongoDB } = require('./connect');
const { checkForAuthentication , restrictTo} = require('./middleware/auth');

const URL = require('./models/Url');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();

app.use(express.json());   //for parsing application/json (json data in request body)
app.use(express.urlencoded({ extended: false }));   //for parsing application/x-www-form-urlencoded (form data in request body)
app.use(cookieParser());   //for parsing cookies in request headers
app.use(checkForAuthentication);

const PORT = 3000;


//server side rendering
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    
    });
});

//above is for server side rendering.

connectMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);


app.get('/new/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: new Date(),
                },
            },
        },
        
    );
    res.redirect(entry.redirectUrl);
   
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

