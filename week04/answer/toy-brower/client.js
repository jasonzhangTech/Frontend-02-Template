const net = require('net');
const HTMLParser = require('./parser');

class Request {
    constructor (host, port, appendHeaders) {
        this.host = host;
        this.port = port || 80;
        this.requestContent;
        this.headers = {
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept-Encoding': 'identity',
            ...appendHeaders
        }
    }

    open (method, uri) {
        this.requestContent = [method, uri, 'HTTP/1.1'].join(' ') + '\r\n';
        this.requestContent += Object.keys(this.headers).reduce((result, key) => {
            return result + key + ':' + this.headers[key] + '\r\n';
        }, '');
    }

    send (data) {
        let parser = new ResponseParser();
        data = Buffer.from(data);
        this.requestContent += 'Content-Length:' + data.length + '\r\n\r\n' + data.toString('utf8');
        return new Promise((resolve, reject) => {
            let conn = new net.createConnection(
                { host: this.host, port: this.port },
                () => { conn.write( this.requestContent ); }
            )
                .on('data', (data) => {
                    parser.receiveText(data.toString());
                    if (parser.isFinished) {
                        resolve(parser.response);
                        conn.end();
                    }
                })
                .on('error', (e) => {
                    conn.end();
                    reject(e);
                });

        });
    }
}

class ResponseParser {
    constructor () {
        this.isFinished = false;
        this.activeBufferOffset = 0;
        this.buffer = [];
        this.response = {
            status: 0,
            header: {},
            body: ''
        };
        this.currentStatus = this.readStatusLine;
    }

    receiveText (partialResponse) {
        for (let c of partialResponse) {
            this.currentStatus(c);
        }
    }

    readStatusLine (char) {
        if (char === '\n') {
            this.currentStatus = this.readHeader;
            this.activeBufferOffset = 0;
            this.buffer = [];
            return null;
        } else if (char === '\r') {
            this.response.status = this.buffer[1];
            this.response.statusText = this.buffer[2];
            return null;
        } else if (char === ' ') {
            this.activeBufferOffset++;
            return null;
        }

        this.buffer[this.activeBufferOffset] = this.buffer[this.activeBufferOffset] ? this.buffer[this.activeBufferOffset] + char : char;
    }

    readHeader (char) {
        if (char === '\n') {
            if (this.buffer[0]) {
                this.currentStatus = this.readHeader;
            } else {
                if (this.response.header['Transfer-Encoding'] === 'chunked') {
                    this.currentStatus = this.readChunkedBody;
                } else {
                    this.currentStatus = this.readBody;
                }
            }
            this.activeBufferOffset = 0;
            this.buffer = [];
            return null;
        } else if (char === '\r') {
            if (this.buffer[0]) {
                this.response.header[this.buffer[0]] = this.buffer[1];
            }
            return null;
        } else if (char === ':') {
            this.activeBufferOffset++;
            return null;
        } else if (char === ' ' && !this.buffer[1]) {
            return null;
        }

        this.buffer[this.activeBufferOffset] = this.buffer[this.activeBufferOffset] ? this.buffer[this.activeBufferOffset] + char : char;
    }

    readChunkedBody (char) {
        if (char === '\n') {
            if (this.activeBufferOffset === 0) {
                throw new Error('Invalid Cunked Response Body');
            } else if (this.buffer[0] === 0 && !this.buffer[1]) {
                this.activeBufferOffset = 0;
                this.buffer =[];
                this.currentStatus = this.done;
                this.done();
                return null;
            } else if (this.buffer[0] && !this.buffer[1]) {
                return null;
            } else if (this.buffer[0] === this.buffer[1].length) {
                this.response.body += this.buffer[1];
                this.activeBufferOffset = 0;
                this.buffer =[];
                return null;
            }
        } else if (char === '\r') {
            if (this.activeBufferOffset === 0) {
                this.buffer[0] = parseInt(this.buffer[0], 16);
                this.activeBufferOffset++;
                return null;
            } else if (this.buffer[1] && this.buffer[0] === this.buffer[1].length) {
                return null;
            }
        }

        this.buffer[this.activeBufferOffset] = this.buffer[this.activeBufferOffset] ? this.buffer[this.activeBufferOffset] + char : char;
    }

    readBody (char) {
        if (this.response.header['Content-Length'] === '0') {
            this.response.header['Content-Length'] = 0;
            this.currentStatus = this.done;
            this.done();
            return null;
        } else if (typeof this.response.header['Content-Length'] === 'undefined') {
            throw new Error('Content-Length Is Required!');
        } else if (typeof this.response.header['Content-Length'] === 'string') {
            this.response.header['Content-Length'] = parseInt(this.response.header['Content-Length']);
        } 

        this.response.body += char;

        if (this.response.body.length === this.response.header['Content-Length']) {
            this.currentStatus = this.done;
            this.done();
            return null;
        }
    }

    done () {
        this.isFinished = true;
    }
}


(async function makeRequest () {
    var req = new Request('127.0.0.1', '9100');
    req.open('GET', '/');
    
    let response = await req.send('hi, nice to **** you !!! 😀');
    console.log(response);

    let dom = HTMLParser(response.body);
    console.log(dom)

})();