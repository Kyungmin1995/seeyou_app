import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {height, width} from '../../../globalDimension';
import CloseIcon from '../../assets/svg/close.svg';
import LogoIcon from '../../assets/svg/tt.svg';
import UseTextInput from '../../hooks/UseTextInput';
import {validateEmail, validatePassword} from '../../utils/validate';
import {theme} from '../../theme/theme';
import API from '../../utils/axios';
import {AxiosError} from 'axios';
import {setStorage} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/slice/userSlice';

interface IProps {
  replace(arg0: string): unknown;
  navigate(_: string): unknown;
}
export default function Login() {
  const navigation = useNavigation<IProps>();
  const navigate = () => navigation.navigate('Join');
  const idRef = useRef<any>(null);
  const pwRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const [active, setActive] = useState<boolean>(true);
  const [idValue, setIdValue] = useState<string>('');
  const [passwordValue, setPasswordIdValue] = useState<string>('');
  const [borderType, setBorderType] = useState<string>('default');
  const [borderType_, setBorderType_] = useState<string>('default');
  const [errorMessege, setErrorMessege] = useState<string>('');

  const dispatch = useDispatch();

  const handleFocusIn = useCallback(() => {
    setBorderType('focus');
  }, [borderType]);
  const handleFocusOut = useCallback(() => {
    setBorderType('default');
  }, [borderType]);
  const handleFocusIn_ = useCallback(() => {
    setBorderType_('focus');
  }, [borderType_]);

  const handleFocusOut_ = useCallback(() => {
    setBorderType_('default');
  }, [borderType_]);

  const handleChangeValue = (
    text: string,
    setValue: (value: string) => void,
  ) => {
    setValue(text);
  };

  const nextFoucs = () => {
    if (pwRef.current) pwRef.current.focus();
  };
  const loginSuccess = async () => {
    try {
      const res = await API.post('/api/v1/login', {
        email: idValue,
        password: passwordValue,
      });
      const accessTokenData = {access_token: res.data.tokenDto.accessToken};
      const refreshTokenData = {
        refresh_token: res.data.tokenDto.refreshToken,
      };
      const userData = {
        email: res.data.email,
        nickname: res.data.nickname,
      };
      // console.log(res.data, 'res.data');

      // console.log(accessTokenData, 'accessTokenData');
      // console.log(refreshTokenData, 'refreshTokenData');

      await setStorage('access_token', accessTokenData);
      await setStorage('refresh_token', refreshTokenData);
      await setStorage('User', userData);
      dispatch(setUser(userData));

      navigation.replace('BottomTabNavigator');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.log(errorResponse, '실패');
        setBorderType_('fail');
        setErrorMessege(errorResponse.message);
      } else setErrorMessege('error');
    }
  };

  useEffect(() => {
    // 버튼활성화
    if (idValue.length > 0 && passwordValue.length > 0) {
      setActive(false);
    } else setActive(true);
  }, [idValue, passwordValue]);

  const next = (idValue: string, passwordValue: string) => {
    const isValidEmailClear = validateEmail(idValue);
    const isValidPasswordClear = validatePassword(passwordValue);
    if (isValidEmailClear) setBorderType('default');
    if (!isValidEmailClear) setBorderType('fail');
    // 비밀번호 양식
    // if (isValidPasswordClear) setBorderType_('default');
    // if (!isValidPasswordClear) {
    //   setBorderType_('fail');
    //   setErrorMessege('비밀번호를 확인해주세요');
    // }
    // else if (isValidEmailClear && isValidPasswordClear) {
    else if (isValidEmailClear) {
      loginSuccess();
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setBorderType('default');
          setBorderType_('default');
        }}>
        <View style={{backgroundColor: '#FFF', flex: 1}}>
          <View style={styles.topBar}>
            <Text style={styles.topBarText}>로그인</Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                navigation.navigate('home');
              }}>
              <CloseIcon width={width * 24} />
            </TouchableOpacity>
          </View>
          {/* 로고 */}
          <View style={{alignItems: 'center', marginVertical: height * 24}}>
            <LogoIcon width={width * 64} />
          </View>
          {/* 로그인 폼 */}
          <View style={{paddingHorizontal: width * 20}}>
            <UseTextInput
              label="이메일"
              require={false}
              style={{fontSize: width * 16}}
              ref={idRef}
              returnKeyType="next"
              onEndEditing={nextFoucs}
              value={idValue}
              borderType={borderType}
              setValue={text => {
                handleChangeValue(text, setIdValue);
              }}
              placeholder={'사용중인 이메일 주소를 입력해주세요.'}
              errorMessege={'이메일 주소를 확인해 주세요.'}
              successMessege={''}
              handleFocusIn={handleFocusIn}
              handleFocusOut={handleFocusOut}
            />

            <UseTextInput
              label="비밀번호"
              require={false}
              style={{fontSize: width * 16}}
              ref={pwRef}
              returnKeyType="done"
              onEndEditing={() => {
                // loginSuccess()
              }}
              value={passwordValue}
              borderType={borderType_}
              setValue={text => {
                handleChangeValue(text, setPasswordIdValue);
              }}
              placeholder={'8자 이상 입력해주세요.'}
              errorMessege={errorMessege}
              successMessege={''}
              handleFocusIn={handleFocusIn_}
              handleFocusOut={handleFocusOut_}
            />

            <View style={{gap: height * 8}}>
              <TouchableOpacity
                disabled={active}
                onPress={() => {
                  next(idValue, passwordValue);
                }}
                ref={btnRef}
                style={[
                  styles.btnStyle,
                  {
                    backgroundColor: !active
                      ? theme.colors.Primary500
                      : theme.colors.Primary200,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: theme.fontWeigtht.bold,
                    fontSize: width * 16,
                    color: theme.colors.White,
                  }}>
                  로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigate}
                style={[
                  styles.btnStyle,
                  {
                    borderWidth: 1,
                    borderColor: theme.colors.Gray400,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: theme.fontWeigtht.bold,
                    fontSize: width * 16,
                    color: theme.colors.Gray900,
                  }}>
                  회원가입
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}
                // onPress={navigate}
              >
                <Text
                  style={{
                    fontSize: width * 14,
                    color: theme.colors.Gray700,
                    fontWeight: theme.fontWeigtht.medium,
                    textDecorationLine: 'underline',
                    marginTop: height * 8,
                  }}>
                  비밀번호 재설정
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topBarText: {
    fontSize: width * 18,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Gray900,
    fontFamily: theme.typography.Text,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    width: width * 48,
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 로그인 폼
  inputTextStyle: {
    fontWeight: theme.fontWeigtht.bold,
    fontSize: width * 14,
    color: theme.colors.Gray700,
  },
  TextInputStyle: {
    borderWidth: 1,
    marginTop: height * 8,
    borderColor: theme.colors.Gray200,
    borderRadius: width * 8,
    paddingHorizontal: width * 16,
    paddingVertical: height * 13,
    height: height * 48,
    // marginBottom: height * 28,
  },
  btnStyle: {
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 8,
  },
});
