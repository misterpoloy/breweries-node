"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = void 0;
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
