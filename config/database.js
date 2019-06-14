const mongoose = require('mongoose');
const cons = require('./const.js');

class Database {
  constructor() {
    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        process.exit(0);
      });
    });
  }

  establishConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connect(cons.db.uri, cons.db.options, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve();
        }
      });
    });
  }

  connect() {
    return Promise.resolve()
        .then(() => this.establishConnection());
  }

}

module.exports = Database;
