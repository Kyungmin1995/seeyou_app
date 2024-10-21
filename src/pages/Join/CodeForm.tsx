import React, {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
  useRef,
} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import UseTextInput from '../../hooks/UseTextInput';
import {height, width} from '../../../globalDimension';
import BackgroundTimer from '@boterop/react-native-background-timer';

const CodeForm = ({
  code,
  setCode,
  codeSendBtn,
  setCodeSendBtn,
  navigation,
  authenticationCode,
  resendCode,
  setResendCode,
  codeBorderType,
  setCodeBorderType,
  codeErrorMessege,
  setCodeErrorMessege,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  codeSendBtn: boolean;
  navigation: () => void;
  setCodeSendBtn: Dispatch<SetStateAction<boolean>>;
  authenticationCode: () => void;
  resendCode: boolean;
  codeBorderType: string;
  setResendCode: Dispatch<SetStateAction<boolean>>;
  setCodeBorderType: Dispatch<SetStateAction<string>>;
  codeErrorMessege: string;
  setCodeErrorMessege: Dispatch<SetStateAction<string>>;
}) => {
  const [time, setTime] = useState<number>(300);

  const codeRef = useRef<any>(null);

  const handleFocusIn_ = useCallback(() => {
    if (time === 0) setCodeBorderType('fail');
    else setCodeBorderType('focus');
  }, [codeBorderType]);

  const handleFocusOut_ = useCallback(() => {
    if (time === 0) setCodeBorderType('fail');
    else setCodeBorderType('default');
  }, [codeBorderType]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
  }, []);

  const pad = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  useEffect(() => {
    setTime(300);
    if (codeRef.current) {
      setCodeBorderType('focus');
      codeRef.current.focus();
    }
  }, [resendCode]);

  const codeSendClear = () => {
    authenticationCode();
  };

  useEffect(() => {
    if (time > 0) {
      const intervalId = BackgroundTimer.setInterval(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => BackgroundTimer.clearInterval(intervalId);
    }

    if (time === 0) {
      setCodeBorderType('fail');
      setCodeErrorMessege(
        '* 입력시간을 초과하였습니다. 임시코드를 다시 보내주세요',
      );
      // setCodeSendBtn(false);

      setCode('');
      Keyboard.dismiss();
    }
  }, [time]);

  return (
    <>
      <View style={{}}>
        <UseTextInput
          require
          label="인증번호"
          ref={codeRef}
          // editable={codeSendBtn}
          returnKeyType={'done'}
          onEndEditing={() => {}}
          value={code}
          borderType={codeBorderType}
          setValue={e => {
            setCode(e);
          }}
          placeholder={'인증번호를 입력해주세요'}
          errorMessege={codeErrorMessege}
          handleFocusIn={handleFocusIn_}
          handleFocusOut={handleFocusOut_}
          successMessege={''}
        />

        <View
          style={{
            position: 'absolute',
            top: height * 44,
            right: width * 16,
          }}>
          <Text>{formatTime(time)}</Text>
        </View>
      </View>
      {codeSendBtn && (
        <TouchableWithoutFeedback onPress={codeSendClear}>
          <View
            style={{
              borderRadius: width * 8,
              backgroundColor: '#F34902',
              height: height * 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
              }}>
              인증하기
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default CodeForm;
function setCodeErrorMessege(arg0: string) {
  throw new Error('Function not implemented.');
}
