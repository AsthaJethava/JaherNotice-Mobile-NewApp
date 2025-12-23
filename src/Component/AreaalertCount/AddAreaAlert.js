import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// // import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';
// AddAreaAlert
// EditAreaAlert
const AddAreaAlert = ({ route, navigation }) => {
  const [Dataaa, setDataaa] = useState();
  // console.log('message', Dataaa);
  //
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    setLogoutModalVisible(false);
  };

  const LogoutConfirmationModal = ({ visible, onCancel, onLogout, show }) => {
    // const message = Dataaa.length > 0 ? Dataaa[0].message : '';
    // console.log('message==bhola', show);
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalContent,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 15,
              }}
            >
              <AntDesign name="checkcircleo" size={60} color={'#32cd32'} />
            </View>
            <FlatList
              data={show}
              renderItem={({ item, index }) => (
                <>
                  <View style={styles.modalTextaa}>
                    <Text style={styles.modalTexta}>{item.message}</Text>
                  </View>
                </>
              )}
            />
            <View style={styles.textd}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  onLogout, setLogoutModalVisible(false);
                  navigation.navigate('NoticesDisplay');
                }}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  //
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    AddData();
  };

  const handleCancel = () => {
    handleReset();
    setPlaceholderValue();
  };

  const DeleteConfirmationModal = ({ isVisible, onCancel, onDelete }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainera}>
          <View style={styles.modalContenta}>
            <ActivityIndicator size="large" color={'#b83725'} />
          </View>
        </View>
      </Modal>
    );
  };

  const [datas, setDatas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState();
  const [selectedTalukaID, setSelectedTalukaID] = useState();
  const [selectedVillageID, setSelectedVillageID] = useState();
  const [placeholderValue, setPlaceholderValue] =
    useState('Type 3+ letters...');
  const [selectedDistrictName, setselectedDistrictName] = useState();
  const [selectedTalukaName, setselectedTalukaName] = useState();
  const [selectedVillageName, setselectedVillageName] = useState();

  const handleReset = () => {
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setModalVisible(false);
    setPlaceholderValue('Select Village/PinCode*');
  };

  const handleSubmit = () => {
    AddData();
  };

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('AddAreaAlert');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://qaapi.jahernotice.com/api/get/village/taluka/district/WithID/${Userid}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          const newArray = result.data.map(item => ({
            key: [item.DistrictID, item.TalukaID, item.villageid], // Assuming item is a string or identifier.
            value: item.area, // Modify this as needed based on your data structure.
          }));
          setDatas(newArray);
        }
      })
      .catch(error => console.log('error', error));
  };
  // console.log(datas);

  const AddData = async () => {
    setModalVisible(true);
    // Define the JSON data to be sent in the request
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      UserID: Userid,
      DistrictID: selectedDistrictID,
      TalukaID: selectedTalukaID,
      villageid: selectedVillageID,
      districtname: selectedDistrictName,
      Talukaname: selectedTalukaName,
      villagename: selectedVillageName,
    };
    console.log(requestData);

    // Make the POST request
    fetch('https://qaapi.jahernotice.com/api2/send/add/areaalert/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        // console.log('Response Data:', data);
        if (data.status === 200) {
          // console.log(data);
          setModalVisible(false);
          // Toast.show({
          //   type: 'success', //  success error or 'error', 'info', 'warning'
          //   text1: `Add New Area Alert Successfully.`,
          //   position: 'bottom', // 'top' or 'bottom'
          //   visibilityTime: 4000, // ms
          //   autoHide: true,
          //   topOffset: 30,
          //   bottomOffset: 50,
          // });
          setLogoutModalVisible(true);

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
          // setDatashiw(mess);
          setDataaa(mess);
          // Message
          // setTimeout(() => {
          //   navigation.navigate('NoticesDisplay');
          // }, 3000);
        }
        if (data.status === 400) {
          // console.log(data);
          setLogoutModalVisible(true);

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
          // setDatashiw(mess);
          setDataaa(mess);
          setModalVisible(false);
          Toast.show({
            type: 'error', //  success error or 'error', 'info', 'warning'
            text1: `${data.Message}`,
            position: 'bottom', // 'top' or 'bottom'
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

  const [datasa, setDatasa] = useState([]);
  const [datasn, setDatasn] = useState([]);
  const [selectedState, setSelectedState] = useState();
  useEffect(() => {
    setStateId(7);
    // setSearch('ahm');
    fetch('https://qaapi.jahernotice.com/api2/State')
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return { key: item.id, keya: item.id === 7, value: item.statename };
        });
        newArray.forEach(item => {
          if (item.keya) {
            // console.log();
            setSelectedState(item.value);
          }
        });

        setDatasa(newArray);
        setDatasn(newArray);
      })
      .catch(error => console.log('error=State', error));
  }, []);

  const [Stateid, setStateId] = useState();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [villageQuery, setVillageQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);
  // console.log('Stateid', Stateid);

  const getSuggestions = useCallback(
    async (q = '') => {
      const filterToken = q.toLowerCase();

      if (typeof q !== 'string' || q.length < 3) {
        setSuggestionsList([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://qaapi.jahernotice.com/api2/get/village/taluka/district/${Stateid}?searchKey=${q}`,
        );
        const data = await response.json();

        if (data && data.status === 200) {
          const suggestions = data.data.map(item => ({
            id: item.villageid,
            title: item.area,
            DistrictID: item.DistrictID,
            TalukaID: item.TalukaID,
          }));
          setSuggestionsList(suggestions);
        } else {
          setSuggestionsList([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestionsList([]);
      } finally {
        setLoading(false);
      }
    },
    [Stateid],
  );
  const handleCrossButtonPress = useCallback(() => {
    onClearPress();
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
  }, []);
  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => {
    // Handle any actions on suggestions list open/close
  }, []);
  // console.log('selectedDistrictID', selectedDistrictID);
  // console.log('selectedTalukaID', selectedTalukaID);
  // console.log('selectedVillageID', selectedVillageID);
  // console.log('selectedDistrictName', selectedDistrictName);
  // console.log('selectedTalukaName', selectedTalukaName);
  // console.log('selectedVillageName', selectedVillageName);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.lable}>Select State Name*</Text>

          <SelectList
            setSelected={selectedValue => {
              console.log(selectedValue);
              setStateId(selectedValue);
              const dynamicDistrictPlaceholder = 'Select Village/PinCode*';
              setPlaceholderValue(dynamicDistrictPlaceholder);
            }}
            save="key"
            // data={datasa}
            data={datasa.filter(item => item.keya)}
            // placeholder={'Select State Name*'}
            defaultValue={selectedState ? selectedState : 'Select State Name*'}
            placeholder={selectedState ? selectedState : 'Select State Name*'}
            boxStyles={{
              marginBottom: 10,
              borderRadius: 5,
              borderColor: '#c0c0c0',
            }}
            dropdownStyles={{
              backgroundColor: '#f8f8ff',
              borderColor: '#c0c0c0',
            }}
            // defaultValue={'Select State Name*'}
            // defaultValue={'Gujarat'}
            onSearch={search => {
              if (search.length >= 3) {
                return datasa.filter(item =>
                  item.toLowerCase().includes(search.toLowerCase()),
                );
              } else {
                return [];
              }
            }}
          />
          <Text style={styles.lable}>Select Village/PinCode*</Text>
          <View style={{ position: 'relative', zIndex: 10 }}>
            <TextInput
              style={styles.input}
              placeholder={placeholderValue}
              placeholderTextColor="#000"
              value={villageQuery}
              onChangeText={text => {
                const filteredText = text.replace(
                  /[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                  '',
                );
                setVillageQuery(filteredText);
                getSuggestions(filteredText);
                setShowSuggestions(filteredText.length >= 3);
              }}
            />
            {showSuggestions && suggestionsList.length > 0 && (
              <View style={styles.suggestionBox}>
                <FlatList
                  data={suggestionsList}
                  keyExtractor={item => String(item.id)}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => {
                        setVillageQuery(item.title);
                        setShowSuggestions(false);

                        setSelectedDistrictID(item.DistrictID);
                        setSelectedTalukaID(item.TalukaID);
                        setSelectedVillageID(item.id);

                        const parts = item.title.split(',');
                        setselectedVillageName(parts[0] || null);
                        setselectedTalukaName(parts[1] || null);
                        setselectedDistrictName(parts[2] || null);
                      }}
                    >
                      <Text style={{ color: '#000' }}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
          {/* <SelectList
            setSelected={selectedValue => {
              // Update the appropriate state variable based on the selected value
              setSelectedDistrictID(selectedValue[0]);
              setSelectedTalukaID(selectedValue[1]);
              setSelectedVillageID(selectedValue[2]);
              // Log the selected value
              // console.log('Selected Value:', selectedValue.value);
            }}
            save="key"
            data={datas}
            placeholder={placeholderValue}
            boxStyles={{
              //   marginTop: 10,
              marginBottom: 10,
              borderRadius: 5,
              borderColor: '#ccc',
            }}
            dropdownStyles={{backgroundColor: '#ffffff', borderColor: '#ccc'}}
            defaultValue={placeholderValue}
            onSearch={search => {
              if (search.length >= 3) {
                return datas.filter(item =>
                  item.value.toLowerCase().includes(search.toLowerCase()),
                );
              } else {
                return [];
              }
            }}
          /> */}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // console.log(selectedDistrictID);
                if (!selectedDistrictID) {
                  Toast.show({
                    type: 'error', //  success error or 'error', 'info', 'warning'
                    text1: `Please Select Village/PinCode*`,
                    position: 'bottom', // 'top' or 'bottom'
                    visibilityTime: 4000, // ms
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 50,
                  });
                } else {
                  handleSubmit();
                }
              }}
            >
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

            <DeleteConfirmationModal
              isVisible={modalVisible}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
            <LogoutConfirmationModal
              visible={isLogoutModalVisible}
              onCancel={handleCancel}
              onLogout={handleLogout}
              show={Dataaa}
            />
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  modalContenta: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTexta: {
    fontSize: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextaa: {
    // fontSize: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: '#b83725',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  lable: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 5,
  },
  suggestionBox: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 9999,
    elevation: 15,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  // modalContent: {
  //   width: 300,
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  container: {
    padding: 20,
    flex: 1,
    // height: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#ff4500',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // container: {
  //   padding: 16,
  // },
  // label: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // buttonsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   margin: 16,
  // },
  // button: {
  //   backgroundColor: '#32cd32',
  //   padding: 16,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   flex: 1,
  //   margin: 8,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   width: '80%',
  //   alignItems: 'center',
  // },
  // modalIconContainer: {
  //   marginBottom: 20,
  //   alignItems: 'center',
  // },
  // modalTextContainer: {
  //   marginBottom: 20,
  // },
  // modalText: {
  //   fontSize: 16,
  //   textAlign: 'center',
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   width: '100%',
  // },
  // logoutButton: {
  //   backgroundColor: '#32cd32',
  //   padding: 10,
  //   borderRadius: 8,
  // },
  // logoutButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
});

export default AddAreaAlert;

// const AddPropertyForm = ({route, navigation}) => {

// export default AddPropertyForm;
