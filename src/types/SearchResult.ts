export type SearchResult = {
  results: {
    formatted_address: string;
    name: string;
    place_id: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    photos: {photo_reference: string}[];
  }[];
};
