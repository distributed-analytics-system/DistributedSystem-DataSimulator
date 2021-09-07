'use strict';
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

module.exports = [swaggerUI.serve, swaggerUI.setup(YAML.load('./api/swagger.yaml'))];
