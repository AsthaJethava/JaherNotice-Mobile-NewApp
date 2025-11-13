import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
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
function AreaalertLastPublidate({ route, navigation }) {
  // 0
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const tableData = () => {
    // Date
    // useEffect(() => {
    //   bootstrapAsync().then(({isUserActive}) => {
    //     if (isUserActive) {
    //       NavigationService.navigate('AreaalertLastPublishe');
    //     } else {
    //       NavigationService.navigate('Login');
    //     }
    //   });
    // });
    const { Date, otherParam } = route.params;
    (async () => {
      let Userid = await AsyncStorage.getItem('UserID');

      setIsLoading(true);
      setRefreshing(false);
      fetch(
        `https://qaapi.jahernotice.com/api2/app/areaalert/dashboard/${Userid}/${Date}`,
      )
        .then(function (response) {
          responseClone = response.clone();
          return response.json();
        })
        .then(function (rejectionReason) {
          setData(rejectionReason.data);
          setIsLoading(false);
          setRefreshing(false);
          console.log(
            'https://qaapi.jahernotice.com/api2/app/areaalert/dashboard/${Userid}/${Date}',
            rejectionReason.data,
          );
        })
        .catch(error => console.error(error));
    })();
  };

  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    tableData();
    setIsLoading(true);
    setRefreshing(false);
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    tableData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      tableData();
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
      <View>
        <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
          }}
        >
          <StatusBar
            animated={true}
            backgroundColor={statusBarBackgroundColor}
          />
          <OrientationLocker
            orientation={PORTRAIT}
            onChange={orientation => console.log('onChange', orientation)}
            onDeviceChange={orientation =>
              console.log('onDeviceChange', orientation)
            }
          />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
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
                <FlatList
                  data={data.last_publishdate_data}
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
                          source={{ uri: item.Icon }}
                          style={styles.Logo}
                        />
                        <View
                          style={{
                            marginBottom: 14,
                            marginLeft: -10,
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
                            </Text> */}
                          {/* </View> */}
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
                                TP :{' '}
                                <Text style={styles.numt}>{item.tpno}</Text>
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
                                FP :{' '}
                                <Text style={styles.numt}>{item.fpno}</Text>
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
                                <Text style={styles.numt}>
                                  {item.buildingno}
                                </Text>
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
                                width: '90%',
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
                                        imagepepararia:
                                          item.original_image_path,
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
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  Containerbotom: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#FFF',
  },
  View: {
    borderRightWidth: 1,
    height: 28,
    width: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Containerhend: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  Container: {
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
  },
  Containera: {
    width: '80%',
    backgroundColor: '#ffffff',
    // flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
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
export default AreaalertLastPublidate;
