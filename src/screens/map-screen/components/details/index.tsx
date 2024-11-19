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
import { useStyles } from './styles';
// Animations
import Animated, { FadeIn } from 'react-native-reanimated';
import { getSpacing } from '@src/theme/utils/spacing';

export const Details = (): React.ReactElement => {
  const dispatch = Store.useDispatch();

  const details = Store.useSelector((store) => store.markers.details);
  const photos = Store.useSelector((store) => store.markers.placePhotos);
  const markers = Store.useSelector((store) => store.markers.markers);
  const loading = Store.useSelector((store) => store.markers.detailsLoading);

  const styles = useStyles(photos.length > 1);

  const isSaved = useMemo(
    () => !!markers.find((item) => item.id === details?.place_id),
    [markers, details],
  );

  const handleSaveRemove = useCallback((): void => {
    if (!details) return;

    if (!isSaved) {
      Store.Markers.updateMarkers(markers);

      return;
    }

    dispatch(Store.Markers.removeMarker({ id: details.place_id }));
  }, [details, isSaved, dispatch, markers]);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Animated.View entering={FadeIn}>
          <View style={styles.container}>
            <Button
              size="small"
              style={styles.button}
              text={isSaved ? 'Remove' : 'Save'}
              icon={
                <Icon
                  name={isSaved ? 'close' : 'bookmark-outline'}
                  color={baseTheme.colors.white}
                  size={20}
                />
              }
              iconPosition="end"
              onPress={handleSaveRemove}
            />
            <View style={styles.title}>
              {details && (
                <Text variant="display-2" weight="bold" resetMargin>
                  {details.name}
                </Text>
              )}
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
                      <Text
                        style={{ flex: 1 }}
                        variant="body-small"
                        weight="semi-bold"
                        resetLineheight>
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
            renderItem={({ item, index }) => (
              <Image
                blob={item}
                styles={{
                  ...styles.image,
                  marginRight:
                    index === photos.length - 1 ? getSpacing(5, 'width') : 0,
                }}
              />
            )}
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
