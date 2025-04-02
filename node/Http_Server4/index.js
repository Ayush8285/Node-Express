const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    // console.log("new request received");
    // console.log(req);

    const log = `Request received at ${req.url} on ${new Date()}\n`;

    //write the request to a file called log.txt 
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        } else {
            console.log("Request logged");
        }
    });

    //set the response header
    switch(req.url){
        case '/':
            res.end("Welcome to the home page");
            break;
        case '/about':
            res.end("Welcome to the about page");
            break;
        case '/contact':
            res.end("Welcome to the contact page");
            break;
        default:
            res.end("404 Not Found");
            break;
    }
});


//server listens on port 3000
myServer.listen(3000, () => {
    console.log("Server is listening on port 3000");
});




