const express = require('express');
// const http = require('http');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.get('/about', (req, res) => {
    return res.send('About Page' + ' hey ' + req.query.name);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


// const myServer = http.createServer(app);

// myServer.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


// to run this file, use the command node server.js