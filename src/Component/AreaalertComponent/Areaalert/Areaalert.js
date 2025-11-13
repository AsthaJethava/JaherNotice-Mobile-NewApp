// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect, useHistory, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import {
  Card,
  DataTable,
  List,
  TextInput,
  Button,
  Provider,
  Divider,
  Picker,
} from 'react-native-paper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const Areaalert = ({ navigation, route }) => {
  const [show, setShow] = useState(false);
  const [SelectedEntryDate, setSelectedEntryDate] = useState(false);
  const [datea, setDatea] = useState(1);
  const [ShowDate, setShowDate] = useState('Today');

  // const TodayDate = () => {
  //   setDatea(1);
  //   setShowDate('Today');
  //   tableData(1);
  // };
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Arealert');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  // const ThisWeek = () => {
  //   setDatea(7);
  //   setShowDate('This Week');
  //   tableData(7);
  // };

  // const Last30Days = () => {
  //   setDatea(30);
  //   setShowDate('Last 30 Days');
  //   tableData(30);
  // };

  // const Last3Months = () => {
  //   setDatea(90);
  //   setShowDate('Last 3 Months');
  //   tableData(90);
  // };

  // const Last6Months = () => {
  //   setDatea(120);
  //   setShowDate('Last 6 Months');
  //   tableData(120);
  // };

  // const Last1Year = () => {
  //   setDatea(365);
  //   setShowDate('Last one Year');
  //   tableData(365);
  // };

  // 0
  const [data, setData] = useState([]);
  // 1
  const [dataa, setDataa] = useState([]);
  // Page Loding
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [N, setN] = useState(1);

  // const tableData = useCallback(selectedDate => {
  const [Daten, setDaten] = useState();
  useEffect(() => {
    const { selectedDat } = route.params;
    setDaten(selectedDat);
  }, []);
  useEffect(() => {
    tableData();
  }, []);
  // setText();
  const [h, seth] = useState();
  const tableData = async () => {
    setIsLoading(true);
    setRefreshing(false);
    // setN(selectedDate);
    // console.log('selectedDat} = route.params==2', selectedDate);
    let UserID = await AsyncStorage.getItem('UserID');
    const { selectedDat } = route.params;
    // console.log('selectedDat} = route.params==1', selectedDat);
    // console.log('dataaaaaNew', UserID);
    // console.log('dateaaa', selectedDate);
    fetch(
      `https://qaapi.jahernotice.com/api2/app/areaalert/dashboard/${UserID}/${selectedDat}`,
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (data.data.status == 1) {
          const mess = [];
          if (data !== undefined) {
            if (
              data.message !== undefined &&
              data.message !== undefined &&
              data.message !== ''
            ) {
              mess.push({
                type: 'message',
                message: data.message,
              });
            }
          }
          setData(null);
          setDataa(mess);
          seth(false);
        }
        if (data.data.status == 0) {
          setDataa(null);
          setData(data.data.stateData);
          seth(true);
          console.log(
            'https://qaapi.jahernotice.com/api2/app/areaalert/dashboard/${UserID}/${selectedDat}',
            data.data.stateData,
          );
        }
        setIsLoading(false);
      })
      .catch(error =>
        console.error(
          'https://qaapi.jahernotice.com/api2/app/areaalert/dashboard/${UserID}/${selectedDat}',
          error,
        ),
      );
  };

  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    setDatea();
    // TodayDate();
    tableData(datea);
    setRefreshing(false);
    setIsLoading(true);
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    tableData(datea);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

  const [theme, setTheme] = useState('');

  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme === 'dark') {
        setTheme('DARK');
      } else {
        setTheme('LIGHT');
      }
    };
    getColorScheme(); // Call the function immediately
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => {
      listener.remove(); // Remove the change listener on component unmount
    };
  }, []);

  function capitalizeFirstWord(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const words = str.trim().split(' ');
    if (words.length === 0) {
      return str;
    }
    const capitalizedWords = words.map(word => {
      if (word.length === 0) {
        return word;
      }
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalized;
    });
    return capitalizedWords.join(' ');
  }

  numFormatter = num => {
    if (num > 999 && num < 100000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 100000) {
      return (num / 100000).toFixed(1) + 'L'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };
  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  // const handlePress = message => {
  //   const datePattern = /\b\d{2}\/\d{2}\/\d{4}\b/;
  //   const dateMatch = message.match(datePattern);
  //   if (dateMatch) {
  //     navigation.navigate('AreaalertLastPublishe', {
  //       Date: Daten,
  //     });
  //   }
  // };

  return (
    <>
      <View
        style={{ backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b' }}
        onPress={() => setShow(false)}
      >
        <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
        <OrientationLocker
          orientation={PORTRAIT}
          onChange={orientation => console.log('onChange', orientation)}
          onDeviceChange={orientation =>
            console.log('onDeviceChange', orientation)
          }
        />
        <SafeAreaView style={styles.Container}>
          <View
            style={{
              width: '90%',
              marginLeft: 10,
              elevation: 6,
              backgroundColor: '#ffffff',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {/* <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme === 'LIGHT' ? '#efefef' : '#343a40',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '44%',
                }}
                onPress={() => setShow(true)}>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme === 'LIGHT' ? '#000' : '#ffffff',
                  }}
                  onPress={() => setShow(true)}>
                  {ShowDate}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  marginLeft: '40%',
                }}>
                <Button
                  style={{
                    backgroundColor: 'rgb(52, 120, 246)',
                    color: '#FFF',
                    borderRadius: 3,
                  }}
                  onPress={() => setShow(true)}>
                  <Octicons
                    name="filter"
                    color="#FFF"
                    style={{
                      fontSize: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Button>
              </View>
            </View> */}
          </View>
          {h ? (
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginTop: 10,
                  marginBottom: 1,
                  fontSize: 20,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Statewise Area Alerts
              </Text>
            </View>
          ) : null}

          {/* <View>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
                textAlign: 'right',
                marginRight: 20,
                fontSize: 17,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}>
              Deals
            </Text>
          </View> */}
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              {isLoading ? (
                <View
                  style={{
                    backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                    marginTop: 20,
                  }}
                >
                  <ActivityIndicator
                    size={'large'}
                    color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                  />
                </View>
              ) : (
                <>
                  <View>
                    <FlatList
                      data={dataa}
                      renderItem={({ item }) => (
                        <>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              width: '80%',
                              marginTop: '60%',
                            }}
                          >
                            <Text
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 20,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                                fontWeight: 'bold',
                                textAlign: 'center',
                              }}
                              // onPress={() =>
                              //   navigation.navigate('AreaalertLastPublishe', {
                              //     Date: Daten,
                              //   })
                              // }

                              // onPress={() => handlePress(item.message)}
                              onPress={() => {
                                if (
                                  item.message.includes(
                                    'There are no new Area Alerts found.Click to view the last Area Alert received on.',
                                  )
                                ) {
                                  navigation.navigate('AreaalertLastPublishe', {
                                    Date: Daten,
                                  });
                                }
                              }}
                            >
                              {item.message}
                            </Text>
                          </View>
                        </>
                      )}
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 2 }}>
                    <FlatList
                      data={data}
                      renderItem={({ item }) => (
                        <View style={{ marginBottom: 8 }}>
                          <List.Section style={styles.ListSection}>
                            <List.Accordion
                              title={capitalizeFirstWord(item.statename)}
                              right={() => (
                                <>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <Text style={{ marginRight: 8 }}>
                                      {item.StateCount}
                                    </Text>
                                    {SelectedEntryDate === item.statename ? (
                                      <AntDesign name="up" size={20} />
                                    ) : (
                                      <AntDesign name="down" size={20} />
                                    )}
                                  </View>
                                </>
                              )}
                              titleStyle={{
                                color: theme === 'LIGHT' ? '#000' : '#000',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                              style={[
                                styles.entry_datef,
                                {
                                  backgroundColor:
                                    SelectedEntryDate === item.statename
                                      ? '#d3d3d3'
                                      : '#ffffff',
                                },
                              ]}
                              onPress={() =>
                                SelectedEntryDate === item.statename
                                  ? setSelectedEntryDate('')
                                  : setSelectedEntryDate(item.statename)
                              }
                            >
                              <ScrollView>
                                <DataTable style={{ backgroundColor: '#FFF' }}>
                                  <TouchableOpacity>
                                    {item.DistrictData.map(data => (
                                      <DataTable.Row
                                        onPress={() =>
                                          navigation.navigate(
                                            'Areaalertcount',
                                            {
                                              District: data.DistrictID,
                                              DateTuday: Daten,
                                              DistrictName: data.districtname,
                                            },
                                          )
                                        }
                                        style={{
                                          ...styles.tableRowborder,
                                          backgroundColor:
                                            theme === 'LIGHT'
                                              ? '#ffffff'
                                              : '#ffffff',
                                        }}
                                      >
                                        <DataTable.Cell>
                                          {capitalizeFirstWord(
                                            data.districtname,
                                          )}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                          {data.DistrictCount}
                                        </DataTable.Cell>
                                      </DataTable.Row>
                                    ))}
                                  </TouchableOpacity>
                                </DataTable>
                              </ScrollView>
                            </List.Accordion>
                          </List.Section>
                        </View>
                      )}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
          {/* <Provider>
            <View style={styles.containerbo}>
              <BottomSheet
                show={show}
                onDismiss={() => {
                  setShow(false);
                }}
                enableBackdropDismiss>
                <ScrollView>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => TodayDate()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        Today
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{height: 1}} />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => ThisWeek()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        This Week
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{height: 1}} />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => Last30Days()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        Last 30 Days
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{height: 1}} />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => Last3Months()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        Last 3 Months
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{height: 1}} />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => Last6Months()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        Last 6 Months
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{height: 1}} />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => Last1Year()}>
                      <Text
                        style={{
                          ...styles.bottomtext,
                          // color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}>
                        Last one Year
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </BottomSheet>
            </View>
          </Provider> */}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containernew: {
    flex: 1,
    backgroundColor: '#efefef',
  },

  containerbo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListSection: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
  },
  bottomtext: {
    marginTop: 10,
    marginBottom: 10,
    // fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
  },
  Container: {
    width: '100%',
    height: '100%',
  },
  entry_datef: {
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'space-between',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  Containeraa: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  Loder: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  Cardtitel: {
    width: '100%',
    backgroundColor: '#FFF',
    elevation: 5,
    marginTop: 15,
    borderRadius: 6,
    marginLeft: 10,
  },
  Cardtitela: {
    width: 380,
    marginTop: 15,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: 35,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 'auto',
  },
  container: {
    width: '93%',
    elevation: 5,
    borderRadius: 6,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    // padding: 15,
  },
  tableRowborder: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1.5,
  },
  tableHeader: {
    color: '#ffffff',
    width: '100%',
  },
  tabletext: {
    fontSize: 20,
  },
});
export default Areaalert;
