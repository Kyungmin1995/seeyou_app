import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {height, width} from '../../globalDimension';
import {theme} from '../theme/theme';
import {StyleSheet} from 'react-native';
import CloseIcon from '../assets/svg/close.svg';
import WCloseIcon from '../assets/svg/WClose.svg';
import CalendarIcon from '../assets/svg/Calendar.svg';
import CameraIcon from '../assets/svg/Camera.svg';
import {ScreenNavigationProps} from '../utils/RootParamList';
import UseTextInput from '../hooks/UseTextInput';
import {useCallback, useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';
import Claendar from './Calendar';

// Locale 설정을 통해 요일을 커스터마이징
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

// 로케일을 한국어로 설정
LocaleConfig.defaultLocale = 'ko';

type Tnavigation = {
  navigation: ScreenNavigationProps;
};

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

type TPhotoProps = {
  path: string;
  width: number;
  height: number;
};

export function Write({navigation}: Tnavigation) {
  const [dateValue, setDateValue] = useState<string>('');
  const [travelValue, setTravelValue] = useState<string>('');
  const [activityValue, setActivityValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  const [travelBorderType, setTravelBorderType] = useState<string>('default');
  const [activityBorderType, setActivityBorderType] =
    useState<string>('default');
  const [titleBorderType, setTitleBorderType] = useState<string>('default');
  const [contentBorderType, setContentBorderType] = useState<string>('default');
  const [images, setImages] = useState<any[]>([]);

  // 바텀시트
  const refRBSheet = useRef<RBSheetRef>(null);

  const handleFocusIn = useCallback(
    (setBorderType: (value: string) => void) => {
      setBorderType('focus');
    },
    [travelBorderType, activityBorderType, titleBorderType, contentBorderType],
  );
  const handleFocusOut = useCallback(
    (setBorderType: (value: string) => void) => {
      setBorderType('default');
    },
    [travelBorderType, activityBorderType, titleBorderType, contentBorderType],
  );

  const handleChangeValue = (
    text: string,
    setValue: (value: string) => void,
  ) => {
    setValue(text);
  };

  // 캘린더
  const handleOpenSheet = () => {
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };
  const BottomView = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        // height={height * 754}
        height={height * 592}
        closeOnPressMask={true}
        draggable={false}
        dragOnContent
        customStyles={{
          wrapper: {
            backgroundColor: '#00000099',
          },
          container: {
            borderTopLeftRadius: width * 16,
            borderTopRightRadius: width * 16,
            // paddingHorizontal: width * 20,
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
            paddingTop: height * 32,
            paddingHorizontal: width * 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: width * 18,
              fontWeight: theme.fontWeigtht.bold,
              color: theme.colors.Gray900,
            }}>
            여행 날짜는 언제인가요?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              if (refRBSheet.current) {
                refRBSheet.current.close();
              }
            }}>
            <CloseIcon />
          </TouchableWithoutFeedback>
        </View>

        <Claendar />
      </RBSheet>
    );
  };

  // 갤러리
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo', // 이미지 유형을 사진으로 설정
      includeBase64: false, // Base64 포함 여부
      multiple: true, // 여러 장 선택
      cropping: true, // 이미지 자르기 기능 활성화
      cropperChooseText: '선택', // 자르기 화면에서 선택 버튼 텍스트
      cropperCancelText: '취소', // 자르기 화면에서 취소 버튼 텍스트
    })
      .then(images => {
        setImages(images);
      })
      .catch(err => {
        setImages([]);
      });
  };

  //

  return (
    <>
      <BottomView />

      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.headerIcon}>
            <CloseIcon />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>작성하기</Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.body}
        bottomOffset={height * 120}>
        <View style={{paddingHorizontal: width * 20}}>
          <UseTextInput
            label={`여행일정`}
            editable={false}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={dateValue}
            borderType={'default'}
            setValue={text => {
              handleChangeValue(text, setDateValue);
            }}
            placeholder={`YYYY.MM.DD`}
            successMessege={''}
          />
          <TouchableWithoutFeedback onPress={handleOpenSheet}>
            <View
              style={{
                position: 'absolute',
                right: width * 36,
                top: height * 42,
              }}>
              <CalendarIcon width={width * 20} height={width * 20} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{paddingHorizontal: width * 16}}>
          <UseTextInput
            label={`여행지`}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={travelValue}
            borderType={travelBorderType}
            setValue={text => {
              handleChangeValue(text, setTravelValue);
            }}
            placeholder={`지역명을 입력해주세요`}
            successMessege={''}
            handleFocusIn={() => handleFocusIn(setTravelBorderType)}
            handleFocusOut={() => handleFocusOut(setTravelBorderType)}
          />
        </View>
        <View style={{paddingHorizontal: width * 16}}>
          <UseTextInput
            label={`원하는 활동`}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={activityValue}
            borderType={activityBorderType}
            setValue={text => {
              handleChangeValue(text, setActivityValue);
            }}
            placeholder={`예) 맛집탐방`}
            successMessege={''}
            handleFocusIn={() => handleFocusIn(setActivityBorderType)}
            handleFocusOut={() => handleFocusOut(setActivityBorderType)}
          />
        </View>
        <View style={{paddingHorizontal: width * 16}}>
          <UseTextInput
            label={`제목`}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={titleValue}
            borderType={titleBorderType}
            setValue={text => {
              handleChangeValue(text, setTitleValue);
            }}
            placeholder={`3자 이상 50자 이내로 입력해주세요`}
            successMessege={''}
            handleFocusIn={() => handleFocusIn(setTitleBorderType)}
            handleFocusOut={() => handleFocusOut(setTitleBorderType)}
          />
        </View>

        <View style={{paddingHorizontal: width * 16}}>
          <UseTextInput
            label={`내용`}
            multiline
            require={false}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={contentValue}
            borderType={contentBorderType}
            setValue={text => {
              handleChangeValue(text, setContentValue);
            }}
            placeholder={`1000자 이내로 입력해주세요`}
            successMessege={''}
            handleFocusIn={() => handleFocusIn(setContentBorderType)}
            handleFocusOut={() => handleFocusOut(setContentBorderType)}
          />
        </View>
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: 'row',
              gap: width * 8,
              paddingTop: height * 16,
              paddingHorizontal: width * 16,
              paddingBottom: height * 56,
            }}>
            <TouchableWithoutFeedback onPress={openPicker}>
              <View
                style={{
                  width: width * 64,
                  height: width * 64,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: theme.colors.Gray400,
                  borderWidth: width * 1,
                  borderRadius: width * 8,
                }}>
                <CameraIcon />
                <Text>{images.length}/5</Text>
              </View>
            </TouchableWithoutFeedback>
            {images.map((_, idx) => (
              <View key={idx}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setImages(images.filter((_, index) => index !== idx));
                  }}>
                  <View
                    style={{
                      backgroundColor: theme.colors.Gray900,
                      width: width * 20,
                      height: width * 20,
                      borderRadius: width * 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: -height * 8,
                      right: -width * 8,
                      zIndex: 2,
                    }}>
                    <WCloseIcon width={width * 8} height={width * 8} />
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: theme.colors.Gray400,
                    borderWidth: width * 1,
                    borderRadius: width * 8,
                    overflow: 'hidden',
                  }}>
                  <ImageBackground
                    source={{uri: images[idx].path}}
                    resizeMode={'cover'} // 'cover', 'contain', 'stretch', 'repeat', 'center'
                    style={{
                      width: width * 64,
                      height: width * 64,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: width * 16,
          paddingBottom: height * 8,
          backgroundColor: theme.colors.White,
        }}>
        <TouchableOpacity>
          <View style={styles.addBtn}>
            <Text style={styles.addBtnText}>등록하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.White,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 48,
    flexDirection: 'row',
    borderBottomWidth: width * 1,
    borderColor: theme.colors.Gray200,
    zIndex: 2,
    backgroundColor: theme.colors.White,
  },
  headerIcon: {
    width: width * 48,
    height: height * 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width * 0,
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 80,
  },
  headerText: {
    fontSize: width * 20,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Gray900,
    fontFamily: theme.typography.Text,
  },

  body: {
    // paddingHorizontal: width * 20,
    paddingVertical: height * 24,
    backgroundColor: theme.colors.White,
    flex: 1,
  },
  calendar: {
    height: 'auto', // 자동으로 높이를 조정하도록 설정
    backgroundColor: 'red',
  },
  calendarHeaderText: {
    fontSize: width * 16, // 년월 텍스트 크기 조정
    fontWeight: '700', // 텍스트 두께 조정
    color: '#222222', // 텍스트 색상 조정
  },

  addBtn: {
    backgroundColor: theme.colors.Primary500,
    borderRadius: width * 8,
    height: height * 48,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: theme.colors.White,
    fontSize: width * 16,
    fontWeight: theme.fontWeigtht.bold,
  },
});
