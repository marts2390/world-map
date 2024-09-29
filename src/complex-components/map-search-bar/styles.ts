import { baseTheme } from '@src/theme';
import { getSpacing } from '@src/theme/utils/spacing';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      paddingHorizontal: getSpacing(5, 'width'),
      position: 'absolute',
      zIndex: 999,
      top: insets.top,
      width: '100%',
    },
    inputContainer: {
      flexDirection: 'row',
      gap: getSpacing(3, 'width'),
    },
    input: {
      flex: 1,
    },
    icon: {
      paddingRight: getSpacing(3, 'width'),
    },
    button: {
      width: getSpacing(20, 'width'),
    },
    autoComplete: {
      marginTop: getSpacing(3, 'height'),
      paddingHorizontal: getSpacing(3, 'width'),
      paddingVertical: getSpacing(4, 'height'),
      backgroundColor: baseTheme.colors.white,
      borderRadius: getSpacing(4, 'width'),
    },
    autoCompleteItem: {
      paddingBottom: getSpacing(3, 'height'),
    },
  });
