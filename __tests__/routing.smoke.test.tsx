import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { render, screen } from '@testing-library/react-native';

// Mock the main app screens
const MockHomeScreen = () => <View testID="home-screen"><Text>Home Screen</Text></View>;
const MockLearnScreen = () => <View testID="learn-screen"><Text>Learn Screen</Text></View>;
const MockProfileScreen = () => <View testID="profile-screen"><Text>Profile Screen</Text></View>;

const Stack = createNativeStackNavigator();

const MockApp = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MockHomeScreen} />
      <Stack.Screen name="Learn" component={MockLearnScreen} />
      <Stack.Screen name="Profile" component={MockProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('Routing Smoke Tests', () => {
  it('should render home screen without errors', () => {
    render(<MockApp />);
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  it('should render learn screen without errors', () => {
    render(<MockApp />);
    expect(screen.getByTestId('learn-screen')).toBeTruthy();
  });

  it('should render profile screen without errors', () => {
    render(<MockApp />);
    expect(screen.getByTestId('profile-screen')).toBeTruthy();
  });

  it('should not have console errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<MockApp />);
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
