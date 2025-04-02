//we use only get, post, put, delete, patch methods for almost all the time

//Http Methods
// 1. GET - Used to retrieve data from a server   -- Important
// 2. POST - Used to send data to a server    -- Important
// 3. PUT - Used to update existing data on a server    -- Important
// 4. DELETE - Used to delete data from a server       -- Important
// 5. PATCH - Used to apply partial modifications to a resource     -- Important

//there are other methods like HEAD, OPTIONS, CONNECT, TRACE, but
//  they are not used frequently in web development

const url = require('url');
const fs = require('fs');
const http = require('http');




const server = http.createServer((req, res) => {
    const log  = `${Date.now()} : | ${req.url} | ${req.method} `;

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('server.log', log + '\n', (err) => {
    switch (myUrl.pathname) {
        case '/':
            if(req.method === 'GET'){
                res.end('Welcome to the home page!');
                break;
            }
        case '/about':
            if(req.method === 'GET'){
                res.end('Welcome to the about page!');
                break;
            }
        default:
            res.statusCode = 404;
            res.end('Page not found!');
            break;
    }
});
}
);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
