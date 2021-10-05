const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// http://localhost:3000

// Make a static route to use your
// static files in client side
app.use('/static', express.static('static'));

// directs to the directory, where the templates are kept 🐶
app.set('views', './views');
app.set('view engine', 'pug');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({
    extended: true
}));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// handles the unspecified or non-existent paths 🏗️
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});

// prints the server status and its port in the console 🖥️
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

// Read 📖 and write 🖊️ files 📁
const path = 'sampleData.json'
const fs = require('fs');

const loadData = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

const storeData = (data, path) => {
    try {
        // var obj = {
        //     table: []
        // };
        var obj = JSON.parse(loadData(path));
        obj.table.push(data);
        var json = JSON.stringify(obj);
        fs.writeFileSync(path, json);
    } catch (err) {
        console.error(err)
    }
}

// renders the pug file
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layout',
        json: loadData(path)
    });
});

// if index.html is not found 🔥
app.get('*', (req, res, next) => {
    res.status(200).send('Sorry, requested page not found.');
    next();
});

app.post('/', function (req, res) {
    console.log(loadData(path));
    storeData(req.body, path);
    res.send("recieved your request!");
});