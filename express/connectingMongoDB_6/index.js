//Schema - Define the structure of the data
//Model - Interact with the database (usig model we can do CRUD operations)
//Document - Instance of a model (record in the database, similar to a row in a table in SQL)
//MongoDB - NoSQL database

const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)

//connect to the database
mongoose.connect('mongodb://localhost:27017/my-db-1').then(() => {
    console.log('Connected to MongoDB database')})
.catch((err) => {
    console.error('Error connecting to MongoDB database', err);
});

//schema - Define the structure of the data
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: false
    },
});

//model - Interact with the database (usig model we can do CRUD operations)
const User = mongoose.model('User', userSchema);


//create a new user
app.post('/users', async (req, res) => {
    const { firstName, lastName, email, password, jobTitle } = req.body;
    const user = new User({ firstName, lastName, email, password, jobTitle });
    if (!firstName || !email || !password || !jobTitle) {
        return res.status(400).send('First name, email, and password are required');
    }
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    return res.status(200).send(users);
});

app.get('/users/:id', async (req, res) => {
    // const { id } = req.params;
    // const user = await User.findById(id);
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    return res.status(200).send(user);

});

app.patch('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    if( !user) {
        return res.status(404).send('User not found');
    }
    return res.status(200).send('User updated successfully');

});

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    return res.status(200).send("user deleted successfully");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

