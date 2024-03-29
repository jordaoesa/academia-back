const http = require('http');
const chalk = require('chalk');
const cons = require('./config/const');
const Express = require('./config/express');
const Database = require('./config/database');

module.exports.start = function () {

  new Database()
      .connect()
      .then(() => {

        const app = Express();

        http.createServer(app).listen(app.get('port'), function () {

          console.log(chalk.green(chalk.bold('-- Back-End --')));
          console.log(chalk.green('Title:\t\t\t' + cons.server.title));
          console.log(chalk.green('Port:\t\t\t' + cons.server.port));
          console.log(chalk.green.bold('-- MongoDB --'));
          console.log(chalk.green('Database:\t\t' + cons.db.uri));
          console.log('--');
        });

      })
      .catch(err => {
        console.log(chalk.red('' + err));
        //do not let process run without connection to database
        process.exit(0);
      });
};

this.start();




