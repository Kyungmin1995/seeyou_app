import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {height, width} from '../../../globalDimension';
import {theme} from '../../theme/theme';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {AxiosError} from 'axios';
import API from '../../utils/axios';
import {setStorage} from '../../utils/storage';
import {setUser} from '../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';

type NormalDepthProps = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'NormalDepth'>;
};

export default function NormalDepth({navigation, route}: NormalDepthProps) {
  const dispatch = useDispatch();
  const goHome = async () => {
    try {
      const res = await API.post('/api/v1/login', {
        email: route.params?.user.email,
        password: route.params?.user.password,
      });

      const accessTokenData = {access_token: res.data.tokenDto.accessToken};
      const refreshTokenData = {
        access_token: res.data.tokenDto.refreshToken,
      };

      const userData = {
        email: res.data.email,
        nickname: res.data.nickname,
      };

      await setStorage('access_token', accessTokenData);
      await setStorage('refresh_token', refreshTokenData);
      await setStorage('User', userData);
      dispatch(setUser(userData));

      navigation.replace('BottomTabNavigator');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.log(errorResponse);
      }
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: width * 20,
          backgroundColor: theme.colors.White,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{paddingTop: height * 88, gap: height * 2}}>
          <Text
            style={{
              fontFamily: theme.typography.Text,
              fontSize: width * 20,
              color: theme.colors.Gray900,
              fontWeight: theme.fontWeigtht.regular,
            }}>
            환영합니다!
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.Text,
              fontSize: width * 24,
              color: theme.colors.Gray900,
              fontWeight: theme.fontWeigtht.bold,
            }}>
            회원가입이 완료되었어요!
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.Text,
              fontSize: width * 16,
              color: theme.colors.Gray700,
              fontWeight: theme.fontWeigtht.regular,
              paddingTop: height * 10,
            }}>
            喜友와 함께 좋은 추억을 만들어보세요!
          </Text>
        </View>
        <ImageBackground
          source={require('./../../assets/images/pic.png')}
          style={{
            width: width * 288,
            height: height * 550,
            position: 'absolute',
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
          resizeMode={'cover'} // 'cover', 'contain', 'stretch', 'repeat', 'center'
        />
        <TouchableOpacity
          style={{marginBottom: height * 20, zIndex: 2}}
          onPress={goHome}>
          <View
            style={{
              backgroundColor: theme.colors.Primary500,
              borderRadius: width * 8,
              paddingHorizontal: width * 10,
              paddingVertical: height * 16,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: theme.typography.Text,
                fontSize: width * 16,
                color: theme.colors.White,
                fontWeight: theme.fontWeigtht.bold,
              }}>
              시작하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
