// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  LogBox,
  RefreshControl,
  Appearance,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Card, DataTable, Divider, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
// import Datanot from '../../Imeges/no-data-1.gif';
// import LottieView from 'lottie-react-native';
// import FastImage from 'react-native-fast-image';
// import Gif from 'react-native-gif';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const Eppstatements = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [UserID, setUserID] = useState([]);
  const [TotalPage, setTotalPage] = useState();
  const [daten, setDaten] = useState(1);
  // page scrolling
  const [dataa, setDataa] = useState([]);
  const [datan, setDatan] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);
  const [clickeds, setClickeds] = useState(false);
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('EPPStatement');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  // console.log('dataepp', dataa);
  const gifImage = require('../../Imeges/no-data-1.gif');
  // Call API fetchMarketData
  const fetchMarketData = async () => {
    // const arrayData = dataa;/
    hideMessage();
    setFetching(true);

    const { selectedDat } = route.params;
    // console.log('date', selectedDat);
    let Userid = await AsyncStorage.getItem('UserID');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      PageSize: '10',
      PageNo: currentPage,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      `https://qaapi.jahernotice.com/api2/app/eppsummary/${Userid}?dayif=${selectedDat}`, //
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          if (data.data.Summary.length === 0) {
            // setDatan(data.data.Summary);
            setDataa([]);
            setIsHidden(true);
            setIsLoading(false);
            setIsHiddend(false);
            console.log(data);
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
            setDatan(mess);
          } else {
            setDataa(prevData => [...prevData, ...data.data.Summary]);
            setCurrentPage(currentPage + 1);
            setTotalPage(data.data);
            setDatan(null);
            setIsHidden(false);
            setIsLoading(false);
            setIsHiddend(true);
            console.log(data.data.Summary);
          }
        }
        setFetching(false);
      })
      .catch(error => console.log('error', error));
  };

  // Scroll
  const handleLoadMore = () => {
    setFetching(true);
    if (TotalPage.TotalPage && TotalPage.TotalPage > currentPage) {
      fetchMarketData();
      hideMessage();
      setCurrentPage(currentPage + 1);
    } else if (TotalPage.TotalPage === currentPage) {
      fetchMarketData();
      setCurrentPage(currentPage + 1);
    } else {
      dataNotfound();
      setShowMessage(true);
    }
    setFetching(false);
  };
  // const handleLoadMore = () => {
  //   setFetching(true);
  //   if (TotalPage.TotalPage > currentPage) {
  //     fetchMarketData();
  //     hideMessage();
  //     setCurrentPage(currentPage + 1);
  //   } else if (TotalPage.TotalPage === currentPage) {
  //     fetchMarketData();
  //     setCurrentPage(currentPage + 1);
  //   } else {
  //     dataNotfound();
  //     setShowMessage(true);
  //   }
  //   setFetching(false);
  // };

  // Loding Footer
  const renderFooter = () => {
    return isFetching ? (
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#b83725" />
      </View>
    ) : null;
  };
  const [showMessage, setShowMessage] = useState(true);

  // Function to hide the message after 10 seconds
  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // 10 seconds in milliseconds
  };
  // No Data
  // No Data
  const dataNotfound = () => {
    if (TotalPage?.TotalPage > currentPage) {
      // Data is still being fetched, show the loading indicator
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <ActivityIndicator
            size={'large'}
            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
          />
        </View>
      );
    } else if (TotalPage?.TotalPage === 0) {
      // No data is available
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          {showMessage && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#666666' }}>
                {/* More Data Not Found... */}
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      // No more data is available
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          {showMessage && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#666666' }}>
                {/* More Data Not Found... */}
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  useEffect(
    () => {
      fetchMarketData();
    },
    [],
    [currentPage],
  );

  const onRefresh = React.useCallback(() => {
    // tableData();
    setRefreshing(true);
    setTimeout(() => {
      setDataa([]);
      setIsLoading(true);
      setCurrentPage(1);
      setRefreshing(false);
      fetchMarketData();
    }, 2000);
  }, [refreshing]);

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

  const [SelectedEntryDate, setSelectedEntryDate] = useState(false);
  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  return (
    <>
      <View
        style={{
          ...styles.Container,
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
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

        <SafeAreaView>
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
                style={{
                  backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                }}
              />
            </View>
          ) : (
            <>
              {isHidden ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={datan}
                  renderItem={({ item, index }) => (
                    <>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 20,
                          height: 350,
                        }}
                      >
                        <Image
                          source={require('../../Imeges/no-data-1.gif')}
                          style={{
                            width: '30%',
                            height: '30%',
                            marginTop: 190,
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            marginTop: 10,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}
                        >
                          Oops! No Data Found.
                        </Text>
                      </View>
                    </>
                  )}
                />
              ) : null}
              {isHiddend ? (
                <FlatList
                  onEndReached={() => {
                    handleLoadMore();
                  }}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={dataNotfound()}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={dataa}
                  renderItem={({ item }) => (
                    <List.Section style={styles.ListSection}>
                      <List.Accordion
                        title={item.entry_date}
                        style={[
                          styles.entry_datef,
                          {
                            backgroundColor:
                              SelectedEntryDate === item.entry_date
                                ? '#d3d3d3'
                                : '#ffffff',
                          },
                        ]}
                        onPress={() =>
                          SelectedEntryDate === item.entry_date
                            ? setSelectedEntryDate('')
                            : setSelectedEntryDate(item.entry_date)
                        }
                      >
                        <DataTable style={{ backgroundColor: '#ffffff' }}>
                          <View style={styles.DataTableV}>
                            <View style={styles.DataTableVv}>
                              <Text
                                style={{
                                  marginTop: 5,
                                  marginBottom: 5,
                                }}
                              >
                                Survey Number
                              </Text>
                            </View>
                            <View style={styles.DataTableVvS}>
                              <Text
                                style={{
                                  marginTop: 5,
                                  marginBottom: 5,
                                }}
                              >
                                Summary
                              </Text>
                            </View>
                            <View style={styles.DataTableVvSnew}>
                              <Text>View Notice</Text>
                            </View>
                          </View>
                          <View>
                            {item.villages.map(data => (
                              <View>
                                <View
                                  style={
                                    data?.surveyDetails &&
                                    data.surveyDetails.length > 0 &&
                                    data.surveyDetails.every(
                                      s =>
                                        s?.summary &&
                                        (s.summary.includes('No Change') ||
                                          s.summary.includes('Base Data')),
                                    )
                                      ? styles.FlatListaVTa
                                      : styles.FlatListaVTaWarning
                                  }
                                >
                                  <Text style={styles.FlatListaVTaa}>
                                    {data.village}, {data.taluka},{' '}
                                    {data.district},
                                  </Text>
                                </View>
                                <View>
                                  {data.surveyDetails.map(datas => (
                                    <View>
                                      <View>
                                        <View style={styles.FlatListVSVV}>
                                          <View style={styles.FlatListVSVVv}>
                                            <Text style={styles.FlatListVSVVT}>
                                              {datas.survey_number}
                                            </Text>
                                          </View>
                                          <View style={styles.FlatListvtSU}>
                                            <Text
                                              style={
                                                datas.summary === 'No Change' ||
                                                datas.summary === 'Base Data'
                                                  ? styles.colorg
                                                  : styles.colorr
                                              }
                                            >
                                              {capitalizeFirstWord(
                                                datas.summary,
                                              )}
                                            </Text>
                                          </View>
                                          <TouchableOpacity
                                            style={styles.FlatListVSVVvnew}
                                            onPress={() =>
                                              navigation.navigate(
                                                'LandRecordPDF',
                                                {
                                                  PdfUrl: datas.S3bucket_url,
                                                  fileUrl: datas.S3bucket_url,
                                                },
                                              )
                                            }
                                          >
                                            <Text
                                              style={styles.FlatListVSVVTnew}
                                            >
                                              View
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  ))}
                                </View>
                              </View>
                            ))}
                          </View>
                        </DataTable>
                      </List.Accordion>
                    </List.Section>
                  )}
                />
              ) : null}
            </>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    height: 250,
    width: 250,
  },
  loaderStyle: {
    marginVertical: 16,
  },
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
  },
  Containeraa: {
    width: '100%',
    height: 50,
    backgroundColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListSection: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
  },
  Loder: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  //
  entry_datef: {
    backgroundColor: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'space-between',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  DataTableV: {
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  DataTableVv: {
    borderRightColor: 'grey',
    borderRightWidth: 1,
    width: '29.5%',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  DataTableVvS: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    borderRightColor: 'grey',
    borderRightWidth: 1,
    width: '39%',
  },
  DataTableVvSnew: {
    width: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  FlatListaVt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  FlatListaVTa: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgb(217, 232, 181)',
    borderTopColor: 'rgb(0, 146, 69)',
    borderTopWidth: 2,
  },
  FlatListaVTaWarning: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgb(248, 241, 210)',
    borderTopColor: 'rgb(242, 217, 105)',
    borderTopWidth: 2,
  },
  FlatListaVTaa: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  FlatListVSVV: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  FlatListVSVVv: {
    borderRightColor: 'grey',
    borderRightWidth: 1,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListVSVVvr: {
    borderRightColor: 'grey',
    borderRightWidth: 1,
    borderLeftColor: 'rgb(251, 83, 74)',
    borderLeftWidth: 2,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListVSVVT: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  FlatListvtSU: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'grey',
    borderRightWidth: 1,
  },
  FlatListVSVVvnew: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListVSVVTnew: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  FlatlistVtta: {
    color: 'rgb(0, 146, 69)',
    fontSize: 16,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //
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
    backgroundColor: '#ffffff',
  },
  tableRowborder: {
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#d3d3d3',
    color: '#ffffff',
    width: '100%',
  },
  tabletext: {
    fontSize: 20,
  },
  colorr: {
    color: 'rgb(251, 83, 74)',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
  },
  colorg: {
    color: 'rgb(0, 146, 69)',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  textb: {
    borderLeftColor: 'rgb(251, 83, 74)',
    borderLeftWidth: 1,
  },
  //
});

export default Eppstatements;
