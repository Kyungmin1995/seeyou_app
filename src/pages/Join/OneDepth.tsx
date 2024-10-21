import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import {
  width,
  height,
  screenHeight,
  screenWidth,
} from '../../../globalDimension';
import BackIon from '../../assets/svg/Back.svg';
import TipIcon from '../../assets/svg/tip.svg';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import UseTextInput from '../../hooks/UseTextInput';
import {validateEmail} from '../../utils/validate';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {getAndroidStatusBarHeight} from '../../../App';
import CodeForm from './CodeForm';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import API from '../../utils/axios';
import axios, {AxiosError} from 'axios';
import {theme} from '../../theme/theme';
type OneDepthProps = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'OneDepth'>;
};

export const androidStatusBarHeight = getAndroidStatusBarHeight();

export default function OneDepth({navigation, route}: OneDepthProps) {
  const emailRef = useRef<TextInput>(null);
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [borderType, setBorderType] = useState<string>('default');
  const [codeSendInput, setCodeSendInput] = useState<boolean>(false);
  const [codeSendBtn, setCodeSendBtn] = useState<boolean>(false);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [resendBtn, setResendBtn] = useState<boolean>(false);
  const [testCode, setTestCode] = useState<string>('');

  const [codeBorderType, setCodeBorderType] = useState<string>('default');

  const [errorMessege, setErrorMessege] =
    useState<string>('이메일 주소를 확인해주세요.');
  const [codeErrorMessege, setCodeErrorMessege] =
    useState<string>('인증번호를 입력해주세요.');
  const handleFocusIn = useCallback(() => {
    setBorderType('focus');
  }, [borderType]);

  const handleFocusOut = useCallback(() => {
    setBorderType('default');
  }, [borderType]);

  const handleChangeValue = (text: string, setValue: (value: string) => void) =>
    setValue(text);

  const isValidClear = validateEmail(email);
  const [codeActive, setCodeActive] = useState<boolean>(
    borderType && codeBorderType !== 'fail' ? true : false,
  );

  const nextStep = () => {};

  //이메일에 코드 전송
  const postEmail = async () => {
    try {
      const res = await API.post('/api/v1/auth/send-code', {
        email: email,
        marketingAgreement: true,
        userType: route.params?.params,
      });
      console.log(res.data, '통신데이터');
      if (res.data.data === false) {
        setBorderType('fail');
        setErrorMessege(res.data.responseMsg);
        setCodeSendBtn(false);
        setResendBtn(false);
      } else {
        setBorderType('default');
        setCodeSendInput(true);
        setCodeSendBtn(true);
        setResendBtn(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버에서 응답한 에러
        console.log(
          'Response Error:',
          axiosError.response.data,
          '이메일전송api',
        );
      }
    }
  };
  const resendEmail = async () => {
    setResendCode(!resendCode);
    try {
      const res = await API.post('/api/v1/auth/send-code', {
        email: email,
        marketingAgreement: true,
        userType: route.params?.params,
      });
      console.log(res.data, '재전송 데이터');

      if (res.data.data === false) {
        setBorderType('fail');
        setErrorMessege(res.data.responseMsg);
      } else {
        setBorderType('default');
        setCodeSendInput(true);
        setCodeSendBtn(true);
        setResendBtn(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.log('Response Error:', errorResponse.message);
        setBorderType('fail');
        setErrorMessege(errorResponse.message + '(재전송실패)');
      }
    }
  };

  //이메일 유효성 검사 후 전송
  const checkEmail = async () => {
    if (isValidClear) {
      await postEmail();
    } else {
      setErrorMessege('이메일 주소를 확인해주세요.');
      setBorderType('fail');
      setResendBtn(false);
    }
  };
  // 인증코드
  const authenticationCode = async () => {
    if (isValidClear) {
      const data = {
        email: email,
        code: code,
      };
      try {
        const res = await API.post('/api/v1/auth/verify-code', data);

        console.log(res.data, '코드인증api확인');

        // 코드가 맞으면 넘어가게 조건수정 필요
        if (res.data.data) authenticationSuccess();
        else {
          setCodeBorderType('fail');
          setCodeErrorMessege(res.data.responseMsg);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorResponse: any = axiosError.response.data;
          console.log('Response Error:', errorResponse, '코드인증err');
          setCodeBorderType('fail');
          setCodeErrorMessege(errorResponse.message);
        }
      }
    } else {
      // 다음 x
      setBorderType('fail');
      setCodeSendInput(false);
      setCodeSendBtn(false);
      setResendBtn(false);
      console.log('블락');
    }
  };

  const authenticationSuccess = () => {
    const userType = route.params?.params;
    //네비게이션
    navigation.navigate('TwoDepth', {
      params: {email, userType},
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setBorderType('default');
      setCodeSendInput(false);
      setCodeSendBtn(false);
      setTestCode('');
      return () => {};
    }, []),
  );

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setBorderType('default');
        }}>
        <View style={{flex: 1, backgroundColor: theme.colors.White}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 48,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('BottomTabNavigator');
              }}>
              <View
                style={{
                  width: width * 48,
                  height: height * 48,
                  position: 'absolute',
                  left: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BackIon />
              </View>
            </TouchableWithoutFeedback>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: width * 20,
                  fontWeight: theme.fontWeigtht.medium,
                  color: theme.colors.Gray900,
                  fontFamily: theme.typography.Text,
                }}>
                회원가입
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: width * 20,
              paddingTop: height * 32,
              paddingBottom: height * 36,
            }}>
            <Text
              style={{
                fontSize: width * 24,
                fontWeight: theme.fontWeigtht.bold,
                color: theme.colors.Gray900,
                fontFamily: theme.typography.Text,
              }}>
              본인 확인을 위해
              {'\n'}
              이메일을 인증해주세요
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: width * 20,
            }}>
            {testCode.length > 0 && <Text>발급 코드 임시확인:{testCode}</Text>}
            <View>
              <UseTextInput
                label="이메일"
                require={false}
                returnKeyType={'done'}
                onEndEditing={nextStep}
                ref={emailRef}
                value={email}
                borderType={borderType}
                setValue={text => {
                  handleChangeValue(text, setEmail);
                }}
                placeholder={'사용하실 이메일을 입력해주세요'}
                errorMessege={errorMessege}
                handleFocusIn={handleFocusIn}
                handleFocusOut={handleFocusOut}
                successMessege={''}
              />
              <View
                style={{
                  position: 'absolute',
                  right: width * 16,
                  top: height * 40,
                }}>
                {resendBtn && (
                  <TouchableOpacity
                    onPress={() => {
                      resendEmail();
                    }}>
                    <Text
                      style={{
                        color: theme.colors.Primary500,
                        fontWeight: theme.fontWeigtht.bold,
                        fontSize: width * 16,
                        fontFamily: theme.typography.Text,
                      }}>
                      재전송
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {codeSendInput && (
              <CodeForm
                codeSendBtn={codeSendBtn}
                setCodeSendBtn={setCodeSendBtn}
                navigation={authenticationSuccess}
                authenticationCode={authenticationCode}
                resendCode={resendCode}
                setResendCode={setResendCode}
                codeBorderType={codeBorderType}
                setCodeBorderType={setCodeBorderType}
                codeErrorMessege={codeErrorMessege}
                setCodeErrorMessege={setCodeErrorMessege}
                code={code}
                setCode={setCode}
              />
            )}

            {!codeSendBtn && (
              <TouchableOpacity onPress={checkEmail}>
                <View
                  style={{
                    borderRadius: width * 8,
                    backgroundColor:
                      email.length > 0
                        ? theme.colors.Primary500
                        : theme.colors.Gray100,
                    height: height * 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        email.length > 0
                          ? theme.colors.White
                          : theme.colors.Gray400,
                      fontWeight: theme.fontWeigtht.bold,
                      fontFamily: theme.typography.Text,
                      fontSize: width * 16,
                    }}>
                    임시 코드 보내기
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              width: screenWidth,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top:
                screenHeight -
                androidStatusBarHeight -
                height * 88 -
                height * 20,
              // bottom: height * 20,
            }}>
            <View>
              <View
                style={{
                  paddingHorizontal: width * 20,
                }}>
                <View
                  style={{
                    backgroundColor: theme.colors.Gray100,
                    padding: width * 16,
                    borderRadius: width * 8,
                    height: height * 88,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: width * 4,
                      }}>
                      <TipIcon width={width * 24} height={width * 24} />
                      <Text
                        style={{
                          color: theme.colors.Gray700,
                          fontWeight: theme.fontWeigtht.bold,
                          fontSize: width * 13,
                        }}>
                        임시코드가 오지 않나요?
                      </Text>
                    </View>
                    <View style={{paddingLeft: width * 26}}>
                      <Text>
                        스팸 메일함을 확인해주시거나 메일 주소를 한 번 더
                        확인해주세요.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
