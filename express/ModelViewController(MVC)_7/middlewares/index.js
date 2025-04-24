const fs = require('fs');

function logReqRes(filename) {
    return (req, res, next) => {
        const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
        fs.appendFile(filename, log, (err) => {
            if (err) {
                console.error('Error writing to log file', err);
            }
        });
        next();
    };
}  

module.exports = {
    logReqRes,
};