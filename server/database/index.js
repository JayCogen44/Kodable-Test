const pg = require('pg');

const conString =
  'postgres://ejzpeycn:0qGaWsaPhbmeWblVBQDH3nFI1waYbKOk@hansken.db.elephantsql.com/ejzpeycn';
const db = new pg.Client(conString);

db.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  console.log('db connected');
});

module.exports = db;
