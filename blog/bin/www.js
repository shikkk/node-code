const http = require('http');
const port = 8000
const serverHandle = require('../index')
const server = http.createServer(serverHandle)
server.listen(port)