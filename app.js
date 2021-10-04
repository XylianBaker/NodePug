const express = require('express');
const app = express();
const port = 3000;

// handles the unspecified or non-existent paths 🏗️
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});

// forward to index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
});

// if index.hhtml is not found 🔥
app.get('*', (req, res, next) => {
    res.status(200).send('Sorry, requested page not found.');
    next();
});

// prints the server status and its port in the console 🖥️
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});