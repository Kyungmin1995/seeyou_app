import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {height, width} from '../../../globalDimension';
import {theme} from '../../theme/theme';
import ChatIcon from '../../assets/svg/Chat.svg';
import Setting from '../../assets/svg/Setting.svg';
import Close from '../../assets/svg/close.svg';
import CheackFillIcon from '../../assets/svg/Check_fill.svg';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/RootReducer';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Modal} from 'react-native';
import {getStorage} from '../../utils/storage';

type ChattingProps = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'Chatting'>;
};
type Tmessage = {
  id: string;
  nickName: string;
  content: string;
  time: string;
  count: string;
  checked: boolean;
};
type TBlock = {
  id: string;
  nickName: string;
  time: string;
  checked: boolean;
};

type RBSheetRef = {
  open: () => void;
  close: () => void;
};
export function List({navigation}: ChattingProps) {
  const [token, setToken] = useState('');
  const refRBSheet = useRef<RBSheetRef>(null);
  const userInfo = useSelector((state: RootState) => state.UserReducer);

  // 더미
  const [message, setMessage] = useState<Tmessage[]>([
    {
      id: '1',
      nickName: '오이짱아찌',
      content:
        '대화 미리 보기, 최대 2줄 안녕하세요! 두번째도 넘어가는지 어디한번보자고오오오오',
      time: '오전 11:20',
      count: '0',
      checked: false,
    },
    {
      id: '2',
      nickName: '에그몽몽',
      content: '안녕하세요!',
      time: '오전 11:20',
      count: '1',
      checked: false,
    },
  ]);

  const [blockList, setBlockList] = useState<TBlock[]>([
    {
      id: '1',
      nickName: '오이짱아찌',
      time: '오전 11:20',
      checked: false,
    },
    {
      id: '2',
      nickName: '에그몽몽',
      time: '오전 11:20',
      checked: false,
    },
  ]);

  const goChatRoom = () => {
    navigation.navigate('Chatting');
  };

  const LogoutView = () => {
    return (
      <View style={styles.body}>
        <ChatIcon width={width * 48} height={width * 48} />
        <Text style={styles.bodyText}>회원가입 후 이용하실 수 있어요</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Join');
          }}>
          <Text style={styles.bodyBtn}>회원가입</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const LoginView = () => {
    if (message.length === 0)
      return (
        <View style={styles.body}>
          <ChatIcon width={width * 48} height={width * 48} />
          <Text style={styles.bodyText}>채팅내역이 없어요</Text>
          <Text
            style={{
              marginTop: height * 4,
              fontSize: width * 14,
              fontWeight: theme.fontWeigtht.regular,
              color: theme.colors.Gray500,
            }}>
            함께 한국을 여행할 地陪를 만나보세요
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Join');
            }}>
            <Text style={styles.bodyBtn}>地陪 찾아보기</Text>
          </TouchableOpacity>
        </View>
      );
    else {
      const renderItem = ({item}: {item: Tmessage}) => {
        return (
          <TouchableWithoutFeedback key={item.id} onPress={goChatRoom}>
            <View style={styles.messageBody}>
              <View>
                <Image source={require('../../assets/images/thumb.png')} />
              </View>
              <View style={styles.messageTextContainer}>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.content}>
                  {item.content}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
                {item.count !== '0' && (
                  <View style={styles.countView}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      };

      return (
        <>
          <View style={styles.messageContainer}>
            <FlatList
              style={{backgroundColor: '#FFF'}}
              data={message}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      );
    }
  };

  const handleOpenSheet = () => {
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };

  const SettingView = () => (
    <RBSheet
      // closeDuration={2000}
      ref={refRBSheet}
      // height={height * 354}
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
          paddingHorizontal: width * 20,
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
        }}>
        <TouchableWithoutFeedback onPress={() => ModalViewOpenBtn('Block')}>
          <View style={styles.bottomView}>
            <Text style={styles.bottomViewText}>차단 관리</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => ModalViewOpenBtn('Edit')}>
          <View style={styles.bottomView}>
            <Text style={styles.bottomViewText}>채팅방 편집</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.bottomView}>
            <Text style={styles.bottomViewText}>취소하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </RBSheet>
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalViewType, setModalViewType] = useState('Block');

  const ModalViewOpenBtn = (type: string) => {
    setModalVisible(true);
    setModalViewType(type);
  };

  useEffect(() => {
    const isAnyChecked = blockList.some(item => item.checked);
    const isAnyChecked_ = message.some(item => item.checked);

    if (isAnyChecked || isAnyChecked_) setChecked(true);
    else setChecked(false);
  }, [blockList, message]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 클린업 함수
      setBlockList(prevList =>
        prevList.map(item => ({...item, checked: false})),
      );
      setMessage(prevList => prevList.map(item => ({...item, checked: false})));
    };
  }, [modalVisible]);

  const toggleCheck = (id: string) => {
    setBlockList(prevList =>
      prevList.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const toggleCheck_ = (id: string) => {
    setMessage(prevList =>
      prevList.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const BlockListView = () => {
    const renderItem = ({item}: {item: TBlock}) => {
      return (
        <>
          <TouchableWithoutFeedback onPress={() => toggleCheck(item.id)}>
            <View style={styles.messageBody}>
              {item.checked ? (
                <CheackFillIcon width={width * 21} height={width * 21} />
              ) : (
                <View style={styles.checkBoxDefault} />
              )}

              <View>
                <Image source={require('../../assets/images/thumb.png')} />
              </View>
              <View style={styles.messageTextContainer}>
                <Text style={styles.nickName}>{item.nickName}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    };
    return (
      <>
        <View style={[styles.messageContainer, {flex: 1}]}>
          <View style={styles.modalViewHeader}>
            <Text style={styles.modalViewText}>차단관리</Text>
            <View style={styles.modalHeaderBtn}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Close width={width * 24} height={width * 24} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.modalBody}>
            <FlatList
              style={{backgroundColor: '#FFF'}}
              data={blockList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={[styles.modalFooter, {width: '100%'}]}>
            <TouchableOpacity>
              <View
                style={[
                  styles.modalFooterBtn,
                  !checked && styles.checked,
                  {backgroundColor: theme.colors.Primary500},
                ]}>
                <Text
                  style={[
                    styles.modalFooterBtnText,
                    {
                      color: theme.colors.White,
                    },
                  ]}>
                  차단해제
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  const EditListView = () => {
    const renderItem = ({item}: {item: Tmessage}) => {
      return (
        <>
          <TouchableWithoutFeedback onPress={() => toggleCheck_(item.id)}>
            <View style={styles.messageBody}>
              {item.checked ? (
                <CheackFillIcon width={width * 21} height={width * 21} />
              ) : (
                <View style={styles.checkBoxDefault} />
              )}

              <View>
                <Image source={require('../../assets/images/thumb.png')} />
              </View>
              {/* <View style={styles.messageTextContainer}>
                <Text style={styles.nickName}>{item.nickName}</Text>
              </View> */}
              <View style={styles.messageTextContainer}>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.content}>
                  {item.content}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
                {item.count !== '0' && (
                  <View style={styles.countView}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    };
    return (
      <>
        <View style={[styles.messageContainer, {flex: 1}]}>
          <View style={styles.modalViewHeader}>
            <Text style={styles.modalViewText}>채팅방 편집</Text>
          </View>
          <View style={styles.modalHeaderBtn}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <Close width={width * 24} height={width * 24} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.modalBody}>
            <FlatList
              style={{backgroundColor: '#FFF'}}
              data={message}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View
            style={[
              styles.modalFooter,
              {width: '100%', flexDirection: 'row', gap: width * 8},
            ]}>
            <View style={{flex: 0.5}}>
              <TouchableOpacity>
                <View
                  style={[
                    styles.modalFooterBtn,
                    !checked && styles.checked,
                    {
                      backgroundColor: theme.colors.White,
                      borderWidth: width * 1,
                      borderColor: theme.colors.Gray400,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.modalFooterBtnText,
                      {color: theme.colors.Gray900},
                    ]}>
                    선택해제
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}>
              <TouchableOpacity>
                <View
                  style={[
                    styles.modalFooterBtn,
                    !checked && styles.checked,
                    {
                      backgroundColor: theme.colors.Primary500,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.modalFooterBtnText,
                      {color: theme.colors.White},
                    ]}>
                    나가기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const retrieveData = async () => {
    const tokenValue = await getStorage('access_token');
    if (tokenValue === null) setToken('');
    else setToken(tokenValue.access_token);
  };
  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>채팅</Text>
          <View style={styles.headerBtn}>
            <TouchableWithoutFeedback onPress={handleOpenSheet}>
              <Setting width={width * 24} height={width * 24} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {token === '' ? <LogoutView /> : <LoginView />}
        <SettingView />
        <Modal visible={modalVisible}>
          {modalViewType === 'Block' ? <BlockListView /> : <EditListView />}
        </Modal>
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
  body: {
    flex: 1,
    backgroundColor: theme.colors.White,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    color: theme.colors.Gray700,
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 16,
    fontFamily: theme.typography.Text,
  },
  bodyBtn: {
    fontWeight: theme.fontWeigtht.bold,
    color: theme.colors.Primary500,
    fontSize: width * 16,
    fontFamily: theme.typography.Text,
    // backgroundColor: 'red',
    padding: width * 20,
  },

  // 메시지
  messageContainer: {},
  messageBody: {
    flexDirection: 'row',
    gap: width * 12,
    alignItems: 'center',
    paddingVertical: height * 20,
    paddingHorizontal: width * 20,
    borderBottomWidth: width * 1,
    borderColor: theme.colors.Gray200,
  },
  messageTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: height * 6,
  },

  nickName: {
    fontSize: width * 16,
    fontWeight: theme.fontWeigtht.bold,
    color: theme.colors.Gray900,
  },
  content: {
    fontSize: width * 14,
    fontWeight: theme.fontWeigtht.regular,
    color: theme.colors.Gray700,
  },

  timeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    gap: height * 10,
  },
  timeText: {
    fontSize: width * 12,
    fontWeight: theme.fontWeigtht.regular,
    color: theme.colors.Gray500,
  },
  countView: {
    backgroundColor: theme.colors.Primary500,
    width: width * 24,
    height: width * 24,
    borderRadius: width * 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: width * 14,
    fontWeight: theme.fontWeigtht.regular,
    color: theme.colors.White,
    fontFamily: theme.typography.US_Number,
    width: width * 9,
  },
  bottomView: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: height * 14,
  },
  bottomViewText: {
    fontSize: width * 16,
    fontWeight: theme.fontWeigtht.regular,
    color: theme.colors.Gray900,
  },
  modalViewContainer: {},
  modalViewHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: height * 48,
    alignItems: 'center',
  },
  modalBody: {},
  modalFooter: {
    paddingHorizontal: width * 20,
    position: 'absolute',
    bottom: height * 20,
  },
  modalFooterBtn: {
    borderRadius: width * 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 48,
  },
  modalFooterBtnText: {
    fontFamily: theme.typography.Text,
    fontSize: width * 16,
    fontWeight: theme.fontWeigtht.bold,
  },
  modalViewText: {
    color: theme.colors.Gray900,
    fontFamily: theme.typography.Text,
    fontWeight: theme.fontWeigtht.medium,
    fontSize: width * 18,
  },
  modalHeaderBtn: {
    position: 'absolute',
    right: 0,
    height: width * 48,
    width: width * 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxDefault: {
    width: width * 20,
    height: width * 20,
    borderWidth: width * 1,
    borderColor: theme.colors.Gray400,
    borderRadius: width * 4,
  },
  checked: {
    opacity: 0.6, // 체크된 경우 불투명도
  },
});
