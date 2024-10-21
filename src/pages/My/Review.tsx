import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {removeStorage} from '../../utils/storage';
import {ScreenNavigationProps} from '../../utils/RootParamList';
import API from '../../utils/axios';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/RootReducer';
import {AxiosError} from 'axios';
import {height, width} from '../../../globalDimension';
import Pen from '../../assets/svg/Pen.svg';
import {theme} from '../../theme/theme';

type Tnavigation = {
  navigation: ScreenNavigationProps;
};
export function Review({navigation}: Tnavigation) {
  const getData = async () => {
    try {
      const res = await API.post('/api/v1/getusersetting', {
        email: 'rudals782@nate.com',
      });
      console.log(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.log(errorResponse, '실패');
      }
    }
  };
  useEffect(() => {
    // getData();
  }, []);

  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Text>리뷰</Text>
      </View>
    </>
  );
}
