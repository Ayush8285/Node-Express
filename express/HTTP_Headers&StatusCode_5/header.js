//Headers
// In an HTTP request, headers are key-value pairs that provide metadata about the request,
//  such as the requested resource, the client's capabilities, and authentication information,
//  helping the server understand and process the request effectively. 


// Here's a more detailed explanation:
// What they are:
// HTTP headers are additional information sent along with an HTTP request or response, 
// providing metadata about the request or response. 


// Structure:
// They consist of a name-value pair, separated by a colon,
//  and are placed at the beginning of the HTTP message, 
// separated from the message body (the actual content) by an empty line. 


// Purpose:
// Client to Server: Request headers inform the server about the client's preferences,
//  capabilities, and the nature of the request. 

// Server to Client: Response headers provide information about the response,
//  such as the content type, status code, and caching directives. 


// Examples of Request Headers:
// Accept: Specifies the media types the client can accept. 
// User-Agent: Identifies the client software or user agent. 
// Host: Specifies the domain name of the requested resource. 
// Authorization: Provides authentication credentials. 


// Examples of Response Headers:
// Content-Type: Specifies the media type of the response body. 
// Content-Length: Specifies the size of the response body. 
// Cache-Control: Controls caching behavior.   



//link of build-in headers
// https://flaviocopes.com/http-request-headers/


const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/headers', (req, res) => {
    // Log request headers to the console
    console.log('Request Headers:', req.headers);


    // Set custom headers in the response
    //always add X- prefix to custom headers to avoid collision with standard headers
    res.setHeader('X-name',"joe"); //custom header
    res.setHeader('X-age', 23);  //custom header
    res.send(JSON.stringify({ message: 'Headers set!' }));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});