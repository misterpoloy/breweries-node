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
const utils_1 = require("./../utils");
const breweries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // EXTRACT
    const breweriesData = yield breweries_1.getBreweries();
    // TRANSFORM
    const parsedDataSource = breweriesData
        .map(utils_1.removeEmptyAtt) // Step 1) Remove any attributes that are null
        .map(utils_1.transforToCamelCase) // Step 2) Convert the keys from snake case to camell case
        .sort(utils_1.sortByCreatedDate) // Step 3.A)  Sort them by created_at
        .filter(utils_1.filterLatLong); // Step 4.A) If does not have a longitude & latitude then filter it out.
    // Missing: 3.B Group the breweries together by state
    // Missing: 4.B Add an attribute to each brewery called region
    // const regionGroup = await getRegionsGroup()
    // dataSource.map(addRegion).map(groupByState)
    // LOAD
    return res.json({ data: parsedDataSource });
});
exports.breweries = breweries;
