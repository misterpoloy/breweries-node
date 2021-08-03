
export interface Brewery {
    id: number;
    obdb_id: string;
    name: string;
    brewery_type: string;
    street: string | null;
    address_2: string | null;
    address_3: string | null;
    city: string;
    state: string;
    county_province: string | null;
    postal_code: string;
    country: string;
    longitude: string | null;
    latitude: string | null;
    phone: string | null;
    website_url: string | null;
    updated_at: string;
    created_at: string;
};