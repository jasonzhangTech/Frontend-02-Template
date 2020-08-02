const http = require('http');
var fs = require("fs")

http.createServer((request, response) => {
    let requestBody = [];
    request
        .on('err', console.error)
        .on('data', (data) => { requestBody.push(data) })
        .on('end', () => {
            console.log('>>> get:', Buffer.concat(requestBody).toString());
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(fs.readFileSync('./index.html'));
        });
}).listen(9100);
console.log("Server Started!");