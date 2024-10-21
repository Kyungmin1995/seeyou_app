import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  // 가입
  Join: undefined;
  Default: undefined;
  OneDepth: undefined | {params: string | undefined};
  TwoDepth: undefined | {params: {email: string; userType: string | undefined}};
  LastDepth: undefined | {user_seq: number | undefined};
  NormalDepth:
    | undefined
    | {
        user: {
          email: string | undefined;
          password: string | undefined;
        };
      };
  // 메인화면
  BottomTabNavigator: undefined;
  // 채팅
  Chatting: undefined | {params: string | undefined};
  ChattingDetail: undefined;
  MyPost: undefined | {params: string | undefined};
  MyPostDetail:
    | undefined
    | {
        params:
          | undefined
          | {
              id: number;
              serviceTitle: string;
              activityArea: string[];
              preferredActivity: string[];
              content: string;
              email?: string;
              getImage?: string[];
            };
      };
  Write: undefined | {params: string | undefined};
};
export type ScreenNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// 바텀탭타입
export type RootBottomParamList = {
  Home: undefined | {params: string | undefined};
  MyTrip: undefined | {params: string | undefined};
  List: undefined | {params: string | undefined};
  My: undefined | {params: string | undefined};
  Login: undefined | {params: string | undefined};
};

export type ScreenNavigationBottomProps =
  BottomTabNavigationProp<RootBottomParamList>;

export type BottomScreenRouteProp<T extends keyof RootBottomParamList> =
  RouteProp<RootBottomParamList, T>;

// 스와이프 탭타입
export type RootTopTabsParamList = {
  MyPost: undefined | {params: string | undefined};
  Review: undefined | {params: string | undefined};
  Steamed: undefined | {params: string | undefined};
  UserList: undefined | {params: string | undefined};
  Participation: undefined | {params: string | undefined}; //참여예정
  TripComplete: undefined | {params: string | undefined}; //여행완료
  CancellationDetails: undefined | {params: string | undefined}; //취소내역
};
