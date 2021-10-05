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

// Read 📖 and write 🖊️ files 📁

var data = {}
data.table = []
for (i = 0; i < 26; i++) {
    var obj = {
        id: i,
        square: i * i
    }
    data.table.push(obj)
}

const path = 'sampleData.json'
const fs = require('fs');

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

const loadData = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

app.post('/', function (req, res) {
    console.log(loadData(path));
    storeData(req.body, path);
    res.send("recieved your request!");
});