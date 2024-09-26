/**
 * Calculates the padding defined in the theme.
 *
 * @param multiplier the amount root padding should be multiplied by.
 * @param type defines which base variable to use for width or height.
 * @returns multiplied amount of base padding
 */

import { baseTheme } from '../theme';

export const getSpacing = (
  multiplier: number,
  type: 'width' | 'height',
): number => {
  const base =
    type === 'width'
      ? baseTheme.sizing['base-width']
      : baseTheme.sizing['base-height'];

  return base * multiplier;
};
