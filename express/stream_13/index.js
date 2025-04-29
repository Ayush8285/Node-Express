const express = require("express");
const fs = require("fs");
const zlib = require("zlib");

const app = express();

//to check this go on http://localhost:3000/status
app.use(require("express-status-monitor")());

//without Stream
//memory utilization is more and not good to use like this
//in this first data is stored in memory then print

// app.get('/', (req, res) => {
//     fs.readFile("./sample.txt", (err, data) => {
//         res.end(data);
//     });
// });

//Stream
//use stream to get chunk by chunk of data from the file and print it or stream it ..
//that way memory is not used and work properly


//Stream Read (sample.txt) --> Zipper --> fs Write Stream (sample.zip)
fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(3000, () => {
  console.log("Server running at 3000");
});
