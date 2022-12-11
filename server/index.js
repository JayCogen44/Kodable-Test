require('dotenv').config();
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to the api</h1>');
});

app.get('/', (req, res) => {
  res.send('<h1>Pizza Analytics</h1>');
});

app.listen(process.env.PORT, function () {
  console.log(`server running: listening on port ${process.env.PORT}`);
});
