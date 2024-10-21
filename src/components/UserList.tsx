/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text, FlatList, Image} from 'react-native';
import {height, width} from '../../globalDimension';
import axios from 'axios';
import API from '../utils/axios';
import DefaultBg from '../hooks/DefaultBg';
import {theme} from '../theme/theme';

export function UserList() {
  const [data, setData] = useState<any>([
    {id: '1', title: '닉네임', hot: true},
    {id: '2', title: '닉네임 2', hot: true},
    {id: '3', title: '닉네임 3', hot: false},
    {id: '4', title: '닉네임 3', hot: false},
    {id: '5', title: '닉네임 3', hot: false},
    {id: '6', title: '닉네임 3', hot: false},
    {id: '7', title: '닉네임 3', hot: false},
  ]);

  const getData = async () => {
    const res = await axios.get('http://10.0.2.2:3000/api/test');
    try {
      console.log(res.data);
      setData((prev: any) => [{...prev, title: res.data.name}]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getData();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: height * 24,
              gap: width * 12,
            }}>
            <View>
              <Image
                style={{width: width * 64, height: width * 64}}
                source={require('../assets/images/thumb.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: width * 16,
                  fontWeight: theme.fontWeigtht.bold,
                  color: theme.colors.Gray900,
                  marginBottom: height * 6,
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: width * 2,
                  marginBottom: height * 2,
                }}>
                <View style={styles.information}>
                  <Text style={styles.informationText}>여성</Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.informationText}>한국어 최상</Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.informationText}>ESFJ</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginBottom: height * 6}}>
                <Text>잠실/송리단길 외 2</Text>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#9E9E9E',
                      width: width * 2,
                      height: width * 2,
                      borderRadius: width * 2,
                      marginHorizontal: width * 4,
                    }}
                  />
                </View>
                <Text>맛집 외 1</Text>
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 13,
                    fontWeight: '400',
                  }}>
                  자기소개에 입력한 글가나낭다다다다력한 글가나낭다다다다력한
                  글가나낭다다다다
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          style={{
            backgroundColor: '#FFF',
            paddingHorizontal: width * 20,
            marginTop: height * 24,
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  information: {
    backgroundColor: '#FFF8F5',
    paddingHorizontal: width * 5,
    paddingVertical: width * 0.5,
  },
  informationText: {
    fontSize: width * 12,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Primary700,
  },
});
