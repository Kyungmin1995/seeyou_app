import {Text, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {width} from '../../globalDimension';
import {useRef} from 'react';

// Locale 설정을 통해 요일을 커스터마이징
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

// 로케일을 한국어로 설정
LocaleConfig.defaultLocale = 'ko';
export default function Claendar() {
  const calendarRef = useRef<any | null>(null);

  const onVisibleMonthsChange = (months: any) => {
    // 현재 보이는 달을 얻어온다
    const currentMonth = months[0].dateString;

    // 해당 달로 스크롤
    calendarRef.current?.scrollToMonth(currentMonth);
  };
  const dayNamesShort = LocaleConfig.locales['ko'].dayNamesShort;
  const markedDates: any = {};
  const today = new Date();

  // 오늘 기준으로 과거와 미래 날짜 마킹
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];

    // 일요일 확인
    if (date.getDay() === 0) {
      // 0은 일요일
      if (date < today) {
        // 오늘 이전의 일요일은 핑크색
        markedDates[formattedDate] = {
          // selected: true,
          disabled: true,
          color: 'pink',
        };
      } else {
        // 오늘 이후의 일요일은 빨간색
        markedDates[formattedDate] = {selected: true, color: 'red'};
      }
    }
  }
  return (
    <>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}>
        {dayNamesShort.map((day: any, index: any) => (
          <Text key={index} style={{fontSize: 16, fontWeight: 'bold'}}>
            {day}
          </Text>
        ))}
      </View> */}
      <CalendarList
        ref={calendarRef}
        // onVisibleMonthsChange={onVisibleMonthsChange}
        onDayPress={(day: any) => {
          console.log('selected day', day);
        }}
        hideDayNames={true}
        pagingEnabled={true}
        calendarStyle={{
          paddingBottom: 0, // 추가적인 여백 제거
        }}
        markedDates={markedDates}
        // markedDates={{
        //   '2024-09-01': {marked: true},
        //   '2024-09-02': {marked: true},
        //   '2024-09-10': {disabled: true}, // 비활성화된 날짜 예시
        // }}
        theme={{
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayFontSize: width * 14, // 날짜 글꼴 크기 줄이기
          textDayFontWeight: '700',
          // dayTextColor: '#000', // 날짜 색상
          // monthTextColor: '#222222', // 월 색상
          // 날짜 텍스트 간격 조정
          todayTextColor: '#FFFFFF',
          todayBackgroundColor: '#1462FC', // 오늘 날짜 배경색 설정
          textDisabledColor: '#BDBDBD',
          selectedDayTextColor: 'red',
        }}
        renderHeader={date => {
          const year = date.getFullYear();
          const month = LocaleConfig.locales['ko'].monthNames[date.getMonth()];
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text
              //   style={styles.calendarHeaderText}
              >
                {year}년 {month}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
}
