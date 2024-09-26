import { TextStyle, ViewStyle } from 'react-native';

export type ThemeMods = 'dark' | 'light';

export type Fonts = 'bold' | 'semi-bold' | 'regular';

export type Sizes = 'xsmall' | 'small' | 'medium' | 'large';

export type SkeletonSizes =
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large';

export type FontWeights = 'bold' | 'semi-bold' | 'regular';

export const themeVariantsConst = [
  'primary',
  'secondary',
  'tertiary',
  'dark',
  'light',
] as const;

export type ThemeVariants = (typeof themeVariantsConst)[number];

export type ProfileImageVariants =
  | 'outlined-light'
  | 'outlined-dark'
  | 'no-outline';

export type ButtonVariants = 'filled' | 'outlined' | 'ghost';

export type CardVariants = 'no-padding' | 'outlined';

export type FontVariants =
  | 'display-1'
  | 'display-2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-xlarge'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'body-xsmall'
  | 'body-xxsmall';

export type TextInputVariants = 'filled' | 'outlined' | 'ghost';

export type BaseTheme = {
  typography: {
    fonts: Record<Fonts, string>;
    sizes: Record<FontVariants, number>;
    weights: Record<FontWeights, TextStyle['fontWeight']>;
  };
  colors: Record<string, string>;
  sizing: {
    'base-width': number;
    'base-height': number;
  };
};

export type ColorTheme = {
  brand: Record<ThemeVariants, string>;
  global: Record<string, string>;
};

type Styles = TextStyle & ViewStyle;

type ComponentObj<T extends string, A extends string> = {
  defaults: Styles;
  variants: Record<T, Styles>;
  sizes: Record<A, Styles>;
};

export type BaseStyles = {
  typography: {
    variants: Record<FontVariants, TextStyle>;
    weights: Record<FontWeights, TextStyle['fontWeight']>;
  };
  components: {
    Button: ComponentObj<ButtonVariants, Sizes>;
    TextInput: ComponentObj<TextInputVariants, Sizes>;
  };
};
