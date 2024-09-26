import { ThemeVariants, themeVariantsConst } from '@src/theme/types';

// Disabled for typeguard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTheme = (x: any): x is ThemeVariants =>
  themeVariantsConst.includes(x);
