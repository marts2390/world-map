// React
import React, { useEffect, useRef } from 'react';
// Mative
import { StyleSheet } from 'react-native';
// Maps
import MapView, { Marker as Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// Store
import * as Store from '@store/index';

interface MapProps {
  onMarkerPress: () => void;
}

export const Map = ({ onMarkerPress }: MapProps): React.ReactElement => {
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<number>();
  const dispatch = Store.useDispatch();
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
      style={StyleSheet.absoluteFillObject}
      onLongPress={(e) => {
        e.persist();

        dispatch(
          Store.Markers.addMarker({
            marker: {
              coords: {
                longitude: e.nativeEvent.coordinate.longitude,
                latitude: e.nativeEvent.coordinate.latitude,
              },
            },
          }),
        );
      }}>
      {markers.map((item, index) => (
        <Marker
          key={index}
          coordinate={item.coords}
          onPress={(e) => {
            e.persist();

            markerRef.current = e.nativeEvent.coordinate.latitude;
            onMarkerPress();
          }}
        />
      ))}
    </MapView>
  );
};
