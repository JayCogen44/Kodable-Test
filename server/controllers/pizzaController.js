const db = require('../database');

function getPizzaData(req, res, next) {
  db.query(`SELECT * FROM pizza_analytics`)
    .then((response) => {
      res.locals.data = response.rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      db.end();
    });
}

function getMostPizzaInGivenMonth(req, res, next) {
  let month = req.query.month;
  db.query(
    `
    SELECT EXTRACT(DAY FROM date) as day,
    COUNT(date) as Count 
    FROM pizza_analytics 
    WHERE EXTRACT(MONTH FROM date) = ${month}
    GROUP BY date
    ORDER BY count DESC
    LIMIT 1
    `
  )
    .then((response) => {
      res.locals.data = response.rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      db.end();
    });
}

function getBiggestPizzaStreak(req, res, next) {
  db.query(
    `
            SELECT
                date_trunc('day', date) date,
                count(date) as count
                
            FROM pizza_analytics
            GROUP BY date
            ORDER BY date
    `
  )
    .then((response) => {
      const dates = [];
      let i = 0;
      const rows = response.rows;
      console.log(rows);
      while (rows[i]) {
        console.log(rows[i].count);
        if (rows[i - 1] && rows[i - 1].count < rows[i].count) {
          dates.push(rows[i - 1]);
          if (i === rows.length - 1 || rows[i].count > rows[i + 1].count)
            dates.push(rows[i]);
        }
        i++;
      }
      res.locals.data = dates;
      next();
    })
    .catch((err) => {
      console.error(err);
      db.end();
    });
}

function addPizzaEntry(req, res, next) {}

module.exports = {
  getPizzaData,
  getMostPizzaInGivenMonth,
  getBiggestPizzaStreak,
  addPizzaEntry,
};
