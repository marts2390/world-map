// React
import React, { useEffect, useRef } from 'react';
// Mative
import { StyleSheet } from 'react-native';
// Maps
import MapView, { Marker as Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// Store
import * as Store from '@store/index';

interface MapProps {
  onMarkerPress: (id: string) => void;
}

export const Map = ({ onMarkerPress }: MapProps): React.ReactElement => {
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<number>();

  const markers = Store.useSelector((store) => store.markers.markers);
  const region = Store.useSelector((store) => store.markers.region);

  // Listen for state change and animate
  useEffect(() => {
    if (!region) return;

    mapRef.current?.animateToRegion(region);
  }, [region]);

  return (
    <MapView
      ref={mapRef}
      userInterfaceStyle="dark"
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}>
      {markers.map((item) => (
        <Marker
          key={item.id}
          coordinate={item.coords}
          onPress={(e) => {
            e.persist();

            markerRef.current = e.nativeEvent.coordinate.latitude;
            onMarkerPress(item.id);
          }}
        />
      ))}
    </MapView>
  );
};
