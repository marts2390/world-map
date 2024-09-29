// React
import React, { Fragment } from 'react';
// Native
import { View } from 'react-native';
// Components
import { Image, Text } from '@src/components';
// Types
import { PlaceReview } from '@src/types/PlaceDetails';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// styles
import { styles } from './styles';

interface ReviewProps {
  item: PlaceReview;
}

export const Review = ({ item }: ReviewProps): React.ReactElement => (
  <View style={styles.root}>
    <Image styles={styles.image} source={{ uri: item.profile_photo_url }} />
    <View style={styles.content}>
      <Text variant="body-large" weight="semi-bold">
        {item.author_name}
      </Text>
      <View style={styles.rating}>
        {[...Array(5).keys()].map((i) => (
          <Fragment key={i}>
            {item.rating > i ? (
              <Icon name="star" size={15} color="#FFD700" />
            ) : (
              <Icon name="star-outline" size={15} color="#FFD700" />
            )}
          </Fragment>
        ))}
      </View>
      <Text style={styles.text} variant="body-small">
        {item.text}
      </Text>
    </View>
  </View>
);
