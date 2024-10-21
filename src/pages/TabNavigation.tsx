import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Text} from 'react-native';
import {RootTopTabsParamList} from '../utils/RootParamList';
import {theme} from '../theme/theme';
import {height, width} from '../../globalDimension';
import {UserList} from '../components/UserList';
import MyTrip from './MyTrip';
import {ReactNode} from 'react';

const Tab = createMaterialTopTabNavigator<RootTopTabsParamList>();

interface ITopTab {
  initialRouteName?: keyof RootTopTabsParamList | undefined;
  chiledren: ReactNode;
  tabBarItemStyle?: any;
}

export function TopTabNavigation({
  initialRouteName,
  chiledren,
  tabBarItemStyle,
}: ITopTab) {
  return (
    <>
      <Tab.Navigator
        initialRouteName={initialRouteName}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.Primary500,
          },
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
          },
          tabBarItemStyle: {
            paddingHorizontal: width * 20,
            paddingVertical: height * 14,
            ...tabBarItemStyle,
          },
          swipeEnabled: false, // 스와이프 기능 비활성화
          animationEnabled: true,
        })}>
        {chiledren}
      </Tab.Navigator>
    </>
  );
}
