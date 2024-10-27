import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {removeStorage} from '../../utils/storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/RootReducer';
import {initialState, setUser} from '../../redux/slice/userSlice';
import {
  RootTopTabsParamList,
  ScreenNavigationProps,
} from '../../utils/RootParamList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyPost} from './MyPost';
import {Review} from './Review';
import {Steamed} from './Steamed';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Setting from '../../assets/svg/Setting.svg';
import Certification from '../../assets/svg/certification.svg';
import Activity from '../../assets/svg/activity.svg';
import Area from '../../assets/svg/area.svg';
import Heart from '../../assets/svg/Heart.svg';
import {height, width} from '../../../globalDimension';
import {theme} from '../../theme/theme';
import {TopTabNavigation} from '../TabNavigation';

const Tab = createMaterialTopTabNavigator<RootTopTabsParamList>();

interface NavigationInfo {
  navigation: ScreenNavigationProps;
}
const My = ({navigation}: NavigationInfo) => {
  const userInfo = useSelector((state: RootState) => state.UserReducer);
  console.log(userInfo.email);

  const logOut = async () => {
    await removeStorage('User');
    await removeStorage('access_token');
    navigation.replace('BottomTabNavigator');
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My</Text>
        <View style={styles.headerBtn}>
          <TouchableWithoutFeedback onPress={logOut}>
            <Setting width={width * 24} height={width * 24} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.informationCon}>
        <View
          style={{
            flexDirection: 'row',
            gap: width * 20,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/thumb.png')}
            style={{
              width: width * 84,
              height: width * 84,
            }}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.colors.Gray900,
                  fontWeight: theme.fontWeigtht.bold,
                  fontSize: width * 20,
                }}>
                dipei_xiyou
              </Text>
              <Certification />
            </View>
            <Text
              style={{
                color: theme.colors.Gray500,
                fontWeight: theme.fontWeigtht.regular,
                fontSize: width * 14,
              }}>
              depei_seeyou@xiyou.com
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: width * 4,
                marginTop: height * 8,
              }}>
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
        <View style={{marginVertical: height * 16}}>
          <Text style={{fontSize: width * 14, color: theme.colors.Gray400}}>
            나를 소개해보세요
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: height * 1,
            borderColor: theme.colors.Gray200,
          }}>
          <View
            style={{
              paddingTop: height * 16,
              gap: height * 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 8,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Area width={width * 20} height={width * 20} />
                <Text
                  style={{fontSize: width * 14, color: theme.colors.Gray500}}>
                  활동지역
                </Text>
              </View>
              <Text style={{color: theme.colors.Gray900, fontSize: width * 14}}>
                잠실/송리단길, 건대, 성수
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 8,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Activity width={width * 20} height={width * 20} />
                <Text
                  style={{fontSize: width * 14, color: theme.colors.Gray500}}>
                  선호활동
                </Text>
              </View>
              <Text style={{color: theme.colors.Gray900, fontSize: width * 14}}>
                맛집, 팝업스토어
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: height * 20,
            flexDirection: 'row',
            gap: width * 8,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.colors.Gray100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height * 40,
                  borderRadius: width * 8,
                  borderColor: 'none',
                  flexDirection: 'row',
                  gap: width * 4,
                }}>
                <Heart width={width * 16} height={width * 16} />
                <Text
                  style={{color: theme.colors.Gray900, fontSize: width * 13}}>
                  찜
                </Text>
                <Text
                  style={{
                    color: theme.colors.Primary500,
                    fontSize: width * 13,
                  }}>
                  123
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.colors.White,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height * 40,
                  borderRadius: width * 8,
                  borderColor: theme.colors.Gray400,
                  borderWidth: width * 1,
                }}>
                <Text
                  style={{color: theme.colors.Gray900, fontSize: width * 13}}>
                  프로필 수정
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#EEEEEE', height: height * 8}} />

      <TopTabNavigation
        initialRouteName={'MyPost'}
        tabBarItemStyle={{
          width: 'auto',
        }}
        chiledren={
          <>
            <Tab.Screen
              name="MyPost"
              component={MyPost}
              initialParams={{params: userInfo.email}}
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
                    내 게시물
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
                    후기
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Steamed"
              component={Steamed}
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
                    찜
                  </Text>
                ),
              }}
            />
          </>
        }
      />
    </View>
  );
};

export default My;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.White,
  },
  header: {
    height: height * 48,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: width * 18,
    fontWeight: theme.fontWeigtht.bold,
    color: theme.colors.Gray900,
    paddingLeft: width * 20,
  },
  headerBtn: {
    width: width * 48,
    height: width * 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationCon: {
    // backgroundColor: '#ddd',
    paddingHorizontal: width * 20,
    paddingVertical: height * 24,
  },
  profileTextCon: {
    borderRadius: width * 4,
    backgroundColor: theme.colors.Primary100,
    paddingHorizontal: width * 5,
  },
  profileText: {
    color: theme.colors.Primary700,
  },
  informationTop: {},
});
