//import https from 'https';
//import fs from 'fs';
const https = require('https');
const fs = require('fs');
const options = {
    hostname: 'api.openbrewerydb.org',
    path: '/breweries',
    method: 'GET'
};
let path = 'ghetto_gospel.txt';
const req = https.request(options, res => {
    let data = [];
    res.on('data', d => {
        //process.stdout.write(d)
        data.push(d);
    });
    res.on('end', d => {
        // write some data with a utf-8 encoding
        var body = Buffer.concat(data);
        // open the file in writing mode, adding a callback function where we do the actual writing
        fs.open(path, 'w', function (err, fd) {
            if (err)
                throw 'error while loading cash: ' + err;
            // write the contents of the buffer, from position 0 to the end
            fs.write(fd, body, 0, body.length, null, function (err) {
                if (err)
                    throw 'error writing file: ' + err;
                fs.close(fd, function () {
                    console.log('wrote the file successfully');
                });
            });
        });
    });
});
req.on('error', error => {
    console.error(error);
});
req.end();
