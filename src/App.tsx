// React
import React from 'react';
// Native
import { StatusBar, useColorScheme } from 'react-native';
// Screens
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PaperProvider } from 'react-native-paper';
import { Router } from './routes';

export const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Router />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};
