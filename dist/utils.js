"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCamelcase = exports.sortByCreatedDate = exports.removeEmptyAtt = exports.filterLatLong = exports.transforToCamelCase = exports.httpGet = void 0;
const https_1 = __importDefault(require("https"));
const httpGet = (options) => {
    let output = [];
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            res.on('data', (chunk) => {
                output.push(chunk);
            });
            res.on('end', () => {
                let body = Buffer.concat(output);
                resolve(body.toString());
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.end();
    });
};
exports.httpGet = httpGet;
const transforToCamelCase = (brewery) => {
    const parsedBrewery = {};
    Object.keys(brewery).map(key => {
        parsedBrewery[exports.parseCamelcase(key)] = brewery[key];
    });
    return parsedBrewery;
};
exports.transforToCamelCase = transforToCamelCase;
const filterLatLong = (brewery) => {
    return brewery.latitude && brewery.longitude;
};
exports.filterLatLong = filterLatLong;
const removeEmptyAtt = (brewery) => {
    const parsedBrewery = {};
    Object.keys(brewery).map(key => {
        if (brewery[key]) {
            parsedBrewery[key] = brewery[key];
        }
    });
    return parsedBrewery;
};
exports.removeEmptyAtt = removeEmptyAtt;
const sortByCreatedDate = function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};
exports.sortByCreatedDate = sortByCreatedDate;
const parseCamelcase = (source) => {
    const words = source.split("_");
    let parsedWord = words[0];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        parsedWord += word.charAt(0).toUpperCase() + word.slice(1);
    }
    return parsedWord;
};
exports.parseCamelcase = parseCamelcase;
