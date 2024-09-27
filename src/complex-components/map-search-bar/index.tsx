import { Button, TextInput } from '@src/components';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import * as Store from '@store/index';

export const MapSearchBar = (): React.ReactElement => {
  const dispatch = Store.useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((): void => {
    if (!query) return;

    dispatch(Store.Markers.handleSearch({ query })).then(() => {
      setQuery('');
    });
  }, [dispatch, query]);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        position: 'absolute',
        zIndex: 999,
        top: 50,
        flexDirection: 'row',
        gap: 12,
        width: '100%',
      }}>
      <TextInput
        placeholder="Search"
        value={query}
        onChangeText={(e) => setQuery(e)}
        rootStyle={{ flex: 1 }}
        multiline={false}
      />
      <Button text="search" onPress={handleSearch} />
    </View>
  );
};
