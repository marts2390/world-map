// React
import React from 'react';
// Native
import { StyleSheet, ViewStyle, requireNativeComponent } from 'react-native';
// Store
import * as Store from '@store/index';
// Types
import { Marker } from '@src/types/Marker';

interface MapViewProps {
  style?: ViewStyle;
  mapType?:
    | 'standard'
    | 'satellite'
    | 'hybrid'
    | 'satelliteFlyover'
    | 'hybridFlyover';
  onMarkerPress: (event: {nativeEvent: {id: string}}) => void;
  markers: Marker[];
  region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapView = requireNativeComponent<MapViewProps>('MapView');

interface MapProps {
  onMarkerPress: (id: string) => void;
}

export const Map = ({ onMarkerPress }: MapProps): React.ReactElement => {
  const markers = Store.useSelector((store) => store.markers.markers);
  const region = Store.useSelector((store) => store.markers.region);

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      region={region || undefined}
      markers={markers}
      onMarkerPress={(e) => onMarkerPress(e.nativeEvent.id)}
    />
  );
};
