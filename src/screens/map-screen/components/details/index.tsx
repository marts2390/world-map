// React
import React from 'react';
// Native
import { FlatList, View } from 'react-native';
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

export const Details = (): React.ReactElement => {
  const details = Store.useSelector((store) => store.markers.details);
  const results = Store.useSelector((store) => store.markers.searchResult);
  const photos = Store.useSelector((store) => store.markers.placePhotos);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          {results && (
            <Text variant="display-2" resetMargin weight="semi-bold">
              {results[0].name}
            </Text>
          )}
          <Button
            size="small"
            variant="outlined"
            text="Add"
            onPress={() => console.log('edit')}
          />
        </View>
        {[details?.formatted_address, details?.formatted_phone_number].map(
          (item) => (
            <>
              {item && (
                <View style={styles.locationDetail} key={item}>
                  <Icon
                    name="place"
                    size={25}
                    color={baseTheme.colors.primary}
                  />
                  <Text variant="body-small">{item}</Text>
                </View>
              )}
            </>
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
    </>
  );
};
