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
import { Card, Divider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../Imeges/jnlogo.png';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const PropertyToDistrict = ({ route, navigation }) => {
  const [TotalPage, setTotalPage] = useState();
  // page scrolling
  const [dataa, setDataa] = useState([]);
  // Loding Footer
  const [isFetching, setFetching] = useState(true);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);
  const [isloding, setIsloding] = useState(true);
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Ajanijahernoticec');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  // Call API fetchMarketData
  const fetchMarketData = async () => {
    // setFetching(true);
    // const arrayData = dataa;
    console.log('currentPage==API', currentPage);
    hideMessage();
    const { DistrictData, DateTuday, otherParam } = route.params;
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
      // ${DistrictData}/${DateTuday}
      `https://qaapi.jahernotice.com/api2/app/ajanijahernotice/details/${Userid}/${DistrictData}/${DateTuday}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          setDataa(prevData => [...prevData, ...data.data.Records]);
          setCurrentPage(currentPage + 1);
          setTotalPage(data.data);
          console.log('data.data.Records', data.data.Records);
        }
        setIsloding(false);
        setFetching(false);
      })
      .catch(error => console.log('error', error));
  };
  console.log('aaaaaaaaaaaaaaaaa', dataa);

  // Scroll
  // const handleLoadMore = () => {
  //   console.log('currentPage', currentPage);
  //   if (TotalPage.TotalPage > currentPage) {
  //     setCurrentPage(currentPage + 1);
  //     fetchMarketData();
  //     hideMessage();
  //     setFetching(true);
  //   } else {
  //     // setIsLoadings(true);
  //     dataNotfound();
  //     setShowMessage(true);
  //   }
  // };
  const handleLoadMore = () => {
    // setFetching(true);
    console.log('currentPage', currentPage);
    if (
      TotalPage?.TotalPage > currentPage ||
      TotalPage?.TotalPage === currentPage ||
      TotalPage?.TotalPage === 0
    ) {
      setFetching(true);
      setCurrentPage(currentPage + 1);
      fetchMarketData();
      hideMessage();
    } else {
      setTimeout(() => {
        setFetching(false);
      }, 10000);
      dataNotfound(); // Render the component directly here
      setShowMessage(true);
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#666666' }}>
          {/* More Data Not Found... */}
        </Text>
      </View>;
    }
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
  const [showMessage, setShowMessage] = useState();

  // Function to hide the message after 10 seconds
  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(true);
    }, 10000); // 10 seconds in milliseconds
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // 10 seconds in milliseconds
  };

  // No Data

  const dataNotfound = () => {
    // <View style={{marginTop: 10, alignItems: 'center}}>
    // {
    //   TotalPage?.TotalPage > currentPage ||
    //   TotalPage?.TotalPage == currentPage ||
    //   TotalPage?.TotalPage == 0 ? (
    //     <ActivityIndicator size={'large'} color="#b83725" />
    //   ) : TotalPage?.TotalPage == 0 && showMessage ? (
    //     <View style={{marginTop: 10, alignItems: 'center'}}>
    //       <Text style={{fontSize: 12, color: '#666666'}}>
    //         More Data Not Found...
    //       </Text>
    //     </View>
    //   ) : showMessage ? (
    //     <View style={{marginTop: 10, alignItems: 'center'}}>
    //       <Text style={{fontSize: 12, color: '#666666'}}>
    //         More Data Not Found...
    //       </Text>
    //     </View>
    //   ) : null;
    // }
    // return TotalPage?.TotalPage > currentPage ||
    //   TotalPage?.TotalPage === currentPage ||
    //   TotalPage?.TotalPage === 0 ? (
    //   <ActivityIndicator size={'large'} color="#b83725" />
    // ) : showMessage ? (
    //   <View style={{marginTop: 10, alignItems: 'center'}}>
    //     <Text style={{fontSize: 12, color: '#666666'}}>
    //       More Data Not Found...
    //     </Text>
    //   </View>
    // ) : null;
    return showMessage ? (
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#666666' }}>
          {/* More Data Not Found... */}
        </Text>
      </View>
    ) : null;
    {
      /* {setIsLoadings(false)} */
    }
    // </View>;

    // if (TotalPage.TotalPage > currentPage) {
    //   // Data is still being fetched, show the loading indicator
    //   return (
    //     <View style={{marginTop: 10, alignItems: 'center'}}>
    //       <ActivityIndicator
    //         size={'large'}
    //         color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
    //       />
    //     </View>
    //   );
    // } else {
    //   // No more data is available
    //   return (
    //     <View style={{marginTop: 10, alignItems: 'center'}}>
    //       {showMessage && (
    //         <View style={{marginTop: 10, alignItems: 'center'}}>
    //           {setTimeout(() => {
    //             <Text style={{fontSize: 12, color: '#666666'}}>
    //               More Data Not Found...
    //             </Text>;
    //           }, 5000)}
    //         </View>
    //       )}
    //     </View>
    //   );
    // }
  };

  useEffect(
    () => {
      fetchMarketData();
    },
    [],
    [currentPage],
  );

  const [refreshing, setRefreshing] = useState();
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
      <SafeAreaView
        style={{
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
          flex: 1,
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
                <ActivityIndicator size="large" color="#b83725" />
              </View>
            ) : (
              <FlatList
                // onEndReached={() => {
                //   handleLoadMore();
                // }}
                // onEndReachedThreshold={0.2}
                // ListFooterComponent={renderFooter()}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }

                // onEndReached={() => {
                //   handleLoadMore();
                // }}
                // onEndReachedThreshold={0.2}
                // ListFooterComponent={dataNotfound()}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
                onEndReached={handleLoadMore} // Removed unnecessary arrow function
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                  isFetching ? (
                    <ActivityIndicator size={'large'} color="#b83725" />
                  ) : (
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: '#666666' }}>
                        More Data Not Found...
                      </Text>
                    </View>
                  )
                } // Render the component directly here
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
                      backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#000',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          theme === 'LIGHT' ? '#f5f5f5' : '#484c54',
                        // #696969
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {item.village === '' ||
                      item.village === null ||
                      item.village === '--' ||
                      item.taluka === '' ||
                      item.taluka === null ||
                      item.taluka === '--' ? null : (
                        <View
                          style={{
                            width: '50%',
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
                            {`${capitalizeFirstWord(
                              item.taluka,
                            )}, ${capitalizeFirstWord(item.village)}`}
                          </Text>
                        </View>
                      )}
                      {item.city_survey_office === '' ||
                      item.city_survey_office === null ||
                      item.city_survey_office === '--' ||
                      item.ward === '' ||
                      item.ward === null ||
                      item.ward === '--' ? null : (
                        <View
                          style={{
                            width: '50%',
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
                            {`${capitalizeFirstWord(
                              item.city_survey_office,
                            )}, ${capitalizeFirstWord(item.ward)}`}
                          </Text>
                        </View>
                      )}

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
                        {/* <View>
                          <Text
                            style={{
                              textAlign: 'right',
                              fontSize: 18,
                              fontWeight: 'bold',
                              marginRight: 20,
                              marginTop: 10,
                            }}>
                            {item.publish_date}
                          </Text>
                        </View> */}
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
                              City/Survey No:{' '}
                              {item.survey === '--' ? null : (
                                <Text style={styles.numt}>{item.survey}</Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              TP :{' '}
                              {item.tpno === '--' ? null : (
                                <Text style={styles.numt}>{item.tpno}</Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              FP :{' '}
                              {item.fpno === '--' ? null : (
                                <Text style={styles.numt}>{item.fpno}</Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Building No. :{' '}
                              {item.buildingno === '--' ? null : (
                                <Text style={styles.numt}>
                                  {item.buildingno}
                                </Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Client Name. :{' '}
                              {item.client_names === '--' ? null : (
                                <Text style={styles.numt}>
                                  {item.client_names}
                                </Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
                          <View>
                            <Text
                              style={{
                                ...styles.num,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Lawyer Name :{' '}
                              {item.LawyerName === '--' ? null : (
                                <Text style={styles.numt}>
                                  {item.LawyerName}
                                </Text>
                              )}
                            </Text>
                          </View>
                          <Divider style={{ height: 2, marginBottom: 5 }} />
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
                            {item.society === '--' ? null : (
                              <Text
                                style={{
                                  marginBottom: 5,
                                  fontWeight: 'bold',
                                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                                }}
                              >
                                {' '}
                                {item.society}{' '}
                              </Text>
                            )}
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
                            <View
                              style={{
                                ...styles.bottom,
                                backgroundColor:
                                  theme === 'LIGHT' ? '#ffffff' : '#343a40',
                              }}
                            >
                              <View
                                style={{
                                  ...styles.View,
                                  backgroundColor:
                                    theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                  borderColor:
                                    theme === 'LIGHT' ? '#000' : '#ffffff',
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                  onPress={() =>
                                    navigation.navigate('Ajaniimag', {
                                      imagepepararia: item.original_image_path,
                                      publish_date: item.publish_date,
                                      notifysource: item.notifysource,
                                      fileUrl: item.original_image_path,
                                    })
                                  }
                                >
                                  VIEW
                                </Text>
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
                              <View
                                style={{
                                  justifyContent: 'center',
                                  backgroundColor:
                                    theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: 15,
                                    justifyContent: 'center',
                                    marginTop: -10,
                                    backgroundColor:
                                      theme === 'LIGHT' ? '#ffffff' : '#343a40',
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
    justifyContent: 'space-between',
    height: '100%',
  },
  Containera: {
    width: '85%',
    backgroundColor: '#ffffff',
    // flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  Logo: {
    width: 80,
    height: 50,
    marginTop: 90,
    marginLeft: 23,
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
