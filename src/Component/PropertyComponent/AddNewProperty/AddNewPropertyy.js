/**
 * Jaher Notice React Native App (Updated Structure)
 */

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

// ✅ Component starts here
const AddPropertyForm = ({ route, navigation }) => {
  const [Dataaa, setDataaa] = useState();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [state, setState] = useState('');
  const [selectsurvey, setSelectSurvey] = useState();
  const [selecttp, setSelectTP] = useState();
  const [selectfp, setSelectFP] = useState();
  const [BuildingNo, setBuildingNo] = useState();
  const [SocietyName, setSocietyName] = useState();

  const [selectedDistrictID, setSelectedDistrictID] = useState();
  const [selectedTalukaID, setSelectedTalukaID] = useState();
  const [selectedVillageID, setSelectedVillageID] = useState();
  const [selectedDistrictName, setselectedDistrictName] = useState();
  const [selectedTalukaName, setselectedTalukaName] = useState();
  const [selectedVillageName, setselectedVillageName] = useState();

  const [selectedState, setSelectedState] = useState();
  const [datasa, setDatasa] = useState([]);
  const [placeholderValue, setPlaceholderValue] =
    useState('Type 3+ letters...');

  const [Stateid, setStateId] = useState();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);
  const [villageQuery, setVillageQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [DataMessage, setDataMessage] = useState([]);

  // ✅ Fetch States on Mount
  useEffect(() => {
    setStateId(7);
    fetch('https://qaapi.jahernotice.com/api2/State')
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => ({
          key: item.id,
          keya: item.id === 7,
          value: item.statename,
        }));
        newArray.forEach(item => {
          if (item.keya) setSelectedState(item.value);
        });
        setDatasa(newArray);
      })
      .catch(error => console.log('error=State', error));
  }, []);

  // ✅ Logout Modal Component
  const LogoutConfirmationModal = ({ visible, onCancel, onLogout, show }) => (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          {/* <FlatList
            data={show}
            renderItem={({ item }) => (
              <View style={styles.modalTextaa}>
                <Text style={styles.modalTexta}>{item.message}</Text>
              </View>
            )}
          /> */}
          {show?.map((item, index) => (
            <View key={index} style={styles.modalTextaa}>
              <Text style={styles.modalTexta}>{item.message}</Text>
            </View>
          ))}
          <View style={styles.textd}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                onLogout;
                setLogoutModalVisible(false);
                setTimeout(
                  () => navigation.navigate('14 PROTECTED PROPERTIES'),
                  100,
                );
              }}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // ✅ Loader Modal
  const DeleteConfirmationModal = ({ isVisible }) => (
    <Modal visible={isVisible} transparent>
      <View style={styles.modalContainera}>
        <View style={styles.modalContenta}>
          <ActivityIndicator size="large" color={'#b83725'} />
        </View>
      </View>
    </Modal>
  );

  // ✅ Fetch suggestions for Village / Pincode
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
        if (data?.status === 200) {
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
      } finally {
        setLoading(false);
      }
    },
    [Stateid],
  );

  // ✅ Clear inputs
  const handleCrossButtonPress = useCallback(() => {
    setSuggestionsList([]);
    setSelectedDistrictID();
    setSelectedTalukaID();
    setSelectedVillageID();
    setselectedDistrictName();
    setselectedTalukaName();
    setselectedVillageName();
  }, []);

  // ✅ Add Property Data API
  const AddData = async () => {
    setModalVisible(true);
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      DistrictID: selectedDistrictID,
      villageid: selectedVillageID,
      TalukaID: selectedTalukaID,
      SurveyNo: selectsurvey,
      TPNo: selecttp,
      FPNo: selectfp,
      BuildingNo,
      Society: SocietyName,
      SocietyName,
      districtname: selectedDistrictName,
      Talukaname: selectedTalukaName,
      villagename: selectedVillageName,
      UserID: Userid,
    };

    fetch(
      'https://qaapi.jahernotice.com/api2/send/add/propertyprotection/request',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setModalVisible(false);
          setLogoutModalVisible(true);
          const mess = [];
          if (data?.message) {
            mess.push({ type: 'message', message: data.message });
          }
          setDataaa(mess);
        } else if (data.status === 400) {
          setModalVisible(false);
          Toast.show({
            type: 'error',
            text1: `${data.Message}`,
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.error('Error:', error);
      });
  };

  // ✅ Handle Add Button
  const handleSubmit = () => {
    AddData();
  };

  // ✅ Render JSX
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.lable}>Select State Name*</Text>
          <SelectList
            setSelected={val => {
              setStateId(val);
              setPlaceholderValue('Select Village/PinCode*');
            }}
            save="key"
            data={datasa.filter(item => item.keya)}
            placeholder={selectedState || 'Select State Name*'}
            boxStyles={{
              marginBottom: 10,
              borderRadius: 5,
              borderColor: '#c0c0c0',
            }}
            dropdownStyles={{
              backgroundColor: '#f8f8ff',
              borderColor: '#c0c0c0',
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
            value={selectsurvey}
            onChangeText={text =>
              setSelectSurvey(text.replace(/[^0-9A-Za-z/.+\-]/g, ''))
            }
          />

          <Text style={styles.lable}>Enter TP Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter TP Number"
            value={selecttp}
            onChangeText={text =>
              setSelectTP(text.replace(/[^0-9A-Za-z/.+\-]/g, ''))
            }
          />

          <Text style={styles.lable}>Enter FP Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter FP Number"
            value={selectfp}
            onChangeText={text =>
              setSelectFP(text.replace(/[^0-9A-Za-z/.+\-]/g, ''))
            }
          />

          <Text style={styles.lable}>Enter Building Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Building Number"
            value={BuildingNo}
            onChangeText={text =>
              setBuildingNo(text.replace(/[^0-9A-Za-z/.+\-]/g, ''))
            }
          />

          <Text style={styles.lable}>Enter Society Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Society Name"
            value={SocietyName}
            onChangeText={text =>
              setSocietyName(
                text.replace(
                  /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                  '',
                ),
              )
            }
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!selectedDistrictID) {
                  return Toast.show({
                    type: 'error',
                    text1: `Please Select Village/PinCode`,
                    position: 'bottom',
                  });
                }
                if (
                  !selectsurvey &&
                  !selecttp &&
                  !selectfp &&
                  !SocietyName &&
                  !BuildingNo
                ) {
                  return Toast.show({
                    type: 'error',
                    text1: `Please Enter Survey Number or TP and FP`,
                    position: 'bottom',
                  });
                }
                if (BuildingNo && !SocietyName) {
                  return Toast.show({
                    type: 'error',
                    text1: `SocietyName is mandatory with BuildingNo`,
                    position: 'bottom',
                  });
                }
                if (SocietyName && !BuildingNo) {
                  return Toast.show({
                    type: 'error',
                    text1: `BuildingNo is mandatory with SocietyName`,
                    position: 'bottom',
                  });
                }
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

            <DeleteConfirmationModal isVisible={modalVisible} />
            <LogoutConfirmationModal
              visible={isLogoutModalVisible}
              onCancel={() => setLogoutModalVisible(false)}
              onLogout={() => setLogoutModalVisible(false)}
              show={Dataaa}
            />
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

// ✅ Styles remain untouched
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
  modalTexta: { fontSize: 20, marginBottom: 15 },
  modalTextaa: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#b83725',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
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
  lable: { fontWeight: '600', marginTop: 8, marginBottom: 5 },
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    flex: 1,
    backgroundColor: '#ff4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
});

export default AddPropertyForm;
