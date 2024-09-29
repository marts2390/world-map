// React
import React, {
  ReactElement,
  MutableRefObject,
  forwardRef,
  ForwardedRef,
  PropsWithChildren,
} from 'react';
// Native
import {
  View,
  TextInput as RnInput,
  StyleSheet,
  Pressable,
  TextStyle,
  ViewStyle,
  Platform,
  TextInputProps as RnInputProps,
} from 'react-native';
// Theme
import { Sizes, TextInputVariants, baseStyles, baseTheme } from '@src/theme';

interface TextInputProps extends RnInputProps {
  iconTestID?: string;
  pressableTestId?: string;
  variant?: TextInputVariants;
  size?: Sizes;
  icon?: ReactElement;
  inputRef?: MutableRefObject<RnInput | null>;
  rootStyle?: TextStyle;
  containerStyle?: TextStyle;
  inputStyle?: TextStyle;
  iconStyle?: ViewStyle;
  onPress?: () => void;
  onIconPress?: () => void;
}

export const TextInput = forwardRef(function Comp(
  {
    children,
    testID,
    iconTestID,
    pressableTestId,
    variant = 'outlined',
    size = 'medium',
    placeholder,
    value,
    editable,
    icon,
    rootStyle,
    inputStyle,
    iconStyle,
    containerStyle,
    onPress,
    keyboardType,
    textAlign,
    autoCorrect,
    autoCapitalize,
    multiline = true,
    numberOfLines,
    readOnly,
    autoFocus,
    scrollEnabled = true,
    onIconPress,
    onChangeText,
    maxLength = 4096,
  }: PropsWithChildren<TextInputProps>,
  ref: ForwardedRef<RnInput>,
) {
  const styles = useStyles(variant, size);

  return (
    <View style={rootStyle}>
      <Pressable
        testID={pressableTestId}
        style={styles.root}
        onPress={() => Platform.OS === 'android' && onPress && onPress()}>
        <View
          testID="input-container"
          style={{
            ...styles.container,
            ...containerStyle,
          }}>
          <RnInput
            scrollEnabled={scrollEnabled}
            dataDetectorTypes="link"
            testID={testID}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            textAlignVertical={Platform.OS === 'ios' ? 'top' : 'center'}
            autoFocus={autoFocus}
            textAlign={textAlign}
            keyboardType={keyboardType}
            ref={ref}
            numberOfLines={numberOfLines}
            onPressIn={() => Platform.OS === 'ios' && onPress && onPress()}
            placeholderTextColor={baseTheme.colors.grey}
            multiline={multiline}
            value={value}
            placeholder={placeholder}
            style={{ ...styles.input, ...inputStyle }}
            onChangeText={(e) => onChangeText && onChangeText(e)}
            editable={editable}
            maxLength={maxLength}
            readOnly={readOnly}>
            {children}
          </RnInput>
          {icon && (
            <Pressable
              testID={iconTestID}
              onPress={onIconPress || onPress}
              disabled={editable}
              style={iconStyle}>
              {icon}
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
});

const useStyles = (variant: TextInputVariants, size: Sizes) => {
  const { TextInput } = baseStyles.components;
  const variantStyles = TextInput.variants[variant];
  const sizeStyles = TextInput.sizes[size];

  return StyleSheet.create({
    root: {
      width: '100%',
    },
    container: {
      borderRadius: TextInput.defaults.borderRadius,
      borderWidth:
        variantStyles.borderWidth !== undefined
          ? variantStyles.borderWidth
          : TextInput.defaults.borderWidth,
      flexDirection: TextInput.defaults.flexDirection,
      minHeight: sizeStyles.minHeight,
      maxHeight: TextInput.defaults.maxHeight,
      alignItems: 'center',
      backgroundColor: variantStyles.backgroundColor,
      borderColor: variantStyles.borderColor,
    },
    input: {
      color: baseTheme.colors.black,
      alignSelf: 'center',
      fontSize: sizeStyles.fontSize,
      fontFamily: TextInput.defaults.fontFamily,
      flex: 15,
      width: '100%',
      height: '100%',
      paddingHorizontal:
        variantStyles.paddingHorizontal !== undefined
          ? variantStyles.paddingHorizontal
          : TextInput.defaults.paddingHorizontal,
    },
  });
};
