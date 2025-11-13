// // /**
// //  * Jaher Notice React Native App
// //  **/

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  RefreshControl,
  SafeAreaView,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import { Divider, Card } from 'react-native-paper';
import Logo from '../../Imeges/logoim.png';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const VillageTalukaDistrict = ({ route, navigation }) => {
  //   const [districta, setdistricta] = useState();
  //   const [villagea, setvillagea] = useState();
  //   const [talukaa, settalukaa] = useState();
  //   const [Valuedd, setValuedd] = useState();
  //   const [Valueff, setValueff] = useState();
  //   const [Valuegg, setValuegg] = useState();
  //   useEffect(() => {
  //     const {district, village, taluka} = route.params;
  //     setdistricta(district);
  //     setvillagea(village);
  //     settalukaa(taluka);
  // console.log('dataD', district);
  // console.log('dataV', village);
  // console.log('dataT', taluka);
  //   });

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [TotalPagea, setTotalPagea] = useState();
  // page scrolling
  const [dataa, setDataa] = useState([]);
  const [data, setData] = useState([]);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  // Call API fetchMarketData
  // const fetchMarketData = async () => {
  // // setIsLoading(true);
  // const {districta, villagea, talukaa} = route.params;
  // console.log('dataD', districta);
  // console.log('dataV', villagea);
  // console.log('dataT', talukaa);
  // // const arrayData = dataa;
  // const myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');
  // const raw = JSON.stringify({
  //   district: districta,
  //   village: villagea,
  //   taluka: talukaa,
  //   pageNo: '10',
  //   PageSize: currentPage,
  // });
  // const requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow',
  // };

  //   fetch(
  //     'https://qaapi.jahernotice.com/api2/area/list/ByDTV',
  //     requestOptions,
  //   )
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result.status === 200) {
  //         if (result.data.Records.length === 0) {
  //           setDataa([]);
  //           setIsLoading(false);
  //           setIsHidden(true);
  //         } else {
  //           setDataa(prevData => [...prevData, ...result.data.Records]);
  //           setCurrentPage(currentPage + 1);
  //           setTotalPagea(result.data);
  //           setIsLoading(false);
  //           setIsHidden(false);
  //         }
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // };
  const [datan, setDatan] = useState();
  const fetchMarketData = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    // setIsLoading(true);
    hideMessage();
    setFetching(true);
    const { districta, villagea, talukaa } = route.params;
    // districta,
    //   talukaa,
    //   villagea,
    //   districtaID,
    //   talukaaID,
    //   villageaID,
    //   id,
    //   name,
    // console.log('dataD', districta);
    // console.log('dataV', villagea);
    // console.log('dataT', talukaa);
    // const arrayData = dataa;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      district: districta,
      village: villagea,
      taluka: talukaa,
      pageNo: currentPage,
      PageSize: '10',
      UserId: Userid,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://qaapi.jahernotice.com/api2/area/list/ByDTV', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          if (result.data.Records.length === 0) {
            setDataa([]);
            setIsLoading(false);
            setIsHidden(true);
            setIsHiddend(false);
            // console.log(result);
            const mess = [];
            if (result !== undefined) {
              if (
                result.message !== undefined &&
                result.message !== undefined &&
                result.message !== ''
              ) {
                mess.push({
                  type: 'message',
                  message: result.message,
                });
              }
            }
            setDatan(mess);
          } else {
            setDataa(prevData => [...prevData, ...result.data.Records]);
            setCurrentPage(currentPage + 1);
            setTotalPagea(result.data);
            setIsLoading(false);
            setIsHidden(false);
            setIsHiddend(true);
            console.log(
              'https://qaapi.jahernotice.com/api2/area/list/ByDTV',
              result.data,
            );
          }
        }
        setFetching(false);
      })
      .catch(error => console.log('error', error));
  };

  // Scroll
  const handleLoadMore = () => {
    setFetching(true);
    if (TotalPagea.TotalPage > currentPage) {
      fetchMarketData();
      hideMessage();
      setCurrentPage(currentPage + 1);
    } else if (TotalPagea.TotalPage === currentPage) {
      fetchMarketData();
      setCurrentPage(currentPage + 1);
    } else {
      dataNotfound();
      setShowMessage(true);
    }
    setFetching(false);
  };
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
  const dataNotfound = () => {
    if (TotalPagea && TotalPagea.TotalPage > currentPage) {
      // Data is still being fetched, show the loading indicator
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <ActivityIndicator
            size={'large'}
            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
          />
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
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(true);
      setDataa([]);
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
  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const replaceSpacesInImageUrl = imageUrl => {
    // Check if there are spaces in the URL
    if (imageUrl && imageUrl.includes(' ')) {
      // Replace spaces with %20
      return imageUrl.replace(/ /g, '%20');
    }
    // If no spaces, return the original URL
    return imageUrl;
  };

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('VillageTalukaDistrictList');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  return (
    <>
      <View
        style={{
          ...style.containerm,
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

        <SafeAreaView style={style.container}>
          {isLoading ? (
            <View>
              <ActivityIndicator
                size={'large'}
                color="#b83725"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
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
                            marginBottom: 20,
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
              {/* )}
              /> */}
              {isHiddend ? (
                <FlatList
                  onEndReached={() => {
                    handleLoadMore();
                  }}
                  onEndReachedThreshold={0.2}
                  ListFooterComponent={dataNotfound()}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={dataa}
                  renderItem={({ item }) => (
                    <View>
                      <Card
                        style={{
                          ...style.cardm,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}
                      >
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <View style={style.topcard}>
                            <View
                              style={{
                                ...style.Viewn,
                                backgroundColor:
                                  theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                borderColor:
                                  theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  marginLeft: 10,
                                  fontSize: 16,
                                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                                }}
                                onPress={() =>
                                  navigation.navigate('TaitleSearchimg', {
                                    imagepepararia: item.image_path,
                                    publish_date: item.publish_date,
                                    notifysource: item.notifysource,
                                    fileUrl: replaceSpacesInImageUrl(
                                      item.image_path,
                                    ),
                                  })
                                }
                              >
                                View
                              </Text>
                            </View>
                            <View
                              style={{
                                ...style.View,
                                backgroundColor:
                                  theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                borderColor:
                                  theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              <Image
                                source={Logo}
                                style={{
                                  fontWeight: 'bold',
                                  marginLeft: 10,
                                  width: 40,
                                  height: 40,
                                }}
                              />
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                              <Text
                                style={{
                                  flexWrap: 'wrap',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  marginLeft: 10,
                                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                                }}
                              >
                                {item.village},{item.taluka},{item.district}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={style.containerma}>
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Publish Date:{' '}
                              <Text style={style.Textcolor}>
                                {formatDate(item.publish_date)}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Survey No:{' '}
                              <Text style={style.Textcolor}>{item.survey}</Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              TP No:{' '}
                              <Text style={style.Textcolor}>{item.tpno}</Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              FP No:{' '}
                              <Text style={style.Textcolor}>{item.fpno}</Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Building No:{' '}
                              <Text style={style.Textcolor}>
                                {item.buildingno}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Society:{' '}
                              <Text style={style.Textcolor}>
                                {item.society}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Client Names:{' '}
                              <Text style={style.Textcolor}>
                                {item.client_names}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={style.ViewT} />
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Lawyer Names:{' '}
                              <Text style={style.Textcolor}>
                                {item.notifyby}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </View>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  containerm: {
    height: '100%',
    width: '100%',
    backgroundColor: '#efefef',
  },
  cardm: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '96%',
    elevation: 10,
    borderRadius: 2,
  },
  containerma: {
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  topcard: {
    flexDirection: 'row',
    marginTop: 13,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  Viewm: {
    borderRightWidth: 1,
    height: 30,
    width: 50,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginLeft: 13,
  },
  Containerbotom: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#FFF',
    marginLeft: '42%',
  },
  Viewn: {
    width: 60,
    borderRightWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '45%',
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  Containera: {
    width: 407,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#ffffff',
  },
  Loder: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  View: {
    borderRightWidth: 1,
    width: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  VewText: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  ViewT: {
    borderRightWidth: 1,
    height: 2,
    marginLeft: 10,
    marginRight: 15,
  },
  font: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  Textcolor: {
    fontWeight: 'normal',
  },
});

export default VillageTalukaDistrict;
