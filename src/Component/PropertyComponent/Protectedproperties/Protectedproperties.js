/**
 * Jaher Notice React Native App (Updated for RN 0.75+)
 **/

import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  LogBox,
  Appearance,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { Card, DataTable, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Protectedproperties = ({ navigation }) => {
  // Ignore all logs
  LogBox.ignoreAllLogs();

  const [isConnected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [UserID, setUserID] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [datan, setDatan] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddena, setIsHiddena] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState('LIGHT');
  const [SelectedEntryDate, setSelectedEntryDate] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  // Pagination loader
  const renderLoader = () =>
    isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator
          size="large"
          color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
        />
      </View>
    ) : null;

  const loadMoreItem = () => setCurrentPage(currentPage + 1);

  useEffect(() => {
    tableData();
  }, [currentPage]);

  // Fetch Property Dashboard API
  const tableData = async () => {
    try {
      let Userid = await AsyncStorage.getItem('UserID');
      let Tokena = await AsyncStorage.getItem('fcmToken');
      console.warn('Token', Tokena);

      const response = await fetch(
        `https://qaapi.jahernotice.com/api2/app/property/dashboard/${Userid}`,
      );
      const result = await response.json();

      if (result.data.stateData.length === 0) {
        setData([]);
        setIsLoading(false);
        setIsHidden(true);
        setIsHiddena(false);
        setDatan(result.data.stateData);
        console.log(data);
      } else {
        setData(result.data.stateData);
        setIsLoading(false);
        setRefreshing(false);
        setIsHidden(false);
        setDatan(null);
        setIsHiddena(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tableData();
    onRefresh();
  }, []);

  useEffect(() => {
    tableData();
    setIsLoading(true);
    setRefreshing(false);
  }, [refreshing]);

  // Refresh function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    tableData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Detect theme
  useEffect(() => {
    const updateTheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };
    updateTheme();
    const listener = Appearance.addChangeListener(updateTheme);
    return () => {
      if (listener && typeof listener.remove === 'function') listener.remove();
    };
  }, []);

  // Utility Functions
  function capitalizeFirstWord(str) {
    if (typeof str !== 'string') return str;
    const words = str.trim().split(' ');
    if (words.length === 0) return str;
    const capitalizedWords = words.map(word =>
      word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    );
    return capitalizedWords.join(' ');
  }

  const numFormatter = num => {
    if (num > 999 && num < 100000) return (num / 1000).toFixed(2) + 'K';
    else if (num > 100000) return (num / 100000).toFixed(2) + 'L';
    else if (num < 900) return num;
  };

  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  // ---------------------------------
  return (
    <SafeAreaView
      style={{
        ...styles.Container,
        backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // ✅ Fix header overlap
      }}
    >
      <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
      <OrientationLocker
        orientation={PORTRAIT}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      />

      <View
        style={{
          ...styles.rowContainer,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#484c54',
        }}
      >
        <Text style={styles.addNewPropertyText}>Add New Property</Text>
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => navigation.navigate('AddProperty')}
        >
          <MaterialIcons name="add-business" size={25} color="#ff4500" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          ...styles.scrollView,
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 2 }}>
          {isLoading ? (
            <View
              style={{
                backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                marginTop: 20,
              }}
            >
              <ActivityIndicator
                size="large"
                color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
              />
            </View>
          ) : (
            <Fragment>
              {isHidden && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <Image
                    source={require('../../../Imeges/no-data-1.gif')}
                    style={{ width: '25%', height: '25%', marginTop: 190 }}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      color: theme === 'LIGHT' ? '#000' : '#ffffff',
                    }}
                  >
                    Oops! Data Not Found.
                  </Text>
                </View>
              )}

              {isHiddena && (
                <>
                  <Text
                    style={{
                      color: theme === 'LIGHT' ? '#000' : '#ffffff',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginTop: 6,
                      marginBottom: 6,
                      fontSize: 16,
                    }}
                  >
                    Statewise Number of Properties:
                  </Text>
                  <FlatList
                    data={data}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                    ListFooterComponent={renderLoader}
                    renderItem={({ item }) => (
                      <List.Section
                        style={[styles.ListSection, { borderRadius: 18 }]}
                      >
                        <List.Accordion
                          title={capitalizeFirstWord(item.statename)}
                          titleStyle={{
                            color:
                              SelectedEntryDate === item.stateName
                                ? '#ffffff'
                                : '#000',
                          }}
                          style={[
                            styles.entry_datef,
                            {
                              backgroundColor:
                                SelectedEntryDate === item.stateName
                                  ? 'rgb(127, 127, 132)'
                                  : '#ffffff',
                            },
                          ]}
                          onPress={() =>
                            SelectedEntryDate === item.stateName
                              ? setSelectedEntryDate('')
                              : setSelectedEntryDate(item.stateName)
                          }
                        >
                          <DataTable style={{ backgroundColor: '#ffffff' }}>
                            <TouchableOpacity>
                              {item.DistrictData.map(data => (
                                <DataTable.Row
                                  key={data.DistrictID}
                                  onPress={() =>
                                    navigation.navigate('Ahmedabad', {
                                      District: data.DistrictID,
                                      State: item.statename,
                                      Districtname: data.districtname,
                                    })
                                  }
                                  style={{
                                    ...styles.tableRowborder,
                                    backgroundColor:
                                      theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                                  }}
                                >
                                  <DataTable.Cell>
                                    {capitalizeFirstWord(data.districtname)}{' '}
                                  </DataTable.Cell>
                                  <DataTable.Cell numeric>
                                    {data.DistrictCount}
                                  </DataTable.Cell>
                                </DataTable.Row>
                              ))}
                            </TouchableOpacity>
                          </DataTable>
                        </List.Accordion>
                      </List.Section>
                    )}
                  />
                </>
              )}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
  },
  addNewPropertyText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  editIconContainer: {
    marginLeft: 10,
  },
  scrollView: {
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  ListSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  Container: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  entry_datef: {
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'space-between',
  },
  tableRowborder: {
    borderBottomColor: 'rgb(127, 127, 132)',
    borderBottomWidth: 1.5,
  },
});

export default Protectedproperties;
