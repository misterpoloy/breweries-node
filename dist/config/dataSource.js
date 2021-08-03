"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    hostname: process.env.DATASOURCE_HOSTNAME || 'api.openbrewerydb.org',
    path: process.env.DATASOURCE_PATH || '/breweries',
};
