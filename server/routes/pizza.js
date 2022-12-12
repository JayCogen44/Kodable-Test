const pizzaController = require('../controllers/pizzaController');

const pizza = (app) => {
  app.get(
    '/api/all-pizza-data',
    pizzaController.getPizzaData,
    function (req, res) {
      res.send(res.locals.data);
      res.locals.data = {};
    }
  );

  app.get(
    '/api/pizza-month',
    pizzaController.getMostPizzaInGivenMonth,
    function (req, res) {
      res.send(res.locals.data);
      res.locals.data = {};
    }
  );

  app.get(
    '/api/pizza-streak',
    pizzaController.getBiggestPizzaStreak,
    function (req, res) {
      res.send(res.locals.data);
      res.locals.data = {};
    }
  );

  app.post(
    '/api/add-pizza-entry',
    pizzaController.addPizzaEntry,
    function (req, res) {
      res.send(res.locals.data);
      res.locals.data = {};
    }
  );
};

module.exports = pizza;
