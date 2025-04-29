// In Node.js, the cluster module enables the creation of 
// multiple processes (workers)that share the same server port. 
// This functionality is particularly useful for leveraging multi-core processors,
//  as Node.js, by default, operates on a single thread. By utilizing the cluster module,
//  applications can distribute workloads across multiple CPU cores,
//  thereby enhancing performance and scalability.

// The cluster module operates by creating a master process that manages worker processes. 
// The master process listens for incoming connections and distributes them among the workers.
//  Each worker runs independently and has its own event loop.
// This architecture allows Node.js applications to handle more concurrent requests
//  and utilize system resources more efficiently. 


const express = require('express');

const app = express();


app.get('/', (req, res) => {
    return res.json({messge: `hello from express server ${process.pid}`});
});


app.listen(3000, () => {
    console.log("Server running in 3000");
});