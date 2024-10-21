import {
  View,
  Text,
  TextInput,
  ReturnKeyTypeOptions,
  TouchableWithoutFeedback,
} from 'react-native';
import {height, width} from '../../globalDimension';
import {Children, SetStateAction, useEffect, useState} from 'react';

import RadioFill from '../assets/svg/RadioFill.svg';
import Radio from '../assets/svg/radio.svg';

type TRadioProps = {
  value?: string;
  placeholder?: string;
  errorMessege?: string;
  style?: object;
  status?: boolean;
  require?: boolean;
  label?: string;
  left: string;
  right: string;
  handleChangeRadio: any;
  leftTitle: string;
  rightTitle: string;

  // setValue?: (text: string) => void;
  setValue: (value: React.SetStateAction<string>) => void;
};

const UseRadioInput = ({
  value,
  label,
  left,
  right,
  require,
  status,
  leftTitle,
  rightTitle,
  handleChangeRadio,
  setValue,
}: TRadioProps) => {
  useEffect(() => {
    // console.log(value, 'value');
  }, [value]);
  return (
    <>
      <View style={{marginBottom: height * 28}}>
        <View style={{gap: 2, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#616161',
              fontWeight: '700',
              fontSize: width * 14,
              marginBottom: height * 8,
            }}>
            {label}
          </Text>
          {require && (
            <Text
              style={{color: 'red', fontWeight: '700', fontSize: width * 14}}>
              *
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: width * 66,

            height: height * 48,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setValue(left);
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: width * 6,
                alignItems: 'center',
              }}>
              {status ? <RadioFill /> : <Radio />}
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: width * 16,
                  color: '#222222',
                }}>
                {leftTitle}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              setValue(right);
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: width * 6,
                alignItems: 'center',
              }}>
              {status ? <Radio /> : <RadioFill />}
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: width * 16,
                  color: '#222222',
                }}>
                {rightTitle}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

export default UseRadioInput;
