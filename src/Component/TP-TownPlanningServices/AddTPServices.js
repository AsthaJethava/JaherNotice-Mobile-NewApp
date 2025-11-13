import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Button,
  Picker,
  FlatList,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import LandRecordState from '../LandRecord/LandRecordState.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePickerModala from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

function AddTPServices({ route, navigation }) {
  const [Dataaa, setDataaa] = useState();
  // console.log('message', Dataaa);
  //
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleCancel = () => {
    handleReset();
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
                  setTimeout(() => {
                    navigation.navigate('TownPlanningServicesCount');
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

  //  useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('AddTPServices');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
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

  const [Talukaname, setTalukaname] = useState();
  const [Villagename, setTVillageame] = useState();
  const [active, setActive] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedStatename == 'Per District') {
      setTalukaID(null);
      setVillageID(null);
      setTalukaIDname(null);
      setVillageIDname(null);
      setTPNo(null);
      setTalukaIDa(null);
      setVillageIDa(null);
      setTalukaNamea();
      setVillageNamea();
    }
    if (selectedStatename === 'Per Taluka') {
      setVillageID(null);
      setVillageIDname(null);
      setTPNo(null);
      setVillageIDa(null);
      setVillageNamea();
    }
    if (selectedStatename === 'Per Village') {
      setTPNo(null);
    }
  }, []);

  const handleDelete = () => {
    requestData();
  };

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

  // const [selectedStatename, setselectedStatedname] = useState();
  // const [ServicesubTypeIDname, setServicesubTypeIDname] = useState();
  const [DistrictIdname, setDistrictIDname] = useState();
  const [TalukaIdname, setTalukaIDname] = useState();
  const [VillageIdname, setVillageIDname] = useState();
  const [Talukanamea, setTalukanamea] = useState('Select Taluka Name*');
  const [Villagenamea, setTVillageamea] = useState('Select Village Name*');
  const [isActivea, setisActivea] = useState();
  const [UserSubscriptionMainID, setUserSubscriptionMainID] = useState();
  const [selectedState, setselectedStated] = useState();
  const [ServicesubTypeID, setServicesubTypeID] = useState();
  const [DistrictId, setDistrictID] = useState();
  const [TalukaId, setTalukaID] = useState();
  const [VillageId, setVillageID] = useState();
  const [TalukaIda, setTalukaIDa] = useState();
  const [VillageIda, setVillageIDa] = useState();
  const [startDate, setstartDate] = useState([]);
  const [endDate, setendDate] = useState([]);
  const [startDatea, setstartDatea] = useState();
  const [endDatea, setendDatea] = useState();
  const [TPNo, setTPNo] = useState();
  const [DistrictIdn, setDistrictIDn] = useState();
  const [TalukaIdn, setTalukaIDn] = useState();
  const [VillageIdn, setVillageIDn] = useState();
  const [TPNon, setTPNon] = useState();
  const [DistrictNamea, setDistrictNamea] = useState();
  const [TalukaNamea, setTalukaNamea] = useState();
  const [VillageNamea, setVillageNamea] = useState();
  // console.log('StartDate', formatDate(startDatea));
  // console.log('EndDate', formatDate(endDatea));

  useEffect(() => {
    ServicesList();
  }, []);

  useEffect(() => {
    if (selectedState) {
      ServicesList(selectedState);
    }
  }, [selectedState]);
  useEffect(() => {
    DistrictList();
    if (Stateid) {
      DistrictList();
    }
  }, [Stateid]);
  useEffect(() => {
    if (DistrictId) {
      talukaList(DistrictId);
    }
  }, [DistrictId]);
  useEffect(() => {
    if (TalukaId) {
      villageList(TalukaId);
    }
  }, [TalukaId]);

  const [selectedStatea, setSelectedStatea] = useState();
  const [datasa, setDatasa] = useState([]);
  const [datasna, setDatasna] = useState([]);
  const [Stateid, setStateId] = useState();
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
            setSelectedStatea(item.value);
          }
        });
        setDatasa(newArray);
        setDatasna(newArray);
        DistrictList();
      })
      .catch(error => console.log('error=State', error));
  }, []);

  const [Datas, setDatas] = useState([]);
  const [Datasn, setDatasn] = useState([]);
  useEffect(() => {
    fetch('https://qaapi.jahernotice.com/api/tpservice')
      .then(response => response.json())
      .then(result => {
        let newArray = result.data.map(item => {
          return { key: item.ServiceID, value: item.ServiceName };
        });
        setDatas(newArray);
        setDatasn(newArray);
      })
      .catch(error => console.log('error=State', error));
  }, []);
  //   console.log('Service', Datas);

  const [Services, setServices] = useState([]);
  const ServicesList = ServiceID => {
    fetch(`https://qaapi.jahernotice.com/api/tpsubservice/${ServiceID}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.data.map(item => {
          return {
            key: item.Service_Sub_Type_ID,
            value: item.SubType_Name,
          };
        });
        setServices(newArray);
        // State();
      })
      .catch(error => console.log('error=Service', error));
  };
  //   console.log('setServices', Services);

  // Services List
  const [District, setDistrict] = useState([]);
  const [Districts, seDistrictss] = useState([]);
  const DistrictList = async () => {
    const Stateid = Stateid ? Stateid : 7;
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api3/District/${Stateid}`)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        let newArray = result.map(item => {
          return {
            key: item.DistrictID,
            value: item.DistrictName,
          };
        });
        setDistrict(newArray);
        seDistrictss(newArray);
        // State();
      })
      .catch(error => console.log('error=Service', error));
  };
  //   console.log('District', District);

  const [Taluka, setTaluka] = useState([]);
  const [Talukas, setTalukas] = useState([]);
  const talukaList = district => {
    fetch(`https://qaapi.jahernotice.com/api/Taluka/${district}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.data.map(item => {
          return {
            key: item.TalukaID,
            value: item.TalukaName,
          };
        });
        setTaluka(newArray);
        setTalukas(newArray);
        // State();
      })
      .catch(error => console.log('error=Service', error));
  };
  //   console.log('Taluka', Taluka);

  const [Village, setVillage] = useState([]);
  const [Villages, setVillages] = useState([]);
  const villageList = TalukaID => {
    fetch(`https://qaapi.jahernotice.com/api/Village/${TalukaID}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.data.map(item => {
          return {
            key: item.VillageID,
            value: item.VillageName,
          };
        });
        setVillage(newArray);
        setVillages(newArray);
        // State();
      })
      .catch(error => console.log('error=Service', error));
  };
  //   console.log('Village', Village);

  const requestData = async () => {
    setModalVisible(true);
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      UserID: Userid,
      Service_Sub_Type_ID: ServicesubTypeID,
      VillageID: VillageId,
      TalukaID: TalukaId,
      DistrictID: DistrictId,
      TPNo: TPNo,
      startDate: startDate,
      endDate: endDate,
      VillageName: VillageNamea,
      TalukaName: TalukaNamea,
      DistrictName: DistrictNamea,
      SubType_Name: setServicesubTypeIDname,
      ServiceName: selectedStatename,
    };

    console.log(requestData);
    fetch(`https://qaapi.jahernotice.com/api/add/tp/req`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.status);
        if (result.status == 200) {
          setModalVisible(false);
          // Toast.show({
          //   type: 'success', // or 'error', 'info', 'warning'
          //   text1: `Your TP has been Update Successfully.`,
          //   position: 'bottom', // 'top' or 'bottom'
          //   visibilityTime: 4000, // ms
          //   autoHide: true,
          //   topOffset: 30,
          //   bottomOffset: 50,
          // });
          setLogoutModalVisible(true);
          const mess = [];
          if (result !== undefined) {
            if (
              result.message !== undefined &&
              result.message !== undefined &&
              result.message !== ''
            ) {
              mess.push({
                type: 'message',
                message: result.message,
              });
            }
          }
          // setDatashiw(mess);
          setDataaa(mess);
          // setTimeout(() => {
          //   navigation.navigate('TownPlanningServicesCount');
          // }, 3000);
        }
        if (result.status === 400) {
          if (result.Message == 'Insufficient Subscription.') {
            // console.log('Rresponse data', result);
            // console.log(result.Message);
            setModalVisible(false);
            return Toast.show({
              type: 'error', // or 'error', 'info', 'warning'
              text1: `${result.Message}`,
              position: 'bottom', // 'top' or 'bottom'
              visibilityTime: 4000, // ms
              autoHide: true,
              topOffset: 30,
              bottomOffset: 50,
            });
          } else {
            // console.log(result);
            setModalVisible(false);
            Toast.show({
              type: 'error', //  success error or 'error', 'info', 'warning'
              text1: `${result.ErrorMessage}`,
              position: 'bottom', // 'top' or 'bottomGRRHJJJJ'
              visibilityTime: 4000, // ms
              autoHide: true,
              topOffset: 30,
              bottomOffset: 50,
            });
          }
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.log('error==data', error);
      });
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisiblea, setDatePickerVisibilitya] = useState(false);
  const [selectDatee, setSelectDatee] = useState('Select End Date');
  const [selectDate, setSelectDate] = useState('Select Start Date');
  const [setServicesubTypeIDname, setServicesubname] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePickera = () => {
    setDatePickerVisibilitya(true);
  };

  const hideDatePickera = () => {
    setDatePickerVisibilitya(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectDatee(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setendDate(dt);
    hideDatePicker();
  };

  const handleConfirma = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectDate(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setstartDate(dt);

    const oneYearLater = new Date(dt);
    oneYearLater.setFullYear(dt.getFullYear() + 1);
    const y = oneYearLater.toISOString().split('T');
    const y1 = y[0].split('-');
    setSelectDatee(y1[2] + '/' + y1[1] + '/' + y1[0]);
    setendDate(oneYearLater);
    hideDatePickera();
  };

  const [selectedServicename, setSelectedServicea] = useState('');
  const [selectedServicenamenew, setSelectedServiceanew] = useState('');
  const [selectedsubService, setSelectedsubService] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedTalukatv, setSelectedTalukatv] = useState('');
  const [selectedTalukav, setSelectedTalukav] = useState('');
  const [selectedsubServices, setSelectedsubServices] = useState('');
  const [servicePlaceholder, setServicePlaceholder] = useState(
    'Select Sub Service Name*',
  );
  const [districtPlaceholder, setDistrictPlaceholder] = useState(
    'Select District Name*',
  );
  const [talukaPlaceholder, setTalukaPlaceholder] = useState(
    'Select Taluka Name*',
  );
  const [villagePlaceholder, setVillagePlaceholder] = useState(
    'Select Village Name*',
  );

  useEffect(() => {
    // All change: Update placeholder values based on selected service
    if (selectedServicename === selectedServicename) {
      setSelectedsubService(selectedServicename);
      setSelectedDistrict(selectedServicename);
      setSelectedTalukatv(selectedServicename);
      setSelectedTalukav(selectedServicename);
      // setServicesubname();
    }
  }, [
    selectedServicename,
    selectedsubService,
    selectedDistrict,
    selectedTaluka,
    selectedVillage,
  ]);

  useEffect(() => {
    // Taluka change: Update placeholder values based on selected service
    if (selectedsubService === selectedsubService) {
      setSelectedTalukatv(selectedsubService);
    }
  }, [selectedsubService]);

  useEffect(() => {
    // Village change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukav(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // Taluka change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukatv(selectedDistrict);
    }
  }, [selectedDistrict]);
  useEffect(() => {
    // Village change: Update placeholder values based on selected service
    if (selectedTaluka === selectedTaluka) {
      setSelectedTalukav(selectedTaluka);
    }
  }, [selectedTaluka]);
  useEffect(() => {
    // Village change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukav(selectedDistrict);
    }
  }, [selectedDistrict]);

  // useEffect(() => {
  //   if (servicePlaceholder == 'Select Sub Service Name*') {
  //     setServicesubTypeID(null);
  //     setServicesubTypeID();
  //   }
  // }, [servicePlaceholder]);
  // useEffect(() => {
  //   if (districtPlaceholder == 'Select District Name*') {
  //     setDistrictID(null);
  //     setDistrictID();
  //   }
  // }, [districtPlaceholder]);
  // useEffect(() => {
  //   if (talukaPlaceholder == 'Select Taluka Name*') {
  //     setTalukaID(null);
  //     setTalukaID();
  //   }
  // }, [talukaPlaceholder]);
  // useEffect(() => {
  //   if (villagePlaceholder == 'Select Village Name*') {
  //     setVillageID(null);
  //     setVillageID();
  //   }
  // }, [villagePlaceholder]);

  //   console.log(selectDate, selectDatee); // Move the console.log here

  // console.log('Service_Sub_Type_ID', ServicesubTypeID);
  // console.log('VillageID', VillageId);
  // console.log('TalukaID', TalukaId);
  // console.log('DistrictID', DistrictId);
  // console.log('TPNo', TPNo);
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);
  // console.log('VillageName', VillageNamea);
  // console.log('TalukaName', TalukaNamea);
  // console.log('DistrictName', DistrictNamea);
  // console.log('SubType_Name', selectedState);
  const [selectedStatename, setselectedStatedname] = useState();

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <>
            <Text style={styles.lable}>Select Service Name*</Text>
            <SelectList
              setSelected={selectedValue => {
                setselectedStated(selectedValue);
                const selectedService = Datas.find(
                  item => item.key === selectedValue,
                );
                setTaluka([]);
                setVillage([]);
                setselectedStatedname(selectedService.value);
                setSelectedServicea(selectedValue);
                const dynamicserviPlaceholder = `Select Sub Service Name*`;
                setServicePlaceholder(dynamicserviPlaceholder);
                setServicesubname();
                setServicesubTypeID();
                setDistrictID();
                setTalukaID();
                setVillageID();
                setTalukaname();
                setTVillageame();
              }}
              save="key"
              data={Datas}
              placeholder={'Select Service Name*'}
              boxStyles={{
                // marginTop: 25,
                borderRadius: 5,
                borderColor: '#c0c0c0',
              }}
              dropdownStyles={{
                backgroundColor: '#f8f8ff',
                borderColor: '#c0c0c0',
              }}
              defaultValue={'Select Service Name*'}
              onSearch={search => {
                if (search.length >= 3) {
                  return Datas.filter(item =>
                    item.toLowerCase().includes(search.toLowerCase()),
                  );
                } else {
                  return [];
                }
              }}
            />
            <Text style={styles.lable}>Select Sub Service Name*</Text>
            <SelectList
              setSelected={selectedValue => {
                setSelectedsubService(selectedValue);
                setServicesubTypeID(selectedValue);
                const selectedService = Services.find(
                  item => item.key === selectedValue,
                );
                setStateId(7);
                setTaluka([]);
                setVillage([]);
                setServicesubname(selectedService.value);
                setDistrictID(null);
                setDistrictID();
                // Update the placeholder dynamically based on the selected service
                const dynamicDistrictPlaceholder = 'Select District Name*';
                setDistrictPlaceholder(dynamicDistrictPlaceholder);
                const dynamicTalukaPlaceholder = 'Select Taluka Name*';
                setTalukaPlaceholder(dynamicTalukaPlaceholder);
                const dynamicVillagePlaceholder = 'Select Village Name*';
                setVillagePlaceholder(dynamicVillagePlaceholder);
                // Reset other state variables based on the selected service
                if (selectedService.value === 'Per District') {
                  setTalukaID();
                  setVillageID();
                  setTalukaname();
                  setTVillageame();
                } else if (selectedService.value === 'Per Taluka') {
                  setVillageID();
                  setTVillageame();
                } else if (selectedService.value === 'Per Village') {
                  setTPNo();
                }
              }}
              // key={selectedServicename}
              key={`service-${selectedServicename}`}
              save="key"
              data={Services}
              placeholder={servicePlaceholder || 'Select Sub Service Name*'}
              boxStyles={{
                borderRadius: 5,
                borderColor: '#c0c0c0',
              }}
              dropdownStyles={{
                backgroundColor: '#f8f8ff',
                borderColor: '#c0c0c0',
              }}
              defaultValue={servicePlaceholder || 'Select Sub Service Name*'}
              onSearch={search => {
                if (search.length >= 3) {
                  return Services.filter(item =>
                    item.toLowerCase().includes(search.toLowerCase()),
                  );
                } else {
                  return [];
                }
              }}
            />

            {setServicesubTypeIDname == 'Per District' ||
            setServicesubTypeIDname == 'Per Taluka' ||
            setServicesubTypeIDname == 'Per Village' ||
            setServicesubTypeIDname == 'Per TP Scheme' ? (
              <>
                <Text style={styles.lable}>Select District Name*</Text>
                <SelectList
                  key={selectedsubService}
                  setSelected={selectedValue => {
                    setDistrictID(selectedValue);
                    const selectedDistrictObj = District.find(
                      item => item.key === selectedValue,
                    );

                    setDistrictNamea(selectedDistrictObj.value);
                    setSelectedDistrict(selectedValue);
                    setVillage([]);
                    setTalukaNamea();
                    setVillageNamea();
                    // Use a variable to hold the dynamic placeholder
                    const dynamicTalukaPlaceholder = `Select Taluka Name*`;
                    const dynamicVillagePlaceholder = `Select Village Name*`;
                    setTalukaID(null);
                    setTalukaID();
                    // Update the state with the dynamic placeholder
                    setTalukaPlaceholder(dynamicTalukaPlaceholder);
                    setVillagePlaceholder(dynamicVillagePlaceholder);
                    setVillageID(null);
                    setVillageID();
                    if (selectedValue == selectedValue) {
                      setTalukaname(Talukanamea);
                      setTVillageame(Villagenamea);
                    }
                  }}
                  save="key"
                  data={District}
                  placeholder={districtPlaceholder || 'Select District Name*'}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  defaultValue={districtPlaceholder || 'Select District Name*'}
                  onSearch={search => {
                    if (search.length >= 3) {
                      return District.filter(item =>
                        item.toLowerCase().includes(search.toLowerCase()),
                      );
                    } else {
                      return [];
                    }
                  }}
                />
              </>
            ) : null}
            {setServicesubTypeIDname == 'Per Taluka' ||
            setServicesubTypeIDname == 'Per Village' ||
            setServicesubTypeIDname == 'Per TP Scheme' ? (
              <>
                <>
                  <Text style={styles.lable}>Select Taluka Name*</Text>
                  <SelectList
                    key={selectedTalukatv}
                    setSelected={selectedValue => {
                      // setSelectedState(selectedValue);
                      // console.log(selectedValue);
                      setTalukaID(selectedValue);
                      const selectedService = Taluka.find(
                        item => item.key === selectedValue,
                      );

                      setTalukaNamea(selectedService.value);
                      setVillageID(null);
                      setVillageID();
                      setVillageNamea();
                      setSelectedTaluka(selectedValue);
                      setTalukaname(selectedService.value);
                      if (selectedValue == selectedValue) {
                        setTVillageame(Villagenamea);
                      }
                    }}
                    save="key"
                    data={Taluka}
                    placeholder={talukaPlaceholder || 'Select Taluka Name*'}
                    boxStyles={{
                      // marginTop: 25,
                      borderRadius: 5,
                      borderColor: '#c0c0c0',
                    }}
                    dropdownStyles={{
                      backgroundColor: '#f8f8ff',
                      borderColor: '#c0c0c0',
                    }}
                    defaultValue={talukaPlaceholder || 'Select Taluka Name*'}
                    onSearch={search => {
                      if (search.length >= 3) {
                        return Taluka.filter(item =>
                          item.toLowerCase().includes(search.toLowerCase()),
                        );
                      } else {
                        return [];
                      }
                    }}
                  />
                </>
              </>
            ) : null}

            {setServicesubTypeIDname == 'Per Village' ||
            setServicesubTypeIDname == 'Per TP Scheme' ? (
              <>
                <Text style={styles.lable}>Select Village Name*</Text>
                <SelectList
                  key={selectedTalukav}
                  setSelected={selectedValue => {
                    // setSelectedState(selectedValue);
                    // setSelectedVillage(selectedValue);
                    // console.log(selectedValue);
                    setVillageID(selectedValue);
                    const selectedService = Village.find(
                      item => item.key === selectedValue,
                    );

                    setVillageNamea(selectedService.value);
                    setTVillageame(selectedService.value);
                  }}
                  save="key"
                  data={Village}
                  placeholder={villagePlaceholder || 'Select Village Name*'}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  defaultValue={villagePlaceholder || 'Select Village Name*'}
                  onSearch={search => {
                    if (search.length >= 3) {
                      return Village.filter(item =>
                        item.toLowerCase().includes(search.toLowerCase()),
                      );
                    } else {
                      return [];
                    }
                  }}
                />
              </>
            ) : null}

            {setServicesubTypeIDname == 'Per TP Scheme' ? (
              <>
                <Text style={styles.lable}>Enter TP No.*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter TP No.*"
                  value={TPNo}
                  onChangeText={text => {
                    const filteredTextcsn = text.replace(
                      /[^0-9A-Za-z\/\-]/g,
                      '',
                    );
                    setTPNo(filteredTextcsn);
                  }}
                />
              </>
            ) : null}
            {/* <Text style={styles.lable}>Select Start Date*</Text>
  <TouchableOpacity style={styles.inputa} onPress={showDatePickera}>
    <Text>{selectDate}</Text>
    <Icon
      name="calendar"
      size={20}
      color="#000"
      style={styles.icon}
    />
  </TouchableOpacity>
  <Text style={styles.lable}>Select End Date*</Text>
  <TouchableOpacity style={styles.inputa} onPress={showDatePicker}>
    <Text>{selectDatee}</Text>
    <Icon
      name="calendar"
      size={20}
      color="#000"
      style={styles.icon}
    />
  </TouchableOpacity> */}
            {selectedState == '' ||
            (selectedState == null && setServicesubTypeIDname == '') ||
            setServicesubTypeIDname == null ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!selectedState) {
                    showErrorToastu('Please Select Service Name');
                  } else if (!ServicesubTypeID) {
                    showErrorToastu('Please Select Sub Service Name');
                  }
                  function showErrorToastu(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'top',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 30,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            ) : null}

            {setServicesubTypeIDname == 'Per District' ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={}
                  onPress={() => {
                    if (!selectedState) {
                      showErrorToastu('Please Select Service Name');
                    } else if (!ServicesubTypeID) {
                      showErrorToastu('Please Select Sub Service Name');
                    } else if (!DistrictId) {
                      showErrorToastu('Please Select District Name.');
                    } else {
                      if (setServicesubTypeIDname == 'Per District') {
                        setTalukaID(null);
                        setVillageID(null);
                        setTalukaname(null);
                        setTVillageame(null);
                        setTalukaNamea(null);
                        setVillageNamea(null);
                        handleDelete();
                      }
                    }
                    function showErrorToastu(message) {
                      Toast.show({
                        type: 'error',
                        text1: message,
                        position: 'top',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 50,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {setServicesubTypeIDname == 'Per Taluka' ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={}
                  onPress={() => {
                    if (!selectedState) {
                      showErrorToastu('Please Select Service Name');
                    } else if (!ServicesubTypeID) {
                      showErrorToastu('Please Select Sub Service Name.');
                    } else if (!DistrictId) {
                      showErrorToastu('Please Select District Name.');
                    } else if (!TalukaId) {
                      showErrorToastu('Please Select Taluka Name.');
                    } else {
                      if (setServicesubTypeIDname == 'Per Taluka') {
                        setVillageID(null);
                        setTVillageame(null);
                        setVillageNamea(null);
                        handleDelete();
                      }
                    }
                    function showErrorToastu(message) {
                      Toast.show({
                        type: 'error',
                        text1: message,
                        position: 'top',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 50,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {setServicesubTypeIDname == 'Per Village' ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={}
                  onPress={() => {
                    if (!selectedState) {
                      showErrorToastu('Please Select Service Name');
                    } else if (!ServicesubTypeID) {
                      showErrorToastu('Please Select Sub Service Name.');
                    } else if (!DistrictId) {
                      showErrorToastu('Please Select District Name.');
                    } else if (!TalukaId) {
                      showErrorToastu('Please Select Taluka Name.');
                    } else if (!VillageId) {
                      showErrorToastu('Please Select Village Name.');
                    } else {
                      handleDelete();
                    }
                    function showErrorToastu(message) {
                      Toast.show({
                        type: 'error',
                        text1: message,
                        position: 'top',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 50,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </>
            ) : null}
            {setServicesubTypeIDname == 'Per TP Scheme' ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={}
                  onPress={() => {
                    if (!selectedState) {
                      showErrorToastu('Please Select Service Name');
                    } else if (!ServicesubTypeID) {
                      showErrorToastu('Please Select Sub Service Name.');
                    } else if (!DistrictId) {
                      showErrorToastu('Please Select District Name.');
                    } else if (!TalukaId) {
                      showErrorToastu('Please Select Taluka Name.');
                    } else if (!VillageId) {
                      showErrorToastu('Please Select Village Name.');
                    } else if (!TPNo) {
                      showErrorToastu('Please Enter TP No.');
                    } else {
                      handleDelete();
                    }
                    function showErrorToastu(message) {
                      Toast.show({
                        type: 'error',
                        text1: message,
                        position: 'top',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 50,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {/* ServicesubTypeID == 'Per TP Scheme' */}

            {/* <TouchableOpacity
    style={styles.button}
    // onPress={}
    onPress={() => {
      if (!selectedState) {
        showErrorToastu('Please Select Service Name');
      } else if (!ServicesubTypeID) {
        showErrorToastu('Please Select Service Sub Type Name.');
      } else if (!District) {
        showErrorToastu('Please Select District Name.');
      } else if (!TalukaId) {
        showErrorToastu('Please Select TalukaId Name.');
      } else if (!VillageId) {
        showErrorToastu('Please Select Village Name.');
      } else if (!TPNo) {
        showErrorToastu('Please Enter TP No.');
      } else if (!startDate) {
        showErrorToastu('Please Enter startDate');
      } else if (!endDate) {
        showErrorToastu('Please Enter endDate');
      } else {
        handleDelete();
      }
      function showErrorToastu(message) {
        Toast.show({
          type: 'error',
          text1: message,
          position: 'bottom',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 50,
        });
      }
    }}>
    <Text style={styles.buttonText}>Add</Text>
  </TouchableOpacity> */}
          </>
          <DeleteConfirmationModal
            isVisible={modalVisible}
            onDelete={handleDelete}
          />
          <Toast/>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            textColor="black"
            minimumDate={new Date()} // Set the minimum date to today
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            // date={startDate}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisiblea}
            mode="date"
            textColor="black"
            minimumDate={new Date()} // Set the minimum date to today
            onConfirm={handleConfirma}
            onCancel={hideDatePickera}
            // date={endDate}
          />
          <LogoutConfirmationModal
            visible={isLogoutModalVisible}
            onCancel={handleCancel}
            onLogout={handleLogout}
            show={Dataaa}
          />
        </View>
      </ScrollView>
    </>
  );
}

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
  container: {
    flex: 1,
    padding: 15,
  },
  lable: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  datePickerCard: {
    backgroundColor: 'red',
  },
  datePicker: {
    backgroundColor: 'red', // Background color for the date picker
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 6,
    // marginTop: 20,
  },
  inputa: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 4,
    // marginTop: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 'auto',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ff4500',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttona: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    marginTop: 20,
  },
});

export default AddTPServices;
