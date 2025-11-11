// /**
//  * Jaher Notice React Native App
//  **/
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  LogBox,
  Appearance,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Toast from 'react-native-toast-message';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';
//

const PropertyToDistrict = ({route, navigation}) => {
  const [Districtnameh, setDistrictnameh] = useState();
  useEffect(() => {
    const {Districtname, District} = route.params;
    setDistrictnameh(Districtname);
    setDist(District);
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(false);
    deleteData();
    setId([]);
    onRefresh();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setId([]);
  };

  const DeleteConfirmationModal = ({isVisible, onCancel, onDelete}) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign
              name="exclamationcircleo"
              size={50}
              color="#ffd700"
              style={{marginTop: 10, marginBottom: 10}}
            />
            <Text style={styles.modalText}>
              Are you sure you want to Delete This Property Details?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadings, setIsLoadings] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [TotalPag, setTotalPag] = useState();
  // page scrolling
  const [dataa, setDataa] = useState([]);
  // Loding Footer
  const [isFetching, setFetching] = useState(false);
  // PageNo
  const [currentPage, setCurrentPage] = useState(1);

  // Delete Property
  const [dataDelete, setDataDelete] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [dist, setDist] = useState();

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  const deleteData = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };
      const response = await fetch(
        `https://qaapi.jahernotice.com/api2/del/propertyDetails?id=${id}`,
        requestOptions,
      );
      if (response.status === 200) {
        // Delete successful, now fetch the updated data
        fetchMarketData();
        setIsLoading(true);
        setIsLoadings(true);
        Toast.show({
          type: 'success',
          // type: 'error', //  success error or 'error', 'info', 'warning'
          text1: `Property Details Deleted Successfully.`,
          position: 'bottom', // 'top' or 'bottom'
          visibilityTime: 4000, // ms
          autoHide: true,
          topOffset: 30,
          bottomOffset: 50,
        });
      } else {
        console.error('Delete request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting property details:', error);
    }
  };

  const fetchMarketData = async () => {
    setCurrentPage(currentPage + 1);
    setIsLoadings(true);
    hideMessage();
    setFetching(true);
    const {District, Districtname, State} = route.params;
    setDist(District);
    let Userid = await AsyncStorage.getItem('UserID');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        PageSize: '10',
        PageNo: currentPage,
      }),
    };
    return new Promise((resolve, reject) => {
      fetch(
        `https://qaapi.jahernotice.com/api2/app/property/details/${Userid}/${District}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setDataa(prevData => [...prevData, ...data.data.Records]);
            setTotalPag(data.data);
            setIsLoading(false);
            setFetching(false);
          }
        })
        .catch(error => console.log('error', error));
    });
  };

  const handleLoadMore = () => {
    console.log('currentPage', currentPage);
    if (TotalPag.TotalPage >= currentPage) {
      setCurrentPage(currentPage + 1);
      fetchMarketData();
      hideMessage();
      setFetching(true);
    } else {
      setIsLoadings(true);
      dataNotfound();
      setShowMessage(true);
    }
  };

  const hideMessage = () => {
    setFetching(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
  };

  const [showMessage, setShowMessage] = useState(true);
  const [showMessagea, setshowMessagea] = useState('More Data Not Found...');
  const [showMessageTimeout, setShowMessageTimeout] = useState(showMessage);

  useEffect(() => {
    let timer;
    if (showMessagea) {
      setShowMessageTimeout(true);
      timer = setTimeout(() => {
        setShowMessageTimeout(false);
      }, 4000); // Hide message after 2 seconds
    } else {
      setShowMessageTimeout(false);
    }
    return () => clearTimeout(timer);
  }, [showMessagea]);

  const dataNotfound = () => {
    return (
      <View style={{marginTop: 8, alignItems: 'center', marginBottom: 20}}>
        {TotalPag?.TotalPage > currentPage ||
        TotalPag?.TotalPage === currentPage ||
        TotalPag?.TotalPage === 0 ? (
          <ActivityIndicator size={'large'} color="#b83725" />
        ) : null}
        {TotalPag?.TotalPage === 0 && showMessageTimeout ? (
          <View style={{marginTop: 6, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#666666'}}>
              {/* More Data Not Found... */}
            </Text>
          </View>
        ) : showMessageTimeout ? (
          <View style={{marginTop: 6, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#666666'}}>
              {/* More Data Not Found... */}
            </Text>
          </View>
        ) : null}
        {setIsLoadings(false)}
      </View>
      // <View style={{marginTop: 10, alignItems: 'center', marginBottom: 20}}>
      //   {TotalPag?.TotalPage > currentPage ||
      //   TotalPag?.TotalPage === currentPage ||
      //   TotalPag?.TotalPage === 0 ? (
      //     <ActivityIndicator size={'large'} color="#b83725" />
      //   ) : TotalPag?.TotalPage === 0 && showMessage ? (
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
      //   ) : null}
      //   {setIsLoadings(false)}
      // </View>
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
    setTimeout(() => {
      setIsLoading(true);
      setCurrentPage(1);
      setDataa([]);
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
      <View
        style={{
          ...styles.Containersc,
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
        }}>
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
            ...styles.Containersc,
            backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
          }}>
          {isLoading ? (
            <View
              style={{
                backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
              }}>
              <ActivityIndicator
                size="large"
                color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                style={{
                  backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
                  marginTop: 20,
                }}
              />
            </View>
          ) : (
            <FlatList
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={dataNotfound}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={dataa}
              renderItem={({item}) => (
                // #696969
                <Card
                  style={{
                    marginTop: 10,
                    marginBottom: 15,
                    backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#484c54',
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        theme === 'LIGHT' ? '#ffffff' : '#484c54',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 20,
                        color:
                          theme === 'LIGHT' ? 'rgb(153, 153, 153)' : '#ffffff',
                      }}>
                      {capitalizeFirstWord(item.villagename)}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.Container,
                      backgroundColor:
                        theme === 'LIGHT' ? '#ffffff' : '#343a40',
                    }}>
                    <Image source={{uri: item.ICON_URL}} style={styles.Logo} />
                    <View style={{marginLeft: -10}}>
                      <View
                        style={{
                          ...styles.Containera,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}>
                        <View
                          style={{
                            ...styles.numa,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}>
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {item.surveyno.length > 10
                              ? `${item.surveyno.substring(0, 10)}...`
                              : item.surveyno}
                          </Text>
                          <Divider style={styles.Divider} />
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            SURVEY
                          </Text>
                        </View>
                        <View
                          style={{
                            ...styles.numa,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}>
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {item.tpno.length > 10
                              ? `${item.tpno.substring(0, 10)}...`
                              : item.tpno}
                          </Text>
                          <Divider style={styles.Divider} />
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            TP
                          </Text>
                        </View>
                        <View
                          style={{
                            ...styles.numa,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}>
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {item.fpno.length > 10
                              ? `${item.fpno.substring(0, 10)}...`
                              : item.fpno}
                          </Text>
                          <Divider style={styles.Divider} />
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            FP
                          </Text>
                        </View>
                        <View
                          style={{
                            ...styles.numa,
                            color: theme === 'LIGHT' ? '#000' : '#ffffff',
                          }}>
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            {item.buildingno.length > 10
                              ? `${item.buildingno.substring(0, 10)}...`
                              : item.buildingno}
                          </Text>
                          <Divider style={styles.Divider} />
                          <Text
                            style={{
                              ...styles.num,
                              color:
                                theme === 'LIGHT'
                                  ? 'rgb(153, 153, 153)'
                                  : '#ffffff',
                            }}>
                            Building No.
                          </Text>
                        </View>
                      </View>
                      <View style={styles.heding}>
                        <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                          {item.societyname}
                        </Text>
                        <Divider style={{height: 2}} />
                        <Text
                          style={{
                            width: '100%',
                            marginTop: 5,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 12,
                            fontWeight: 'bold',
                            color:
                              theme === 'LIGHT'
                                ? 'rgb(153, 153, 153)'
                                : '#ffffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          SOCIETY / SECTOR / BUNGALOW / BUILDING
                        </Text>
                        <View
                          style={{
                            width: '60%',
                            height: 40,
                            marginLeft: -30,
                            marginTop: 10,
                            textAlign: 'center',
                            flexDirection: 'row',
                            marginBottom: 15,
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              width: '100%',
                              height: '65%',
                              marginTop: 10,
                              marginRight: 30,
                              borderRadius: 20,
                              backgroundColor: '#efefef',
                              marginLeft: 22,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('Viewa', {
                                  subscriptionid: item.subscriptionid,
                                })
                              }>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontWeight: 'bold',
                                  marginTop: 3,
                                  color: '#f4ba13',
                                }}>
                                Past Notices
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={{
                              marginLeft: 10,
                              marginTop: 13,
                              marginLeft: 25,
                              marginRight: 5,
                              borderRadius: 20,
                              borderColor: '#007AFF',
                              borderWidth: 1,
                              width: '35%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 26,
                              //  backgroundColor: '#efefef',
                            }}
                            onPress={() =>
                              navigation.navigate('EditPropertyDetails', {
                                SubscriptionID: item.subscriptionid,
                                Surveyno: item.surveyno,
                                Tpno: item.tpno,
                                Fpno: item.fpno,
                                Buildingno: item.buildingno,
                                Societyname: item.societyname,
                                Districtnam: Districtnameh,
                                DistrictID: item.district,
                                VillageID: item.village,
                                TalukaID: item.taluka,
                                districtnamea: item.districtname,
                                talukanamea: item.talukaname,
                                villagenamea: item.villagename,
                                dista: dist,
                                name: [
                                  item.villagename,
                                  item.talukaname,
                                  item.districtname,
                                ],
                              })
                            }>
                            {/* Replace the icon component below with your actual edit icon component */}
                            <AntDesign name="edit" size={20} color="#007AFF" />
                          </TouchableOpacity>

                          {/* <TouchableOpacity
                            style={{
                              marginLeft: 10,
                              marginTop: 13,
                              marginLeft: 20,
                              marginRight: 5,
                            }}
                            onPress={() => {
                              setId(item.subscriptionid);
                              setModalVisible(true);
                            }}>
                            <AntDesign name="delete" size={20} color="red" />
                          </TouchableOpacity> */}
                          {/* Replace the icon component below with your actual delete icon component */}
                          <DeleteConfirmationModal
                            isVisible={modalVisible}
                            onDelete={handleDelete}
                            onCancel={handleCancel}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              )}
            />
          )}
          <Toast/>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#b83725',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  //
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

  //
  scrollView: {
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  Containersc: {
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  Containerhend: {
    // marginTop: 10,
    backgroundColor: '#efefef',
    marginBottom: 10,
  },
  Container: {
    width: '100%',
    // height: 240,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
  },
  Containera: {
    width: '74%',
    height: 90,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: 15,
  },
  Logo: {
    width: 60,
    height: 40,
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  heding: {
    width: '74%',
    marginLeft: 10,
  },
  num: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'normal',
    width: '100%',
    alignItems: 'center',
  },
  numa: {
    marginLeft: 10,
    width: '25%',
  },
  //

  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  Divider: {
    height: 2,
    marginTop: 2,
    marginBottom: 2,
  },
});

export default PropertyToDistrict;
