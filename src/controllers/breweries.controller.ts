import {Request, Response} from 'express';
import { getBreweries } from './../service/breweries';
import {
  transforToCamelCase,
  removeEmptyAtt,
  filterLatLong,
  sortByCreatedDate,
  groupByState,
  addRegion,
} from './../utils';

export const breweries = async (req: Request, res: Response) => {
  // Extract
  const breweriesData = await getBreweries();

  // Transform
  let parsedDataSource = breweriesData
    .map(removeEmptyAtt)      // Step 1) Remove any attributes that are null
    .map(transforToCamelCase) // Step 2) Convert the keys from snake case to camell case
    .sort(sortByCreatedDate)  // Step 3)  Sort them by created_at
    .map(addRegion)           // Step 4) Add an attribute to each brewery called region
    .filter(filterLatLong)    // Step 4.1) If does not have a longitude & latitude then filter it out (*).
                              // (* Now this can be optional)
    // Format
    const formatDataSource = groupByState(parsedDataSource); // Step 3.1) Group the breweries together by state

  // Load
  return res.json({ data: formatDataSource });
};
