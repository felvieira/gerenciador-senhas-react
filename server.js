const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./data.json');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/pass', (req, res) => {
  return res.status(200).json(db);
});

app.listen(3001);
