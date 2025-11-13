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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// // import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

// EditAreaAlert
// EditAreaAlert
const EditAreaAlert = ({ route, navigation }) => {
  const [Dataaa, setDataaa] = useState();
  // console.log('message', Dataaa);
  //
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    setLogoutModalVisible(false);
  };

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('EditAreaAlert');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  const LogoutConfirmationModal = ({
    visible,
    onCancel,
    onLogout,
    show,
    district,
  }) => {
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
                  // setTimeout(() => {
                  navigation.navigate('NoticesDisplay');
                  // }, 100);
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

  useEffect(() => {
    const {
      districta,
      talukaa,
      villagea,
      districtaID,
      talukaaID,
      villageaID,
      id,
      name,
    } = route.params;
    // console.log(
    //   districta,
    //   talukaa,
    //   villagea,
    //   districtaID,
    //   talukaaID,
    //   villageaID,
    //   id,
    // );
    setPlaceholderValue([
      villagea + ',' + ' ' + talukaa + ',' + ' ' + districta,
    ]);
    setSelectedDistrictID(districtaID);
    setSelectedTalukaID(talukaaID);
    setSelectedVillageID(villageaID);
    setDistrictIDa(districtaID);
    setTalukaIDa(talukaaID);
    setVillageIDa(villageaID);

    const formattedName = name.join(', ');
    // Set the formatted name as the placeholder value
    // setPlaceholderValue(formattedName);
    setNamedtv(formattedName);
  }, []);
  const [nameDTV, setNamedtv] = useState();
  console.log(nameDTV);
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

  const [NameDTV, setNameDTV] = useState();
  const [datas, setDatas] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState();
  const [selectedTalukaID, setSelectedTalukaID] = useState();
  const [selectedVillageID, setSelectedVillageID] = useState();
  const [placeholderValue, setPlaceholderValue] = useState(
    'Select Village/PinCode*',
  );
  const [selectedDistrictName, setselectedDistrictName] = useState();
  const [selectedTalukaName, setselectedTalukaName] = useState();
  const [selectedVillageName, setselectedVillageName] = useState();
  const [DistrictIDa, setDistrictIDa] = useState();
  const [TalukaIDa, setTalukaIDa] = useState();
  const [VillageIDa, setVillageIDa] = useState();

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
  //   dataFetch();
  // }, []);

  // const dataFetch = async () => {
  //   try {
  //     let Userid = await AsyncStorage.getItem('UserID');
  //     const response = await fetch(
  //       `https://qaapi.jahernotice.com/api/get/village/taluka/district/WithID/${Userid}`,
  //     );
  //     const result = await response.json();
  //     if (result.data) {
  //       const newArray = result.data.map(item => ({
  //         key: [item.DistrictID, item.TalukaID, item.villageid], // Assuming item is a string or identifier.
  //         value: item.area, // Modify this as needed based on your data structure.
  //       }));
  //       setDatas(newArray);
  //     } else {
  //       console.log('No data received from the API.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  // console.log(datas);

  const [selectedState, setSelectedState] = useState();
  const [datasa, setDatasa] = useState([]);
  const [datasn, setDatasn] = useState([]);
  useEffect(() => {
    setStateId(7);
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
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (Stateid) {
      getSuggestions();
    }
  }, [Stateid]);

  const getSuggestions = useCallback(
    async (q = '') => {
      const filterToken = q.toLowerCase();

      if (typeof q !== 'string' || q.length < 3) {
        setSuggestionsList(null);
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
          setSuggestionsList(null);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestionsList(null);
      } finally {
        setLoading(false);
      }
    },
    [Stateid],
  );

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
    setNamedtv('Select Village/PinCode*');
    setPlaceholderValue('Select Village/PinCode*');
  }, []);
  const handleCrossButtonPress = useCallback(() => {
    onClearPress();
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
    setNamedtv('Select Village/PinCode*');
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

  const AddData = async () => {
    setModalVisible(true);
    // id
    const { id } = route.params;
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
    // console.log(requestData);
    // Make the POST request
    fetch(
      `https://qaapi.jahernotice.com/api2/send/edit/areaalert/request?id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    )
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        // console.log('Response Data:', data);
        if (data.status === 200) {
          // Toast.show({
          //   type: 'success', //  success error or 'error', 'info', 'warning'
          //   text1: `Area Alert Details Edit successfully.`,
          //   position: 'bottom', // 'top' or 'bottom'
          //   visibilityTime: 4000, // ms
          //   autoHide: true,
          //   topOffset: 30,
          //   bottomOffset: 50,
          // });
          // console.log(data.data);
          setModalVisible(false);
          // setTimeout(() => {
          //   navigation.navigate('NoticesDisplay');
          // }, 3000);
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
        }
        if (data.status === 400) {
          // console.log(data.data);
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

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.lable}>Select State Name*</Text>
          <SelectList
            setSelected={selectedValue => {
              // console.log(selectedValue);
              setStateId(selectedValue);
              const dynamicDistrictPlaceholder = 'Select Village/PinCode*';
              setNamedtv(dynamicDistrictPlaceholder);
            }}
            // ref={selectListRef}
            // setSelected={handleSelectChange}
            // setSelected={handleSelect}
            save="key"
            // data={datasa}
            data={datasa.filter(item => item.keya)}
            // placeholder={'Select State Name*'}
            placeholder={selectedState ? selectedState : 'Select State Name*'}
            defaultValue={selectedState ? selectedState : 'Select State Name*'}
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
            // defaultValue={selectedState}
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
          <AutocompleteDropdown
            ref={searchRef}
            controller={controller => {
              dropdownController.current = controller;
            }}
            dataSet={suggestionsList}
            // onChangeText={getSuggestions}
            onChangeText={text => {
              const filteredText = text.replace(
                /[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                '',
              );
              getSuggestions(filteredText);
            }}
            onSelectItem={item => {
              if (item) {
                setSelectedItem(item.id);
                // console.log('Selected item:', item);

                // Add null checks before accessing properties
                setSelectedDistrictID(item.DistrictID || null);
                setSelectedTalukaID(item.TalukaID || null);
                setSelectedVillageID(item.id || null);

                const titleParts = (item.title || '').split(',');
                setselectedVillageName(titleParts[0] || null);
                setselectedTalukaName(titleParts[1] || null);
                setselectedDistrictName(titleParts[2] || null);
              }
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
            onClear={onClearPress}
            onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false}
            textInputProps={{
              placeholder: nameDTV,
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                borderRadius: 5,
                backgroundColor: '#f5f5f5',
                color: 'black',
                borderColor: '#ccc',
                paddingLeft: 18,
                borderWidth: 0.1,
                borderRightWidth: 0,
              },
            }}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: 'center',
            }}
            rightButtons={() => (
              <TouchableOpacity onPress={handleCrossButtonPress}>
                {/* Use an appropriate image or icon for the cross button */}
                <Text style={{ width: 20, height: 20, Color: 'black' }}></Text>
              </TouchableOpacity>
            )}
            inputContainerStyle={{
              backgroundColor: '#f5f5f5',
              borderColor: '#ccc',
              borderRadius: 5,
              borderWidth: 1,
            }}
            suggestionsListContainerStyle={{
              backgroundColor: '#f5f5f5',
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => (
              <Text style={{ color: 'black', padding: 15 }}>{item.title}</Text>
            )}
            inputHeight={50}
            showChevron={false}
            closeOnBlur={false}
          />
          {/* <Text style={styles.lable}>Select Village/PinCode*</Text>
          <SelectList
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
            {/* <TouchableOpacity
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
              }}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity> */}
            {DistrictIDa === selectedDistrictID &&
            TalukaIDa === selectedTalukaID &&
            VillageIDa === selectedVillageID &&
            Stateid === Stateid ? (
              <TouchableOpacity style={styles.buttona}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
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
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            )}
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
              // district={Districtnam}
            />
          </View>
        </View>
      </ScrollView>
      <Toast/>
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
  // modalContent: {
  //   width: 300,
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  container: {
    padding: 20,
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
    marginTop: 15,
  },
  // button: {
  // flex: 1,
  // backgroundColor: '#ff4500',
  // padding: 9,
  // borderRadius: 5,
  // justifyContent: 'center',
  // alignItems: 'center',
  // marginTop: 10,
  // marginLeft: 3,
  // },
  button: {
    backgroundColor: '#ff4500',
    flex: 1,
    backgroundColor: '#ff4500',
    padding: 9,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 3,
  },
  buttona: {
    flex: 1,
    backgroundColor: '#ff4500',
    padding: 9,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 3,
    backgroundColor: '#dcdcdc',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default EditAreaAlert;

// const AddPropertyForm = ({route, navigation}) => {

// export default AddPropertyForm;
