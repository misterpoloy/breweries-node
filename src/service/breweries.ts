import fs from 'fs';
import { httpGet } from '../utils';
import dataSource from '../config/dataSource';

const options = {
    hostname: dataSource.hostname,
    path: dataSource.path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

// 
// Search in the local cache or makes an HTTP GET call
// to the breweries data source
//
export const getBreweries = (): Promise<[]> => {
    return new Promise((resolve, reject) => {
      try {
        // we can optimize this function by adding cache expiration (more in Read.me)
        const buffer = fs.readFileSync("data/breweries.json");
        const content = buffer.toString();
        resolve(JSON.parse(content));
      } catch {
        // File not found
        httpGet(options).then((response: string) => {
          createCache(response);
          const content = JSON.parse(response)
          resolve(content);
        })
        .catch((err) => {
          reject(err);
        });
      }
    });
  }
 
export const createCache = (content: string) => {
    fs.writeFile('data/breweries.json', content, function (err) {
      if (err) return console.log(err);
      console.log('File created successfully');
    });
  }

export const getRegions = () => {
    try {
      const buffer = fs.readFileSync("data/usRegions.json");
      const content = buffer.toString();
      return JSON.parse(content);
    } catch (err) {
      console.log("Error while reading reagions", err);
      return [];
    }
  }