const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    if(req.url == '/favicon.ico') {
        return res.end();
    }
    const log = `${req.method} ${req.url}`;
    

    const parsedUrl = url.parse(req.url, true);
   console.log(parsedUrl);

    switch(parsedUrl.pathname) {
        case '/':
            res.end('Hello World!');
            break;
        case '/about':
            res.end(`About Page ${parsedUrl.query.name}`);
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found!');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});



//output

// http://localhost:3000/about?name=milli&sirname=moo


// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?name=milli&sirname=moo',
//     query: [Object: null prototype] { name: 'milli', sirname: 'moo' },
//     pathname: '/about',
//     path: '/about?name=milli&sirname=moo',
//     href: '/about?name=milli&sirname=moo'
//   }