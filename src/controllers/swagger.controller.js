const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const swaggerPath = path.join(__dirname, '../../swagger.yaml');
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));

const serve = swaggerUi.serve;
const setup = swaggerUi.setup(swaggerDocument);

module.exports = {
  serve,
  setup,
};
