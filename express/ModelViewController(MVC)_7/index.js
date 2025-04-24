const express = require('express');


const userRouter = require('./routes/user');
const { connectMongoDB } = require('./connection');
const { logReqRes } = require('./middlewares/index');

const app = express();
const PORT = 3000;

//connection
connectMongoDB('mongodb://localhost:27017/my-db-1');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('serverRequest.log'));


//Routes
app.use('/users', userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});