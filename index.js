const express = require('express');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');
const app = express();
const PORT = 8100;
var proxy = httpProxy.createProxyServer({});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/about', (req, res) => {
  console.log('connected to server')
  proxy.web(req, res, {target: `http://localhost:5100/`});
});


app.listen(PORT, () => {
  console.log(`proxy listening on port ${PORT}`);
});
