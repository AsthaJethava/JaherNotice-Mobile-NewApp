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
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  //   const [TotalPagea, setTotalPagea] = useState();
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const fetchMarketData = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api/Data/${Userid}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          if (data.data.length === 0) {
            // setDataa([]);
            setIsLoading(false);
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
            setData(data.data);
            setIsLoading(false);
            setRefreshing(false);
            setIsHidden(false);
            setIsHiddend(true);
          }
        }
      })
      .catch(error => console.error(error));
  };
  // console.log(data);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchMarketData();
      setIsLoading(true);
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
              {/* )}
              /> */}
              {isHiddend ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={data}
                  renderItem={({ item }) => (
                    <Card
                      style={{
                        backgroundColor: '#FFF',
                        marginTop: 8,
                        marginBottom: 10,
                        width: '95%',
                        elevation: 3,
                        justifyContent: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <Card.Content>
                        <View style={style.containerc}>
                          <View style={{ marginTop: 10, marginBottom: 10 }}>
                            {item.survey_number !== '' &&
                            item.survey_number !== null ? (
                              <View style={style.rowc}>
                                <Text style={style.labelc}>
                                  City/Survey No:
                                </Text>
                                <Text style={style.valuec}>
                                  {capitalizeFirstWord(item.survey_number)}
                                </Text>
                              </View>
                            ) : null}
                            {item.village !== '' && item.village !== null ? (
                              <>
                                <View style={style.rowc}>
                                  <Text style={style.labelc}>
                                    Village Name :
                                  </Text>
                                  <Text style={style.valuec}>
                                    {capitalizeFirstWord(item.village)},
                                  </Text>
                                </View>
                              </>
                            ) : null}
                            {item.taluka !== '' && item.taluka !== null ? (
                              <View style={style.rowc}>
                                <Text style={style.labelc}>Taluka Name :</Text>
                                <Text style={style.valuec}>
                                  {capitalizeFirstWord(item.taluka)},
                                </Text>
                              </View>
                            ) : null}
                            {item.district !== '' && item.district !== null ? (
                              <View style={style.rowc}>
                                <Text style={style.labelc}>
                                  District Name :
                                </Text>
                                <Text style={style.valuec}>
                                  {capitalizeFirstWord(item.district)}
                                </Text>
                              </View>
                            ) : null}
                            {item.citysurveyoffice !== '' &&
                            item.citysurveyoffice !== null ? (
                              <View style={style.rowc}>
                                <Text style={style.labelc}>
                                  City Survey Office :
                                </Text>
                                <Text style={style.valuec}>
                                  {capitalizeFirstWord(item.citysurveyoffice)},
                                </Text>
                              </View>
                            ) : null}
                            {item.ward !== '' && item.ward !== null ? (
                              <View style={style.rowc}>
                                <Text style={style.labelc}>Ward :</Text>
                                <Text style={style.valuec}>
                                  {capitalizeFirstWord(item.ward)},
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        </View>
                        {/*  Status Pending */}
                        {/* "Status": "Received", */}
                      </Card.Content>
                    </Card>
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
  containerc: {
    paddingHorizontal: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginVertical: 10, // Add margin for better separation
  },
  rowc: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  labelc: {
    fontWeight: 'bold',
    width: '35%',
    fontSize: 14,
  },
  valuec: {
    fontWeight: 'normal',
    width: '50%',
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
    width: '90%',
    elevation: 10,
    borderRadius: 7,
  },
  containerma: {
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  topcard: {
    flexDirection: 'row',
    marginTop: 13,
    height: 30,
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
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  ViewT: {
    borderRightWidth: 1,
    height: 2,
    marginTop: 2,
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

{
  /* 
  <Card
                        style={{
                          ...style.cardm,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}>
                        <View style={style.containerma}>
                          {item.district !== '' && item.district !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  District:{' '}
                                  <Text style={style.Textcolor}>
                                    {item.district}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}
                          {item.taluka !== '' && item.taluka !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  Taluka:{' '}
                                  <Text style={style.Textcolor}>
                                    {item.taluka}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}
                          {item.village !== '' && item.village !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  Village:{' '}
                                  <Text style={style.Textcolor}>
                                    {item.village}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}

                          {item.citysurveyoffice !== '' &&
                          item.citysurveyoffice !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  City Survey Office:{' '}
                                  <Text style={style.Textcolor}>
                                    {item.citysurveyoffice}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}

                          {item.ward !== '' && item.ward !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  ward:{' '}
                                  <Text style={style.Textcolor}>
                                    {item.ward}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}

                          {item.survey_number !== '' &&
                          item.survey_number !== null ? (
                            <>
                              <View style={style.VewText}>
                                <Text
                                  style={{
                                    ...style.font,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}>
                                  Survey No. :{' '}
                                  <Text style={style.Textcolor}>
                                    {item.survey_number}
                                  </Text>
                                </Text>
                              </View>
                              <Divider style={style.ViewT} />
                            </>
                          ) : null}
                        </View>
                      </Card>

*/
}
