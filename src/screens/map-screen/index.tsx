// React
import React, { useEffect, useMemo, useRef } from 'react';
// Native
import { Pressable, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Components
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapSearchBar } from '@src/complex-components/map-search-bar';
import { Details } from './components/details';
// Icons
import { Map } from './components/map';
// Styles
import { styles } from './styles';

export const MapScreen = (): React.JSX.Element => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const dispatch = Store.useDispatch();
  const results = Store.useSelector((store) => store.markers.searchResult);

  useEffect(() => {
    dispatch(Store.Markers.getMarkers());
  }, [dispatch]);

  useEffect(() => {
    if (!results) return;

    sheetRef.current?.present();
  }, [results]);

  return (
    <View style={styles.root}>
      <MapSearchBar />
      <Map onMarkerPress={() => sheetRef.current?.present()} />
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
