const http = require('http');
const app = require('./config/express')();
require('./config/database.js')();

const server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server listening on port ' + app.get('port'));
});