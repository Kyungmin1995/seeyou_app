import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootNavigation} from './src/pages/RootNavigation';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootTopTabsParamList} from './src/utils/RootParamList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const Tab = createMaterialTopTabNavigator<RootTopTabsParamList>();

export const getAndroidStatusBarHeight = (): any => {
  if (Platform.OS === 'android') return StatusBar.currentHeight;
  return 0;
};

const queryClient = new QueryClient();
const store = Store;

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
              <NavigationContainer>
                <RootNavigation />
              </NavigationContainer>
            </GestureHandlerRootView>
          </Provider>
        </KeyboardProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
