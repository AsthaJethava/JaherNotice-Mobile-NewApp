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
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const VillageTalukaDistrict = ({ route, navigation }) => {
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
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('TitleSearchCount');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const fetchMarketData = async () => {
    hideMessage();

    setFetching(true);
    const { Valuevtd, Values, Valuet, Valuef, Valueb, Valueso } = route.params;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      area: Valuevtd,
      survey: Values,
      tpno: Valuet,
      fpno: Valuef,
      buildingno: Valueb,
      society: Valueso,
      PageNo: currentPage,
      PageSize: '10',
    });
    console.log(raw);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://qaapi.jahernotice.com/api/content/data', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          if (data.Records.length === 0) {
            // setData(data);
            setDataa(null);
            setIsHidden(true);
            setIsLoading(false);
            setIsHiddend(false);
            // console.log(data);
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
            setData(mess);
          } else {
            setDataa(prevData => [...prevData, ...data.Records]);
            setCurrentPage(currentPage + 1);
            setTotalPagea(data.data);
            setData(null);
            setIsLoading(false);
            setIsHidden(false);
            setIsHiddend(true);
          }
        }
        setFetching(false);
      })
      .catch(error => console.log('error', error));
  };

  // Scroll
  const handleLoadMore = () => {
    if (TotalPagea && TotalPagea.TotalPage > currentPage) {
      setFetching(true);
      hideMessage();
      setCurrentPage(currentPage + 1);
      setFetching(false);
    } else {
      dataNotfound();
      setShowMessage(true);
    }
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
      setRefreshing(false);
      setDataa([]);
      setIsLoading(true);
      setCurrentPage(1);
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

    // Ensure that day and month are two digits
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

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
                color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
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
                  data={data}
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
                            marginBottom: 10,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}
                        >
                          Oops! No Data Found
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
                                    fileUrl: item.image_path,
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
                              City/Survey No:{' '}
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
    width: '97%',
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },

  ViewT: {
    borderRightWidth: 1,
    height: 2,
    padding: 1,
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
