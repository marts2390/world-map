import { getSpacing } from '@src/theme/utils/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: getSpacing(3, 'width'),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  content: {
    flex: 1,
    paddingBottom: getSpacing(5, 'height'),
  },
  rating: {
    flexDirection: 'row',
    gap: getSpacing(0.5, 'width'),
    paddingVertical: getSpacing(1, 'height'),
  },
});
