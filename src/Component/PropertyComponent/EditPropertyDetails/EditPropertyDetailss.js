import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const EditPropertyDetails = ({ route, navigation }) => {
  const [Dataaa, setDataaa] = useState();
  // console.log('message', Dataaa);
  //
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    setLogoutModalVisible(false);
  };

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
                  setTimeout(() => {
                    navigation.navigate('Ahmedabad', {
                      Districtname: district,
                    });
                  }, 100);
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

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    handleSave();
  };
  const handleCancel = () => {
    setPlaceholderValue();
  };
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('EditPropertyDetails');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const DeleteConfirmationModal = ({ isVisible, onDelete }) => {
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

  // useEffect(() => {
  //   if (Stateid) {
  //     dataFetch(Stateid);
  //   }
  // }, [Stateid]);
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
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [villageQuery, setVillageQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (Stateid) {
      getSuggestions();
    }
  }, [Stateid]);

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

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
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
    setPlaceholderValue('Select Village/PinCode*');
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

  // console.log(datas);

  const [SubscriptionId, setSubscriptionId] = useState();
  const [Districtnam, setDistrictnam] = useState('');
  const [DistrictId, setDistrictId] = useState('');
  const [VillageId, setVillageId] = useState('');
  const [TalukaId, setTalukaId] = useState('');
  const [Districta, setDistrict] = useState();
  const [surveyNumber, setSurveyNumber] = useState();
  const [tpNumber, setTpNumber] = useState();
  const [fpNumber, setFpNumber] = useState();
  const [buildingNumber, setBuildingNumber] = useState();
  const [selectedSociety, setSelectedSociety] = useState();
  const [selectedDistrictID, setSelectedDistrictID] = useState();
  const [selectedTalukaID, setSelectedTalukaID] = useState();
  const [selectedVillageID, setSelectedVillageID] = useState();
  const [BuildingNamea, setBuildingNamea] = useState();
  const [SocietyNamea, setSocietyNamea] = useState();
  const [selectedDistrictName, setselectedDistrictName] = useState();
  const [selectedTalukaName, setselectedTalukaName] = useState();
  const [selectedVillageName, setselectedVillageName] = useState();
  const [placeholderValue, setPlaceholderValue] = useState(
    'Select Village/PinCode*',
  );

  const [DistrictIDa, setDistrictIDa] = useState();
  const [VillageIDa, setVillageIDa] = useState();
  const [TalukaIDa, setTalukaIDa] = useState();
  const [Surveynoa, setSurveynoa] = useState();
  const [Tpnoa, setTpnoa] = useState();
  const [Fpnoa, setFpnoa] = useState();
  const [Buildingnoa, setBuildingnoa] = useState();
  const [Societynamea, setSocietynamea] = useState();

  const isButtonEnabled = () => {
    return (
      DistrictIDa === selectedDistrictID &&
      TalukaIDa === selectedTalukaID &&
      VillageIDa === selectedVillageID &&
      Surveynoa === surveyNumber &&
      Tpnoa === tpNumber &&
      Fpnoa === fpNumber &&
      Buildingnoa === buildingNumber &&
      Societynamea === selectedSociety
    );
  };

  useEffect(() => {
    const {
      DistrictID,
      VillageID,
      TalukaID,
      Surveyno,
      Tpno,
      Fpno,
      Buildingno,
      Societyname,
      Districtnam,
      SubscriptionID,
      dista,
      name,
      districtnamea,
      talukanamea,
      villagenamea,
    } = route.params;
    //
    setDistrictIDa(DistrictID);
    setVillageIDa(VillageID);
    setTalukaIDa(TalukaID);
    setSurveynoa(Surveyno);
    setTpnoa(Tpno);
    setFpnoa(Fpno);
    setBuildingnoa(Buildingno);
    setSocietynamea(Societyname);
    setselectedDistrictName(districtnamea);
    setselectedTalukaName(talukanamea);
    setselectedVillageName(villagenamea);
    //
    setSurveyNumber(Surveyno);
    setTpNumber(Tpno);
    setFpNumber(Fpno);
    setBuildingNumber(Buildingno);
    setSelectedSociety(Societyname);
    setSubscriptionId(SubscriptionID);
    setDistrictnam(Districtnam);
    setDistrictId(DistrictID);
    setVillageId(VillageID);
    setTalukaId(TalukaID);
    setDistrict(dista);
    setSelectedDistrictID(DistrictID);
    setSelectedTalukaID(TalukaID);
    setSelectedVillageID(VillageID);
    const [villageName, talukaName, districtName] = name;

    const formattedName = name.join(', ');
    // Set the formatted name as the placeholder value
    setPlaceholderValue(formattedName);
  }, []);

  const handleSave = async () => {
    setModalVisible(true);
    // Define the JSON data to be sent in the request
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      DistrictID: selectedDistrictID,
      villageid: selectedVillageID,
      TalukaID: selectedTalukaID,
      SurveyNo: surveyNumber,
      TPNo: tpNumber,
      FPNo: fpNumber,
      Society: SocietyNamea,
      BuildingNo: buildingNumber,
      UserID: Userid,
      SocietyName: selectedSociety,
      districtname: selectedDistrictName,
      Talukaname: selectedTalukaName,
      villagename: selectedVillageName,
    };
    fetch(
      `https://qaapi.jahernotice.com/api2/send/edit/propertyprotection/request?id=${SubscriptionId}`,
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
          setModalVisible(false);

          setLogoutModalVisible(true);
          // setTimeout(() => {
          //   navigation.navigate('14 PROTECTED PROPERTIES');
          // }, 3000);
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
          // console.log(data);
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

  // const [Stateid, setStateId] = useState();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.lable}>Select State Name*</Text>
        {/* <SelectList
          setSelected={selectedValue => {
            console.log(selectedValue);
            setStateId(selectedValue);
            // const dynamicDistrictPlaceholder = 'Select State Name*';
            // setPlaceholderValue(dynamicDistrictPlaceholder);
          }}
          save="key"
          // data={datasa}
          data={datasa.filter(item => item.keya)}
          // placeholder={'Select State Name*'}
          placeholder={'Gujarat'}
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
          defaultValue={'Gujarat'}
          onSearch={search => {
            if (search.length >= 3) {
              return datasa.filter(item =>
                item.toLowerCase().includes(search.toLowerCase()),
              );
            } else {
              return [];
            }
          }}
        /> */}

        <SelectList
          setSelected={selectedValue => {
            setStateId(selectedValue);
            const dynamicDistrictPlaceholder = 'Select Village/PinCode*';
            setPlaceholderValue(dynamicDistrictPlaceholder);
          }}
          // ref={selectListRef}
          // setSelected={handleSelectChange}
          // setSelected={handleSelect}
          save="key"
          data={datasa.filter(item => item.keya)}
          // placeholder={'Select State Name*'}
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
          defaultValue={selectedState ? selectedState : 'Select State Name*'}
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
        <View style={{ position: 'relative' }}>
          <TextInput
            style={styles.input}
            placeholder={placeholderValue}
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
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      setVillageQuery(item.title);
                      setShowSuggestions(false);

                      setSelectedDistrictID(item.DistrictID || null);
                      setSelectedTalukaID(item.TalukaID || null);
                      setSelectedVillageID(item.id || null);

                      const titleParts = (item.title || '').split(',');
                      setselectedVillageName(titleParts[0] || null);
                      setselectedTalukaName(titleParts[1] || null);
                      setselectedDistrictName(titleParts[2] || null);
                    }}
                  >
                    <Text style={{ color: 'black' }}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <Text style={styles.lable}>Enter Survey Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Survey Number"
          // keyboardType={'numeric'}
          value={surveyNumber}
          onChangeText={text => {
            // Use a regex to filter input to only allow numbers, ',' and '.'
            const filteredText = text.replace(
              /[^0-9A-Za-z/.+\-]|(?<=\d)\s(?!ku(,|$))/g,
              '',
            );
            setSurveyNumber(filteredText);
          }}
        />
        <Text style={styles.lable}>Enter TP Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter TP Number"
          // keyboardType={'numeric'}
          value={tpNumber}
          onChangeText={text => {
            const filteredTextt = text.replace(
              /[^0-9A-Za-z/.+\-]|(?<=\d)\s(?!ku(,|$))/g,
              '',
            );
            setTpNumber(filteredTextt);
          }}
        />
        <Text style={styles.lable}>Enter FP Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter FP Number"
          // keyboardType={'numeric'}
          value={fpNumber}
          onChangeText={text => {
            const filteredTextf = text.replace(
              /[^0-9A-Za-z/.+\-]|(?<=\d)\s(?!ku(,|$))/g,
              '',
            );
            setFpNumber(filteredTextf);
          }}
        />
        <Text style={styles.lable}>Enter Building Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Building Number"
          // keyboardType={'numeric'}
          value={buildingNumber}
          onChangeText={text => {
            const filteredTextb = text.replace(
              /[^0-9A-Za-z/.+\-]|(?<=\d)\s(?!ku(,|$))/g,
              '',
            );
            setBuildingNumber(filteredTextb);
          }}
        />
        <Text style={styles.lable}>Enter Society Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Society Name"
          value={selectedSociety}
          onChangeText={text => {
            const filteredTexts = text.replace(
              /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
              '',
            );
            setSelectedSociety(filteredTexts);
          }}
        />
        {/* surveyNumber
tpNumber
fpNumber
buildingNumber
selectedSociety 
selectedDistrictID
selectedTalukaID
selectedVillageID*/}
        {DistrictIDa === selectedDistrictID &&
        TalukaIDa === selectedTalukaID &&
        VillageIDa === selectedVillageID &&
        Surveynoa === surveyNumber &&
        Tpnoa === tpNumber &&
        Fpnoa === fpNumber &&
        Buildingnoa === buildingNumber &&
        Societynamea === selectedSociety ? (
          <TouchableOpacity style={styles.buttona}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!selectedDistrictID) {
                Toast.show({
                  type: 'error',
                  text1: `Please Select Village/PinCode`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else if (
                !surveyNumber &&
                !tpNumber &&
                !fpNumber &&
                !buildingNumber &&
                !selectedSociety
              ) {
                Toast.show({
                  type: 'error',
                  text1: `Please Enter Survey Number or TP and FP`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else if (
                tpNumber &&
                !surveyNumber &&
                !fpNumber &&
                !buildingNumber &&
                !selectedSociety
              ) {
                Toast.show({
                  type: 'error',
                  text1: `Please Enter Survey Number or FP or BuildingNo and SocietyName`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else if (
                fpNumber &&
                !surveyNumber &&
                !tpNumber &&
                !buildingNumber &&
                !selectedSociety
              ) {
                Toast.show({
                  type: 'error',
                  text1: `Please Enter Survey Number or TPNo or BuildingNo and SocietyName`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else if (buildingNumber && !selectedSociety) {
                Toast.show({
                  type: 'error',
                  text1: `SocietyName is mandatory with BuildingNo`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else if (selectedSociety && !buildingNumber) {
                Toast.show({
                  type: 'error',
                  text1: `BuildingNo is mandatory with SocietyName`,
                  position: 'bottom',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 50,
                });
              } else {
                handleSave();
              }
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        )}
        <DeleteConfirmationModal
          isVisible={modalVisible}
          onDelete={handleDelete}
        />
        <LogoutConfirmationModal
          visible={isLogoutModalVisible}
          onCancel={handleCancel}
          onLogout={handleLogout}
          show={Dataaa}
          district={Districtnam}
        />
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  suggestionBox: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
    elevation: 10,
  },

  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
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
    // borderRadius
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  // modalContainer: {
  // flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  // // backgroundColor: 'rgba(0, 0, 0, 0.1)',
  // // elevation: 5,
  // },
  lable: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 5,
  },
  // modalContent: {
  //   width: 300,
  //   // backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    // marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ff4500',
    marginTop: 20,
  },
  buttona: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditPropertyDetails;
