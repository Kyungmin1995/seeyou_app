import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {width, height} from '../../../globalDimension';
import BackIcon from '../../assets/svg/Back.svg';
import NextIcon from '../../assets/svg/next_w.svg';
import NextIcon_b from '../../assets/svg/next_b.svg';
import CloseIcon from '../../assets/svg/close.svg';
import Check_Fill from '../../assets/svg/Check_fill.svg';
import Cheack_DisabledIcon from '../../assets/svg/Check_disabled.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {theme} from '../../theme/theme';

interface ITermsData {
  checked: boolean;
  required: boolean;
  text: string;
  test?: string;
}

type DefaultProps = {
  navigation: ScreenNavigationProps;
  // route: ScreenRouteProp<'Default'>;
};

type TBottomSheetBodyProps = {
  termsData: ITermsData[];
  navigation: ScreenNavigationProps;
  setTermsData: Dispatch<SetStateAction<ITermsData[]>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  close: any;
  userType: string;
};

export default function Default({navigation}: DefaultProps) {
  const refRBSheet = useRef<any>(null);

  const [termsData, setTermsData] = useState<ITermsData[]>([
    {
      checked: false,
      required: false,
      text: '[필수] 만 14세 이상입니다',
    },
    {
      checked: false,
      required: false,
      text: '[필수] 서비스 이용약관 동의',
    },
    {
      checked: false,
      required: false,
      text: '[필수] 개인정보 수집 및 이용 동의',
    },
    {
      checked: false,
      required: false,
      text: '[선택] 마케팅 수신 정보 동의',
    },
  ]);
  const [success, setSuccess] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>('TOURIST');
  const close = () => {
    refRBSheet.current.close();
  };
  return (
    <>
      <View style={{backgroundColor: theme.colors.White, flex: 1}}>
        <View style={styles.topContainer}>
          <View style={styles.topBtn}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <BackIcon />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.topBtn}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <CloseIcon />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* 텍스트 영역 */}
        <View style={styles.TextContainer}>
          <Text
            style={{
              fontWeight: theme.fontWeigtht.bold,
              fontSize: width * 24,
              color: theme.colors.Gray900,
            }}>
            한국 여행은
            {'\n'}
            喜友와 함께하세요!
          </Text>
          <Text
            style={{
              fontWeight: theme.fontWeigtht.regular,
              fontSize: width * 16,
              color: theme.colors.Gray700,
            }}>
            한국을 안내해줄 地陪가
            {'\n'}
            여러분들을 기다리고 있어요!
          </Text>
        </View>
        {/* 버튼 영역 */}
        <View style={{paddingHorizontal: width * 20, gap: height * 8}}>
          <TouchableWithoutFeedback
            onPress={() => {
              setUserType('TOURIST');
              refRBSheet.current.open();
            }}>
            <View
              style={[
                styles.btnContainer,
                {
                  backgroundColor: theme.colors.Primary500,
                },
              ]}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.topText,
                      {
                        color: theme.colors.White,
                      },
                    ]}>
                    고객으로 시작
                  </Text>
                  <NextIcon width={20} />
                </View>
                <Text
                  style={[
                    styles.bottomText,
                    {
                      color: theme.colors.White,
                    },
                  ]}>
                  地陪와 함께 편하게 여행을 즐겨보세요
                </Text>
              </View>
              <Image source={require('../../assets/images/smile_1.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setUserType('DIPEI');
              refRBSheet.current.open();
            }}>
            <View
              style={[
                styles.btnContainer,
                {
                  backgroundColor: '#FFD541',
                },
              ]}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.topText,
                      {
                        color: theme.colors.Gray900,
                      },
                    ]}>
                    地陪로 시작
                  </Text>
                  <NextIcon_b />
                </View>
                <Text
                  style={[
                    styles.bottomText,
                    {
                      color: theme.colors.Gray900,
                    },
                  ]}>
                  고객과 여행하면서 수익을 얻어보세요
                </Text>
              </View>
              <Image source={require('../../assets/images/smile_2.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{flex: 1}}>
        <RBSheet
          // closeDuration={2000}
          ref={refRBSheet}
          height={height * 354}
          closeOnPressMask={true} //외부눌러서 끌지
          draggable={false}
          dragOnContent
          customStyles={{
            wrapper: {
              backgroundColor: '#00000099',
            },
            container: {
              borderTopLeftRadius: width * 16,
              borderTopRightRadius: width * 16,
              paddingHorizontal: width * 20,
              // paddingVertical: height * 32,
            },
            draggableIcon: {
              display: 'none',
            },
          }}
          customModalProps={{
            animationType: 'fade', // 백그라운드 막 설정
            statusBarTranslucent: true, //상태바 반투명
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: height * 32,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#222222',
                fontSize: width * 18,
              }}>
              약관동의
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                refRBSheet.current.close();
              }}>
              <CloseIcon />
            </TouchableWithoutFeedback>
          </View>
          <BottomSheetBody
            termsData={termsData}
            navigation={navigation}
            setTermsData={setTermsData}
            success={success}
            setSuccess={setSuccess}
            close={close}
            userType={userType}
          />
        </RBSheet>
      </View>
    </>
  );
}

const BottomSheetBody = ({
  termsData,
  success,
  navigation,
  setTermsData,
  setSuccess,
  close,
  userType,
}: TBottomSheetBodyProps) => {
  const requireComplete = () => {
    const test = termsData.filter((item: {required: boolean}) => item.required);
    if (test.length === 3) setSuccess(true);
    else setSuccess(false);
  };

  const clear = () => {
    // console.log(userType, 'userType');
    close();
    const next = setTimeout(() => {
      navigation.navigate('OneDepth', {params: userType});
      // DIPEI
    }, 350);
    return () => clearTimeout(next);
  };

  useEffect(() => {
    setTermsData(prevTermsData =>
      prevTermsData.map(item => {
        return {...item, checked: false, required: false};
      }),
    );
  }, []);

  useEffect(() => {
    requireComplete();
  }, [termsData]);

  return (
    <View>
      <View>
        {termsData?.map((_: any, idx: any) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                setTermsData((prev: any) =>
                  prev.map((item: any, index: number) =>
                    idx === index
                      ? {
                          ...item,
                          checked: !item.checked,
                          required:
                            idx === prev.length - 1
                              ? item.required
                              : !item.required,
                        }
                      : item,
                  ),
                );
              }}>
              <View style={[styles.checkBtn, {marginTop: height * 24}]}>
                {_.checked ? (
                  <Check_Fill width={width * 20} height={width * 20} />
                ) : (
                  <Cheack_DisabledIcon width={width * 20} height={width * 20} />
                )}

                <Text
                  style={[
                    styles.bottomSheetText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  {_.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity disabled={!success} onPress={clear}>
        <View
          style={{
            backgroundColor: success ? '#F34902' : '#F5F5F5',
            paddingHorizontal: height * 13,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: width * 8,
            height: height * 48,
            marginTop: height * 28,
          }}>
          <Text
            style={{
              color: success ? '#FFFFFF' : '#BDBDBD',
              fontWeight: '700',
              fontSize: width * 16,
            }}>
            동의하고 계속하기
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: height * 32,
  },
  topBtn: {
    width: width * 48,
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // TextContainer
  TextContainer: {
    marginTop: height * 32,
    marginBottom: height * 60,
    paddingHorizontal: width * 20,
    gap: height * 16,
  },
  btnContainer: {
    borderRadius: width * 8,
    height: height * 80,
    paddingHorizontal: width * 20,
    paddingVertical: height * 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topText: {
    fontWeight: theme.fontWeigtht.bold,
    fontSize: width * 18,
    marginRight: width * 8,
    marginBottom: height * 2,
  },
  bottomText: {
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 14,
  },
  // 바텀시트
  bottomSheetText: {
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 16,
    color: theme.colors.Gray900,
    textDecorationLine: 'underline',
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 6,
  },
});
