"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breweries = void 0;
const breweries_1 = require("./../service/breweries");
const breweries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // EXTRACT
    const breweriesData = yield breweries_1.getBreweries();
    // TRANSFORM
    // Step 1) Remove any attributes that are null from the data
    // Step 2) Convert the keys of the objects in the response from snake case to camel case
    // Step 3) Group the breweries together by state and then sort them by created_at
    // Step 4) Add an attribute to each brewery called region that adds the correct region to each brewery based on map
    // LOAD
    return res.json({ msg: `Hey ${req.body.email}, breweries!` });
});
exports.breweries = breweries;
