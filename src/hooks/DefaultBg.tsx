import {ImageBackground, ImageResizeMode, Text} from 'react-native';
import {width, height} from '../../globalDimension';
import {ReactNode} from 'react';

interface DefaultBgProps {
  children: ReactNode | null;
  style: object;
  resizeMode: ImageResizeMode;
}

export default function DefaultBg({
  children,
  style,
  resizeMode,
}: DefaultBgProps) {
  return (
    <ImageBackground
      style={style}
      source={require('./../assets/images/default_bg.png')}
      resizeMode={resizeMode} // 'cover', 'contain', 'stretch', 'repeat', 'center'
    >
      <Text style={{fontSize: width * 18, color: '#000'}}>
        {children || '커스텀 내용'}
      </Text>
    </ImageBackground>
  );
}
