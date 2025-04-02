const fs = require('fs');

// this is a synchronous call to write a file
fs.writeFileSync('./test.txt', 'this is a test file');

// this is an asynchronous call to write a file
fs.writeFile('./test.txt', 'this is a test file Async', (err) => {});

//read in Synchronous way
const result = fs.readFileSync('./contact.txt', 'utf-8');
console.log(result);

// readFileAsync
fs.readFile('./contact.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }else {
        console.log(data);
    }
}
);

//apppending to a file
fs.appendFileSync('./test.txt', new Date().toString() + '\n' );

//copy a file in synchronous way
fs.cpSync('./test.txt', './copy.txt'); 

//delete a file in synchronous way
fs.unlinkSync('./copy.txt');

//detail of a file in synchronous way
console.log(fs.statSync('./test.txt'));
console.log(fs.statSync('./test.txt').isFile()); // true


//creating a directory in synchronous way
fs.mkdirSync('testDir/a/b', { recursive: true });



//to run this file use the command node file1.js in the terminal