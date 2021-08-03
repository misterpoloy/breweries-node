import {Request, Response} from 'express';
import { getBreweries } from './../service/breweries';

export const breweries = async (req: Request, res: Response) => {
  // EXTRACT
  const breweriesData = await getBreweries();
  // TRANSFORM
    // Step 1) Remove any attributes that are null from the data
    // Step 2) Convert the keys of the objects in the response from snake case to camel case
    // Step 3) Group the breweries together by state and then sort them by created_at
    // Step 4) Add an attribute to each brewery called region that adds the correct region to each brewery based on map
  // LOAD
  return res.json({ msg: `Hey ${req.body.email}, breweries!` });
};
