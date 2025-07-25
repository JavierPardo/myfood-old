const express = require('express');
const path = require('path');
const app = express();
const pathName = path.join(__dirname, 'build');
require('dotenv').config()
// app.use('*/static', express.static(pathName));
// app.use(express.static(pathName));

app.get('*.*', function (req, res) {

    const relPath=req.originalUrl;
    console.log("get static:", relPath)
    console.log("get path:", path.join(__dirname, 'build', relPath))
    res.sendFile(path.join(__dirname, 'build', relPath));
});
app.get('/*', function (req, res) {
    console.log("get:", req.originalUrl)
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(8080);
console.log("listening port 8080")