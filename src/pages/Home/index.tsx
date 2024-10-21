import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, ImageBackground} from 'react-native';
import {height, screenWidth, width} from '../../../globalDimension';
import LogoIcon from '../../assets/svg/logo.svg';
import {getStorage, getStorageUser} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {initialState, setUser} from '../../redux/slice/userSlice';
import API from '../../utils/axios';
import {AxiosError} from 'axios';
import {HomeTab} from './HomeTab';
import {TopTabNavigation} from '../TabNavigation';
import {UserList} from '../../components/UserList';
import {Review} from '../My/Review';
import {Tab} from '../../../App';
import Calendar from '../../components/Calendar';

function Home() {
  const dispatch = useDispatch();

  const getUserStorage = async () => {
    const value = await getStorageUser('User');
    const accessToken = await getStorage('access_token');
    const refreshToken = await getStorage('refresh_token');

    if (value === null) dispatch(setUser(initialState));
    else
      dispatch(
        setUser({
          email: value.email,
          nickname: value.nickname,
        }),
      );
  };

  useEffect(() => {
    getUserStorage();
  }, []);

  // return <Calendar />;

  return (
    <>
      <View style={{backgroundColor: '#FFF'}}>
        <View
          style={{
            paddingHorizontal: width * 16,
            paddingVertical: height * 12,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <LogoIcon />
          </View>
        </View>

        <ImageBackground
          style={{
            width: screenWidth,
            height: screenWidth / 2,
            padding: width * 24,
            backgroundColor: '#F4F2F7',
          }}
          source={require('./../../assets/images/BN.png')}
          resizeMode={'stretch'} // 'cover', 'contain', 'stretch', 'repeat', 'center'
        />
      </View>

      <TopTabNavigation
        initialRouteName={'UserList'}
        chiledren={
          <>
            <Tab.Screen
              name="UserList"
              component={UserList}
              options={{
                tabBarStyle: {backgroundColor: '#fff'},
                tabBarPressColor: '#fff',
                tabBarPressOpacity: 0,
                tabBarLabel: ({focused, color}) => (
                  <Text
                    style={{
                      color: focused ? '#000' : '#616161',
                      fontWeight: focused ? 'bold' : 'normal',
                      fontSize: width * 16,
                    }}>
                    地陪 보기
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Review"
              component={Review}
              options={{
                tabBarStyle: {backgroundColor: '#fff'},
                tabBarPressColor: '#fff',
                tabBarPressOpacity: 0,
                tabBarLabel: ({focused, color}) => (
                  <Text
                    style={{
                      color: focused ? '#000' : '#616161',
                      fontWeight: focused ? 'bold' : 'normal',
                      fontSize: width * 16,
                    }}>
                    地陪 구해요
                  </Text>
                ),
              }}
            />
          </>
        }
      />
    </>
  );
}

export default Home;
