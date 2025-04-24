//in simple api request, client sends a request to the server
//client ----- request -----> (function that handle the request for the client )server 
//client <---- response ---- (function that handle the request for the client )server



//in the case middleware is used, the request is intercepted by the middleware function before 
// it reaches the final route handler and the middleware function can perform some operations
//  on the request and response objects before passing control to the next middleware or route handler.
//this is done because any type of processing can be done on the request and response objects
//  before they reach the final route handler , like logging, authentication, validation, etc.
//client ----- request ----- middleware -----> server 
//client <---- response ---- middleware ----- server


 //  and middleware also cancel the request and response cycle by not calling the next function
//if the request is not valid or the user is not authenticated, etc.
//client ----- request ----- middleware   ( not valid) ## server
// client <---- response ---- middleware  --|   



// In Node.js, especially within the context of the Express framework,
//  middleware functions are functions that intercept and process requests and responses, 
// enabling tasks like logging, authentication,
//  and data validation before the request reaches the final route handler.


// Here's a more detailed explanation:

// Interception and Processing:
// Middleware sits between the incoming request and the outgoing response, 
// allowing you to perform actions on the request and response objects before they 
// reach the final route handler.

// Access to Request and Response Objects:
// Middleware functions have access to the req (request) and res (response) objects, 
// as well as the next function, which allows you to pass control to the next middleware or route handler.


// Common Use Cases:
// Logging: Middleware can log incoming requests, including the URL, method, and IP address.
// Authentication: Middleware can verify user credentials and add user information to the request object.
// Validation: Middleware can validate data received in the request, ensuring it meets certain criteria.
// Error Handling: Middleware can handle errors that occur during the request-response cycle.



const express = require('express');


const app = express();

//middleware function - this function will be called for every request made to the server
//when client sends a request to the server, this function will be called first then the final route handler
app.use((req, res, next) => {
    console.log('Middleware 1: Request received at ' + new Date().toISOString());
    req.myUSer= "abcdefg"; // Adding a custom property to the request object
    next(); // Pass control to the next middleware or route handler    
});

app.use((req, res, next) => {
    console.log('Middleware 1: ' + req.myUSer);
    console.log('Middleware 2: Request received at ' + new Date().toISOString());
    next(); 
});

app.get('/new',(req,res)=>{
    return res.send('Hello from the new route!');
   
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});