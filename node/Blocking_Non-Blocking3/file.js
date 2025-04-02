const fs = require('fs')
const os = require('os')
console.log(os.cpus().length)

console.log('Start reading file...');
//Blocking
// const result = fs.readFileSync('contact.txt', 'utf-8');
// console.log(result);

//Non Blocking
const result = fs.readFile('contact.txt', 'utf-8', (err, data) => {
    console.log(data);
});

console.log("Ending ...")


//Default Thread pool size = 4
//Max?  - if u have  4core cpu - then you can run 4Threads

//to run more than 4 threads - you can increase the thread pool size
