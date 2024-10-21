import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {width, height} from '../../../globalDimension';
import BackIon from '../../assets/svg/Back.svg';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import UseTextInput from '../../hooks/UseTextInput';
import {useCallback, useEffect, useRef, useState} from 'react';

import UseRadioInput from '../../hooks/UseRadioInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {theme} from '../../theme/theme';
import API from '../../utils/axios';
import {AxiosError} from 'axios';
import {AdditionalForm, Tprovided, Tregion} from './AdditionalForm';

import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

type TwoDepthProps = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'TwoDepth'>;
};

type TValueCheck = {
  pwValue: boolean;
  nicNameValue: boolean;
  birthdayValue: boolean;
  gender: boolean;
  country: boolean;
  snsValue?: boolean;
  mbtiValue?: boolean;
};
export default function TwoDepth({navigation, route}: TwoDepthProps) {
  const {name, params} = route;
  // console.log(name, params?.params, 'route');

  const pwRef = useRef<TextInput>(null);
  const nicNameRef = useRef<TextInput>(null);
  const birthdayValueRef = useRef<TextInput>(null);
  const snsValueRef = useRef<TextInput>(null);
  const mbtiValueRef = useRef<TextInput>(null);

  const [pwValue, setPwValue] = useState<string>('');
  const [nicNameValue, setNickNameValue] = useState<string>('');
  const [birthdayValue, setBirthdayValue] = useState<string>('');
  const [gender, setGender] = useState<string>('FEMAIL');
  const [country, setCountry] = useState<string>('CHINA');
  const [snsValue, setSnsValue] = useState<string>('');
  const [mbtiValue, setMbtiValue] = useState<string>('');

  const [emailBorderType, setEmailBorderType] = useState<string>('default');
  const [nickNameCompleted, setNickNameCompleted] = useState<boolean>(false);
  const [nickNameBorderType, setNickNameBorderType] =
    useState<string>('default');
  const [birthdayBorderType, setBirthdayBorderType] =
    useState<string>('default');
  const [snsBorderType, setSnsBorderType] = useState<string>('default');
  const [mbtiBorderType, setMbtiBorderType] = useState<string>('default');
  const [duplicateMessegeSuccess, setDuplicateMessegeSuccess] =
    useState<string>('');
  const [duplicateMessegeError, setDuplicateMessegeError] =
    useState<string>('');

  const handleFocusIn_ = (setValue: (value: string) => void) =>
    setValue('focus');

  const handleFocusOut_ = (setValue: (value: string) => void) =>
    setValue('default');

  const handleFocusIn_NickName = (setValue: (value: string) => void) => {
    if (nickNameBorderType === 'fail') setValue('fail');
    if (nickNameBorderType === 'default') setValue('focus');
  };
  const handleFocusOut_NickName = (setValue: (value: string) => void) => {
    if (nickNameBorderType === 'fail') setValue(nickNameBorderType);
    if (nickNameBorderType === 'focus') setValue('default');
    if (nicNameValue.length === 0) {
      setValue('default');
      setDuplicateMessegeSuccess('');
    }
  };

  useEffect(() => {
    updateButtonState(
      pwValue,
      nicNameValue,
      birthdayValue,
      snsValue,
      mbtiValue,
    );
  }, [
    pwValue,
    nicNameValue,
    birthdayValue,
    snsValue,
    mbtiValue,
    nickNameCompleted,
  ]);

  const handleChangeValue = useCallback(
    (text: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
      setValue(text);
    },
    [pwValue, birthdayValue, snsValue, mbtiValue],
  );
  const handleChangeNickNameValue = useCallback(
    (text: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
      setValue(text);
      setNickNameBorderType('focus');
      if (text.length === 0) {
        setDuplicateMessegeSuccess('');
        setNickNameCompleted(true);
      } else {
        setNickNameCompleted(false);
      }
    },
    [nicNameValue, nickNameCompleted],
  );
  const handleChangeRadio = (
    text: string,
    setValue: (value: string) => void,
  ) => {
    setValue(text);
  };

  const duplicateCheck = useCallback(async () => {
    try {
      const res = await API.post('/api/v1/auth/username', {
        nickname: nicNameValue,
      });
      console.log(res.data, '닉네임 성공');
      setNickNameBorderType('default');
      setDuplicateMessegeError('');
      if (res.data.data)
        setDuplicateMessegeSuccess('사용할 수 있는 닉네임입니다');
      setNickNameCompleted(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.log(errorResponse.message, '닉네임 중복실패');
        setNickNameBorderType('fail');
        setDuplicateMessegeSuccess('');
        setDuplicateMessegeError(errorResponse.message);
        setNickNameCompleted(false);
      }
    }
  }, [nicNameValue]);

  // 띠페이영역
  const [volume, setVolume] = useState<string | any>('');
  const [regionTextArray, setRegionTextArray] = useState<Tregion[]>([
    {title: '잠실 / 송리단길'},
    {title: '강남'},
    {title: '이태원 / 경리단길'},
    {title: '성수동'},
    {title: '신사동'},
    {title: '홍대'},
    {title: '한남동'},
    {title: '연남동'},
    {title: '서촌'},
    {title: '북촌 / 삼청동'},
    {title: '문래동'},
    {title: '제주도'},
  ]);
  const [providedTextArray, setProvidedTextArray] = useState<Tprovided[]>([
    {
      title: '맛집',
    },
    {
      title: '팝업스토어',
    },
    {
      title: '성형외과',
    },
    {
      title: '로컬탐방',
    },
  ]);

  const [regionArray, setRegionArray] = useState<Tregion[]>([]);
  const [providedArray, setProvidedArray] = useState<Tprovided[]>([]);

  const [regionArrayCopy, setRegionArrayCopy] = useState<Tregion[]>([]);
  const [providedArrayCopy, setProvidedArrayCopy] = useState<Tprovided[]>([]);

  const [completed, setCompleted] = useState(false);

  // 버튼 상태 업데이트 함수
  const updateButtonState = (
    pwValue: string,
    nicNameValue: string,
    birthdayValue: string,
    snsValue: string,
    mbtiValue: string,
  ) => {
    if (
      pwValue !== '' &&
      nicNameValue !== '' &&
      birthdayValue !== '' &&
      snsValue !== '' &&
      mbtiValue !== ''
    ) {
      return setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  const join = async () => {
    const data = {
      email: params?.params.email,
      password: pwValue,
      nickname: nicNameValue,
      gender: gender,
      residenceCountry: country,
      snsAddress: snsValue,
      mbti: mbtiValue,
      // age: birthdayValue,
      age: 30,
      birthDate: '951106',
    };

    const dipeiData = {
      email: params?.params.email,
      password: pwValue,
      nickname: nicNameValue,
      gender: gender,
      residenceCountry: country,
      // age: birthdayValue,
      age: 30,
      birthDate: '951106',
      snsAddress: snsValue,
      mbti: mbtiValue,
      active_area:
        regionArrayCopy.map(_ => {
          return _.title;
        }) || [],
      services:
        providedArrayCopy.map(_ => {
          return _.title;
        }) || [],
      languageLevel: volume,
    };

    console.log(
      params?.params.userType === 'TOURIST' ? data : dipeiData,
      '데이타',
    );

    // 유효성
    if (birthdayValue === '') {
      if (birthdayValueRef.current) {
        birthdayValueRef.current.focus();
        return console.log('birthdayValue입력안됨');
      }
    }
    // if (snsValue === '') {
    //   if (snsValueRef.current) {
    //     snsValueRef.current.focus();
    //     return console.log('snsValue입력안됨');
    //   }
    // }
    if (mbtiValue === '') {
      if (mbtiValueRef.current) mbtiValueRef.current.focus();
      return console.log('mbtiValue입력안됨');
    }
    if (nicNameValue === '') {
      if (nicNameRef.current) nicNameRef.current.focus();
      return;
    }
    if (!nickNameCompleted) {
      if (nicNameRef.current) nicNameRef.current.focus();
      return console.log('중복확인해주세요');
    } else {
      setCompleted(true);
      try {
        let apiType =
          params?.params.userType === 'TOURIST'
            ? 'turistsignup'
            : 'dipeisignup';
        const res = await API.post(
          `/api/v1/${apiType}`,
          params?.params.userType === 'TOURIST' ? data : dipeiData,
        );
        console.log(dipeiData, 'dipeiData');
        console.log(res.data, '로그');
        if (res.data.data !== null)
          navigation.navigate('NormalDepth', {
            user: {
              email: params?.params.email,
              password: pwValue,
            },
          });
        else Alert.alert(res.data.responseMsg);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorResponse: any = axiosError.response.data;
          console.error(errorResponse, '가입 실패');
        }
      }
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.colors.White}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 48,
          }}>
          <View style={styles.back}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('OneDepth', {
                  params: route.params?.params.userType,
                })
              }>
              <BackIon />
            </TouchableWithoutFeedback>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: width * 20,
                fontWeight: theme.fontWeigtht.medium,
                color: theme.colors.Gray900,
              }}>
              회원가입
            </Text>
          </View>
        </View>

        <KeyboardAwareScrollView
          style={styles.body}
          keyboardShouldPersistTaps="handled"
          bottomOffset={height * 120}>
          <View>
            <Text
              style={{
                fontSize: width * 24,
                fontWeight: theme.fontWeigtht.bold,
                color: theme.colors.Gray900,
                paddingTop: height * 32,
                paddingBottom: height * 36,
              }}>
              더 즐겁고 안전한 여행을 위해{'\n'}
              회원정보를 입력해주세요
            </Text>
          </View>
          <View>
            <UseTextInput
              ref={pwRef}
              label={'비밀번호'}
              require={true}
              style={{fontSize: width * 16}}
              returnKeyType={'done'}
              onEndEditing={() => {}}
              value={pwValue}
              borderType={emailBorderType}
              setValue={text => {
                handleChangeValue(text, setPwValue);
              }}
              placeholder={'8자 이상 입력해주세요.'}
              errorMessege={'비밀번호 조합을 확인해 주세요.'}
              successMessege={''}
              handleFocusIn={() => {
                handleFocusIn_(setEmailBorderType);
              }}
              handleFocusOut={() => handleFocusOut_(setEmailBorderType)}
            />
            <View>
              <UseTextInput
                ref={nicNameRef}
                label={'닉네임'}
                require={true}
                style={{fontSize: width * 16}}
                returnKeyType={'done'}
                onEndEditing={() => {}}
                value={nicNameValue}
                borderType={nickNameBorderType}
                setValue={text =>
                  handleChangeNickNameValue(text, setNickNameValue)
                }
                placeholder={'닉네임을 입력해주세요'}
                errorMessege={duplicateMessegeError}
                successMessege={
                  nickNameCompleted ? duplicateMessegeSuccess : ''
                }
                handleFocusIn={() =>
                  handleFocusIn_NickName(setNickNameBorderType)
                }
                handleFocusOut={() => {
                  handleFocusOut_NickName(setNickNameBorderType);
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: height * 41,
                  right: width * 20,
                }}>
                <TouchableOpacity
                  disabled={nicNameValue.length === 0}
                  onPress={duplicateCheck}>
                  <Text
                    style={{
                      color: nickNameCompleted
                        ? theme.colors.Gray400
                        : theme.colors.Primary500,
                      fontWeight: theme.fontWeigtht.bold,
                      fontSize: width * 16,
                    }}>
                    중복확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <UseTextInput
              ref={birthdayValueRef}
              label={'생년월일'}
              require={true}
              style={{fontSize: width * 16}}
              returnKeyType={'done'}
              onEndEditing={() => {}}
              value={birthdayValue}
              borderType={birthdayBorderType}
              setValue={text => handleChangeValue(text, setBirthdayValue)}
              placeholder={'생년월일 6자리를 입력해주세요 예) 951106'}
              errorMessege={'생년월일 을 확인해 주세요.'}
              successMessege={''}
              handleFocusIn={() => handleFocusIn_(setBirthdayBorderType)}
              handleFocusOut={() => handleFocusOut_(setBirthdayBorderType)}
            />
          </View>

          <UseRadioInput
            value={gender}
            label={'성별'}
            left="FEMAIL"
            right="MAIL"
            require={true}
            leftTitle="여자"
            rightTitle="남자"
            status={gender === 'FEMAIL' ? true : false}
            handleChangeRadio={handleChangeRadio}
            setValue={setGender}
          />
          <UseRadioInput
            value={country}
            label={'거주 국가'}
            left="CHINA"
            right="KOREA"
            require={true}
            leftTitle="중국"
            rightTitle="한국"
            status={country === 'CHINA' ? true : false}
            handleChangeRadio={handleChangeRadio}
            setValue={setCountry}
          />
          {route.params?.params.userType === 'DIPEI' && (
            <AdditionalForm
              volume={volume}
              setVolume={setVolume}
              regionTextArray={regionTextArray}
              setRegionTextArray={setRegionTextArray}
              providedTextArray={providedTextArray}
              setProvidedTextArray={setProvidedTextArray}
              regionArray={regionArray}
              setRegionArray={setRegionArray}
              providedArray={providedArray}
              setProvidedArray={setProvidedArray}
              regionArrayCopy={regionArrayCopy}
              setRegionArrayCopy={setRegionArrayCopy}
              providedArrayCopy={providedArrayCopy}
              setProvidedArrayCopy={setProvidedArrayCopy}
              statusCountry={country}
            />
          )}

          <UseTextInput
            ref={snsValueRef}
            label={'SNS'}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={snsValue}
            borderType={snsBorderType}
            setValue={text => handleChangeValue(text, setSnsValue)}
            placeholder={'SNS 주소를 입력해주세요'}
            errorMessege={'SNS 주소를 확인해 주세요.'}
            successMessege={''}
            handleFocusIn={() => handleFocusIn_(setSnsBorderType)}
            handleFocusOut={() => handleFocusOut_(setSnsBorderType)}
          />
          <UseTextInput
            ref={mbtiValueRef}
            label={'MBTI'}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={mbtiValue}
            borderType={mbtiBorderType}
            setValue={text => handleChangeValue(text, setMbtiValue)}
            placeholder={'MBTI를 입력해주세요'}
            errorMessege={'MBTI를 확인해 주세요.'}
            successMessege={''}
            handleFocusIn={() => handleFocusIn_(setMbtiBorderType)}
            handleFocusOut={() => handleFocusOut_(setMbtiBorderType)}
          />
          <TouchableWithoutFeedback onPress={join}>
            <View
              style={{
                backgroundColor: completed
                  ? theme.colors.Primary500
                  : '#FBC8B3',
                height: height * 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: width * 8,
                marginBottom: height * 18,
              }}>
              <Text
                style={{
                  color: completed ? theme.colors.White : theme.colors.White,
                  fontWeight: theme.fontWeigtht.bold,
                  fontSize: width * 16,
                }}>
                회원 가입하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    width: width * 48,
    height: height * 48,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: width * 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  //
  row: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    maxHeight: 600,
  },
  heading: {
    color: 'black',
    fontSize: 36,
    marginBottom: 48,
    fontWeight: '600',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 45,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 36,
    paddingLeft: 10,
  },
  button: {
    marginTop: 12,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'rgb(40, 64, 147)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
});
