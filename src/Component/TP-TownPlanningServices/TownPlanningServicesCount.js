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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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
  const [modalVisiblea, setModalVisiblea] = useState(false);

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
            {/*  */}
            <Text style={styles.modalText}>
              Are you sure You want Deactivate this TP ?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const handleDeletea = () => {
    setModalVisiblea(false);
    deleteDataac();
    setId([]);
  };

  const handleCancela = () => {
    setModalVisiblea(false);
    setId([]);
  };
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('TownPlanningServicesCount');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const DeleteConfirmationModala = ({ isVisiblea, onCancela, onDeletea }) => {
    return (
      <Modal visible={isVisiblea} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign
              name="exclamationcircleo"
              size={50}
              color="#ffd700"
              style={{ marginTop: 10, marginBottom: 10 }}
            />
            <Text style={styles.modalText}>
              Are you sure You want Activate this TP ?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancela}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onDeletea}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  //
  const [StateeID, setStateeID] = useState();
  const [Data, setData] = useState([]); // Initialize Data state
  const [listData, setListData] = useState();
  const [isLoding, setIsLoding] = useState();
  const [dataa, setDataa] = useState([]);
  const [datan, setDatan] = useState();
  const [isActivea, setisActive] = useState();
  const [Id, setId] = useState();
  const [isActiveaac, setisActiveac] = useState('0');
  const [isActiveac, setisActivec] = useState('0');
  const [isActiveaae, setisActivea] = useState('1');
  const [Service_Sub_Type_IDa, setService_Sub_Type_IDa] = useState();
  //

  // const API_URL = 'https://qaapi.jahernotice.com/api/tp/deactive';
  const deleteData = async () => {
    const requestData = {
      UserSubscriptionMainID: Id,
      isActive: isActiveac,
    };
    // console.log(requestData);
    fetch(`https://qaapi.jahernotice.com/api/tp/deactive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.status);
        if (result.status == 200) {
          listDataa();
          return Toast.show({
            type: 'success',
            text1: `TP Alert Deactivate Successfully.`,
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 20,
            bottomOffset: 50,
          });
        }
        if (result.status == 400) {
          return Toast.show({
            type: 'error',
            text1: `Insufficient Subscription.`,
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 20,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => console.log('error==data', error));
  };

  // const API_URLa = 'https://qaapi.jahernotice.com/api/tp/isactive';
  const deleteDataac = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      UserSubscriptionMainID: Id,
      isActive: isActiveaae,
      UserID: Userid,
      Service_Sub_Type_ID: Service_Sub_Type_IDa,
    };
    // console.log(requestData);
    fetch(`https://qaapi.jahernotice.com/api/tp/isactive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.status);
        if (result.status == 200) {
          listDataa();
          return Toast.show({
            type: 'success',
            text1: `TP Alert Activate Successfully.`,
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 20,
            bottomOffset: 50,
          });
        }
        if (result.status == 400) {
          // console.log(result);
          return Toast.show({
            type: 'error',
            text1: `${result.Message}`,
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 20,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => console.log('error==data', error));
  };

  useEffect(() => {
    listDataa();
  }, []);
  //   console.log('UseEfrct==data', StateeID);

  const [selectedValue, setSelectedValue] = useState(null);
  //   console.log(selectedValue);

  const Next = () => {
    navigation.navigate('LandRecordForm');
    // console.log('dsaraaa =>', selectedValue);
  };

  // const data = () => {
  //   setDataa([]);
  //   listDataa();
  // };

  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  const listDataa = async () => {
    setIsLoding(true);
    let Userid = await AsyncStorage.getItem('UserID');
    // console.log(Userid);
    fetch(
      `https://qaapi.jahernotice.com/api/get/TP/list/byUserID/${Userid}?PageSize=500&PageNo=1`,
    )
      .then(response => response.json())
      .then(data => {
        // setListData(data.data);
        if (data.status === 200) {
          if (data.data.length === 0) {
            setDatan(data);
            // setDataa([]);
            // console.log(data);
            setIsHidden(true);
            setIsLoding(false);
            setIsHiddend(false);
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
  // console.log('Data', dataa);

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
        <View
          style={{
            ...styles.rowContainer,
          }}
          onPress={() => navigation.navigate('AddTPServices')}
        >
          <Text style={styles.addNewPropertyText}>Add TP Service</Text>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => navigation.navigate('AddTPServices')}
          >
            {/* Replace the icon component below with your actual edit icon component */}
            <MaterialIcons name="add-business" size={25} color="#ff4500" />
          </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
        <View style={styles.radioGroup}>
          {isLoding ? (
            <ActivityIndicator
              size="large"
              color={'#b83725'}
              style={{
                marginTop: 50,
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
                            // width: '26%',
                            // height: '30%',
                            // marginTop: 160,
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
                                {item.ServiceID == 11 ? (
                                  <>
                                    {item.ServiceID !== '' &&
                                    item.ServiceID !== null ? (
                                      <View style={styles.rowc}>
                                        <Text style={styles.labelc}>
                                          Service Name :
                                        </Text>
                                        <Text style={styles.valuec}>
                                          Existing TP
                                        </Text>
                                      </View>
                                    ) : null}
                                  </>
                                ) : (
                                  <>
                                    {item.ServiceID !== '' &&
                                    item.ServiceID !== null ? (
                                      <View style={styles.rowca}>
                                        <Text style={styles.labelc}>
                                          Service Name :
                                        </Text>
                                        <Text style={styles.valuec}>
                                          Upcoming TP
                                        </Text>
                                      </View>
                                    ) : null}
                                  </>
                                )}
                                {item.SubType_Name !== '' &&
                                item.SubType_Name !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelca}>
                                      Sub Type Name :{' '}
                                    </Text>
                                    <Text style={styles.valueca}>
                                      {item.SubType_Name}
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
                                      {item.VillageName}
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
                                      {item.TalukaName}
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
                                      {item.DistrictName}
                                    </Text>
                                  </View>
                                ) : null}
                                {item.TPNo !== '' && item.TPNo !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>TP No. :</Text>
                                    <Text style={styles.valuec}>
                                      {item.TPNo}
                                    </Text>
                                  </View>
                                ) : null}
                                {/* {item.startDate !== '' &&
                                item.startDate !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>
                                      Start Date :
                                    </Text>
                                    <Text style={styles.valuec}>
                                      {formatDate(item.startDate)}
                                    </Text>
                                  </View>
                                ) : null}
                                {item.endDate !== '' &&
                                item.endDate !== null ? (
                                  <View style={styles.rowc}>
                                    <Text style={styles.labelc}>
                                      End Date :
                                    </Text>
                                    <Text style={styles.valuec}>
                                      {formatDate(item.endDate)}
                                    </Text>
                                  </View>
                                ) : null} */}
                                {/* <View style={styles.rowc}>
                                  <Text style={styles.labelc}>Status :</Text>
                                  <Text style={styles.valuec}>
                                    {item.isActive === 1
                                      ? 'Active'
                                      : 'Inactive'}
                                  </Text>
                                </View> */}
                              </View>
                            </View>
                            <View
                              style={{
                                width: '90%',
                                height: 40,
                                marginLeft: -30,
                                marginTop: 10,
                                textAlign: 'center',
                                flexDirection: 'row',
                              }}
                            >
                              {/* {item.isActive === 1 ? (
                                <>
                                  <TouchableOpacity
                                    style={{
                                      marginTop: 3,
                                      marginLeft: 'auto',
                                      marginRight: '-45%',
                                      borderRadius: 20,
                                      width: '30%',
                                      borderWidth: 1,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      height: 35,
                                      borderColor: 'red',
                                      marginBottom: 5,
                                    }}
                                    onPress={() => {
                                      setId(item.UserSubscriptionMainID);
                                      setisActiveac(item.isActive);

                                      setModalVisible(true);
                                    }}>
                                    Replace the icon component below with your actual delete icon component
                                    <FontAwesome
                                      name="ban"
                                      size={20}
                                      color="red"
                                    />
                                  </TouchableOpacity>
                                </>
                              ) : (
                                <>
                                  <TouchableOpacity
                                    style={{
                                      marginTop: 3,
                                      marginLeft: 'auto',
                                      marginRight: '-45%',
                                      borderRadius: 20,
                                      width: '30%',
                                      borderWidth: 1,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      height: 35,
                                      borderColor: 'red',
                                      marginBottom: 5,
                                    }}
                                    onPress={() => {
                                      setId(item.UserSubscriptionMainID);
                                      setisActiveac(item.isActive);
                                      setService_Sub_Type_IDa(
                                        item.Service_Sub_Type_ID,
                                      );
                                      setModalVisiblea(true);
                                    }}>
                                    Replace the icon component below with your actual delete icon component
                                    <FontAwesome
                                      name="recycle"
                                      size={20}
                                      color="red"
                                    />
                                  </TouchableOpacity>
                                </>
                              )} */}

                              <TouchableOpacity
                                style={{
                                  marginTop: 3,
                                  marginLeft: 'auto',
                                  marginRight: -50,
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
                                  navigation.navigate('EditTPServices', {
                                    SubscriptionID: item.UserSubscriptionMainID,
                                    DistrictIDID: item.DistrictID,
                                    TalukaIDID: item.TalukaID,
                                    VillageIDID: item.VillageID,
                                    SubType_NameID: item.Service_Sub_Type_ID,
                                    ServiceNameID: item.ServiceID,
                                    TPNom: item.TPNo,
                                    DistrictID: item.DistrictName,
                                    TalukaID: item.TalukaName,
                                    VillageID: item.VillageName,
                                    StartDate: item.startDate,
                                    EndDate: item.endDate,
                                    SubType_Name: item.SubType_Name,
                                    Status: item.isActive,
                                    ServiceName:
                                      item.ServiceID == 11
                                        ? 'Existing TP'
                                        : ' Upcoming TP',
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
                              <DeleteConfirmationModala
                                isVisiblea={modalVisiblea}
                                onDeletea={handleDeletea}
                                onCancela={handleCancela}
                              />
                            </View>

                            {/*  Status Pending */}
                            {/* "Status": "Received", */}
                          </Card.Content>
                        </Card>
                      </>
                    </>
                  )}
                />
              ) : null}
            </>
          )}
          <Toast/>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  rowca: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  labelca: {
    fontWeight: 'bold',
    width: '40%',
    fontSize: 14,
  },
  valueca: {
    fontWeight: 'normal',
    width: '50%',
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
