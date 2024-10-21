import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ReturnKeyTypeOptions,
} from 'react-native';
import {height, width} from '../../globalDimension';
import {Children, SetStateAction, forwardRef, useEffect, useState} from 'react';
import {theme} from '../theme/theme';

type TInputProps = {
  value: string;
  placeholder: string;
  setValue?: (text: string) => void;
  borderType: string;
  handleFocusIn?: any;
  handleFocusOut?: any;
  errorMessege?: string;
  successMessege?: string | boolean;
  returnKeyType: ReturnKeyTypeOptions | undefined;
  onEndEditing: any;
  editable?: boolean | undefined;
  style?: object;
  label: string;
  require: boolean;
  scrollToInput?: any;
  multiline?: boolean;
};

const UseTextInput = forwardRef<TextInput, TInputProps>(
  (
    {
      scrollToInput,
      value,
      placeholder,
      setValue,
      handleFocusIn,
      handleFocusOut,
      borderType,
      errorMessege,
      successMessege,
      returnKeyType,
      onEndEditing,
      editable,
      style,
      label,
      require,
      multiline,
    }: TInputProps,
    ref,
  ) => {
    return (
      <>
        <View style={{gap: 2, flexDirection: 'row'}}>
          <Text
            style={{
              color: theme.colors.Gray700,
              fontWeight: theme.fontWeigtht.bold,
              fontSize: width * 14,
              fontFamily: theme.typography.Text,
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
        <TextInput
          editable={editable === undefined ? true : editable}
          multiline={multiline || false}
          ref={ref}
          returnKeyType={returnKeyType}
          value={value}
          onChangeText={setValue}
          onEndEditing={onEndEditing}
          placeholder={placeholder}
          style={[
            {
              textAlignVertical: 'top', // 텍스트를 위쪽에 맞추기
              marginTop: height * 8,
              height: multiline ? height * 124 : height * 48,
              minHeight: multiline ? height * 124 : height * 48,
              borderRadius: width * 8,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: width * 16,
              paddingVertical: height * 10,
              backgroundColor:
                borderType === 'default'
                  ? theme.colors.White
                  : borderType === 'fail'
                  ? theme.colors.Red100
                  : borderType === 'clear'
                  ? theme.colors.White
                  : theme.colors.White,
              borderColor:
                borderType === 'default'
                  ? theme.colors.Gray200
                  : borderType === 'fail'
                  ? theme.colors.Red500
                  : borderType === 'focus'
                  ? theme.colors.Gray900
                  : borderType === 'clear'
                  ? theme.colors.Gray900
                  : '',
            },
            style,
          ]}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        />
        {multiline ? null : (
          <Text
            style={{
              color:
                borderType === 'fail'
                  ? theme.colors.Red500
                  : theme.colors.Blue500,
              fontWeight: theme.fontWeigtht.regular,
              fontSize: width * 12,
              paddingTop: height * 4,
              paddingBottom: height * 10,
            }}>
            {borderType === 'fail' ? errorMessege : successMessege}
          </Text>
        )}
      </>
    );
  },
);

export default UseTextInput;
