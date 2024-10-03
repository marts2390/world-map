import { getSpacing } from '@src/theme/utils/spacing';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loading: {
    paddingTop: getSpacing(20, 'height'),
  },
  container: {
    paddingHorizontal: getSpacing(5, 'width'),
    paddingTop: getSpacing(5, 'height'),
    paddingBottom: getSpacing(5, 'height'),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: getSpacing(3, 'height'),
  },
  locationDetail: {
    flexDirection: 'row',
    gap: getSpacing(2, 'width'),
    marginBottom: getSpacing(2, 'height'),
  },
  image: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').width - 40,
    marginLeft: getSpacing(5, 'width'),
    borderRadius: getSpacing(2, 'width'),
  },
  reviews: {
    paddingHorizontal: getSpacing(5, 'width'),
    paddingVertical: getSpacing(5, 'height'),
  },
});
