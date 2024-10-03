// React
import React, { PropsWithChildren, useContext } from 'react';
// Native
import {
  NativeSyntheticEvent,
  Platform,
  Text as RnText,
  StyleSheet,
  TextLayoutEventData,
  TextStyle,
} from 'react-native';
// Theme
import {
  ColorTheme,
  ThemeVariants,
  baseStyles,
  FontVariants,
  FontWeights,
  baseTheme,
} from '@src/theme';
// Animations
import Animated, {
  BaseAnimationBuilder,
  LinearTransition,
} from 'react-native-reanimated';
// Context
import { ThemeContext } from '@src/contexts/ThemeContext';

interface TextProps {
  color?: ThemeVariants | TextStyle['color'];
  variant: FontVariants;
  style?: TextStyle;
  center?: boolean;
  resetMargin?: boolean;
  resetLineheight?: boolean;
  weight?: FontWeights;
  underline?: boolean;
  numberOfLines?: number;
  maxFontSize?: number;
  testID?: string;
  animated?: boolean;
  entering?: BaseAnimationBuilder;
  exiting?: BaseAnimationBuilder;
  onPress?: () => void;
  onTextLayout?: (e: NativeSyntheticEvent<TextLayoutEventData>) => void;
}

const AnimatedText = Animated.createAnimatedComponent(RnText);

export const Text = ({
  testID,
  color,
  variant,
  style,
  children,
  center,
  resetMargin,
  resetLineheight,
  maxFontSize = 1.4,
  weight,
  underline,
  numberOfLines = 999,
  animated,
  entering,
  exiting,
  onPress,
  onTextLayout,
}: PropsWithChildren<TextProps>): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const styles = useStyles(
    theme,
    variant,
    color,
    resetMargin,
    weight,
    center,
    underline,
    resetLineheight,
  );

  return (
    <AnimatedText
      entering={animated ? entering : undefined}
      exiting={animated ? exiting : undefined}
      onTextLayout={onTextLayout}
      layout={animated ? LinearTransition.duration(200) : undefined}
      onPress={onPress}
      testID={testID}
      style={{ ...styles.root, ...style }}
      maxFontSizeMultiplier={maxFontSize}
      numberOfLines={numberOfLines}>
      {children}
    </AnimatedText>
  );
};

const useStyles = (
  theme: ColorTheme,
  variant: FontVariants,
  color?: ThemeVariants | TextStyle['color'],
  resetMargin?: boolean,
  weight?: FontWeights,
  center?: boolean,
  underline?: boolean,
  resetLineheight?: boolean,
) => {
  const variantStyles = baseStyles.typography.variants[variant];

  return StyleSheet.create({
    root: {
      lineHeight:
        Platform.OS === 'ios' && resetLineheight ? 0 : variantStyles.lineHeight,
      fontSize: variantStyles.fontSize,
      fontFamily: weight
        ? baseTheme.typography.fonts[weight]
        : variantStyles.fontFamily,
      color: color,
      textAlign: center ? 'center' : 'auto',
      textDecorationLine: underline ? 'underline' : 'none',
      marginBottom: resetMargin ? 0 : variantStyles.marginBottom,
      letterSpacing: 0,
    },
  });
};
