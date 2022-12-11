const fs = require('fs');
const fastcsv = require('fast-csv');
const db = require('../database');

function createPizzaAnalyticsTable(req, res, next) {
  const queryText = `
  DROP TABLE IF EXISTS pizza_analytics;
  
  CREATE TABLE IF NOT EXISTS
        pizza_analytics(
        "_id" SERIAL PRIMARY KEY,
        "person" VARCHAR NOT NULL,
        "meat_type" VARCHAR NOT NULL,
        "date" DATE NOT NULL
        );`;

  db.query(queryText)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      db.end();
    });
}

function populateFromCsv(req, res, next) {
  let csvData = [];
  let stream = fs.createReadStream('data.csv');
  let csvStream = fastcsv
    .parse()
    .on('data', function (data) {
      csvData.push(data);
    })
    .on('end', function () {
      // remove the first line: header
      csvData.shift();

      const queryText = `
        INSERT INTO pizza_analytics (person, meat_type, date) VALUES ($1, $2, $3)
    `;

      csvData.forEach((row) => {
        db.query(queryText, row);
      });
    });

  stream.pipe(csvStream);
  next();
}

module.exports = { createPizzaAnalyticsTable, populateFromCsv };
