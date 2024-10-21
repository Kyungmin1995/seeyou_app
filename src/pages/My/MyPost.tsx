import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import {getStorage, removeStorage, setStorage} from '../../utils/storage';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import API from '../../utils/axios';

import {height, width} from '../../../globalDimension';
import Pen from '../../assets/svg/Pen.svg';
import {theme} from '../../theme/theme';
import Activity from '../../assets/svg/activity.svg';
import Area from '../../assets/svg/area.svg';
import More from '../../assets/svg/More.svg';
import {useQuery} from '@tanstack/react-query';

type Tnavigation = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'MyPost'>;
};
type UserService = {
  id: number;
  serviceTitle: string;
  activityArea: string[];
  preferredActivity: string[];
  content: string;
  grade?: number;
  email: string;
  getImage?: string[];
};

export function MyPost({navigation, route}: Tnavigation) {
  const email = route.params?.params;

  const fetchUserServiceList = async (): Promise<UserService[]> => {
    const res = await API.post('/api/v1/userservicelist', {email});
    return [
      {
        id: 1,
        serviceTitle: '더미',
        activityArea: ['홍대', '원당'],
        preferredActivity: ['런닝'],
        content: '쿼리더미데이터',
        email: 'rudals157303@gmail.com',
        getImage: [],
      },
      {
        id: 2,
        serviceTitle: '더미222222',
        activityArea: ['원당'],
        preferredActivity: ['복싱', '런닝'],
        content: '쿼리더미데이터',
        email: 'rudals157303@gmail.com',
        getImage: [],
      },
    ];
    return res.data.data.userServices;
  };
  const EmptyPost = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: height * 64,
          paddingHorizontal: width * 42,
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pen
          width={width * 32}
          height={width * 32}
          style={{marginBottom: height * 8}}
        />
        <Text
          style={{
            color: theme.colors.Gray700,
            fontSize: width * 16,
            marginBottom: height * 4,
          }}>
          작성하신 글이 없어요
        </Text>
        <Text
          style={{
            color: theme.colors.Gray500,
            fontSize: width * 14,
            marginBottom: height * 20,
          }}>
          地陪를 찾는 여행객과 좋은 추억을 만들어보세요
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Write');
          }}>
          <View>
            <Text
              style={{
                color: theme.colors.Primary500,
                fontSize: width * 16,
                fontWeight: theme.fontWeigtht.bold,
              }}>
              작성하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['QUERY_KEY'],
    queryFn: fetchUserServiceList,
  });

  return <EmptyPost />;

  //

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color={theme.colors.Primary500} />
      </View>
    );
  if (isError) return <Text>isError...</Text>;
  if (data) {
    // console.log(data, 'data');

    const EmptyPost = () => (
      <>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: height * 64,
            paddingHorizontal: width * 42,
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pen
            width={width * 32}
            height={width * 32}
            style={{marginBottom: height * 8}}
          />
          <Text
            style={{
              color: theme.colors.Gray700,
              fontSize: width * 16,
              marginBottom: height * 4,
            }}>
            작성하신 글이 없어요
          </Text>
          <Text
            style={{
              color: theme.colors.Gray500,
              fontSize: width * 14,
              marginBottom: height * 20,
            }}>
            地陪를 찾는 여행객과 좋은 추억을 만들어보세요
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Write');
            }}>
            <View>
              <Text
                style={{
                  color: theme.colors.Primary500,
                  fontSize: width * 16,
                  fontWeight: theme.fontWeigtht.bold,
                }}>
                작성하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
    const goDetail = (item: UserService) => {
      navigation.navigate('MyPostDetail', {
        params: {
          id: 1,
          serviceTitle: item.serviceTitle,
          activityArea: item.activityArea,
          preferredActivity: item.preferredActivity,
          content: item.content,
          getImage: [],
        },
      });
    };
    const renderItem = ({item}: any) => {
      return (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              goDetail(item);
            }}>
            <View
              style={{
                padding: width * 20,
                borderBottomWidth: width * 1,
                borderColor: theme.colors.Gray200,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    gap: width * 12,
                    flex: 1,
                  }}>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.serviceTitle}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Area width={width * 20} height={width * 20} />
                    <Text style={styles.iconText}>{item.activityArea}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Activity width={width * 20} height={width * 20} />
                    <Text style={styles.iconText}>
                      {item.preferredActivity}
                    </Text>
                  </View>
                </View>
                {/* {item.getImage[0] !== null ? ( */}
                {item.getImage.length > 0 ? (
                  <Image
                    source={{uri: item.getImage[0]}}
                    style={styles.thumbnail}
                  />
                ) : (
                  <View style={styles.thumbnail} />
                )}
              </View>
              <View style={styles.content}>
                <Text style={styles.contentText}>{item.content}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateText}>1일 전</Text>
                <View style={styles.dateBtn}>
                  <TouchableOpacity>
                    <More />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    };

    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        {data.length === 0 || null ? (
          <EmptyPost />
        ) : (
          <FlatList
            style={{backgroundColor: '#FFF'}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.Gray900,
    fontSize: width * 16,
    fontWeight: theme.fontWeigtht.bold,
    marginBottom: height * 8,
  },

  iconText: {
    fontSize: width * 14,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Gray900,
  },
  thumbnail: {
    width: width * 80,
    height: width * 80,
    borderRadius: width * 8,
    borderWidth: 1,
    borderColor: theme.colors.Gray400,
  },
  content: {
    marginTop: height * 12,
    marginBottom: height * 16,
  },
  contentText: {
    color: theme.colors.Gray700,
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 14,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: theme.colors.Gray700,
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 12,
  },
  dateBtn: {
    width: width * 20,
    transform: [{rotate: '90deg'}],
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
