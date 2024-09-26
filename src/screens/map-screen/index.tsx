// React
import React, { useEffect, useMemo, useRef } from 'react';
// Native
import { StyleSheet, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Packages
import MapView, { Marker as Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// Components
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button, Text, TextInput } from '@src/components';

export const MapScreen = (): React.JSX.Element => {
  const dispatch = Store.useDispatch();

  const sheetRef = useRef<BottomSheetModal>(null);
  const markerRef = useRef<number>();

  const markers = Store.useSelector((store) => store.markers.markers);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    dispatch(Store.Markers.getMarkers());
  }, [dispatch]);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          zIndex: 999,
          top: 50,
          flexDirection: 'row',
          gap: 12,
          width: '100%',
        }}>
        <TextInput
          rootStyle={{ flex: 1 }}
          variant="filled"
          multiline={false}
          placeholder="Search"
        />
      </View>
      <MapView
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
            <Button
              text="Edit"
              style={{ marginBottom: 20 }}
              onPress={() => console.log('edit')}
            />
            <Button
              text="Delete marker"
              onPress={() => {
                if (!markerRef.current) return;

                dispatch(Store.Markers.removeMarker({ id: markerRef.current }));

                sheetRef.current?.dismiss();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
