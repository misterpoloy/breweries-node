"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCache = exports.getBreweries = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
const dataSource_1 = __importDefault(require("../config/dataSource"));
const options = {
    hostname: dataSource_1.default.hostname,
    path: dataSource_1.default.path,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
// 
// Search in the local cache or makes an HTTP GET call
// to the breweries data source
//
const getBreweries = () => {
    return new Promise((resolve, reject) => {
        try {
            // we can optimize this function by adding cache expiration (more in Read.me)
            const buffer = fs_1.default.readFileSync("data/breweries.json");
            const content = buffer.toString();
            resolve(JSON.parse(content));
        }
        catch (_a) {
            // File not found
            utils_1.httpGet(options).then((response) => {
                exports.createCache(response);
                const content = JSON.parse(response);
                resolve(content);
            })
                .catch((err) => {
                reject(err);
            });
        }
    });
};
exports.getBreweries = getBreweries;
const createCache = (content) => {
    fs_1.default.writeFile('data/breweries.json', content, function (err) {
        if (err)
            return console.log(err);
        console.log('File created successfully');
    });
};
exports.createCache = createCache;
