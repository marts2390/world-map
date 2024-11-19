// React
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
// Native
import { Pressable, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Components
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapSearchBar } from '@src/complex-components/map-search-bar';
import { Details } from './components/details';
import { Map } from './components/map';
// Styles
import { styles } from './styles';

export const MapScreen = (): React.JSX.Element => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const dispatch = Store.useDispatch();
  const details = Store.useSelector((store) => store.markers.details);

  const getDetails = useCallback(
    (id: string): void => {
      sheetRef.current?.present();

      dispatch(Store.Markers.getPlaceDetails({ id }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(Store.Markers.getMarkers());
  }, [dispatch]);

  useEffect(() => {
    if (!details) return;

    sheetRef.current?.present();
  }, [details]);

  return (
    <View style={styles.root}>
      <MapSearchBar />
      <Map onMarkerPress={getDetails} />
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        backdropComponent={() => (
          <Pressable
            style={styles.backdrop}
            onPress={() => sheetRef.current?.dismiss()}
          />
        )}>
        <BottomSheetScrollView>
          <Details />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
