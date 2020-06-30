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



app.get('/main*', (req, res) => {
  console.log('redirecting to mainImage server')
  proxy.web(req, res, {target: `http://purrgetmainitemdisplay-env.eba-upicdvwk.us-east-2.elasticbeanstalk.com`});
});

app.get('/about', (req, res) => {
  console.log('connected to server')
  proxy.web(req, res, {target: `http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com`});
});

app.get('/reccomended*', (req, res) => {
  console.log('Redirecting to reccomended service')
  proxy.web(req, res, {target: 'http://reccomended-featuredserver-dev.us-east-2.elasticbeanstalk.com'})
})


app.listen(PORT, () => {
  console.log(`proxy listening on port ${PORT}`);
});
