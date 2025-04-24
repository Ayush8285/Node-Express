//http response status code

//link of status code to learn more about status code
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status


const express = require('express');
const app = express();


//middleware 
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('status code!');
});

app.post('/status', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).send('Bad Request: Name and age are required.');
    }
    res.status(201).send('user created'); 
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});