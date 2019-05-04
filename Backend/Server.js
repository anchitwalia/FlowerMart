const express = require('express');
const config = require('./config');
const path = require('path')
const http = require('http');
const app = express();

const flowerRoute = require('./data/routes/Flower-Routes');
const userRoute = require('./data/routes/User-Routes');
const orderRoute = require('./data/routes/Order-Routes');

const port = process.env.PORT || config.port;
const ip = process.env.IP || process.argv.slice(2)[0] || config.ip || '192.168.43.249';
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, './data/staticContent')));
app.use('/flower', flowerRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('*', (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, './data/staticContent/index.html'));
});

server.listen(port, ip, () => console.log("Server is listening on " + ip + ":" + port));