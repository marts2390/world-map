import { Geometry } from './Geometry';

export type SearchResult = {
  results: {
    formatted_address: string;
    name: string;
    place_id: string;
    geometry: Geometry;
    photos: {photo_reference: string}[];
  }[];
};
