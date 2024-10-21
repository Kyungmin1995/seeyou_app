import React from 'react';
import {Stack} from '../RootNavigation';
import {ChattingDetail} from './ChattingDetail';
import {Button} from 'react-native';
export function Chatting() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="ChattingDetail"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ChattingDetail" component={ChattingDetail} />
      </Stack.Navigator>
    </>
  );
}
