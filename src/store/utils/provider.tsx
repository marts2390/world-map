import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../index';
import { EnhancedStore } from '@reduxjs/toolkit';

export const Provider = ({
  children,
  testStore,
}: {
  children: React.ReactElement | React.ReactElement[];
  testStore?: EnhancedStore;
}): React.ReactElement => (
  <ReduxProvider store={testStore || store}>{children}</ReduxProvider>
);
