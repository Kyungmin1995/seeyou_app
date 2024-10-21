import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {
  height,
  screenHeight,
  screenWidth,
  width,
} from '../../../globalDimension';
import CloseIcon from '../../assets/svg/close.svg';
import UseTextInput from '../../hooks/UseTextInput';
import {Tprovided, Tregion} from './AdditionalForm';
import CloseIconFill from '../../assets/svg/CloseFill.svg';
import RefreshFillIcon from '../../assets/svg/RefreshFill.svg';
import RefreshIcon from '../../assets/svg/Refresh.svg';
import {theme} from '../../theme/theme';
import {SetStateAction, useEffect, useState} from 'react';
import {androidStatusBarHeight} from './OneDepth';
import {ScrollView} from 'react-native';

type TaddItemProps = {
  value: string;
  borderType: string;
  handleFocusIn: any;
  handleFocusOut: any;
  handleChangeValue: any;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  textDataArray: Tregion[] | Tprovided[];
  setTextDataArray: React.Dispatch<SetStateAction<Tregion[] | Tprovided[]>>;
  dataArray: Tregion[] | Tprovided[];
  setDataArray: React.Dispatch<React.SetStateAction<Tregion[] | Tprovided[]>>;
  setArrayCopy: React.Dispatch<React.SetStateAction<Tregion[] | Tprovided[]>>;
};

const AddItem = ({
  value,
  borderType,
  handleFocusIn,
  handleFocusOut,
  handleChangeValue,
  setValue,
  setPopUp,
  status,
  dataArray,
  setDataArray,
  textDataArray,
  setTextDataArray,
  setArrayCopy,
}: TaddItemProps) => {
  const addTextArray = () => {
    setDataArray([...dataArray, {title: value}]);
    setValue('');
  };

  const addArray = (props: Tregion | Tprovided) => {
    setDataArray([...dataArray, props]);
  };
  const deleteArray = (index: number) => {
    const newArray = dataArray.filter((_, i) => i !== index);
    setDataArray(newArray);
  };

  const enter = () => {
    setArrayCopy([...dataArray]);
    setPopUp(false);
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          }}>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 48,
                flexDirection: 'row',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: width * 20,
                    fontWeight: theme.fontWeigtht.medium,
                    color: theme.colors.Gray900,
                  }}>
                  {status === 'region' ? '활동지역' : '제공 서비스'}
                </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  setPopUp(false);
                }}>
                <View style={styles.back}>
                  <CloseIcon />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                paddingHorizontal: width * 20,
                paddingBottom: height * 20,
              }}>
              <View>
                <UseTextInput
                  label={``}
                  require={false}
                  style={{fontSize: width * 16}}
                  returnKeyType={'done'}
                  onEndEditing={() => {}}
                  value={value}
                  borderType={borderType}
                  setValue={text => {
                    handleChangeValue(text, setValue);
                  }}
                  placeholder={`${
                    status === 'region' ? '활동지역을' : '서비스를'
                  } 입력해주세요`}
                  errorMessege={`${
                    status === 'region' ? '활동지역을' : '서비스를'
                  } 확인해 주세요`}
                  successMessege={''}
                  handleFocusIn={handleFocusIn}
                  handleFocusOut={handleFocusOut}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: width * 16,
                    top: height * 42,
                  }}>
                  <TouchableOpacity onPress={addTextArray}>
                    <Text
                      style={{
                        color: theme.colors.Primary500,
                        fontWeight: theme.fontWeigtht.bold,
                        fontSize: width * 16,
                      }}>
                      추가
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: theme.colors.Gray900,
                    fontWeight: theme.fontWeigtht.bold,
                    fontSize: width * 14,
                    marginBottom: height * 16,
                  }}>
                  많이 찾는 지역
                </Text>
                <View style={styles.propsBody}>
                  {textDataArray.map((_, idx) => {
                    const isMatched = dataArray.some(
                      _item => _.title === _item.title,
                    );
                    return (
                      <TouchableWithoutFeedback
                        key={idx}
                        disabled={isMatched}
                        onPress={() => {
                          addArray({title: _.title});
                        }}>
                        <View
                          key={idx}
                          style={[
                            styles.propsBodyItem,
                            {
                              borderColor: !isMatched
                                ? theme.colors.Gray200
                                : 'red',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.propsBodyItemText,
                              {color: theme.colors.Gray900},
                            ]}>
                            {_.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.Gray100,
            }}>
            <View
              style={{
                width: screenWidth,
              }}>
              <View
                style={{
                  paddingHorizontal: width * 20,
                  paddingVertical: height * 20,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: height * 16,
                    }}>
                    <Text
                      style={{
                        color: theme.colors.Gray900,
                        fontWeight: theme.fontWeigtht.bold,
                        fontSize: width * 14,
                      }}>
                      선택한 지역
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setDataArray([]);
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color:
                              dataArray.length <= 0 ? '#BDBDBD' : '#222222',
                          }}>
                          초기화
                        </Text>

                        {dataArray.length <= 0 ? (
                          <RefreshIcon />
                        ) : (
                          <RefreshFillIcon />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: width * 6,
                      }}>
                      {dataArray.length === 0 && (
                        <Text
                          style={{
                            height: height * 36,
                          }}>
                          선택한 지역이 없어요
                        </Text>
                      )}

                      {dataArray.map((_, idx) => {
                        return (
                          <TouchableWithoutFeedback
                            key={idx}
                            onPress={() => {
                              deleteArray(idx);
                            }}>
                            <View
                              style={[
                                styles.propsBodyItem,
                                {borderColor: theme.colors.Primary500},
                              ]}>
                              <Text
                                style={[
                                  styles.propsBodyItemText,
                                  {color: theme.colors.Primary500},
                                ]}>
                                {_.title}
                              </Text>

                              <CloseIconFill
                                width={width * 10}
                                height={width * 10}
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: theme.colors.White,
                  paddingHorizontal: width * 20,
                  paddingVertical: width * 16,
                  borderTopWidth: width * 1,
                  borderColor: theme.colors.Gray200,
                }}>
                <TouchableWithoutFeedback onPress={enter}>
                  <View
                    style={{
                      backgroundColor: theme.colors.Primary500,
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: width * 8,
                      height: height * 48,
                    }}>
                    <Text
                      style={{
                        color: theme.colors.White,
                        fontWeight: theme.fontWeigtht.bold,
                        fontSize: width * 16,
                      }}>
                      선택완료
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
export default AddItem;

const styles = StyleSheet.create({
  back: {
    width: width * 48,
    height: height * 48,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propsBody: {
    paddingTop: height * 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 8,
  },
  propsBodyItem: {
    paddingHorizontal: width * 12,
    height: height * 36,
    backgroundColor: theme.colors.White,
    borderWidth: width * 1,
    borderRadius: width * 36,

    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: width * 5,
  },
  propsBodyItemText: {
    fontSize: width * 14,
    fontWeight: '400',
  },
});
