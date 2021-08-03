import {
  removeEmptyAtt,
  transforToCamelCase,
  filterLatLong,
} from '../utils';

const dataSource = {
  "id": 9094,
  "obdb_id": "bnaf-llc-austin",
  "name": "Bnaf, LLC",
  "brewery_type": "planning",
  "street": null,
  "address_2": null,
  "address_3": null,
  "city": "Austin",
  "state": "Texas",
  "county_province": null,
  "postal_code": "78727-7602",
  "country": "United States",
  "longitude": null,
  "latitude": null,
  "phone": null,
  "website_url": null,
  "updated_at": "2018-07-24T00:00:00.000Z",
  "created_at": "2018-07-24T00:00:00.000Z"
}

describe("test data transform", () => {
  it('Remove empty attributes', () => {
    const afterParse = {
      "id": 9094,
      "obdb_id": "bnaf-llc-austin",
      "name": "Bnaf, LLC",
      "brewery_type": "planning",
      "city": "Austin",
      "state": "Texas",
      "postal_code": "78727-7602",
      "country": "United States",
      "updated_at": "2018-07-24T00:00:00.000Z",
      "created_at": "2018-07-24T00:00:00.000Z"
    }
    expect(removeEmptyAtt(dataSource)).toStrictEqual(afterParse);
  });
  it('Remove empty attributes', () => {
    const afterParse = {
      "id": 9094,
      "obdbId": "bnaf-llc-austin",
      "name": "Bnaf, LLC",
      "breweryType": "planning",
      "street": null,
      "address2": null,
      "address3": null,
      "city": "Austin",
      "state": "Texas",
      "countyProvince": null,
      "postalCode": "78727-7602",
      "country": "United States",
      "longitude": null,
      "latitude": null,
      "phone": null,
      "websiteUrl": null,
      "updatedAt": "2018-07-24T00:00:00.000Z",
      "createdAt": "2018-07-24T00:00:00.000Z"
    }
    expect(transforToCamelCase(dataSource)).toStrictEqual(afterParse);
  });
  it('Remove empty empty lat and long', () => {
    const afterParse = []
    const data = [dataSource]
    expect(data.filter(filterLatLong)).toStrictEqual(afterParse);
  });
})