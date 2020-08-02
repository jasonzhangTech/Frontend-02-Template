const http = require('http')

http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.log(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        /**
         * 此处修正：body = Buffer.concat(body).toString()
         * `Buffer.concat` 是只能连接 `Buffer` 的，不能连接字符串。
         * 要不去掉代码中的 `toString` 要不就把 `Buffer` 改成 `Array`
         */
        body = Buffer.concat(body)
        console.log('body:',body)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('Hello World\n')
    })
}).listen(8088);

console.log('server started....')