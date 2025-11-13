import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ProgressBar,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { RadioButton, Avatar, Button, Card, Divider } from 'react-native-paper';
// import LandRecordStateID from '../LandRecord/LandRecordStateID.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
// import {response} from 'express';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Datanot from '../../Imeges/no-data-1.gif';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

// import {Card, ProgressBar} from 'react-native-elements';

const LandRecord = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(false);
    deleteData();
    setId([]);
    onRefresh();
  };
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('AuctionAlertServicesCount');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  const handleCancel = () => {
    setModalVisible(false);
    setId([]);
  };

  const DeleteConfirmationModal = ({ isVisible, onCancel, onDelete }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure You want Deactivate this Auction ?
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
  const [isActivea, setisActive] = useState(0);
  const [Id, setId] = useState();
  const API_URL = 'https://qaapi.jahernotice.com/api/tp/deactive';
  const deleteData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestBody = {
        UserSubscriptionMainID: Id,
        isActive: isActivea,
      };

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: 'follow',
      };

      const response = await fetch(API_URL, requestOptions);

      if (response.ok) {
        listDataa();
        return Toast.show({
          type: 'success',
          text1: `TP Alert Deleted Successfully.`,
          position: 'bottom',
          visibilityTime: 4000,
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

  const [StateeID, setStateeID] = useState();
  const [Data, setData] = useState([]); // Initialize Data state
  const [listData, setListData] = useState();
  const [isLoding, setIsLoding] = useState();
  const [dataa, setDataa] = useState([]);
  const [datan, setDatan] = useState();

  useEffect(() => {
    listDataa();
  }, []);

  const [selectedValue, setSelectedValue] = useState(null);
  //   console.log(selectedValue);

  const Next = () => {
    navigation.navigate('LandRecordForm');
    // console.log('dsaraaa =>', selectedValue);
  };

  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  const listDataa = async () => {
    setIsLoding(true);
    let Userid = await AsyncStorage.getItem('UserID');
    console.log(Userid);
    fetch(
      `https://qaapi.jahernotice.com/api/auction/subscriber/view/mobileapp/ByUserID/${Userid}`,
    )
      .then(response => response.json())
      .then(data => {
        // setListData(data.data);
        if (data.status === 200) {
          if (data.data.length === 0) {
            setDatan(data);
            // setDataa([]);
            setIsHidden(true);
            setIsLoding(false);
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
            const reversedData = data.data.reverse();
            setDataa(reversedData);
            setDatan(null);
            setIsHidden(false);
            setIsLoding(false);
            setIsHiddend(true);
          }
        }
      })
      .catch(error => console.log(error));
  };
  // console.log('Data', datan);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      listDataa();
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View
          style={{
            ...styles.rowContainer,
          }}
          //
          onPress={() =>
            navigation.navigate('AddAuctionService', {
              State: 'Gujarat',
            })
          }
        >
          <Text style={styles.addNewPropertyText}>Add Auction Service</Text>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() =>
              navigation.navigate('AddAuctionService', {
                State: 'Gujarat',
              })
            }
          >
            {/* Replace the icon component below with your actual edit icon component */}
            <MaterialIcons name="add-business" size={25} color="#ff4500" />
          </TouchableOpacity>
        </View>
        <View style={styles.radioGroup}>
          {isLoding ? (
            <ActivityIndicator
              size="large"
              color={'#b83725'}
              style={{
                marginTop: 20,
              }}
            />
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

                          marginTop: 10,
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
                            color: '#000',
                            marginBottom: 25,
                          }}
                        >
                          Oops! No Data Found.
                        </Text>
                      </View>
                    </>
                  )}
                />
              ) : null}
              {isHiddend ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={dataa}
                  renderItem={({ item }) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#FFF',
                          marginTop: 5,
                          marginBottom: 8,
                          width: '100%',
                          elevation: 3,
                        }}
                      >
                        <Card.Content>
                          <View style={styles.containerc}>
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                              {/* SubRegisterOffice, DocumentRegistrationDate, YearOfRegistration */}

                              {item.SubType_Name !== '' &&
                              item.SubType_Name !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Auction For :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {item.SubType_Name}
                                  </Text>
                                </View>
                              ) : null}
                              {item.DistrictName !== '' &&
                              item.DistrictName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    District Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {item.DistrictName}
                                  </Text>
                                </View>
                              ) : null}
                              {item.TalukaName !== '' &&
                              item.TalukaName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Taluka Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {item.TalukaName}
                                  </Text>
                                </View>
                              ) : null}
                              {item.VillageName !== '' &&
                              item.VillageName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Village Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {item.VillageName}
                                  </Text>
                                </View>
                              ) : null}

                              {/* {item.entry_date !== '' &&
                              item.entry_date !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Entry Date :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {formatDate(item.entry_date)}
                                  </Text>
                                </View>
                              ) : null}
                              {item.startDate !== '' &&
                              item.startDate !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Start Date :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {formatDate(item.startDate)}
                                  </Text>
                                </View>
                              ) : null}
                              {item.endDate !== '' && item.endDate !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>End Date :</Text>
                                  <Text style={styles.valuec}>
                                    {' '}
                                    {formatDate(item.endDate)}
                                  </Text>
                                </View>
                              ) : null} */}
                            </View>
                          </View>
                          <View
                            style={{
                              width: '90%',
                              height: 40,
                              marginLeft: 12,
                              marginTop: 10,
                              textAlign: 'center',
                              // flexDirection: 'row',
                            }}
                          >
                            {/* <TouchableOpacity
                              style={{
                                marginLeft: 10,
                                marginTop: 13,
                                marginLeft: 20,
                                marginRight: 5,
                              }}
                              onPress={() => {
                                setId(item.UserSubscriptionMainID);
                                setModalVisible(true);
                              }}>
                              Replace the icon component below with your actual delete icon component
                              <AntDesign name="delete" size={20} color="red" />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                              style={{
                                marginTop: 3,
                                marginLeft: 'auto',
                                marginRight: -15,
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
                                navigation.navigate('EditAuctionService', {
                                  SubscriptionID: item.UserSubscriptionMainID,
                                  StartDate: item.startDate,
                                  EndDate: item.endDate,
                                  ActionFora: item.ActionFor,
                                  SubType_Name: item.SubType_Name,
                                  VillageName: item.VillageName,
                                  TalukaName: item.TalukaName,
                                  DistrictName: item.DistrictName,
                                  DistrictID: item.DistrictID,
                                  TalukaID: item.TalukaID,
                                  VillageID: item.VillageID,
                                  State: 'Gujarat',
                                  Service_Sub_Type_ID: item.Service_Sub_Type_ID,
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
        {/* </ScrollView> */}
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

  container: {
    flex: 1,
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
  containera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  Divider: {
    width: '100%',
    height: 2,
    marginTop: 0.2,
    marginBottom: 0.2,
  },
  containerb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
    marginTop: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  value: {
    fontWeight: 'normal',
  },
  columnb: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    width: '48%',
    marginTop: 12,
  },
  labelb: {
    fontWeight: 'bold',
    width: '80%',
    fontSize: 14,
  },
  valueb: {
    fontWeight: 'normal',
    width: '80%',
  },
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
    width: '70%',
  },
  rowa: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorg: {
    marginLeft: 10,
    fontWeight: 'normal',
    color: '#64c464',
  },
  colorr: {
    marginLeft: 10,
    fontWeight: 'normal',
    color: '#c31f1f',
  },
  Divider: {
    height: 2,
    marginTop: 12,
    marginBottom: 5,
    width: '100%',
  },
  cardContainer: {
    width: '80%',
    borderRadius: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  pendingStatus: {
    color: '#ff9800',
    fontWeight: 'bold',
    marginTop: 5,
  },
  successfulStatus: {
    color: '#4caf50',
    fontWeight: 'bold',
    marginTop: 5,
  },
  progressBar: {
    marginTop: 10,
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
  radioGroup: {
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 60,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    height: 30,
    backgroundColor: '#ff4500',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});
export default LandRecord;

// // /**
// //  * Jaher Notice React Native App
// //  **/

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   FlatList,
//   Alert,
//   ActivityIndicator,
//   SafeAreaView,
//   RefreshControl,
//   LogBox,
//   Appearance,
//   StatusBar,
// } from 'react-native';
// // import Jahernoticelog from '../../../Imeges/Jahernotice_logo.png';
// import {Card, Divider, Button} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Logo from '../../Imeges/jnlogo.png';
// import auctiona from '../../Imeges/i-auctiona.png';
// import {
//   Orientation,
//   OrientationLocker,
//   PORTRAIT,
//   LANDSCAPE,
// } from 'react-native-orientation-locker';

// const PropertyToDistrict = ({route, navigation}) => {
//   // Ignore log notification by message
//   LogBox.ignoreLogs(['Warning: ...']);
//   //Ignore all log notifications
//   LogBox.ignoreAllLogs();
//   console.disableYellowBox = true;

//   const [theme, setTheme] = useState('');

//   useEffect(() => {
//     const getColorScheme = () => {
//       const colorScheme = Appearance.getColorScheme();
//       if (colorScheme === 'dark') {
//         setTheme('DARK');
//       } else {
//         setTheme('LIGHT');
//       }
//     };
//     getColorScheme(); // Call the function immediately
//     const listener = Appearance.addChangeListener(getColorScheme);
//     return () => {
//       listener.remove(); // Remove the change listener on component unmount
//     };
//   }, []);

//   const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

//   return (
//     <>
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
//         }}>
//         <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
//         <OrientationLocker
//           orientation={PORTRAIT}
//           onChange={orientation => console.log('onChange', orientation)}
//           onDeviceChange={orientation =>
//             console.log('onDeviceChange', orientation)
//           }
//         />
//         <View
//           style={{
//             ...styles.scrollView,
//             backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
//           }}>
//           <View
//             style={{
//               ...styles.Containerhend,
//               backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
//             }}>
//             <Card
//               style={{
//                 marginTop: 15,
//                 marginBottom: 10,
//                 backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#343a40',
//               }}>
//               <View
//                 style={{
//                   backgroundColor: theme === 'LIGHT' ? '#f5f5f5' : '#484c54',
//                   flexDirection: 'row',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: 'bold',
//                     marginLeft: 20,
//                     color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                   }}>
//                   Village Name
//                 </Text>
//                 <Text
//                   style={{
//                     textAlign: 'right',
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                     marginLeft: 'auto',
//                     marginRight: 20,
//                     color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                   }}>
//                   Publish Date
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   ...styles.Container,
//                   backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#343a40',
//                 }}>
//                 <Image source={auctiona} style={styles.Logo} />
//                 <View
//                   style={{
//                     marginBottom: 14,
//                   }}>
//                   <View>
//                     {/* <Text
//                             style={{
//                               textAlign: 'right',
//                               fontSize: 18,
//                               fontWeight: 'bold',
//                               marginRight: 20,
//                               marginTop: 10,
//                             }}>
//                             {item.publish_date}
//                           </Text> */}
//                   </View>
//                   <View
//                     style={{
//                       ...styles.Containera,
//                       backgroundColor:
//                         theme === 'LIGHT' ? '#ffffff' : '#343a40',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           ...styles.num,
//                           color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                         }}>
//                         SURVEY : <Text style={styles.numt}>22</Text>
//                       </Text>
//                     </View>
//                     <Divider style={{height: 2}} />
//                     <View>
//                       <Text
//                         style={{
//                           ...styles.num,
//                           color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                         }}>
//                         TP : <Text style={styles.numt}>11</Text>
//                       </Text>
//                     </View>
//                     <Divider style={{height: 2}} />
//                     <View>
//                       <Text
//                         style={{
//                           ...styles.num,
//                           color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                         }}>
//                         FP : <Text style={styles.numt}>11</Text>
//                       </Text>
//                     </View>
//                     <Divider style={{height: 2}} />
//                     <View>
//                       <Text
//                         style={{
//                           ...styles.num,
//                           color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                         }}>
//                         Building No. : <Text style={styles.numt}>10</Text>
//                       </Text>
//                     </View>
//                     <Divider style={{height: 2}} />
//                   </View>
//                   <View style={styles.heding}>
//                     <Text
//                       style={{
//                         marginBottom: 5,
//                         fontWeight: 'bold',
//                         marginTop: 40,
//                         color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                       }}>
//                       New
//                     </Text>
//                     <Divider style={{height: 2}} />
//                     <Text
//                       style={{
//                         marginTop: 10,
//                         fontSize: 12,
//                         fontWeight: 'bold',
//                         marginBottom: 8,
//                         color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                       }}>
//                       SOCIETY / SECTOR / BUNGALOW / BUILDING
//                     </Text>
//                     <View
//                       style={{
//                         ...styles.Containerbotom,
//                         backgroundColor:
//                           theme === 'LIGHT' ? '#ffffff' : '#343a40',
//                       }}>
//                       <View style={styles.bottom}>
//                         <View
//                           style={{
//                             ...styles.View,
//                             borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
//                             backgroundColor:
//                               theme === 'LIGHT' ? '#ffffff' : '#343a40',
//                           }}>
//                           <Text
//                             style={{
//                               fontWeight: 'bold',
//                               color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                             }}
//                             onPress={() =>
//                               navigation.navigate(
//                                 'AuctionAlertServicesViewNotice',
//                               )
//                             }>
//                             VIEW
//                           </Text>
//                         </View>
//                         <View
//                           style={{
//                             ...styles.View,
//                             borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
//                             backgroundColor:
//                               theme === 'LIGHT' ? '#ffffff' : '#343a40',
//                           }}>
//                           <Image
//                             source={Logo}
//                             style={{
//                               fontWeight: 'bold',
//                               marginLeft: 12,
//                               width: 35,
//                               height: 35,
//                             }}
//                           />
//                         </View>
//                         <View style={{justifyContent: 'center'}}>
//                           <Text
//                             style={{
//                               fontWeight: 'bold',
//                               marginLeft: 15,
//                               justifyContent: 'center',
//                               marginTop: -10,
//                               color: theme === 'LIGHT' ? '#000' : '#ffffff',
//                             }}>
//                             notifysource
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </Card>
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   loaderStyle: {
//     marginVertical: 16,
//     alignItems: 'center',
//   },
//   Containerbotom: {
//     height: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     backgroundColor: '#FFF',
//   },
//   View: {
//     borderRightWidth: 1,
//     height: 28,
//     width: 60,
//     backgroundColor: '#FFF',
//     marginBottom: 10,
//     justifyContent: 'center',
//   },
//   Containerhend: {
//     backgroundColor: '#efefef',
//     marginBottom: 5,
//   },
//   Container: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   Containeraa: {
//     width: '100%',
//     backgroundColor: '#efefef',
//     flexDirection: 'row',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   Containera: {
//     width: '85%',
//     backgroundColor: '#ffffff',
//     // flexDirection: 'row',
//     justifyContent: 'space-between',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   Logo: {
//     width: 60,
//     height: 40,
//     marginTop: 60,
//     marginLeft: 20,
//     marginRight: 5,
//   },
//   heding: {
//     marginTop: -20,
//     marginBottom: 15,
//     width: '85%',
//   },
//   num: {
//     justifyContent: 'center',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'left',
//   },
//   numt: {
//     justifyContent: 'center',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'normal',
//     textAlign: 'left',
//   },
//   bottom: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%',
//   },
// });

// export default PropertyToDistrict;
