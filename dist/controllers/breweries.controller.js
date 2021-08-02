"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breweries = void 0;
const breweries = (req, res) => {
    return res.json({ msg: `Hey ${req.body.email}, breweries!` });
};
exports.breweries = breweries;
