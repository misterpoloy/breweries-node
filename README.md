# Brewerie 🍺:
REST API Project using Typescript and Express JS

- Stack
- About
- Installation
- Commands
- Test
- API
- Notes

# About
## Juan Pablo Ortiz
[Personal blog](https://janpoloy.medium.com/)

[Youtube](https://www.youtube.com/channel/UCq6ovz_eDOFlUHy2ea-ukjA/videos/)

# Stack used:
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport](http://www.passportjs.org/)

# Installation
## Pre requisites:
[Node](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/) and npm installed

[Mongo](https://docs.mongodb.com/guides/server/install/) installed [Link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) Instructions for Mac

### Install dependencies:

```
npm install
```

Build and run server in dev
> Note: By default runs in http://localhost:3000/ you can modify this settings in the `/config` files.

```
npm dev
```

You should see the following message:

```
Found 0 errors. Watching for file changes.
Listening on http://localhost:3000
Mongodb Connection stablished
```
# Commands
Create build compilation and generate `/dist` folder with compiled TS.
```
yarn build
```

Launch Node project from `/dist`
```
yarn start
```

# Test
Unit test are included, for the record with more time we can include API integration tests.
```
yarn test
```


# API
> `/breweries` is protected by default so you should `/signup` and then `/signin` to retrieke your jwt token and send it as a header Authorization Bearer token

## Postman
You can use the postman collection .json in the `breweries.postman_collection.json` file.

# /signup
HTTP POST /signup

```
POST /signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 62

{
    "email": "user@domain.com",
    "password": "securePassword"
}
```
Example in CURL
```
curl --location --request POST 'http://localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@domain.com",
    "password": "securePassword"
}'
```

# /signin
HTTP POST /signup
returns **token**.

```
POST /signin HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 62

{
    "email": "user@domain.com",
    "password": "securePassword"
}
```
Example in CURL
```
curl --location --request POST 'http://localhost:3000/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@domain.com",
    "password": "securePassword"
}'
```

Example of responsse
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDgxNjBjMTVhOWI5MmZhZTVkZjgzNyIsImVtYWlsIjoianBAY2FsYXBzLmNvbSIsImlhdCI6MTYyODAwNzM4NCwiZXhwIjoxNjI4MDkzNzg0fQ.qezyCf_k3WCfbJiTWivp9eCspMB0veRTtETrsDPq4TA"
}
```

# /breweries

```
GET /breweries HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer {paste_token}
Content-Length: 22

"<file contents here>"
```
Example in CURL
```
curl --location --request GET 'http://localhost:3000/breweries' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {paste_token}' \
--data-binary '@'
```

Example of response:
```
{
    "data": {
        "Colorado": [
            {
                "id": 9180,
                "obdbId": "boulder-beer-co-boulder",
                "name": "Boulder Beer Co",
                "breweryType": "regional",
                "street": "2880 Wilderness Pl",
                "city": "Boulder",
                "state": "Colorado",
                "postalCode": "80301-5401",
                "country": "United States",
                "longitude": "-105.2480158",
                "latitude": "40.026439",
                "updatedAt": "2018-08-24T00:00:00.000Z",
                "createdAt": "2018-07-24T00:00:00.000Z",
                "region": "West"
            }
        ]
        {...}
    }
}
```



# Notes 
Data source: https://api.openbrewerydb.org/breweries
The /breweries endpoint of your API should be tested with Jest and secured using Passport.
Acceptance criteria of the ETL:
Step 1) Remove any attributes that are null from the data
Step 2) Convert the keys of the objects in the response from snake case to camel case (e.g. “postal_code” -> “postalCode”)
Step 3) Group the breweries together by state and then sort them by created_at so the most recent ones come first.
Step 4) Add an attribute to each brewery called region that adds the correct region to each brewery based on this map: https://www.worldatlas.com/articles/the-regions-of-the-united-states.html (hint - take a look at the GPS coordinates for the United States and then use the longitude & latitude attributes for each brewery to compute this). If the brewery does not have a longitude & latitude then filter it out.


Notes:
When working in Node my favorite framework is NestJS for this example I did not use anything but express.js
In order to secure /breweries I decide to go with the jwt-passport strategy, so the servers need to generate a JWT token. So include the barear token in the headers is the secure method.

About the data source ping the query multiple times may be expensive, and it does not look is going to change. So a naiv cache tecnique I implement was to store the information on the `/data` directory. If you want to refresh the cache you can delete the file. A better approach for production would be to use some load balancer cache system. 

My first approach about step #4 was to manually trigger each result by the lat and long, but since the state property is always present I think a clever idea would be to store the regions locally since it's not going to change.
https://github.com/cphalpert/census-regions/blob/master/us%20census%20bureau%20regions%20and%20divisions.csv Then I parse it and get a JSON
