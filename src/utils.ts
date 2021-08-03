import https from 'https';

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