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
  ImageBackground,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import API from '../../utils/axios';

import {AxiosError} from 'axios';
import {height, screenWidth, width} from '../../../globalDimension';

import {theme} from '../../theme/theme';
import ActivityIcon from '../../assets/svg/activity.svg';
import AreaIcon from '../../assets/svg/area.svg';
import More from '../../assets/svg/More.svg';
import BackIcon from '../../assets/svg/Back.svg';
import MoreIcon from '../../assets/svg/More.svg';
import StarIcon from '../../assets/svg/star.svg';
type Tnavigation = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'MyPostDetail'>;
};

type Tdata = {
  id: number;
  serviceTitle: string;
  activityArea: [string];
  preferredActivity: [string];
  content: string;
  grade: number;
  email: string;
  getImage: string[] | undefined;
};
export function MyPostDetail({navigation, route}: Tnavigation) {
  const imageUrl: ImageSourcePropType = {
    uri: route.params?.params?.getImage?.[0],
  };

  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Text>{route.params?.params?.getImage?.[0]}</Text>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('BottomTabNavigator')}>
            <View style={styles.headerIcon}>
              <BackIcon />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
          // onPress={() => navigation.navigate('BottomTabNavigator')}
          >
            <View style={styles.headerIcon}>
              <MoreIcon />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <View
              style={[
                styles.flexRow,
                {
                  gap: width * 10,
                  alignItems: 'center',
                },
              ]}>
              <Image
                source={require('../../assets/images/thumb.png')}
                style={styles.imgStyle}
              />
              <View style={{flex: 1}}>
                <View
                  style={[
                    styles.flexRow,
                    {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Text style={styles.nickName}>dipei_xiyou</Text>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        gap: width * 3,
                        alignItems: 'center',
                      },
                    ]}>
                    <StarIcon />
                    <Text style={styles.starText}>4.8</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.flexRow,
                    {
                      gap: width * 4,
                      marginTop: height * 8,
                    },
                  ]}>
                  <View style={styles.profileTextCon}>
                    <Text style={styles.profileText}>남자</Text>
                  </View>
                  <View style={styles.profileTextCon}>
                    <Text style={styles.profileText}>한국어 상</Text>
                  </View>
                  <View style={styles.profileTextCon}>
                    <Text style={styles.profileText}>ENTP</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* 이미지영역 */}
          {route.params?.params?.getImage !== null ||
            (undefined && (
              <ImageBackground
                style={{
                  width: screenWidth,
                  height: screenWidth,
                  padding: width * 24,
                  backgroundColor: '#F4F2F7',
                }}
                source={imageUrl}
                resizeMode={'cover'}
              />
            ))}

          {/* 게시글 내용 */}
          <View style={styles.contentsCon}>
            <Text
              style={{
                color: theme.colors.Gray900,
                fontWeight: theme.fontWeigtht.bold,
                fontSize: width * 16,
              }}>
              {route.params?.params?.serviceTitle}
            </Text>

            <View style={styles.dataInfo}>
              <View style={styles.dataInfoItem}>
                <AreaIcon width={width * 16} height={height * 19.5} />
                <Text style={styles.dataInfoItemText}>
                  {route.params?.params?.activityArea}
                </Text>
              </View>
              <View style={styles.dataInfoItem}>
                <ActivityIcon width={width * 16} height={height * 19.5} />
                <Text style={styles.dataInfoItemText}>
                  {route.params?.params?.preferredActivity}
                </Text>
              </View>
            </View>
            <View>
              <Text>{route.params?.params?.content}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>1일전</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 48,
    flexDirection: 'row',
    zIndex: 2,
    backgroundColor: theme.colors.White,
  },
  headerIcon: {
    width: width * 48,
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    paddingVertical: height * 18,
    paddingHorizontal: width * 20,
  },
  imgStyle: {
    width: width * 40,
    height: width * 40,
  },
  nickName: {
    color: theme.colors.Gray900,
    fontWeight: theme.fontWeigtht.bold,
    fontSize: width * 14,
  },
  profileTextCon: {
    borderRadius: width * 4,
    backgroundColor: theme.colors.Primary100,
    paddingHorizontal: width * 5,
  },
  profileText: {
    color: theme.colors.Primary700,
    fontSize: width * 12,
  },
  starText: {
    fontSize: width * 14,
    fontWeight: theme.fontWeigtht.bold,
    color: theme.colors.Gray900,
  },

  image: {
    aspectRatio: 1, // 가로 세로 비율 1:1로 고정
  },

  contentsCon: {
    paddingVertical: height * 16,
    paddingHorizontal: width * 20,
    marginBottom: height * 24,
  },
  dataInfo: {
    backgroundColor: theme.colors.Gray100,
    marginVertical: height * 12,
    paddingVertical: height * 12,
    paddingHorizontal: width * 16,
    borderRadius: width * 8,
  },
  dataInfoItem: {flexDirection: 'row', gap: width * 2},
  dataInfoItemText: {
    fontSize: width * 14,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Gray900,
  },
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
    paddingBottom: height * 20,
    paddingTop: height * 16,
  },
  dateText: {
    color: '#585266',
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
});
