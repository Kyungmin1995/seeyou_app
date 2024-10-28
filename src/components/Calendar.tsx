import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CalendarList, LocaleConfig, Calendar} from 'react-native-calendars';
import {height, width} from '../../globalDimension';
import {useEffect, useRef, useState} from 'react';
import {theme} from '../theme/theme';

import ArrowIcon from '../assets/svg/Back.svg';

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
  const dayNamesShort = LocaleConfig.locales['ko'].dayNamesShort;

  const dateString = new Date();

  // Date 객체 생성
  const date = new Date(dateString);

  // 날짜 형식 변환
  const options: any = {year: 'numeric', month: '2-digit'};
  const formattedDate = date.toLocaleDateString('ko-KR', options);

  // 출력
  const [year, month, day] = formattedDate.split('.').map(item => item.trim());
  const result = `${year}년 ${month}월`;
  console.log(`${year}-${month}`, 'result');

  const [currentMonth, setCurrentMonth] = useState(result);
  const [selectedDate, setSelectedDate] = useState('2022-10-01');

  const handleMonthChange = (month: {year: any; month: any}) => {
    const monthString = `${month.year}년 ${month.month}월`;
    console.log(month.month);

    setCurrentMonth(monthString);
  };

  // const handleArrowPress = (direction: any) => {
  //   const newDate = new Date(selectedDate);

  //   if (direction === 'left') {
  //     newDate.setMonth(newDate.getMonth() - 1); // 이전 달로 이동
  //   } else if (direction === 'right') {
  //     newDate.setMonth(newDate.getMonth() + 1); // 다음 달로 이동
  //   }

  //   // 선택된 날짜 상태 업데이트
  //   setSelectedDate(newDate);
  //   // 새 월로 변경
  //   handleMonthChange({
  //     year: newDate.getFullYear(),
  //     month: newDate.getMonth() + 1,
  //   });
  // };
  const handleArrowPress = (direction: any) => {
    const currentMonthDate: any = new Date(selectedDate);

    if (direction === 'left') {
      currentMonthDate.setMonth(currentMonthDate.getMonth() - 1); // 이전 달로 변경
    } else if (direction === 'right') {
      currentMonthDate.setMonth(currentMonthDate.getMonth() + 1); // 다음 달로 변경
    }

    const updatedDate = currentMonthDate.toISOString().split('T')[0];

    setSelectedDate(updatedDate);
  };

  return (
    <>
      {/* 커스텀 월 헤더 */}

      <Calendar
        onDayPress={(day: any) => {
          console.log('selected day', day);
        }}
        key={selectedDate}
        current={selectedDate}
        // renderArrow={(direction: any) => (
        //   <TouchableOpacity onPress={() => handleArrowPress(direction)}>
        //     <View
        //       style={{
        //         padding: 10,
        //         transform:
        //           direction === 'right' ? [{rotate: '180deg'}] : undefined,
        //       }}>
        //       <ArrowIcon />
        //     </View>
        //   </TouchableOpacity>
        // )}
        customHeader={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* prev */}

              <TouchableOpacity
                onPress={() => handleArrowPress('left')}
                style={{paddingLeft: width * 10, justifyContent: 'center'}}>
                <ArrowIcon />
              </TouchableOpacity>
              {/* header */}
              <View style={{marginVertical: height * 16}}>
                <Text
                  style={{
                    fontSize: width * 16,
                    fontWeight: theme.fontWeigtht.bold,
                    color: theme.colors.Gray900,
                  }}>
                  {currentMonth}
                </Text>
              </View>
              {/* next */}
              <TouchableOpacity
                onPress={() => handleArrowPress('right')}
                style={{
                  justifyContent: 'center',
                  transform: [{rotate: '180deg'}],
                  paddingLeft: width * 10,
                }}>
                <ArrowIcon />
              </TouchableOpacity>
            </View>

            {/* 요일 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 10,
                borderTopWidth: width * 1,
                borderBottomWidth: width * 1,
                borderColor: theme.colors.Gray200,
                marginBottom: height * 16,
              }}>
              {dayNamesShort.map((day: any, index: any) => (
                <Text key={index} style={{fontSize: 16, fontWeight: 'bold'}}>
                  {day}
                </Text>
              ))}
            </View>
          </View>
        )}
        hideDayNames
        요일
        헤더
        커스텀
        dayComponent={({date, state}: any) => {
          const isToday = date.day === new Date().getDate();

          return (
            <>
              <View
                style={[
                  isToday && {
                    backgroundColor: theme.colors.Primary500, // 오늘 날짜 배경색
                    borderRadius: width * 16,
                    height: width * 20,
                    width: width * 20,
                  },
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text
                  style={{
                    color:
                      state === 'disabled'
                        ? theme.colors.Gray400
                        : date.day === new Date().getDate()
                        ? theme.colors.White
                        : theme.colors.Gray900,
                    fontWeight: theme.fontWeigtht.bold,
                    // borderRadius: width * 20,
                    // width: width * 20,
                    // height: width * 20,
                  }}>
                  {date.day}
                </Text>
              </View>
            </>
          );
        }}
        theme={{
          textMonthFontSize: width * 16,
          textMonthFontWeight: 'bold',
          textDayFontSize: width * 14, // 날짜 글꼴 크기 줄이기
          textDayFontWeight: '700',
          todayTextColor: '#FFFFFF',
          todayBackgroundColor: theme.colors.Primary500, // 오늘 날짜 배경색 설정
          textDisabledColor: '#BDBDBD',
        }}
        onMonthChange={handleMonthChange}
      />
    </>
  );
}
const styles = StyleSheet.create({
  monthHeader: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  monthHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 5,
  },
  dayName: {
    flex: 1,
    alignItems: 'center',
  },
  dayNameText: {
    fontSize: 14,
    color: '#2d4150',
    fontWeight: 'bold',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  dayText: {
    fontSize: 16,
    color: '#2d4150',
  },
  todayText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#d9e1e8',
  },
});
