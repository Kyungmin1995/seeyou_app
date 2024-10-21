type TfontWeigtht = {
  bold: any;
  medium: any;
  regular: any;
  semebold: any;
};
const dd = {
  activated: false,
  chatId: null,
  chatImg: null,
  chatImgByte: null,
  chatRoomId: null,
  id: null,
  message: 'test',
  name1: null,
  name2: null,
  origFilename: null,
  sender: 'test',
  senderEmail: 'test',
  username: null,
};

export const theme = {
  colors: {
    Primary700: '#C03A02',
    Primary500: '#F34902',
    Primary200: '#FFE2D7',
    Primary100: '#FFF8F5',
    Gray900: '#222222',
    Gray700: '#616161',
    Gray500: '#9E9E9E',
    Gray400: '#BDBDBD',
    Gray300: '#E0E0E0',
    Gray200: '#EEEEEE',
    Gray100: '#F5F5F5',
    Red500: '#EE1E1E',
    Red100: '#FBF9F9',
    Blue500: '#1462FC',
    White: '#FFFFFF',
  },
  typography: {
    Text: 'Noto Sans SC',
    US_Number: 'Pretendard',
  },
  fontWeigtht: <TfontWeigtht>{
    bold: '700',
    semebold: '600',
    medium: '500',
    regular: '400',
  },
};
