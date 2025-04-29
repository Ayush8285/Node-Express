const cluster = require('cluster');
const express = require('express');
const os = require('os');


const totalCPUs = os.cpus().length; //get the number of CPUs

if(cluster.isPrimary){
      // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
}else{
    const app = express();
    app.get('/', (req, res) => {
        return res.json({messge: `hello from express server ${process.pid}`});
    });
    
    
    app.listen(3000, () => {
        console.log("Server running in 3000");
    });
}