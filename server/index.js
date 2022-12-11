require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
console.log(routes);
//
const app = express();
app.use(express.json());
app.use(cors());

//routes
routes.initialize(app);
routes.pizza(app);

app.listen(process.env.PORT, function () {
  console.log(`server running: listening on port ${process.env.PORT}`);
});
