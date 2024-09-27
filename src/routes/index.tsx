// React
import React, { useEffect } from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import { MapScreen } from '@src/screens/map-screen';
import { MarkerList } from '@src/screens/marker-list';
// Components
import { DefaultTheme, Icon } from 'react-native-paper';
// Types
import { AppRouter } from '@src/types/AppRouter';
// Store
import * as Store from '@store/index';
// Location
import Geolocation from '@react-native-community/geolocation';

const Tab = createBottomTabNavigator<AppRouter>();

const tabs: {
  name: keyof AppRouter;
  displayName: string;
  icon: string;
  component: () => React.JSX.Element;
}[] = [
  {
    name: 'MapScreen',
    displayName: 'Map',
    icon: 'earth',
    component: MapScreen,
  },
  {
    name: 'MarkerList',
    displayName: 'Markers',
    icon: 'format-list-bulleted',
    component: MarkerList,
  },
];

export const Router = (): React.ReactElement => {
  const dispatch = Store.useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      dispatch(
        Store.Markers.setRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }),
      );
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: tab.displayName,
              tabBarActiveTintColor: DefaultTheme.colors.primary,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '700',
              },
              tabBarIcon: ({ focused }) => (
                <Icon
                  size={25}
                  source={tab.icon}
                  color={
                    focused
                      ? DefaultTheme.colors.primary
                      : DefaultTheme.colors.backdrop
                  }
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
