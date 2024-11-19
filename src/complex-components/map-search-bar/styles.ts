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
      shadowColor: baseTheme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
      borderRadius: getSpacing(2, 'width'),
      shadowColor: baseTheme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    autoCompleteItem: {
      paddingBottom: getSpacing(3, 'height'),
    },
  });
