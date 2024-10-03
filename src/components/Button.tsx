// React
import React, { useContext } from 'react';
// React Native
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
// Components
import { Text } from './Text';
// Theme
import { ThemeContext } from '@src/contexts/ThemeContext';
import {
  ButtonVariants,
  ThemeVariants,
  Sizes,
  ColorTheme,
  baseStyles,
  baseTheme,
  FontWeights,
} from '@src/theme';
// Utils
import { getSpacing } from '@src/theme/utils/spacing';
import { isTheme } from '@src/theme/utils/isTheme';

export interface ButtonProps {
  text: string;
  testID?: string;
  textTestID?: string;
  iconTestID?: string;
  color?: ThemeVariants | string;
  variant?: ButtonVariants;
  size?: Sizes;
  disabled?: boolean;
  weight?: FontWeights;
  style?: ViewStyle;
  fontStyle?: TextStyle;
  contentStyle?: ViewStyle;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  underline?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

export const Button = ({
  text,
  testID,
  textTestID,
  iconTestID,
  disabled,
  onPress,
  style,
  fontStyle,
  loading,
  contentStyle,
  icon,
  weight,
  fullWidth,
  underline,
  iconPosition = 'start',
  color = 'primary',
  variant = 'filled',
  size = 'medium',
}: ButtonProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const styles = useStyles(
    variant,
    size,
    color,
    theme,
    disabled,
    fullWidth,
    underline,
  );

  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => !loading && onPress()}
      style={{ ...styles.root, ...style }}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          color={baseTheme.colors.white}
          testID="test-loader"
        />
      ) : (
        <View style={{ ...styles.buttonContent, ...contentStyle }}>
          {icon && iconPosition === 'start' && (
            <View style={styles.iconStart} testID={`${iconTestID}-start`}>
              {icon}
            </View>
          )}
          <Text
            testID={textTestID}
            center
            variant={`body-${size}`}
            weight={weight ? weight : variant === 'ghost' ? 'regular' : 'bold'}
            style={{ ...styles.text, ...fontStyle }}>
            {text}
          </Text>
          {icon && iconPosition === 'end' && (
            <View testID={`${iconTestID}-end`}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const useStyles = (
  variant: ButtonVariants,
  size: Sizes,
  color: ThemeVariants | string,
  theme: ColorTheme,
  disabled?: boolean,
  fullWidth?: boolean,
  underline?: boolean,
) => {
  const { Button } = baseStyles.components;

  const getColor = (color: string): string => {
    if (isTheme(color)) return theme.brand[color];

    return color;
  };

  const themeColor = getColor(color);
  const variantStyles = Button.variants[variant];
  const sizeStyles = Button.sizes[size];

  return StyleSheet.create({
    root: {
      ...Button.defaults,
      ...sizeStyles,
      ...variantStyles,
      width: fullWidth ? '100%' : 'auto',
      borderWidth: variant === 'ghost' ? 0 : Button.defaults.borderWidth,
      justifyContent: 'center',
      borderColor: disabled
        ? baseTheme.colors.disabled
        : variantStyles.borderColor || themeColor,
      backgroundColor: disabled
        ? baseTheme.colors.disabled
        : variantStyles.backgroundColor || themeColor,
    },
    buttonContent: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    iconStart: {
      marginRight: getSpacing(2, 'width'),
    },
    text: {
      height: '100%',
      textDecorationLine: underline ? 'underline' : undefined,
      textDecorationColor: themeColor,
      color:
        color === 'grey' || color === 'light'
          ? baseTheme.colors.black
          : disabled
            ? theme.global['text-dark']
            : variantStyles.color || themeColor,
    },
  });
};
