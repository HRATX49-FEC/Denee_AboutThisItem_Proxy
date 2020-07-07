const express = require('express');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');
const compression = require('compression');

const app = express();

const PORT = 8100;

var proxy = httpProxy.createProxyServer({});

app.use(compression());

app.all('/main*', (req, res) => {
  console.log('connected to mainImage service')
  proxy.web(req, res, {target: 'http://purrgetmainitemdisplay.us-east-2.elasticbeanstalk.com/'});
});

app.all('/about*', (req, res) => {
  console.log('connected to about service');
  proxy.web(req, res, {target: 'http://purrgetaboutthisitem-dev.us-east-1.elasticbeanstalk.com/'});
});

app.all('/reccomended*', (req, res) => {
  console.log('connected to reccomended service')
  proxy.web(req, res, {target: 'http://rec-feat-display.us-east-2.elasticbeanstalk.com/'});
});

app.all('/search*', (req, res) => {
  console.log('connected to search service')
  proxy.web(req, res, {target: `http://v50-dev.us-east-1.elasticbeanstalk.com/`});
});

app.all('/reviews*', (req, res) => {
  console.log('connected to reviews service')
  proxy.web(req, res, {target: 'http://service-dev2.us-west-2.elasticbeanstalk.com/'});
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(`proxy listening on port ${PORT}`);
});
