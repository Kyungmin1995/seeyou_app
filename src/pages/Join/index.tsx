import React from 'react';
import {Stack} from '../RootNavigation';
import OneDepth from './OneDepth';
import TwoDepth from './TwoDepth';
import Default from './Default';
import LastDepth from './LastDepth';
import NormalDepth from './NormalDepth';

export function Join() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Default"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Default" component={Default} />
        <Stack.Screen name="OneDepth" component={OneDepth} />
        <Stack.Screen name="TwoDepth" component={TwoDepth} />
        <Stack.Screen name="LastDepth" component={LastDepth} />
        <Stack.Screen name="NormalDepth" component={NormalDepth} />
      </Stack.Navigator>
    </>
  );
}
