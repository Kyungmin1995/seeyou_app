import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, FlatList} from 'react-native';
import {theme} from '../../theme/theme';
import {height, width} from '../../../globalDimension';
import {TopTabNavigation} from '../TabNavigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootTopTabsParamList} from '../../utils/RootParamList';
import {Participation} from './Participation';
import {TripComplete} from './TripComplete';
import {CancellationDetails} from './CancellationDetails';
import {Tab} from '../../../App';

const MyTrip = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>내 여행</Text>
        </View>
        <TopTabNavigation
          initialRouteName={'Participation'}
          chiledren={
            <>
              <Tab.Screen
                name="Participation"
                component={Participation}
                options={{
                  tabBarStyle: {backgroundColor: '#fff'},
                  tabBarPressColor: '#fff',
                  tabBarPressOpacity: 0,
                  tabBarLabel: ({focused, color}) => (
                    <Text
                      style={{
                        color: focused ? '#000' : '#616161',
                        fontWeight: focused ? 'bold' : 'normal',
                        fontSize: width * 16,
                      }}>
                      참여/예정
                    </Text>
                  ),
                }}
              />
              <Tab.Screen
                name="TripComplete"
                component={TripComplete}
                options={{
                  tabBarStyle: {backgroundColor: '#fff'},
                  tabBarPressColor: '#fff',
                  tabBarPressOpacity: 0,
                  tabBarLabel: ({focused, color}) => (
                    <Text
                      style={{
                        color: focused ? '#000' : '#616161',
                        fontWeight: focused ? 'bold' : 'normal',
                        fontSize: width * 16,
                      }}>
                      여행완료
                    </Text>
                  ),
                }}
              />
              <Tab.Screen
                name="CancellationDetails"
                component={CancellationDetails}
                options={{
                  tabBarStyle: {backgroundColor: '#fff'},
                  tabBarPressColor: '#fff',
                  tabBarPressOpacity: 0,
                  tabBarLabel: ({focused, color}) => (
                    <Text
                      style={{
                        color: focused ? '#000' : '#616161',
                        fontWeight: focused ? 'bold' : 'normal',
                        fontSize: width * 16,
                      }}>
                      취소내역
                    </Text>
                  ),
                }}
              />
            </>
          }
        />
      </View>
    </>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.White,
    // flexDirection: 'row',
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
});
