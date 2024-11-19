// React
import React, { useCallback, useEffect, useState } from 'react';
// Native
import { ActivityIndicator, Pressable, View } from 'react-native';
// Components
import { Text, TextInput } from '@src/components';
// Store
import * as Store from '@store/index';
// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from './styles';
// Animations
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MapSearchBar = (): React.ReactElement => {
  const dispatch = Store.useDispatch();
  const [query, setQuery] = useState('');

  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

  const loading = Store.useSelector((store) => store.markers.resultsLoading);
  const autoCompleteResults = Store.useSelector(
    (store) => store.markers.autoCompleteResults,
  );

  const handleSearch = useCallback(
    (e?: string): void => {
      if (!query) return;

      dispatch(Store.Markers.handleSearch({ query: e || query })).then(() =>
        setQuery(''),
      );
    },
    [dispatch, query],
  );

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
          iconStyle={styles.icon}
          icon={
            loading ? (
              <ActivityIndicator />
            ) : (
              <Icon name="search" onPress={() => handleSearch()} size={25} />
            )
          }
        />
      </View>
      {!!autoCompleteResults && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}>
          <View style={styles.autoComplete}>
            {autoCompleteResults?.map((item, i) => (
              <Pressable
                key={item.place_id}
                onPress={() => handleSearch(item.description)}
                style={{
                  ...styles.autoCompleteItem,
                  paddingBottom:
                    i === autoCompleteResults.length - 1
                      ? 0
                      : styles.autoCompleteItem.paddingBottom,
                }}>
                <Text variant="body-small">{item.description}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
};
