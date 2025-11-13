import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Appearance,
  Image,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Divider, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const NoticesDisplay = ({ route, navigation }) => {
  const [data, setData] = useState('');
  const [dataa, setDataa] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState();
  const [isHiddena, setIsHiddena] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [ID, setId] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('NoticesDisplay');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const handleDelete = () => {
    setModalVisible(true);
    deleteData();
    setData([]);
    setId([]);
    fetchMarketData();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setId([]);
  };

  const DeleteConfirmationModal = ({ isVisible, onCancel, onDelete }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign
              name="exclamationcircleo"
              size={50}
              color="#ffd700"
              style={{ marginTop: 10, marginBottom: 10 }}
            />
            <Text style={styles.modalText}>
              Are you sure Do you want to delete this Area Alert detail?
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

  const deleteData = async () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };
    setModalVisible(false);
    fetch(
      `https://qaapi.jahernotice.com/api2/del/AreaAlert?id=${ID}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        // console.log('Response Data:', data);
        if (data.status === 200) {
          // setModalVisible(false);
          setModalVisible(false);
          // console.log(data);
          Toast.show({
            type: 'success', //  success error or 'error', 'info', 'warning'
            text1: `Area Alert Details Deleted Successfully`,
            position: 'top', // 'top' or 'bottom'
            visibilityTime: 4000, // ms
            autoHide: true,
            topOffset: 30,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  };

  const fetchMarketData = async () => {
    setIsLoading(true);
    let Userid = await AsyncStorage.getItem('UserID');
    // console.log('userID', Userid);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/AreaAlertDetails?UserID=${Userid}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          // console.log('dataBh', data);
          if (data.result.length === 0) {
            // setDataa(data);
            setData([]);
            setIsLoading(false);
            setIsHidden(true);
            setIsHiddena(false);
            // console.log('dataBh', data);
            const mess = [];
            if (data !== undefined) {
              if (
                data.Message !== undefined &&
                data.Message !== undefined &&
                data.Message !== ''
              ) {
                mess.push({
                  type: 'message',
                  message: data.Message,
                });
              }
            }
            setDataa(mess);
          } else {
            setData(data.result);
            setDataa(null);
            // console.log('dataBha', data);
            setIsLoading(false);
            setIsHidden(false);
            setIsHiddena(true);
            console.log(
              'https://qaapi.jahernotice.com/api2/get/AreaAlertDetails?UserID=${Userid}',
              data.result,
            );
          }
        }
      })
      .catch(error => console.log('error', error));
  };

  // console.log('data==01', data);

  useEffect(() => {
    fetchMarketData();
  }, []);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   // console.log('data');
  //   setTimeout(() => {
  //     setIsLoading(true);
  //     setRefreshing(false);
  //     fetchMarketData();
  //   }, 2000);
  // };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(true);
      setRefreshing(false);
      fetchMarketData();
    }, 2000);
  };

  // Function to capitalize the first word
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

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
        }}
      >
        <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
        <View
          style={{
            ...styles.rowContainer,
          }}
          onPress={() => navigation.navigate('AddAreaAlert')}
        >
          <Text style={styles.addNewPropertyText}>Add Area Alert </Text>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => navigation.navigate('AddAreaAlert')}
          >
            {/* Replace the icon component below with your actual edit icon component */}
            <MaterialIcons name="add-business" size={25} color="#ff4500" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 8, marginBottom: 10 }}>
          <View>
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
                            width: '100%',
                            height: '80%',
                            marginBottom: 30,
                          }}
                        >
                          <Image
                            source={require('../../Imeges/no-data-1.gif')}
                            style={{
                              width: '26%',
                              height: '38%',
                              marginTop: 200,
                              marginBottom: 20,
                            }}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginTop: 10,
                              marginBottom: 25,
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
                {/*  */}
                {isHiddena ? (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    data={data}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                      <>
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
                            <View style={styles.containerc}>
                              <View style={{ marginTop: 10, marginBottom: 10 }}>
                                {item.villagename !== '' &&
                                item.villagename !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>
                                      Village Name :
                                    </Text>
                                    <Text style={styles.valuec}>
                                      {capitalizeFirstWord(item.villagename)},
                                    </Text>
                                  </View>
                                ) : null}
                                {item.Talukaname !== '' &&
                                item.Talukaname !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>
                                      Taluka Name :
                                    </Text>
                                    <Text style={styles.valuec}>
                                      {capitalizeFirstWord(item.Talukaname)},
                                    </Text>
                                  </View>
                                ) : null}
                                {item.districtname !== '' &&
                                item.districtname !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>
                                      District Name :
                                    </Text>
                                    <Text style={styles.valuec}>
                                      {capitalizeFirstWord(item.districtname)}
                                    </Text>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                            <View
                              style={{
                                width: '60%',
                                height: 40,
                                marginTop: 5,
                                textAlign: 'center',
                                flexDirection: 'row',
                                marginLeft: 'auto',
                              }}
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  width: '60%',
                                  height: '95%',
                                  marginTop: 2,
                                  borderRadius: 20,
                                  backgroundColor: '#efefef',
                                  justifyContent: 'center',
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate(
                                      'VillageTalukaDistrictList',
                                      {
                                        districta: item.districtname,
                                        talukaa: item.Talukaname,
                                        villagea: item.villagename,
                                      },
                                    )
                                  }
                                >
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      fontWeight: 'bold',
                                      marginTop: 3,
                                      color: '#f4ba13',
                                    }}
                                  >
                                    Past Notices
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                style={{
                                  marginTop: 2,
                                  marginLeft: 'auto',
                                  borderRadius: 20,
                                  width: '30%',
                                  borderWidth: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 35,
                                  borderColor: '#007AFF',
                                  marginBottom: 5,
                                }}
                                onPress={() =>
                                  navigation.navigate('EditAreaAlert', {
                                    districta: item.districtname,
                                    talukaa: item.Talukaname,
                                    villagea: item.villagename,
                                    districtaID: item.district,
                                    talukaaID: item.taluka,
                                    villageaID: item.village,
                                    id: item.id,
                                    name: [
                                      item.villagename,
                                      item.Talukaname,
                                      item.districtname,
                                    ],
                                  })
                                }
                              >
                                {/* Replace the icon component below with your actual edit icon component */}
                                <AntDesign
                                  name="edit"
                                  size={20}
                                  color="#007AFF"
                                />
                              </TouchableOpacity>

                              <DeleteConfirmationModal
                                isVisible={modalVisible}
                                onDelete={handleDelete}
                                onCancel={handleCancel}
                              />
                            </View>
                            {/*  Status Pending */}
                            {/* "Status": "Received", */}
                          </Card.Content>
                        </Card>
                      </>
                    )}
                  />
                ) : null}
              </>
            )}
          </View>
        </ScrollView>
        <Toast/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerc: {
    paddingHorizontal: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginVertical: 10, // Add margin for better separation
  },
  rowc: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
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
  FlatListaVTaa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#ffffff',
  },
  addNewPropertyText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  editIconContainer: {
    marginLeft: 10,
  },
  FlatListaVTa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ViewT: {
    borderRightWidth: 1,
    height: 2,
    padding: 1,
    marginLeft: 10,
    marginRight: 15,
  },
});

export default NoticesDisplay;

// useEffect(() => {
//   fetch('https://qaapi.jahernotice.com/api2/area/list/ByUser/477')
//     .then(response => response.text())
//     .then(data => {
// if (data.status == 200) {
//   console.log('dataBh', data);
//   if (data.data.length === 0) {
//     setDataa(data);
//     setData(null);
//     setIsLoading(false);
//     setIsHidden(!isHidden);
//     console.log('dataBh', data);
//   } else {
//     setData(data.data);
//     setDataa(null);
//     console.log('dataBha', data);
//     setIsLoading(false);
//   }
// }
//     })
//     .catch(error => console.log('errorb', error));
// });

// useEffect(() => {
// (async () => {
//   let Userid = await AsyncStorage.getItem('UserID');
//   console.log('userID', Userid);
//     fetch(`https://qaapi.jahernotice.com/api2/area/list/ByUser/${Userid}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 200) {
//           // Convert the first word of each name to capital
//           const updatedData = data.data.map(item => {
//             const villagename = capitalizeFirstWord(item.villagename);
//             const blockname = capitalizeFirstWord(item.blockname);
//             const districtname = capitalizeFirstWord(item.districtname);
//             return {...item, villagename, blockname, districtname};
//           });
//           setData(updatedData);
//           setIsLoading(false);
//         } else {
//           console.log('error', error);
//         }
//       })
//       .catch(error => console.log('errora', error));
//   })();
// }, []);
