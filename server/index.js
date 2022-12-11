require('dotenv').config();
const cors = require('cors');
const express = require('express');
const initDB = require('./controllers/initDB');

const app = express();
app.use(express.json());
app.use(cors());

app.get(
  '/api/initialize-data',
  initDB.createPizzaAnalyticsTable,
  initDB.populateFromCsv,
  (req, res) => {
    res.send('db connected');
  }
);

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to the api</h1>');
});

app.get('/', (req, res) => {
  res.send('<h1>Pizza Analytics</h1>');
});

app.listen(process.env.PORT, function () {
  console.log(`server running: listening on port ${process.env.PORT}`);
});
