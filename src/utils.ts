import https from 'https';
import { Brewery } from './models/brewery';

export const httpGet = (options) => {
    let output = [];
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {  
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

  export const transforToCamelCase = (brewery: Brewery) => {
    const parsedBrewery = {};
    Object.keys(brewery).map(key => {
      parsedBrewery[parseCamelcase(key)] = brewery[key];
    })
    return parsedBrewery;
  }

  export const filterLatLong = (brewery: Brewery) => {
    return brewery.latitude && brewery.longitude;
  }

  export const removeEmptyAtt = (brewery: Brewery) => {
    const parsedBrewery = {};
    Object.keys(brewery).map(key => {
      if (brewery[key]) {
        parsedBrewery[key] = brewery[key];
      }
    })
    return parsedBrewery;
  };

  export const sortByCreatedDate = function(a: Brewery, b: Brewery) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  };

  export const parseCamelcase = (source: string) : string => {
    const words = source.split("_");
    let parsedWord = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      parsedWord += word.charAt(0).toUpperCase() + word.slice(1);
    }
    return parsedWord;
  }