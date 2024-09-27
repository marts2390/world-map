// React
import React, { useCallback, useEffect } from 'react';
// Native
import { StatusBar, useColorScheme } from 'react-native';
// Screens
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PaperProvider } from 'react-native-paper';
import { Router } from './routes';
import { Provider } from './store';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const getPermissions = useCallback(async () => {
    const hasPermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (hasPermission === RESULTS.GRANTED) return;

    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }, []);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  return (
    <Provider>
      <PaperProvider>
        <ThemeContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <Router />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeContextProvider>
      </PaperProvider>
    </Provider>
  );
};
