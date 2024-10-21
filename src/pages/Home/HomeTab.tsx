import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootTopTabsParamList} from '../../utils/RootParamList';
import {theme} from '../../theme/theme';
import {Text} from 'react-native';
import {height, width} from '../../../globalDimension';
import {Review} from './../My/Review';

import {UserList} from '../../components/UserList';

const Tab = createMaterialTopTabNavigator<RootTopTabsParamList>();

export function HomeTab() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="UserList"
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.Primary500,
          },
          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? '#000' : '#616161',
                fontWeight: focused ? 'bold' : 'normal',
                fontSize: width * 16,
              }}>
              {route.name === 'UserList' ? '地陪 보기' : '地陪 구해요'}
            </Text>
          ),
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
          },
          tabBarItemStyle: {
            // width: 'auto',
            paddingHorizontal: width * 20,
            paddingVertical: height * 14,
          },
          swipeEnabled: false, // 스와이프 기능 비활성화
          animationEnabled: true,
        })}>
        <Tab.Screen
          name="UserList"
          component={UserList}
          //   initialParams={{params: userInfo.email}} // 기본값 설정
          options={{
            title: '내 게시물',
            tabBarStyle: {backgroundColor: '#fff'},
            tabBarPressColor: '#fff',
            tabBarPressOpacity: 0,
          }}
        />
        <Tab.Screen
          name="Review"
          component={Review}
          options={{
            title: '내 게시물',
            tabBarStyle: {backgroundColor: '#fff'},
            tabBarPressColor: '#fff',
            tabBarPressOpacity: 0,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
