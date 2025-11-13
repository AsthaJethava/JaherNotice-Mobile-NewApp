// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  LogBox,
  Appearance,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../Imeges/jnlogo.png';
import { Card, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';
// import Moment from 'moment';

const Bppalert = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadings, setIsLoadings] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [TotalPage, setTotalPage] = useState();
  // page scrolling
  const [dataa, setDataa] = useState([]);
  const [datan, setDatan] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('BPPalert');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  const fetchMarketData = async () => {
    setCurrentPage(currentPage + 1);
    setIsLoadings(true);
    hideMessage();
    setFetching(true);
    const { selectedDat } = route.params;
    // console.log('d', selectedDat);
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
      `https://qaapi.jahernotice.com/api2/app/bppalert/${Userid}?dayif=${selectedDat}`, //
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          if (data.data.Records.length === 0) {
            // setDatan();
            setDataa([]);
            setIsHidden(true);
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
            setDataa(prevData => [...prevData, ...data.data.Records]);
            console.log(data.data.TotalPage);
            setTotalPage(data.data);
            setDatan(null);
            setIsHidden(false);
            setIsHiddend(true);
          }
        }
        setIsLoading(false);
        setFetching(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
        setFetching(false);
      });
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleLoadMore = () => {
    console.log('currentPage', currentPage);
    if (TotalPage.TotalPage >= currentPage) {
      setCurrentPage(currentPage + 1);
      fetchMarketData();
      hideMessage();
      setFetching(true);
      // Move setIsLoadings(true) inside this block
    } else {
      setIsLoadings(true);
      dataNotfound();
      setShowMessage(true);
    }
  };
  const [showMessage, setShowMessage] = useState(true);

  const hideMessage = () => {
    setIsLoadings(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
  };

  // No Data
  const dataNotfound = () => {
    return (
      <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 20 }}>
        {TotalPage?.TotalPage > currentPage ||
        TotalPage?.TotalPage === currentPage ||
        TotalPage?.TotalPage === 0 ? (
          <ActivityIndicator size={'large'} color="#b83725" />
        ) : TotalPage?.TotalPage === 0 && showMessage ? (
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              {/* More Data Not Found... */}
            </Text>
          </View>
        ) : showMessage ? (
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              {/* More Data Not Found... */}
            </Text>
          </View>
        ) : null}
        {setIsLoadings(false)}
      </View>
    );
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
    setCurrentPage(1);
    setTimeout(() => {
      setDataa([]);
      setCurrentPage(1);
      setRefreshing(false);
      setIsLoading(true);
      fetchMarketData();
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

  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  return (
    <>
      <View
        style={{
          ...styles.container,
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
        <SafeAreaView
          style={{
            ...styles.container,
            backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
          }}
        >
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
            <Fragment>
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
                    <Fragment key={index}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 20,
                          height: 350,
                        }}
                      >
                        <Image
                          source={require('../../../Imeges/no-data-1.gif')}
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
                    </Fragment>
                  )}
                />
              ) : null}
              {isHiddend ? (
                <FlatList
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={dataNotfound}
                  data={dataa}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({ item }) => (
                    <Fragment key={index}>
                      <Card
                        style={{
                          ...styles.cardm,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}
                      >
                        <View>
                          <View style={styles.topcard}>
                            <View
                              style={{
                                ...styles.Viewn,
                                backgroundColor:
                                  theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                borderColor:
                                  theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              <TouchableOpacity>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: 10,

                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                  onPress={() =>
                                    navigation.navigate('Bppalertimg', {
                                      imagebpp: item.image_path,
                                      publish: item.publish_date,
                                      notify: item.notifysource,
                                      imagedownlod: item.image_path,
                                      fileUrl: item.image_path,
                                    })
                                  }
                                >
                                  View
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                ...styles.View,
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
                                  width: 35,
                                  height: 35,
                                }}
                              />
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                              <Text
                                style={{
                                  width: '90%',
                                  fontWeight: 'bold',
                                  marginLeft: 15,
                                  justifyContent: 'center',
                                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                                }}
                              >
                                {item.notifysource}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.containerma}>
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Issue Date :{' '}
                              <Text style={styles.textD}>
                                {formatDate(item.publish_date)}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Survey No :{' '}
                              <Text style={styles.textD}>{item.survey}</Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              TP : <Text style={styles.textD}>{item.tpno}</Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              FP : <Text style={styles.textD}>{item.fpno}</Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />

                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Building No :{' '}
                              <Text style={styles.textD}>
                                {item.buildingno}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Society name :{' '}
                              <Text style={styles.textD}>
                                {capitalizeFirstWord(item.Society)}
                              </Text>
                            </Text>
                          </View>

                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Village Name :{' '}
                              <Text style={styles.textD}>
                                {capitalizeFirstWord(item.village)}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Taluka Name :{' '}
                              <Text style={styles.textD}>
                                {' '}
                                {capitalizeFirstWord(item.taluka)}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              District Name :{' '}
                              <Text style={styles.textD}>
                                {capitalizeFirstWord(item.district)}
                              </Text>{' '}
                              {/* {item.id} */}
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Notify by :{' '}
                              <Text style={styles.textD}>
                                {' '}
                                {capitalizeFirstWord(item.notifyby)}
                              </Text>
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                          <View style={styles.VewText}>
                            <Text
                              style={{
                                ...styles.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Client name :{' '}
                              <Text style={styles.textD}>
                                {capitalizeFirstWord(item.client_names)}
                              </Text>{' '}
                              {/* {item.id} */}
                            </Text>
                          </View>
                          <Divider style={styles.ViewT} />
                        </View>
                      </Card>

                      {/* <Card
                        style={{
                          ...styles.card,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}>
                        <View style={styles.cuntent}>
                          {/* <Text
                            style={{
                              ...styles.texta,
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}>
                            {formatDate(item.publish_date)}
                          </Text>
                          <Text
                            style={{
                              ...styles.fontw,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {capitalizeFirstWord(item.village)} ,{' '}
                            {capitalizeFirstWord(item.taluka)} ,{' '}
                            {capitalizeFirstWord(item.district)}
                          </Text>
                          <Text
                            style={{
                              ...styles.texta,
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}>
                            Survey No: {item.survey}
                          </Text>
                          <Text
                            style={{
                              ...styles.texta,
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}>
                            TP: {item.tpno}
                          </Text>
                          <Text
                            style={{
                              ...styles.texta,
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}>
                            FP: {item.fpno}
                          </Text>
                          <Text
                            style={{
                              ...styles.texta,
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}>
                            Issued on {formatDate(item.publish_date)} in:
                          </Text>
                          {/* rgb(153, 153, 153) 
                          <Text
                            style={{
                              ...styles.fontw,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {capitalizeFirstWord(item.notifysource)}
                          </Text>
                        </View>
                        <Divider style={styles.Divider} />
                        <View style={styles.icon}>
                          <Text
                            style={{
                              color: theme === 'LIGHT' ? '#00' : '#ffffff',
                            }}
                            onPress={() =>
                              navigation.navigate('Bppalertimg', {
                                imagebpp: item.image_path,
                                publish: item.publish_date,
                                notify: item.notifysource,
                                imagedownlod: item.image_path,
                                fileUrl: item.image_path,
                              })
                            }>
                            VIEW NOTICE
                          </Text>
                          <View>
                            <FontAwesome5
                              name={'eye'}
                              style={{
                                marginLeft: 30,
                                width: 120,
                                fontSize: 28,
                                color:
                                  theme === 'LIGHT'
                                    ? 'rgb(127, 127, 132)'
                                    : '#ffffff',
                              }}
                              onPress={() =>
                                navigation.navigate('Bppalertimg', {
                                  imagebpp: item.image_path,
                                  publish: item.publish_date,
                                  notify: item.notifysource,
                                  fileUrl: item.image_path,
                                })
                              }
                            />
                          </View>
                        </View>
                      </Card> */}
                    </Fragment>
                  )}
                />
              ) : null}
            </Fragment>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },

  scrollView: {
    height: '100%',
    width: '100%',
  },
  container: {
    flax: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#efefef',
  },
  card: {
    width: '93%',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 5,
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cuntent: {
    marginLeft: 15,
    marginTop: 10,
  },
  fontw: {
    fontWeight: 'bold',
    color: 'rgb(153, 153, 153)',
    fontSize: 18,
  },
  Divider: {
    height: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginTop: 3,
    marginBottom: 10,
    marginLeft: 15,
    flexDirection: 'row',
  },
  texta: {
    fontSize: 16,
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
    width: '100%',
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
    height: 30,
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
    width: '90%',
    marginTop: 6,
    marginBottom: 6,
  },
  Textcolor: {
    color: 'red',
    fontWeight: 'normal',
  },
  textD: {
    fontSize: 17,
    fontWeight: 'normal',
  },
});
export default Bppalert;
