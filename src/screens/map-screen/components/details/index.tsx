// React
import React, { Fragment, useCallback, useMemo } from 'react';
// Native
import { ActivityIndicator, FlatList, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Components
import { Button, Text, Image } from '@src/components';
import { Review } from '../review';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Theme
import { baseTheme } from '@src/theme';
// Styles
import { styles } from './styles';
// Animations
import Animated, { FadeIn } from 'react-native-reanimated';

export const Details = (): React.ReactElement => {
  const dispatch = Store.useDispatch();

  const details = Store.useSelector((store) => store.markers.details);
  const photos = Store.useSelector((store) => store.markers.placePhotos);
  const markers = Store.useSelector((store) => store.markers.markers);
  const loading = Store.useSelector((store) => store.markers.detailsLoading);

  const isSaved = useMemo(
    () => !!markers.find((item) => item.id === details?.place_id),
    [markers, details],
  );

  const handleAdd = useCallback((): void => {
    if (!details) return;

    if (!isSaved) {
      dispatch(
        Store.Markers.addMarker({
          marker: {
            id: details.place_id,
            coords: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            },
          },
        }),
      );

      return;
    }

    dispatch(Store.Markers.removeMarker({ id: details.place_id }));
  }, [details, isSaved, dispatch]);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Animated.View entering={FadeIn}>
          <View style={styles.container}>
            <View style={styles.title}>
              {details && (
                <Text
                  style={{ flex: 0.75 }}
                  variant="display-2"
                  weight="semi-bold">
                  {details.name}
                </Text>
              )}
              <Button
                size="small"
                style={{ flex: 0.25, marginTop: 8 }}
                text={isSaved ? 'Remove' : 'Save'}
                onPress={handleAdd}
              />
            </View>
            {[details?.formatted_address, details?.formatted_phone_number].map(
              (item, i) =>
                item && (
                  <Fragment key={item}>
                    <View style={styles.locationDetail}>
                      <Icon
                        name={i === 0 ? 'place' : 'phone'}
                        size={25}
                        color={baseTheme.colors.primary}
                      />
                      <Text style={{ flex: 1 }} variant="body-small">
                        {item}
                      </Text>
                    </View>
                  </Fragment>
                ),
            )}
            <Text variant="body-medium">
              {details?.editorial_summary?.overview}
            </Text>
          </View>
          <FlatList
            horizontal
            data={photos}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Image blob={item} styles={styles.image} />}
          />
          <FlatList
            data={details?.reviews}
            scrollEnabled={false}
            contentContainerStyle={styles.reviews}
            renderItem={({ item }) => <Review item={item} />}
          />
        </Animated.View>
      )}
    </>
  );
};
