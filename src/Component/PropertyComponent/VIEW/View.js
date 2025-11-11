// /**
//  * Jaher Notice React Native App
//  **/

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
  TouchableOpacity,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import { Divider, Card } from 'react-native-paper';
import Logo from '../../../Imeges/jnlogo.png';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const Viewcom = ({ route, navigation }) => {
  const [subscriptionid, setsubscriptionid] = useState('');
  // Log Navigate Data
  useEffect(() => {
    const { subscriptionid, otherParam } = route.params;
    setsubscriptionid(JSON.stringify(subscriptionid));
  }, []);
  // 0
  const [data, setData] = useState([]);
  // 1
  const [dataa, setDataa] = useState([]);
  // Page Loding
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [TotalPage, setTotalPage] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);
  const [PageNumber, setPageNumber] = useState(5);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  // pastnotices/details/ API
  const tableData = async () => {
    // const arrayData = data;
    hideMessage();
    setFetching(true);
    const { subscriptionid, otherParam } = route.params;
    let Userid = await AsyncStorage.getItem('UserID');
    // setIsLoading(true);
    setRefreshing(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      PageSize: PageNumber,
      PageNo: currentPage,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    //
    return new Promise((resolve, reject) => {
      fetch(
        // https://qaapi.jahernotice.com/api2/app/pastnotices/details/:subscriptionid
        `https://qaapi.jahernotice.com/api2/app/pastnotices/details/${subscriptionid}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(data => {
          // }
          if (data.status === 200) {
            if (data.data.Records.length === 0) {
              setData(null);
              setDataa();
              setIsHidden(true);
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
              setDataa(mess);
            } else {
              setDataa(null);
              // arrayData.push(data.data.Records[0]);
              // setData([...arrayData, ...data.data.Records]);
              setData(prevData => [...prevData, ...data.data.Records]);
              setCurrentPage(currentPage + 1);
              setTotalPage(data.data);
              setIsHidden(false);
              setIsHiddend(true);
            }
          }
          setIsLoading(false);
          setFetching(false);
        })
        .catch(error => console.log('error', error));
    });
  };

  // Scroll

  const handleLoadMore = () => {
    if (TotalPage && TotalPage.TotalPage > currentPage) {
      tableData();
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
        <ActivityIndicator
          size={'large'}
          color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
        />
      </View>
    ) : (
      <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
        <Text></Text>
      </View>
    );
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
      tableData();
    },
    [],
    [currentPage],
  );

  // page Refreshing
  const onRefresh = React.useCallback(() => {
    setTimeout(() => {
      setData([]); // Clear the old data
      setCurrentPage(1);
      setIsLoading(true);
      tableData(); // Fetch new data
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
      <View
        style={{
          ...style.containerm,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
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
            <View
              style={{
                // backgroundColor: '#efefef',
                backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
                marginTop: 20,
              }}
            >
              <ActivityIndicator
                size="large"
                color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
              />
            </View>
          ) : (
            <>
              {/* 0 */}
              {isHidden ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={dataa}
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
                            marginBottom: 10,
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
              {/* 1 */}
              {isHiddend ? (
                <View>
                  <FlatList
                    onEndReached={() => {
                      handleLoadMore();
                    }}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={dataNotfound()}
                    data={data}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    renderItem={({ item }) => (
                      <Card
                        style={{
                          ...style.cardm,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}
                      >
                        <View>
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
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('Viewimge', {
                                    imagepepar: item.image_path,
                                    Notice_Date: item.Notice_Date,
                                    notifyby: item.notifysource,
                                    imagedownlod: item.image_path,
                                    fileUrl: replaceSpacesInImageUrl(
                                      item.image_path,
                                    ),
                                  })
                                }
                              >
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                >
                                  View
                                </Text>
                              </TouchableOpacity>
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
                        <View style={style.containerma}>
                          <View style={style.VewText}>
                            <Text
                              style={{
                                ...style.font,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              <Text style={style.Textcolor}>
                                Notice Date:{' '}
                                <Text style={style.Textcolor}>
                                  {item.Notice_Date}
                                </Text>
                              </Text>{' '}
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
                              Survey No.:{' '}
                              <Text style={style.Textcolor}>{item.survey}</Text>{' '}
                              {/* {item.id} */}
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
                              TP No.:{' '}
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
                              FP No.:{' '}
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
                              Society:{' '}
                              <Text style={style.textD}>{item.society}</Text>
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
                              Building No.:{' '}
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
                              Village Name :{' '}
                              <Text style={style.textD}>{item.village}</Text>
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
                              Taluka Name :{' '}
                              <Text style={style.textD}>{item.taluka}</Text>
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
                              District Name :{' '}
                              <Text style={style.textD}>{item.district}</Text>
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
                              Notify by:{' '}
                              <Text style={style.textD}>{item.notifyby}</Text>
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
                              Clients :{' '}
                              <Text style={style.textD}>
                                {item.client_names}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </Card>
                    )}
                  />
                </View>
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

export default Viewcom;
