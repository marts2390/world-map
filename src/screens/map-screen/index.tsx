// React
import React, { useEffect, useMemo, useRef } from 'react';
// Native
import { StyleSheet, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Packages
import MapView, { Marker as Marker } from 'react-native-maps';
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
// Components
import { Button } from 'react-native-paper';

export const MapScreen = (): React.JSX.Element => {
  const dispatch = Store.useDispatch();

  const sheetRef = useRef<BottomSheetModal>(null);
  const markerRef = useRef<string>();

  const markers = Store.useSelector(store => store.markers.markers);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    dispatch(Store.Markers.getMarkers());
  }, [dispatch]);

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

          dispatch(
            Store.Markers.addMarker({
              coords: {
                latitude: e.nativeEvent?.coordinate.latitude,
                longitude: e.nativeEvent?.coordinate.longitude,
              },
            }),
          );
        }}>
        {markers.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coords}
            onPress={e => {
              e.persist();

              console.log(e.nativeEvent);

              markerRef.current = e.nativeEvent.id;
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
                // dispatch(Store.Markers.removeMarker({}));

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
