'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');
const app = express();


require('dotenv').config();

const Response = require('./controllers/model/response.js');
const responseStatus = require('./controllers/model/responseStatus.js');

const routerV1 = require('./routes/v1/router.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', routerV1);

// Handle validation errors
app.use(function(err, req, res, next){
  const apiResponse = new Response(
    responseStatus.INVALID_REQUEST.status,
    responseStatus.INVALID_REQUEST.statusText,
    err.errors
  );

  res.status(400).json(apiResponse);
});

const server = app.listen(3000, '127.0.0.1', function() {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});

module.exports = server;
