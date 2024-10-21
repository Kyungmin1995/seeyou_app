import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import UseTextInput from '../../hooks/UseTextInput';
import {height, width} from '../../../globalDimension';
import {SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import PluseIcon from '../../assets/svg/Plus.svg';
import CloseIconFill from '../../assets/svg/CloseFill.svg';
import AddItem from './AddItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import CloseIcon from '../../assets/svg/close.svg';
import BackIcon from '../../assets/svg/Back.svg';
import {theme} from '../../theme/theme';
import RadioFill from '../../assets/svg/RadioFill.svg';
import Radio from '../../assets/svg/radio.svg';

type TaddtionalForm = {
  volume: any;
  setVolume: any;
  regionTextArray: any;
  setRegionTextArray: any;
  providedTextArray: any;
  setProvidedTextArray: any;
  regionArray: any;
  providedArray: any;
  setProvidedArray: any;
  regionArrayCopy: any;
  setRegionArray: any;
  setRegionArrayCopy: any;
  providedArrayCopy: any;
  setProvidedArrayCopy: any;
  statusCountry: any;
};

export type Tregion = {
  title: string;
};
export type Tprovided = {
  title: string;
};
export type TregionProps = {
  region: Tregion[];
  regionArrayCopy: Tregion[];
  setRegion: React.Dispatch<SetStateAction<Tregion[]>>;
  setRegionArray: React.Dispatch<SetStateAction<Tregion[]>>;
  setRegionArrayCopy: React.Dispatch<SetStateAction<Tregion[]>>;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};
export type TprovidedProps = {
  provided: Tprovided[];
  providedArrayCopy: Tprovided[];
  setProvidedArray: React.Dispatch<SetStateAction<Tregion[]>>;
  setProvidedArrayCopy: React.Dispatch<SetStateAction<Tprovided[]>>;
  setProvided: React.Dispatch<SetStateAction<Tprovided[]>>;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

export function AdditionalForm({
  regionTextArray,
  setRegionTextArray,
  providedTextArray,
  setProvidedTextArray,
  regionArray,
  setRegionArray,
  providedArray,
  setProvidedArray,
  regionArrayCopy,
  setRegionArrayCopy,
  providedArrayCopy,
  setProvidedArrayCopy,
  statusCountry,
  setVolume,
  volume,
}: TaddtionalForm) {
  const [periodValue, setPeriodValue] = useState<string>('');
  const [periodValueBorderType, setPeriodValueBorderType] =
    useState<string>('default');

  const handlePeriodFocusIn = useCallback(() => {
    setPeriodValueBorderType('focus');
  }, [periodValueBorderType]);
  const handlePeriodFocusOut = useCallback(() => {
    setPeriodValueBorderType('default');
  }, [periodValueBorderType]);

  const handleChangeValue = (
    text: string,
    setValue: (value: string) => void,
  ) => {
    setValue(text);
  };
  const refRBSheet = useRef<any>(null);
  const trackMarks = [
    {
      value: '최상',
      volume: 'VERY_TOP',
      topText: '아주 유창해요',
      bottomText: '원어민처럼 잘해요',
    },
    {
      value: '상',
      volume: 'TOP',
      topText: '병원/피부과 진료까지 가능해요',
      bottomText: '어려운 전문분야 회화도 가능해요',
    },
    {
      value: '중',
      volume: 'MID',
      topText: '일상회화는 문제없어요',
      bottomText: '맛집, 팝업스토어 등 원활하게 이용할 수 있어요',
    },
    {
      value: '중하',
      volume: 'MID_LOW',
      topText: '쉬운 회화 정도 가능해요',
      bottomText: '아직 유창하지 않지만, 활동지역은 잘 알아요',
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<string>('region');
  const [region, setRegion] = useState('');
  const [regionBorderType, setRegionBorderType] = useState<string>('default');
  const [provided, setProvided] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [providedBorderType, setProvidedBorderType] =
    useState<string>('default');

  const handleRegionFocusIn = useCallback(() => {
    setRegionBorderType('focus');
  }, [regionBorderType]);
  const handleRegionFocusOut = useCallback(() => {
    setRegionBorderType('default');
  }, [regionBorderType]);
  const handleProvidedFocusIn = useCallback(() => {
    setProvidedBorderType('focus');
  }, [providedBorderType]);
  const handleProvidedFocusOut = useCallback(() => {
    setProvidedBorderType('default');
  }, [providedBorderType]);

  const checkLanguageLevel = useCallback(
    (volume: string) => {
      console.log(volume);
      // setLanguageLevel(volume);
      setVolume(volume);
    },
    [volume],
  );
  const BottomSheetBody = () => {
    return (
      <>
        <View style={{marginTop: height * 28}}>
          {trackMarks.map(_ => {
            return (
              <View key={_.value}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    checkLanguageLevel(_.volume);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: width * 12,
                      alignItems: 'center',
                      marginBottom: height * 24,
                    }}>
                    <View
                      style={{
                        borderRadius: width * 50,
                        borderWidth: width * 1,
                        width: width * 40,
                        height: width * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: theme.colors.Primary500,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.Primary500,
                          fontWeight: theme.fontWeigtht.bold,
                          fontSize: width * 14,
                        }}>
                        {_.value}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        height: width * 42,
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.Gray900,
                          fontWeight: theme.fontWeigtht.bold,
                          fontSize: width * 16,
                        }}>
                        {_.topText}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.Gray700,
                          fontWeight: theme.fontWeigtht.regular,
                          fontSize: width * 14,
                        }}>
                        {_.bottomText}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: width * 20,
                        width: width * 20,
                      }}>
                      {_.volume === volume ? <RadioFill /> : <Radio />}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </>
    );
  };
  const handlePress = () => {
    Keyboard.dismiss(); // 키보드 닫기
    setTimeout(() => {
      refRBSheet.current.open(); // 0.5초 후 시트 열기
    }, 150); // 500ms = 0.5초
  };
  return (
    <>
      <View>
        {/* 한국거주기간 */}
        {statusCountry === 'CHINA' && (
          <UseTextInput
            label={'한국 거주기간'}
            require={true}
            style={{fontSize: width * 16}}
            returnKeyType={'done'}
            onEndEditing={() => {}}
            value={periodValue}
            borderType={periodValueBorderType}
            setValue={text => {
              handleChangeValue(text, setPeriodValue);
            }}
            placeholder={'연 단위로 입력해주세요'}
            errorMessege={'error'}
            successMessege={''}
            handleFocusIn={handlePeriodFocusIn}
            handleFocusOut={handlePeriodFocusOut}
          />
        )}

        {/* 한국어수준 */}
        <View style={{marginBottom: height * 28}}>
          <View
            style={{
              gap: 2,
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>
              {statusCountry === 'CHINA' ? '한국어' : '중국어'} 수준
            </Text>
            <Text style={styles.redStar}>*</Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={handlePress}>
              <View>
                <TextInput
                  placeholder="레벨을 선택해주세요"
                  editable={false}
                  style={{
                    borderColor: '#EEEEEE',
                    borderWidth: width * 1,
                    borderRadius: width * 8,
                    marginTop: height * 8,
                    paddingHorizontal: width * 16,
                    paddingVertical: height * 12,
                    fontSize: width * 16,
                    fontWeight: '400',
                  }}
                />
                <View
                  style={{
                    transform: [{rotate: '-90deg'}],
                    width: width * 20,
                    height: width * 20,
                    // backgroundColor: 'red',
                    position: 'absolute',
                    right: width * 20,
                    top: height * 20,
                  }}>
                  <BackIcon />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <RBSheet
            // closeDuration={2000}
            ref={refRBSheet}
            height={height * 400}
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
                언어수준
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <CloseIcon />
              </TouchableWithoutFeedback>
            </View>
            <BottomSheetBody />
          </RBSheet>
        </View>
        {/* 활동지역 */}
        <RegionComponent
          region={regionArray}
          setRegion={setRegionArray}
          setRegionArray={setRegionArray}
          regionArrayCopy={regionArrayCopy}
          setRegionArrayCopy={setRegionArrayCopy}
          setPopUp={setModalVisible}
          setStatus={setStatus}
        />
        <ProvidedComponent
          provided={providedArray}
          setProvided={setProvidedArray}
          setProvidedArray={setProvidedArray}
          providedArrayCopy={providedArrayCopy}
          setProvidedArrayCopy={setProvidedArrayCopy}
          setPopUp={setModalVisible}
          setStatus={setStatus}
        />
      </View>
      {/* 추가모달 */}

      <Modal
        visible={modalVisible}
        children={
          <AddItem
            value={status === 'region' ? region : provided}
            setValue={status === 'region' ? setRegion : setProvided}
            borderType={
              status === 'region' ? regionBorderType : providedBorderType
            }
            handleFocusIn={
              status === 'region' ? handleRegionFocusIn : handleProvidedFocusIn
            }
            handleFocusOut={
              status === 'region'
                ? handleRegionFocusOut
                : handleProvidedFocusOut
            }
            textDataArray={
              status === 'region' ? regionTextArray : providedTextArray
            }
            setTextDataArray={
              status === 'region' ? setRegionTextArray : setProvidedTextArray
            }
            dataArray={status === 'region' ? regionArray : providedArray}
            setDataArray={
              status === 'region' ? setRegionArray : setProvidedArray
            }
            setArrayCopy={
              status === 'region' ? setRegionArrayCopy : setProvidedArrayCopy
            }
            handleChangeValue={handleChangeValue}
            setPopUp={setModalVisible}
            status={status}
          />
        }
      />
    </>
  );
}

const RegionComponent = ({
  setRegion,
  setPopUp,
  setStatus,
  regionArrayCopy,
  setRegionArrayCopy,
}: TregionProps) => {
  const deleteCopyArray = (index: number) => {
    const newArray = regionArrayCopy.filter((_, i) => i !== index);
    setRegionArrayCopy(newArray);
  };

  return (
    <View style={styles.propsContainer}>
      <View style={styles.rowBetween}>
        <View style={styles.propsTop}>
          <Text style={styles.title}>활동지역</Text>
          <Text style={styles.redStar}>*</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setPopUp(true);
            setStatus('region');
            setRegion([...regionArrayCopy]);
          }}>
          <View style={[styles.addBtn]}>
            <Text style={styles.addBtnText}>추가</Text>
            <PluseIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.propsBody}>
        {regionArrayCopy.map((_, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPress={() => {
              deleteCopyArray(idx);
            }}>
            <View style={styles.propsBodyItem}>
              <Text style={styles.propsBodyItemText}>{_.title}</Text>

              <CloseIconFill width={width * 10} height={width * 10} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const ProvidedComponent = ({
  setProvided,
  setPopUp,
  setStatus,
  providedArrayCopy,
  setProvidedArrayCopy,
}: TprovidedProps) => {
  const deleteCopyArray = (index: number) => {
    const newArray = providedArrayCopy.filter((_, i) => i !== index);
    setProvidedArrayCopy(newArray);
  };

  return (
    <View style={styles.propsContainer}>
      <View style={styles.rowBetween}>
        <View style={styles.propsTop}>
          <Text style={styles.title}>제공 서비스</Text>
          <Text style={styles.redStar}>*</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setPopUp(true);
            setStatus('provided');
            setProvided([...providedArrayCopy]);
          }}>
          <View style={styles.addBtn}>
            <Text style={styles.addBtnText}>추가</Text>
            <PluseIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.propsBody}>
        {providedArrayCopy.map((_, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPress={() => {
              deleteCopyArray(idx);
            }}>
            <View style={styles.propsBodyItem}>
              <Text style={styles.propsBodyItemText}>{_.title}</Text>

              <CloseIconFill width={width * 10} height={width * 10} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  title: {
    color: '#616161',
    fontWeight: '700',
    fontSize: width * 14,
  },
  redStar: {color: 'red', fontWeight: '700', fontSize: width * 14},

  //  활동지역 css
  propsContainer: {
    backgroundColor: '#fff',
    marginBottom: height * 28,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propsTop: {
    gap: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#222222',
    fontWeight: '700',
    fontSize: width * 14,
  },
  propsBody: {
    paddingTop: height * 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 8,
  },
  propsBodyItem: {
    paddingVertical: height * 8,
    paddingHorizontal: width * 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: width * 36,
    borderColor: '#F34902',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: width * 5,
  },
  propsBodyItemText: {
    color: '#F34902',
    fontSize: width * 14,
    fontWeight: '400',
  },

  // 모달
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
