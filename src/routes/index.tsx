// React
import React, { useEffect } from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import { MapScreen } from '@src/screens/map-screen';
import { MarkerList } from '@src/screens/marker-list';
// Types
import { AppRouter } from '@src/types/AppRouter';
// Store
import * as Store from '@store/index';
// Location
import Geolocation from '@react-native-community/geolocation';
// Theme
import { baseTheme } from '@src/theme';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    icon: 'public',
    component: MapScreen,
  },
  {
    name: 'MarkerList',
    displayName: 'Markers',
    icon: 'list',
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
              tabBarActiveTintColor: baseTheme.colors.primary,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '700',
              },
              tabBarIcon: ({ focused }) => (
                <Icon
                  size={25}
                  name={tab.icon}
                  color={
                    focused ? baseTheme.colors.primary : baseTheme.colors.black
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
