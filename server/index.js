const express = require('express');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');

const menu = require('./data/menu.json');
const sections = require('./data/sections.json');
const items = require('./data/items.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/images', express.static(__dirname));
app.use('/images', serveIndex(__dirname));
app.use('/', express.static('./public'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-authorization');
  next();
});

app.get('/api/menu', (req, res) => {
  setTimeout(() => {
    res.json(menu);
  }, 300);
});

app.get('/api/sections', (req, res) => {
  setTimeout(() => {
    res.json(sections);
  }, 300);
});

app.get('/api/items', (req, res) => {
  setTimeout(() => {
    res.json(items);
  }, 800);
});

app.listen(3001, () => {
  console.log('API server running on localhost:3001');
});
