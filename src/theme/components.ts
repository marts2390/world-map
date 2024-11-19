import { baseTheme } from './theme';
import { BaseStyles } from './types';
import { getSpacing } from './utils/spacing';

const { typography } = baseTheme;

export const baseStyles: BaseStyles = {
  typography: {
    variants: {
      'display-1': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['display-1'],
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(3, 'height'),
      },
      'display-2': {
        fontFamily: typography.fonts.bold,
        fontSize: typography.sizes['display-2'],
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(3, 'height'),
      },
      h1: {
        fontFamily: typography.fonts.bold,
        fontSize: typography.sizes.h1,
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(3, 'height'),
      },
      h2: {
        fontFamily: typography.fonts.bold,
        fontSize: typography.sizes.h2,
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(3, 'height'),
      },
      h3: {
        fontFamily: typography.fonts.bold,
        fontSize: typography.sizes.h3,
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(2, 'height'),
      },
      h4: {
        fontFamily: typography.fonts.bold,
        fontSize: typography.sizes.h4,
        fontWeight: typography.weights.bold,
        marginBottom: getSpacing(3, 'height'),
      },
      'body-xlarge': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-xlarge'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
      'body-large': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-large'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
      'body-medium': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-medium'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
      'body-small': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-small'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
      'body-xsmall': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-xsmall'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
      'body-xxsmall': {
        fontFamily: typography.fonts.regular,
        fontSize: typography.sizes['body-xxsmall'],
        fontWeight: typography.weights.regular,
        lineHeight: 28,
      },
    },
    weights: {
      bold: typography.weights.bold,
      'semi-bold': typography.weights['semi-bold'],
      regular: typography.weights.regular,
    },
  },
  components: {
    Button: {
      defaults: {
        fontFamily: typography.fonts.regular,
        borderWidth: 3,
        borderRadius: getSpacing(2, 'width'),
        paddingVertical: getSpacing(4, 'width'),
        paddingHorizontal: getSpacing(4, 'width'),
      },
      sizes: {
        xsmall: {
          paddingVertical: getSpacing(1, 'width'),
          paddingHorizontal: getSpacing(1, 'width'),
        },
        small: {
          paddingVertical: getSpacing(1, 'width'),
          paddingHorizontal: getSpacing(2, 'width'),
        },
        medium: {
          paddingVertical: getSpacing(2, 'width'),
          paddingHorizontal: getSpacing(4, 'width'),
        },
        large: {
          paddingVertical: getSpacing(4, 'width'),
          paddingHorizontal: getSpacing(6, 'width'),
          minHeight: getSpacing(15, 'height'),
        },
      },
      variants: {
        filled: {
          color: baseTheme.colors.white,
        },
        outlined: {
          backgroundColor: 'transparent',
        },
        ghost: {
          elevation: 0,
          borderColor: 'none',
          backgroundColor: "rgba('white', 0)",
          paddingVertical: 0,
          paddingHorizontal: 0,
          minHeight: 0,
        },
      },
    },
    TextInput: {
      defaults: {
        borderWidth: 0,
        borderRadius: getSpacing(2, 'width'),
        flexDirection: 'row',
        fontSize: baseTheme.typography.sizes['body-large'],
        fontFamily: baseTheme.typography.fonts.regular,
        paddingHorizontal: getSpacing(4, 'width'),
      },
      sizes: {
        xsmall: {
          minHeight: getSpacing(10, 'height'),
          fontSize: baseTheme.typography.sizes['body-xsmall'],
        },
        small: {
          fontSize: baseTheme.typography.sizes['body-small'],
          minHeight: getSpacing(10, 'height'),
        },
        medium: {
          minHeight: getSpacing(12.5, 'height'),
          fontSize: baseTheme.typography.sizes['body-medium'],
        },
        large: {
          minHeight: getSpacing(12.5, 'height'),
          fontSize: baseTheme.typography.sizes['body-large'],
        },
      },
      variants: {
        filled: {
          backgroundColor: baseTheme.colors.white,
          borderColor: baseTheme.colors['off-white'],
        },
        outlined: {
          backgroundColor: baseTheme.colors.white,
          borderColor: baseTheme.colors['off-white'],
        },
        ghost: {
          borderWidth: 0,
          paddingHorizontal: 0,
          borderColor: 'transparent',
        },
      },
    },
  },
};
