import { getSpacing } from '@src/theme/utils/spacing';
import { Dimensions, StyleSheet } from 'react-native';

export const useStyles = (hasPhotos: boolean) =>
  StyleSheet.create({
    loading: {
      paddingTop: getSpacing(20, 'height'),
    },
    container: {
      paddingHorizontal: getSpacing(5, 'width'),
    },
    title: {
      paddingVertical: getSpacing(4, 'height'),
    },
    button: {
      alignSelf: 'flex-start',
    },
    locationDetail: {
      flexDirection: 'row',
      gap: getSpacing(2, 'width'),
      marginBottom: getSpacing(2, 'height'),
    },
    image: {
      width: Dimensions.get('screen').width - (hasPhotos ? 80 : 40),
      height: Dimensions.get('screen').width - (hasPhotos ? 80 : 40),
      marginLeft: getSpacing(5, 'width'),
      borderRadius: getSpacing(2, 'width'),
    },
    reviews: {
      paddingHorizontal: getSpacing(5, 'width'),
      paddingVertical: getSpacing(5, 'height'),
    },
  });
