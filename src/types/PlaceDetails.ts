import { Geometry } from './Geometry';

export type PlaceReview = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number;
};

export type PlaceDetails = {
  result: {
    name: string;
    place_id: string;
    formatted_address?: string;
    formatted_phone_number?: string;
    geometry: Geometry;
    editorial_summary?: {
      overview: string;
    };
    photos: {
      photo_reference: string;
    }[];
    reviews?: PlaceReview[];
  };
};
