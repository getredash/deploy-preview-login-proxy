const express = require('express');
const proxy = require('http-proxy-middleware');

var app = express();

app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

const target = 'http://preview-backend.redashapp.com';

app.get('/login', (req, res) => {
    res.render('login.html')
});

app.get('/', (req, res) => {
    res.render('index.html');
});

var onProxyReq = function (proxyReq, req, res) {
    const host = req.query.host || req.headers.host;
    console.log(req.query.host);
    console.log('host', host);
    proxyReq.setHeader('x-login-host', host);
};

app.use('/', proxy({target, changeOrigin: true, onProxyReq, logLevel: 'debug'}));
app.listen(process.env.PORT || 3000, process.env.HOST);

