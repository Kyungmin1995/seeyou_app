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
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import API from '../../utils/axios';

import {AxiosError} from 'axios';
import {height, width} from '../../../globalDimension';
import Pen from '../../assets/svg/Pen.svg';
import {theme} from '../../theme/theme';
import Activity from '../../assets/svg/activity.svg';
import Area from '../../assets/svg/area.svg';
import More from '../../assets/svg/More.svg';

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
  getImage: [string];
};
export function MyPostDetail({navigation, route}: Tnavigation) {
  const [myData, setMyData] = useState<Tdata[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  console.log(route);

  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Text>{route.params?.params?.serviceTitle}</Text>
        <Text>{route.params?.params?.content}</Text>
        <Text>{route.params?.params?.activityArea}</Text>
      </View>
    </>
  );
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
