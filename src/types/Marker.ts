import { LatLng } from 'react-native-maps';

export type Marker = {
  coords: LatLng;
  id: string;
  title?: string;
};
