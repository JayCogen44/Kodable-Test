const initDB = require('../controllers/initDB');

const initialize = (app) => {
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
};

module.exports = { initialize };
