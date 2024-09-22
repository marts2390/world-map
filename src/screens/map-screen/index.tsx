// React
import React, { useMemo, useRef, useState } from 'react';
// Native
import { StyleSheet, View } from 'react-native';
// Store
import MapView, { LatLng, Marker } from 'react-native-maps';
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';

type Pointer = {
  coords: LatLng;
  title?: string;
};

export const MapScreen = (): React.JSX.Element => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const markerRef = useRef<number>();
  const [markers, setMarkers] = useState<Pointer[]>([]);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        onLongPress={e => {
          e.persist();

          setMarkers(prev => [
            ...prev,
            {
              coords: {
                latitude: e.nativeEvent?.coordinate.latitude,
                longitude: e.nativeEvent?.coordinate.longitude,
              },
            },
          ]);
        }}>
        {markers.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coords}
            onPress={e => {
              e.persist();

              markerRef.current = e.nativeEvent.coordinate.latitude;
              sheetRef.current?.present();
            }}
          />
        ))}
      </MapView>
      <BottomSheetModal ref={sheetRef} snapPoints={snapPoints}>
        <BottomSheetView>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Button style={{ marginBottom: 20 }} mode="contained">
              Edit
            </Button>
            <Button
              onPress={() => {
                setMarkers(prev =>
                  prev.filter(
                    item => item.coords.latitude !== markerRef.current,
                  ),
                );

                sheetRef.current?.dismiss();
              }}
              mode="outlined">
              Delete marker
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
