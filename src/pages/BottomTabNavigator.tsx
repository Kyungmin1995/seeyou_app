import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Platform} from 'react-native';
import Login from './Login/Login';

import {Chatting} from './Chatting/index';
import {height, width} from '../../globalDimension';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import CustomIcon from './../CustomIcon';
import {getStorage} from '../utils/storage';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/RootReducer';
import {List} from './Chatting/List';
import {RootBottomParamList} from '../utils/RootParamList';
import My from './My';
import Home from './Home';
import MyTrip from './MyTrip';

interface NavigationInfo {
  navigation: keyof RootBottomParamList;
  route: object;
}
const Tab = createBottomTabNavigator<RootBottomParamList>();

type TabScreen = {
  name: keyof RootBottomParamList;
  component: React.ComponentType<any>;
  title: string;
  iconName: string;
  activeIconName: string;
};

export default function BottomTabNavigatorLogin({
  navigation,
  route,
}: NavigationInfo) {
  const [tabVisible, setTabVisible] = useState<String | undefined | any>(
    undefined,
  );

  const navigationInfo: any = useSelector(
    (state: RootState) => state.NavigationReducer,
  );

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // console.log(routeName, 'routeName');

    if (routeName === 'login') setTabVisible('none');
    else setTabVisible(undefined);
  }, [navigation, route, navigationInfo]);

  const [storedValue, setStoredValue] = useState<any>(null);

  const retrieveData = async () => {
    const tokenValue = await getStorage('access_token');
    const userValue = await getStorage('User');
    // console.log(userValue, 'userValue');
    // console.log(tokenValue, 'access_tokenValue');

    if (tokenValue === null) return;
    if (userValue === null) return;
    setStoredValue(tokenValue);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const tabScreenArr: TabScreen[] = [
    {
      name: 'Home',
      component: Home,
      title: '홈',
      iconName: 'Home',
      activeIconName: 'Home-1',
    },
    {
      name: 'MyTrip',
      component: MyTrip,
      title: '내 여행',
      iconName: 'Search',
      activeIconName: 'Search-1',
    },
    {
      name: 'List',
      component: List,
      title: '채팅',
      iconName: 'Chatting-1',
      activeIconName: 'Chatting-3',
    },

    {
      name: storedValue == null || '' ? 'Login' : 'My',
      component: storedValue == null || '' ? Login : My,
      title: storedValue == null || '' ? '로그인' : '마이',
      iconName: 'My',
      activeIconName: 'My',
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName={navigationInfo.navigation}
      screenOptions={{
        // tabBarActiveTintColor: '#000', // 활성 탭의 색상
        // tabBarInactiveTintColor: '#D9D9D9', // 비활성 탭의 색상
        tabBarItemStyle: {},
        tabBarLabelStyle: {
          fontSize: width * 14,
          marginBottom: Platform.OS !== 'ios' ? height * 20 : 0,
        },
      }}>
      {tabScreenArr.map(a => (
        <Tab.Screen
          key={a.name}
          name={a.name}
          component={a.component}
          options={{
            title: a.title,
            headerShown: false, //타이틀 보일지말지
            tabBarStyle: {
              height: height * 84,
              display: tabVisible,
              backgroundColor: '#fff',
            },
            // tabBarActiveTintColor: 'tomato',
            // tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({
              size,
              focused,
            }: {
              focused: boolean;

              size: number;
            }) => (
              <CustomIcon
                name={focused ? a.activeIconName : a.iconName}
                size={size}
                color={focused ? '#1b1b1b' : '#c2c2c2'}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
