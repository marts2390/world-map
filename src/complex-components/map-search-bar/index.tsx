// React
import React, { useCallback, useEffect, useState } from 'react';
// Native
import { View } from 'react-native';
// Components
import { Button, Text, TextInput } from '@src/components';
// Store
import * as Store from '@store/index';
// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from './styles';
// Animations
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const MapSearchBar = (): React.ReactElement => {
  const dispatch = Store.useDispatch();
  const [query, setQuery] = useState('');

  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

  const autoCompleteResults = Store.useSelector(
    (store) => store.markers.autoCompleteResults,
  );

  const handleSearch = useCallback((): void => {
    if (!query) return;

    dispatch(Store.Markers.handleSearch({ query })).then(() => setQuery(''));
  }, [dispatch, query]);

  const handleTextChange = (e: string): void => {
    if (!e) {
      dispatch(Store.Markers.clearAutocomplete());
    }

    setQuery(e);
  };

  // Debounce to wait for user input to end for optimisation
  useEffect(() => {
    if (!query) return;

    const delayDebounceFn = setTimeout(() => {
      dispatch(Store.Markers.getAutoCompleteResults({ query }));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, query]);

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search"
          variant="filled"
          size="small"
          value={query}
          onChangeText={(e) => handleTextChange(e)}
          rootStyle={styles.input}
          multiline={false}
        />
        <Button text="Search" size="small" onPress={handleSearch} />
      </View>
      {autoCompleteResults && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.autoComplete}>
          {autoCompleteResults?.map((item, i) => (
            <View
              key={item.place_id}
              style={{
                ...styles.autoCompleteItem,
                paddingBottom:
                  i === autoCompleteResults.length - 1
                    ? 0
                    : styles.autoCompleteItem.paddingBottom,
              }}>
              <Text variant="body-small">{item.description}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};
