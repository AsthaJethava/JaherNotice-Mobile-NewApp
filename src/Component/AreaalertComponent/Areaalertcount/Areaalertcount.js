// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import Jahernoticelog from '../../../Imeges/Jahernotice_logo.png';
import { Card, Divider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../Imeges/jnlogo.png';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const PropertyToDistrict = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [UserID, setUserID] = useState([]);
  const [TotalPage, setTotalPage] = useState();
  // page scrolling
  const [dataa, setDataa] = useState([]);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);
  const [PageNumber, setPageNumber] = useState(10);
  const [DistrictID, setDistrict] = useState('');
  const [Districtname, setDistrictname] = useState();
  const [State, setState] = useState();
  const [isloding, setIsloding] = useState(true);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Areaalertcount');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  // Call API fetchMarketData
  const fetchMarketData = async () => {
    setCurrentPage(currentPage + 1);
    hideMessage();
    setFetching(true);
    const { District, DateTuday, otherParam } = route.params;
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
      `https://qaapi.jahernotice.com/api2/app/areaalert/details/${Userid}/${District}/${DateTuday}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          setDataa(prevData => [...prevData, ...data.data.Records]);
          setTotalPage(data.data);
          setIsloding(false);
          setFetching(false);
          console.log(
            'https://qaapi.jahernotice.com/api2/app/areaalert/details/${Userid}/${District}/${DateTuday}',
            data.data,
          );
        }
        console.log(data,"data");
        
        setIsloding(false);
        setFetching(false);
      })
      .catch(error => console.log('error', error));
  };

  const handleLoadMore = () => {
    // console.log(currentPage);
    if (TotalPage.TotalPage >= currentPage) {
      setCurrentPage(currentPage + 1);
      setFetching(true);
      fetchMarketData();
      dataNotfound();
      hideMessage();
    } else {
      dataNotfound();
      setFetching(true);
      setShowMessage(true);
    }
  };

  const [showMessage, setShowMessage] = useState(true);

  const hideMessage = () => {
    setFetching(true);
    setTimeout(() => {
      setFetching(true);
      setShowMessage(false);
    }, 10000);
  };

  const dataNotfound = () => {
    return (
      <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 20 }}>
        {TotalPage.TotalPage > currentPage ||
        TotalPage.TotalPage == currentPage ||
        TotalPage.TotalPage === 0 ? (
          <ActivityIndicator
            size={'large'}
            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
          />
        ) : showMessage ? (
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              {/* More Data Not Found... */}
            </Text>
          </View>
        ) : null}
        {/* {setFetching()} */}
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

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDataa([]);
      setIsloding(true);
      setCurrentPage(1);
      setRefreshing(false);
      fetchMarketData();
    }, 2000);
  }, [refreshing]);

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

  const replaceSpacesInImageUrl = imageUrl => {
    // Check if there are spaces in the URL
    if (imageUrl && imageUrl.includes(' ')) {
      // Replace spaces with %20
      return imageUrl.replace(/ /g, '%20');
    }
    // If no spaces, return the original URL
    return imageUrl;
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
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
        <View
          style={{
            ...styles.scrollView,
            backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
          }}
        >
          <View
            style={{
              ...styles.Containerhend,
              backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
            }}
          >
            {isloding ? (
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                  style={{
                    marginTop: 20,
                    backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                  }}
                />
              </View>
            ) : (
              <FlatList
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={dataNotfound}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={dataa}
                renderItem={({ item }) => (
                  <Card
                    style={{
                      marginTop: 15,
                      marginBottom: 10,
                      backgroundColor:
                        theme === 'LIGHT' ? '#ffffff' : '#343a40',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          theme === 'LIGHT' ? '#f5f5f5' : '#484c54',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginLeft: 20,
                          color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}
                      >
                        {capitalizeFirstWord(item.village)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginLeft: 'auto',
                          marginRight: 20,
                          color: theme === 'LIGHT' ? '#000' : '#ffffff',
                        }}
                      >
                        {item.publish_date}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.Container,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#343a40',
                      }}
                    >
                      <Image
                        source={{ uri: item.ICON_URL }}
                        style={styles.Logo}
                      />
                      <View
                        style={{
                          marginBottom: 14,
                        }}
                      >
                        <View>
                          {/* <Text
                            style={{
                              textAlign: 'right',
                              fontSize: 18,
                              fontWeight: 'bold',
                              marginRight: 20,
                              marginTop: 10,
                            }}>
                            {item.publish_date}
                          </Text> */}
                        </View>
                        <View
                          style={{
                            ...styles.Containera,
                            backgroundColor:
                              theme === 'LIGHT' ? '#ffffff' : '#343a40',
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              SURVEY :{' '}
                              <Text style={styles.numt}>{item.survey}</Text>
                            </Text>
                          </View>
                          <Divider style={{ height: 2 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              TP : <Text style={styles.numt}>{item.tpno}</Text>
                            </Text>
                          </View>
                          <Divider style={{ height: 2 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              FP : <Text style={styles.numt}>{item.fpno}</Text>
                            </Text>
                          </View>
                          <Divider style={{ height: 2 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Building No. :{' '}
                              <Text style={styles.numt}>{item.buildingno}</Text>
                            </Text>
                          </View>
                          <Divider style={{ height: 2 }} />
                        </View>
                        <View style={styles.heding}>
                          <Text
                            style={{
                              marginBottom: 5,
                              fontWeight: 'bold',
                              marginTop: 40,
                              color: theme === 'LIGHT' ? '#000' : '#ffffff',
                            }}
                          >
                            {item.society}
                          </Text>
                          <Divider style={{ height: 2 }} />
                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: 12,
                              fontWeight: 'bold',
                              marginBottom: 8,
                              color: theme === 'LIGHT' ? '#000' : '#ffffff',
                            }}
                          >
                            SOCIETY / SECTOR / BUNGALOW / BUILDING
                          </Text>
                          <View
                            style={{
                              ...styles.Containerbotom,
                              backgroundColor:
                                theme === 'LIGHT' ? '#ffffff' : '#343a40',
                            }}
                          >
                            <View style={styles.bottom}>
                              <View
                                style={{
                                  ...styles.View,
                                  borderColor:
                                    theme === 'LIGHT' ? '#000' : '#ffffff',
                                  backgroundColor:
                                    theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                  onPress={() =>
                                    navigation.navigate('Ariaimglert', {
                                      imagepepararia: item.original_image_path,
                                      publish_date: item.publish_date,
                                      notifysource: item.notifysource,
                                      fileUrl: replaceSpacesInImageUrl(
                                        item.original_image_path,
                                      ),
                                    })
                                  }
                                >
                                  VIEW
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...styles.View,
                                  borderColor:
                                    theme === 'LIGHT' ? '#000' : '#ffffff',
                                  backgroundColor:
                                    theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                }}
                              >
                                <Image
                                  source={Logo}
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: 12,
                                    width: 35,
                                    height: 35,
                                  }}
                                />
                              </View>
                              <View style={{ justifyContent: 'center' }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: 15,
                                    justifyContent: 'center',
                                    marginTop: -10,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                >
                                  {item.notifysource}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                )}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  Containerbotom: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  View: {
    borderRightWidth: 1,
    height: 28,
    width: 60,
    backgroundColor: '#FFF',
    marginBottom: 10,
    justifyContent: 'center',
  },
  Containerhend: {
    backgroundColor: '#efefef',
    marginBottom: 5,
  },
  Container: {
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Containeraa: {
    width: '100%',
    backgroundColor: '#efefef',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Containera: {
    width: '85%',
    backgroundColor: '#ffffff',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: 10,
  },
  Logo: {
    width: 60,
    height: 40,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 5,
  },
  heding: {
    marginTop: -20,
    marginBottom: 15,
    width: '85%',
  },
  num: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  numt: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
});

export default PropertyToDistrict;
