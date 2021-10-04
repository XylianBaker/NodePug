const express = require('express');
const app = express();
const port = 3000;

// http://localhost:3000

// directs to the directory, where the templates are kept 🐶
app.set('views', './views');
app.set('view engine', 'pug');

// handles the unspecified or non-existent paths 🏗️
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});

// renders the pug file
app.get('/', (req, res) => {
    res.render('index');
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