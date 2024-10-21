import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  FlatList,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {useKeyboardHandler} from 'react-native-keyboard-controller';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {height, width} from '../../../globalDimension';

import BackIcon from '../../assets/svg/Back.svg';
import MoreIcon from '../../assets/svg/More.svg';
import TipIcon from '../../assets/svg/tip.svg';
import CameraIcon from '../../assets/svg/Camera.svg';
import GalleryIcon from '../../assets/svg/gallery.svg';
import SendIcon from '../../assets/svg/send.svg';
import {
  ScreenNavigationProps,
  ScreenRouteProp,
} from '../../utils/RootParamList';
import {theme} from '../../theme/theme';
import axios from 'axios';

const AnimatedViewInput = Reanimated.createAnimatedComponent(View);

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height_ = useSharedValue(0);

  useKeyboardHandler({
    onMove: e => {
      'worklet';
      progress.value = e.progress;
      height_.value = e.height;
    },
    onInteractive: e => {
      'worklet';

      progress.value = e.progress;
      height_.value = e.height;
    },
  });

  return {height_, progress};
};

type TChattingDetail = {
  navigation: ScreenNavigationProps;
  route: ScreenRouteProp<'ChattingDetail'>;
};
const SERVER_URL =
  'ws://112.170.204.92:9001/chats?Authorization=chatUserddingo3';
const userEmail = 'rudals782@nate.com';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydWRhbHM3ODIiLCJydWxlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzE5OTExMjcwfQ.p3NWra0xk3wrG86uFyg9TBIxmVLyBGJS_QOjtVowwNLOvmkbU75-zHy6NvCA26Z4vHwhU9BEEKymU-pFCIn4cQ';
const initialMessages: any[] = [
  {id: '2', message: '2번메세지', sender: userEmail, senderEmail: userEmail},
  {id: '3', message: '3번메세지', sender: userEmail, senderEmail: userEmail},
  {id: '4', message: '4번메세지', sender: '상대', senderEmail: userEmail},
];

export function ChattingDetail({navigation}: TChattingDetail) {
  const {height_} = useKeyboardAnimation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>(initialMessages);

  const [inputHeight, setInputHeight] = useState(0);

  const handleContentSizeChange: TextInputProps['onContentSizeChange'] =
    event => {
      setInputHeight(event.nativeEvent.contentSize.height);
    };

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      marginBottom: height_.value,
    }),
    [],
  );
  const textInputStyle = useAnimatedStyle(
    () => ({
      transform: [{translateY: -height_.value}],
    }),
    [],
  );

  const TopViewItem = () => (
    <>
      <View style={styles.TopContainer}>
        <View style={styles.TopContents}>
          <Image
            style={styles.TopContentImg}
            source={require('../../assets/images/thumb.png')}
            resizeMode={'cover'}
          />
          <View style={{justifyContent: 'space-around'}}>
            <Text
              style={{
                color: theme.colors.Gray900,
                fontFamily: theme.typography.Text,
                fontWeight: theme.fontWeigtht.bold,
                fontSize: width * 14,
              }}>
              메시지 테스트
            </Text>
            <Text
              style={{
                color: theme.colors.Gray700,
                fontFamily: theme.typography.Text,
                fontWeight: theme.fontWeigtht.regular,
                fontSize: width * 14,
              }}>
              06.16
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.TopBtn}>
            <Text style={styles.TopBtnText}> 요청하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.chatView}>
        <View style={styles.tipContainer}>
          <TipIcon />
          <Text style={styles.tipText}>
            喜友는 앱 내에서 이루어지지 않은 거래로 발생하는 손해나 환불에 대해
            책임지지 않음을 안내드립니다
          </Text>
        </View>
        <Text style={{marginVertical: height * 16}}>2024년 4월 3일 수요일</Text>
      </View>
    </>
  );
  const renderItem = ({item}: any) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            gap: width * 12,
            paddingHorizontal: 20,
          }}>
          {item.sender !== userEmail && (
            <View style={styles.fixedContainer}>
              <Image
                style={styles.TopContentImg}
                source={require('../../assets/images/thumb.png')}
                resizeMode={'cover'}
              />
            </View>
          )}

          <View
            style={[
              styles.flexibleContainer,
              {
                alignItems:
                  item.sender === userEmail ? 'flex-end' : 'flex-start',
              },
            ]}>
            {item.sender !== userEmail && (
              <Text style={styles.fixedNicnameText}>{item.sender}</Text>
            )}

            <View style={styles.textCon}>
              {item.sender === userEmail && (
                <Text style={[styles.fixedText]}>오후:12:00</Text>
              )}
              <Text
                style={[
                  styles.flexibleText,
                  item.sender !== userEmail
                    ? {
                        borderTopLeftRadius: width * 0,
                        backgroundColor: theme.colors.Gray100,
                        color: theme.colors.Gray900,
                      }
                    : {
                        borderTopRightRadius: width * 0,
                        borderTopLeftRadius: width * 8,
                        backgroundColor: theme.colors.Primary500,
                        color: theme.colors.White,
                      },
                ]}>
                {item.message}
              </Text>
              {item.sender !== userEmail && (
                <Text style={[styles.fixedText, item.sender]}>오후:12:00</Text>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

  let ws = useRef<any>(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(SERVER_URL);

      ws.current.onopen = () => {
        console.log('연결');
      };

      ws.current.onmessage = (e: {data: string}) => {
        console.log('Received message:', e.data);
      };

      ws.current.onerror = (e: {message: any}) => {
        console.log(e.message);
      };

      ws.current.onclose = (e: {code: any; reason: any}) => {
        console.log('종료');
      };
    }
    getMesseage();
    return () => {
      ws.current.close();
    };
  }, []);

  const getMesseage = async () => {
    await axios
      .get('http://112.170.204.92:9001/api/v1/' + '13', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setMessages(
            res.data.map(
              (_: {
                activated: boolean;
                chatId: any;
                chatImg: string;
                id: any;
                message: any;
                name1: string;
                name2: string;
                origFilename: any;
                sender: string;
                senderEmail: string;
                username: any;
              }) => ({
                activated: _.activated,
                chatId: _.chatId,
                chatImg: _.chatImg,
                chatImgByte: _,
                chatRoomId: _,
                id: _.id,
                message: _.message,
                name1: _.name1,
                name2: _.name2,
                origFilename: _.origFilename,
                sender: _.sender,
                senderEmail: _.senderEmail,
                username: _.username,
              }),
            ),
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendMessage = () => {
    ws.current.send(
      JSON.stringify({
        payload: {
          chatRoomId: 13,
          username: userEmail,
          message: message,
        },
        type: 'TALK', //채팅
      }),
    );
    setMessage('');
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('BottomTabNavigator')}>
          <View style={styles.headerIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.nicknameContainer}>
          <Text style={styles.nicknameText}>오이짱아찌</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('BottomTabNavigator')}>
          <View style={styles.headerIcon}>
            <MoreIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Reanimated.View style={[styles.container, scrollViewStyle]}>
        <View>
          <FlatList
            ListFooterComponent={TopViewItem}
            // contentContainerStyle={styles.contentContainer}
            data={[...messages].reverse()}
            renderItem={renderItem}
            automaticallyAdjustContentInsets={false}
            inverted={true}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 80,
            }}
            automaticallyAdjustKeyboardInsets={true}
          />
        </View>
      </Reanimated.View>
      <AnimatedViewInput style={[styles.bottomView, textInputStyle]}>
        <CameraIcon />
        <GalleryIcon />
        <TextInput
          value={message}
          onContentSizeChange={handleContentSizeChange}
          multiline
          numberOfLines={3}
          returnKeyType="done"
          // style={styles.bottomInput}
          style={[
            styles.bottomInput,
            {height: Math.max(height * 35, inputHeight)},
          ]} // 최소 높이는 35로 설정
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <SendIcon />
        </TouchableOpacity>
      </AnimatedViewInput>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.White,
  },

  header: {
    justifyContent: 'space-between',
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
  },

  nicknameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 80,
  },
  nicknameText: {
    fontSize: width * 20,
    fontWeight: theme.fontWeigtht.medium,
    color: theme.colors.Gray900,
    fontFamily: theme.typography.Text,
  },
  TopContainer: {
    paddingHorizontal: width * 20,
    paddingVertical: height * 16,
    backgroundColor: '#FFF8F5',
    gap: height * 16,
    height: height * 132,
  },
  TopContents: {
    flexDirection: 'row',
    gap: width * 12,
  },
  TopContentImg: {
    backgroundColor: '#ddd',
    width: width * 40,
    height: width * 40,
    borderRadius: width * 8,
  },
  TopBtn: {
    backgroundColor: theme.colors.White,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: width * 8,
    paddingHorizontal: width * 16,
    paddingVertical: height * 10,
  },
  TopBtnText: {
    color: theme.colors.Primary500,
    fontSize: width * 13,
    fontWeight: theme.fontWeigtht.medium,
    fontFamily: theme.typography.Text,
  },

  tipContainer: {
    backgroundColor: theme.colors.Gray100,
    paddingVertical: height * 14,
    paddingHorizontal: width * 16,
    flexDirection: 'row',
    gap: width * 4,
    borderRadius: width * 8,
    justifyContent: 'space-between',
  },
  tipText: {
    fontFamily: theme.typography.Text,
    fontWeight: theme.fontWeigtht.regular,
    fontSize: width * 12,
    color: theme.colors.Primary500,
    flexShrink: 1,
  },

  fixedContainer: {},
  fixedNicnameText: {
    fontSize: width * 13,
    color: theme.colors.Gray500,
    fontWeight: theme.fontWeigtht.regular,
  },
  fixedText: {
    fontSize: width * 10,
    color: theme.colors.Gray500,
    fontWeight: theme.fontWeigtht.regular,
  },
  flexibleContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    gap: height * 6,
    marginBottom: height * 12,
  },
  textCon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: width * 4,
  },
  flexibleText: {
    flexShrink: 1,
    borderTopRightRadius: width * 8,
    borderBottomRightRadius: width * 8,
    borderBottomLeftRadius: width * 8,
    paddingHorizontal: width * 12,
    paddingVertical: height * 7,
    fontSize: width * 15,
    fontFamily: theme.typography.Text,
  },

  chatView: {
    alignItems: 'center',
    paddingHorizontal: width * 16,
    paddingVertical: height * 20,
  },
  bottomView: {
    paddingVertical: height * 12,
    paddingHorizontal: width * 16,
    borderWidth: width * 1,
    borderColor: theme.colors.Gray200,
    flexDirection: 'row',
    // alignItems: 'flex-end',
    alignItems: 'center',
    gap: width * 12,
    backgroundColor: theme.colors.White,
    // height: height * 60,
  },
  bottomInput: {
    borderWidth: width * 1,
    borderColor: theme.colors.Gray200,
    borderRadius: width * 8,
    flex: 1,
    marginHorizontal: width * 4,
    maxHeight: height * 90,
  },
});
