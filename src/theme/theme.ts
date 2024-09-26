import { wpx, hpx } from './utils/dimensions';
import { ColorTheme, ThemeMods, BaseTheme } from './types';

export const createTheme = (theme: ThemeMods): ColorTheme => {
  const isLightMode = theme === 'light';

  return {
    brand: {
      primary: isLightMode ? '#7200FF' : '#202327',
      secondary: isLightMode ? '#23E2AB' : '#202327',
      tertiary: isLightMode ? '#F78B7F' : '#202327',
      dark: isLightMode ? '#202327' : '#202327',
      light: isLightMode ? '#FFFFFF' : '#FFFFFF',
    },
    global: {
      black: '#202327',
      white: '#FFFFFF',
    },
  };
};

export const baseTheme: BaseTheme = {
  typography: {
    fonts: {
      bold: 'Poppins-Bold',
      'semi-bold': 'Poppins-Medium',
      regular: 'Poppins-Regular',
    },
    sizes: {
      'display-1': 40,
      'display-2': 32,
      h1: 24,
      h2: 20,
      h3: 18,
      h4: 16,
      'body-xlarge': 20,
      'body-large': 18,
      'body-medium': 16,
      'body-small': 14,
      'body-xsmall': 12,
      'body-xxsmall': 10,
    },
    weights: {
      bold: '700',
      'semi-bold': '600',
      regular: '400',
    },
  },
  colors: {
    black: '#202327',
    'black-2': '#1A1C20',
    white: '#FFFFFF',
  },
  sizing: {
    'base-width': wpx(4),
    'base-height': hpx(4),
  },
};
