import React, {useState} from 'react';

import BottomTabNavigator from './BottomTabNavigator';

import {Join} from './Join';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/RootParamList';

import {Chatting} from './Chatting';
import {MyPostDetail} from './My/MyPostDetail';
import {Write} from '../components/Write';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('BottomTabNavigator');

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Join"
          component={Join}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chatting"
          component={Chatting}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyPostDetail"
          component={MyPostDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Write"
          component={Write}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
