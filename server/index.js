const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const PORT = 8080;

// spin up express
const app = express();
app.use(express.json());
app.use(cors());

//routes
routes.initialize(app);
routes.pizza(app);

app.listen(PORT, function () {
  console.log(`server running: listening on port ${PORT}`);
});
