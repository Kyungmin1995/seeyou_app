import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Button,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {theme} from '../../theme/theme';
import {height, width} from '../../../globalDimension';
import BackIcon from '../../assets/svg/Back.svg';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {Modal} from 'react-native';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import API from '../../utils/axios';
import {AxiosError} from 'axios';

type TLastDepthProps = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'LastDepth'>;
};
type TPhotoProps = {
  path: string;
  width: number;
  height: number;
};
const LastDepth = ({navigation, route}: TLastDepthProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<TPhotoProps>({
    path: '',
    width: 0,
    height: 0,
  });
  console.log(route.params, 'route');

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo', // 이미지 유형을 사진으로 설정
      includeBase64: false, // Base64 포함 여부
      cropping: true, // 이미지 자르기 기능 활성화
      cropperChooseText: '선택', // 자르기 화면에서 선택 버튼 텍스트
      cropperCancelText: '취소', // 자르기 화면에서 취소 버튼 텍스트
    })
      .then(image => {
        console.log(image);
        setImageUri({
          path: image.path,
          width: image.width,
          height: image.height,
        });
        setModalVisible(false);
      })
      .catch(err => {
        setImageUri({path: '', width: 0, height: 0});
      });
  };

  const setPicker = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: false,
      cropping: true,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    })
      .then(image => {
        setImageUri({
          path: image.path,
          width: image.width,
          height: image.height,
        });
        setModalVisible(false);
      })
      .catch(err => {
        setImageUri({path: '', width: 0, height: 0});
      });
  };

  const upLoadPhoto = async () => {
    const data = {
      user_seq: route.params?.user_seq,
      image: imageUri?.path,
    };
    console.log(data);

    try {
      const res = await API.post('/api/v1/auth/idcard', data);
      console.log(res.data.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse: any = axiosError.response.data;
        console.error(errorResponse, '실패');
      }
    }
  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        children={
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}>
            <View
              style={{
                padding: width * 20,
                flex: 1,
                backgroundColor: '#00000099',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.White,
                    paddingTop: height * 32,
                    paddingBottom: height * 20,
                    paddingHorizontal: width * 20,
                    alignContent: 'center',
                    borderRadius: width * 16,
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: theme.colors.Gray900,
                        fontWeight: theme.fontWeigtht.semebold,
                        fontSize: width * 18,
                        marginBottom: height * 8,
                        textAlign: 'auto',
                      }}>
                      본인의 신분을 검증할 수 있는 사진을 등록해주세요
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.Gray900,
                        fontWeight: theme.fontWeigtht.regular,
                        fontSize: width * 14,
                        marginBottom: height * 24,
                      }}>
                      마스크, 선글라스 등 식별할 수 없는 사진은 불가합니다.
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: height * 8,
                    }}>
                    <TouchableOpacity
                      onPress={openPicker}
                      style={{
                        backgroundColor: theme.colors.Primary500,
                        alignItems: 'center',
                        paddingVertical: height * 13,
                        borderRadius: width * 8,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.White,
                          fontWeight: theme.fontWeigtht.bold,
                          fontSize: width * 16,
                        }}>
                        앨범에서 사진 선택
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={setPicker}
                      style={{
                        backgroundColor: theme.colors.White,
                        alignItems: 'center',
                        paddingVertical: height * 13,
                        borderRadius: width * 8,
                        borderWidth: width * 1,
                        borderColor: theme.colors.Primary500,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.Primary500,
                          fontSize: width * 16,
                          fontWeight: theme.fontWeigtht.bold,
                        }}>
                        사진 찍기
                      </Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: theme.colors.White,

                          paddingVertical: height * 13,
                          paddingHorizontal: 20,
                        }}
                        onPress={() => {
                          setModalVisible(false);
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                            fontWeight: theme.fontWeigtht.bold,
                            color: theme.colors.Gray700,
                            fontSize: width * 16,
                          }}>
                          취소
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        }
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.White,
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
            <View style={styles.back}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('TwoDepth')}>
                <BackIcon />
              </TouchableWithoutFeedback>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: width * 20,
                  fontWeight: theme.fontWeigtht.medium,
                  color: theme.colors.Gray900,
                }}>
                地陪 인증
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: width * 20,
            }}>
            <Text
              style={{
                fontSize: width * 24,
                fontWeight: theme.fontWeigtht.bold,
                color: theme.colors.Gray900,
                paddingTop: height * 32,
                paddingBottom: height * 12,
              }}>
              신분증(여권)을 제출하셔야{'\n'}地陪 활동이 가능해요
            </Text>
            <Text
              style={{
                fontSize: width * 12,
                fontWeight: theme.fontWeigtht.medium,
                color: theme.colors.Gray700,
              }}>
              신분증은 서비스의 신뢰성을 높이는 용도로만 사용되며,{'\n'}
              다른 회원님들에게는 공개되지 않습니다
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: width * 20,
            }}>
            {imageUri.path !== '' ? (
              <>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setImageUri({path: '', width: 0, height: 0});
                  }}>
                  <Text style={{textAlign: 'right'}}>삭제</Text>
                </TouchableWithoutFeedback>
                <View>
                  <ImageBackground
                    source={{uri: imageUri.path}}
                    resizeMode={'center'} // 'cover', 'contain', 'stretch', 'repeat', 'center'
                    style={{
                      height: height * 300,
                    }}
                  />
                </View>
              </>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    marginTop: height * 36,
                    marginBottom: height * 36,
                    backgroundColor: theme.colors.Gray100,
                    height: height * 200,
                    borderRadius: width * 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={require('./../../assets/images/Icon_Plus.png')}
                    resizeMode={'cover'} // 'cover', 'contain', 'stretch', 'repeat', 'center'
                    style={{
                      height: width * 48,
                      width: width * 48,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}

            <View
              style={{
                padding: width * 16,
                backgroundColor: theme.colors.White,
                borderRadius: width * 8,
                flexDirection: 'row',
                gap: width * 10,
                flexWrap: 'wrap',
                borderWidth: width * 1,
                borderColor: theme.colors.Gray200,
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
                  안내사항
                </Text>
              </View>
              <Text style={{color: theme.colors.Primary500}}>
                원활한 확인을 위해 신분증과 얼굴이 나란히 또렷하게 찍은 사진으로
                등록해주세요.
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          disabled={imageUri?.path === ''}
          onPress={upLoadPhoto}>
          <View
            style={{
              backgroundColor:
                imageUri?.path !== ''
                  ? theme.colors.Primary500
                  : theme.colors.Gray100,
              marginBottom: height * 20,
              padding: height * 13,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: width * 8,
              marginHorizontal: width * 20,
            }}>
            <Text
              style={{
                fontWeight: theme.fontWeigtht.bold,
                color:
                  imageUri?.path !== ''
                    ? theme.colors.White
                    : theme.colors.Gray400,
                fontSize: width * 16,
              }}>
              완료
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LastDepth;
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  propsBodyItem: {
    paddingHorizontal: width * 12,
    backgroundColor: theme.colors.White,
    borderWidth: width * 1,
    borderRadius: width * 36,
    paddingVertical: height * 3,
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
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
