import {Request, Response} from 'express';
import { getBreweries } from './../service/breweries';
import {
  transforToCamelCase,
  removeEmptyAtt,
  filterLatLong,
  sortByCreatedDate,
} from './../utils';

export const breweries = async (req: Request, res: Response) => {
  // EXTRACT
  const breweriesData = await getBreweries();
  // TRANSFORM
  
  const parsedDataSource = breweriesData
    .map(removeEmptyAtt) // Step 1) Remove any attributes that are null
    .map(transforToCamelCase) // Step 2) Convert the keys from snake case to camell case
    .sort(sortByCreatedDate) // Step 3.A)  Sort them by created_at
    .filter(filterLatLong) // Step 4.A) If does not have a longitude & latitude then filter it out.
    // Missing: 3.B Group the breweries together by state
    // Missing: 4.B Add an attribute to each brewery called region

  // const regionGroup = await getRegionsGroup()
  // dataSource.map(addRegion).map(groupByState)

  // LOAD
  return res.json({ data: parsedDataSource });
};
