require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routes = require('./routes');

//
const app = express();
app.use(express.json());
app.use(cors());

//routes
routes.initialize(app);

app.listen(process.env.PORT, function () {
  console.log(`server running: listening on port ${process.env.PORT}`);
});
