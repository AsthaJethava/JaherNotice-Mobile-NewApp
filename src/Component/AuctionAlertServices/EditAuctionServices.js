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
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePickerModala from 'react-native-modal-datetime-picker';
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
                    navigation.navigate('AuctionAlertServicesCount');
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

  const [selectedState, setselectedStated] = useState();
  const [ServicesubTypeID, setServicesubTypeID] = useState();
  const [DistrictId, setDistrictID] = useState();
  const [TalukaId, setTalukaID] = useState();
  const [VillageId, setVillageID] = useState();
  const [UserSubscriptionMainID, setUserSubscriptionMainID] = useState();
  const [TPNo, setTPNo] = useState();
  const [Servicesubname, setServicesubname] = useState();
  const [Talukaname, setTalukaname] = useState();
  const [VillageName, setVillageName] = useState();
  const [Talukanamea, setTalukanamea] = useState('Select Taluka Name*');
  const [Villagenamea, setTVillageamea] = useState('Select Village Name*');
  const [DistrictNamea, setDistrictNamea] = useState();
  const [TalukaNamea, setTalukaNamea] = useState();
  const [VillageNamea, setVillageNamea] = useState();
  const [SubType_Namea, setSubType_Namea] = useState();
  const [DistrictIdname, setDistrictIDname] = useState();
  const [TalukaIdname, setTalukaIDname] = useState();
  const [VillageIdname, setVillageIDname] = useState();
  const [DistrictIda, setDistrictIDa] = useState();
  const [TalukaIda, setTalukaIDa] = useState();
  const [VillageIda, setVillageIDa] = useState();

  useEffect(() => {
    ServicesList();
  }, []);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('EditAuctionService');
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

  const [UsersubscriptionMainID, setUsersubscriptionMainID] = useState();
  const [startDate, setstartDate] = useState([]);
  const [endDate, setendDate] = useState([]);
  const [startDatea, setstartDatea] = useState(startDate);
  const [endDatea, setendDatea] = useState(endDate);
  // const [selectDatee, setSelectDatee] = useState('Select End Date');
  // const [selectDate, setSelectDate] = useState('Select Start Date');

  const [ActionFor, setActionFor] = useState();
  useEffect(() => {
    const {
      SubscriptionID,
      StartDate,
      EndDate,
      ActionFora,
      SubType_Name,
      DistrictName,
      TalukaName,
      VillageName,
      DistrictID,
      TalukaID,
      VillageID,
      State,
      Service_Sub_Type_ID,
    } = route.params;

    setUsersubscriptionMainID(SubscriptionID);
    setendDate(EndDate);
    setstartDate(StartDate);
    setSelectDatee(formatDate(StartDate));
    setSelectDate(formatDate(EndDate));
    setActionFor(ActionFora);
    setSubType_Namea(SubType_Name);
    setDistrictNamea(DistrictName);
    setTalukaNamea(TalukaName);
    setVillageNamea(VillageName);
    setDistrictID(DistrictID);
    setTalukaID(TalukaID);
    setVillageID(VillageID);
    setDistrictIDname(DistrictName);
    setTalukaIDname(TalukaName);
    setVillageIDname(VillageName);
    setServicesubname(SubType_Name);
    setSelectedStatea(State);
    setServicesubTypeID(Service_Sub_Type_ID);
    setDistrictIDa(DistrictID);
    setTalukaIDa(TalukaID);
    setVillageIDa(VillageID);
    console.log('DistrictName', DistrictName);
    console.log('TalukaName', TalukaName);
    console.log('VillageName', VillageName);
    console.log('DistrictID', DistrictID);
    console.log('TalukaID', TalukaID);
    console.log('VillageID', VillageID);

    fetch(
      `https://qaapi.jahernotice.com/api/auction/details/id/${SubscriptionID}`,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result==bhola', result);
        setDistrictID(result.data.DistrictID);
        setTalukaID(result.data.TalukaID);
        setVillageID(result.data.VillageID);
        setDistrictIDa(result.data.DistrictID);
        setTalukaIDa(result.data.TalukaID);
        setVillageIDa(result.data.VillageID);
      })
      .catch(error => console.log('error=UsersubscriptionMainID', error));
  }, []);

  //   useEffect(() => {
  //     if (selectedState) {
  //       ServicesList(selectedState);
  //     }
  //   }, [selectedState]);

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
      })
      .catch(error => console.log('error=State', error));
  }, []);

  const [Services, setServices] = useState([]);
  const ServicesList = ServiceID => {
    fetch(`https://qaapi.jahernotice.com/api/auction/service/type`)
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
      .catch(error => console.log('error=District', error));
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

  useEffect(() => {
    if (Servicesubname == 'Per District') {
      setTalukaname();
      setVillageName();
      setTalukaID();
      setVillageID();
      setTalukaIDname(null);
      setVillageIDname(null);
    }
    if (Servicesubname == 'Per Taluka') {
      setVillageName();
      setVillageID();
      setVillageIDname(null);
    }
  }, [Servicesubname]);

  const requestData = async () => {
    if (Servicesubname == 'Per District') {
      setTalukaname();
      setVillageName();
      setTalukaID();
      setVillageID();
      setTalukaIDname(null);
      setVillageIDname(null);
    }
    if (Servicesubname == 'Per Taluka') {
      setVillageName();
      setVillageID();
      setVillageIDname(null);
    }
    setModalVisible(true);
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      UserID: Userid,
      Service_Sub_Type_ID: ServicesubTypeID,
      DistrictID: DistrictId,
      TalukaID: TalukaId,
      VillageID: VillageId,
      startDate: startDate,
      endDate: endDate,
      DistrictName: DistrictNamea,
      TalukaName: TalukaNamea,
      VillageName: VillageNamea,
      SubType_Name: SubType_Namea,
      UsersubscriptionMainID: UsersubscriptionMainID,
    };

    console.log(requestData);
    fetch(`https://qaapi.jahernotice.com/api/req/edit/auction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.status == 200) {
          // console.log('Rresponse data', result.data);
          // console.log(result.status);
          setModalVisible(false);
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
          console.log(mess);
          // setTimeout(() => {
          //   navigation.navigate('AuctionAlertServicesCount');
          // }, 1000);
        }
        if (result.status === 400) {
          console.log(result);
          setModalVisible(false);
          return Toast.show({
            type: 'error', //  success error or 'error', 'info', 'warning'
            text1: `${result.Message}`,
            position: 'top', // 'top' or 'bottom'
            visibilityTime: 4000, // ms
            autoHide: true,
            topOffset: 30,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => console.log('error==data', error));
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisiblea, setDatePickerVisibilitya] = useState(false);

  const [selectDatee, setSelectDatee] = useState('Select End Date*');
  const [selectDate, setSelectDate] = useState('Select Start Date*');

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

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectDatee(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setendDate(dt);
    hideDatePicker();
  };

  // console.log(selectDate, selectDatee); // Move the console.log here

  const [selectedServicenameall, setSelectedServiceall] = useState('');
  const [selectedServicenamealla, setSelectedServicealla] = useState('');
  const [selectedsubService, setSelectedsubService] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedTalukatv, setSelectedTalukatv] = useState('');
  const [selectedTalukav, setSelectedTalukav] = useState('');
  const [servicePlaceholder, setServicePlaceholder] = useState(
    'Select Sub Service*',
  );
  const [districtPlaceholder, setDistrictPlaceholder] =
    useState(DistrictIdname);
  const [talukaPlaceholder, setTalukaPlaceholder] = useState(TalukaIdname);
  const [villagePlaceholder, setVillagePlaceholder] = useState(VillageIdname);

  useEffect(() => {
    // First change: Update placeholder values based on selected service
    if (selectedsubService === selectedsubService) {
      setSelectedTalukatv(selectedsubService);
    }
  }, [selectedsubService]);

  useEffect(() => {
    // First change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukav(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // First change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukatv(selectedDistrict);
    }
  }, [selectedDistrict]);
  useEffect(() => {
    if (selectedTaluka === selectedTaluka) {
      setSelectedTalukav(selectedTaluka);
    }
  }, [selectedTaluka]);

  useEffect(() => {
    // First change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      setSelectedTalukav(selectedDistrict);
    }
  }, [selectedDistrict]);

  // useEffect(() => {
  //   // Second change: Remove district placeholder values
  //   if (districtPlaceholder === 'Select District Name*') {
  //     setDistrictID(null);
  //   }
  // }, [districtPlaceholder]);

  // useEffect(() => {
  //   // Third change: Remove taluka placeholder values
  //   if (talukaPlaceholder === 'Select Taluka Name*') {
  //     setTalukaID(null);
  //   }
  // }, [talukaPlaceholder]);

  // useEffect(() => {
  //   // Fourth change: Remove village placeholder values
  //   if (villagePlaceholder === 'Select Village Name*') {
  //     setVillageID(null);
  //   }
  // }, [villagePlaceholder]);
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

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <>
            <Text style={styles.lable}>Select State Name*</Text>

            <SelectList
              setSelected={selectedValue => {
                // console.log(selectedValue);
                setStateId(selectedValue);
                // const dynamicDistrictPlaceholder = 'Select Village/PinCode*';
                // setPlaceholderValue(dynamicDistrictPlaceholder);
              }}
              save="key"
              // data={datasa}
              data={datasa.filter(item => item.keya)}
              // placeholder={'Select State Name*'}
              placeholder={selectedStatea ? selectedStatea : selectedStatea}
              boxStyles={{
                // marginBottom: 10,
                borderRadius: 5,
                borderColor: '#c0c0c0',
              }}
              dropdownStyles={{
                backgroundColor: '#f8f8ff',
                borderColor: '#c0c0c0',
              }}
              // defaultValue={'Select State Name*'}
              defaultValue={selectedStatea ? selectedStatea : selectedStatea}
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
            <Text style={styles.lable}>Select Auction For*</Text>
            <TextInput
              placeholder={SubType_Namea}
              placeholderTextColor="grey"
              editable={false}
              style={{
                borderRadius: 5,
                borderColor: '#c0c0c0',
                // backgroundColor: '#f8f8ff',
                borderColor: '#c0c0c0',
                borderWidth: 1,
                height: 45,
                padding: 10,

                // borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
                // color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            />
            {/* <Text style={styles.lable}>Select Auction For*</Text>
            <SelectList
              setSelected={selectedValue => {
                setServicesubTypeID(selectedValue);
                const selectedService = Services.find(
                  item => item.key === selectedValue,
                );
                setSubType_Namea(selectedService.value);
                setDistrictID();
                setTalukaID();
                setVillageID();
                DistrictList();
                talukaList();
                villageList();
                setSelectedsubService(selectedValue);
                // Update the placeholder dynamically based on the selected service
                const dynamicDistrictPlaceholder = `Select District Name*`;
                setDistrictPlaceholder(dynamicDistrictPlaceholder);
                const dynamicTalukaPlaceholder = `Select Taluka Name*`;
                setTalukaPlaceholder(dynamicTalukaPlaceholder);
                const dynamicVillagePlaceholder = `Select Village Name*`;
                setVillagePlaceholder(dynamicVillagePlaceholder);
                // Update the state with the dynamic placeholder
                setServicesubname(selectedService.value);
                // console.log(selectedService.value);
                if (Servicesubname == 'Per District') {
                  setTalukaname();
                  setVillageName();
                  setTalukaID();
                  setVillageID();
                }
                if (Servicesubname == 'Per Taluka') {
                  setVillageName();
                  setVillageID();
                }
              }}
              save="key"
              data={Services}
              placeholder={'Select Auction For*'}
              boxStyles={{
                // marginTop: 25,
                borderRadius: 5,
                borderColor: '#c0c0c0',
              }}
              dropdownStyles={{
                backgroundColor: '#f8f8ff',
                borderColor: '#c0c0c0',
              }}
              defaultValue={' Select Auction For *'}
              onSearch={search => {
                if (search.length >= 3) {
                  return Services.filter(item =>
                    item.toLowerCase().includes(search.toLowerCase()),
                  );
                } else {
                  return [];
                }
              }}
            /> */}

            {Servicesubname === 'Per District' ||
            Servicesubname === 'Per Taluka' ||
            Servicesubname === 'Per Village' ? (
              <>
                <Text style={styles.lable}>Select District Name*</Text>
                <SelectList
                  key={selectedsubService}
                  setSelected={selectedValue => {
                    const selectedService = District.find(
                      item => item.key === selectedValue,
                    );
                    setDistrictNamea(selectedService.value);
                    setTalukaNamea();
                    setVillageNamea();
                    // console.log(selectedValue);
                    setDistrictID(selectedValue);
                    setVillage([]);
                    setTalukaID();
                    talukaList();
                    villageList();
                    setTalukaIDname(null);
                    setVillageIDname(null);
                    setSelectedDistrict(selectedValue);
                    // Use a variable to hold the dynamic placeholder
                    const dynamicTalukaPlaceholder = `Select Taluka Name*`;
                    const dynamicVillagePlaceholder = `Select Village Name*`;

                    // Update the state with the dynamic placeholder
                    setTalukaPlaceholder(dynamicTalukaPlaceholder);
                    setVillagePlaceholder(dynamicVillagePlaceholder);
                  }}
                  save="key"
                  data={District}
                  placeholder={districtPlaceholder || DistrictIdname}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  defaultValue={districtPlaceholder || DistrictIdname}
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
            {/*  */}
            {Servicesubname === 'Per Taluka' ||
            Servicesubname === 'Per Village' ? (
              <>
                <Text style={styles.lable}>Select Taluka Name*</Text>
                <SelectList
                  setSelected={selectedValue => {
                    const selectedService = Taluka.find(
                      item => item.key === selectedValue,
                    );

                    setTalukaNamea(selectedService.value);
                    setVillageNamea();
                    setSelectedTaluka(selectedValue);
                    setTalukaID(selectedValue);
                    setVillageID();
                    villageList();
                    setVillageIDname(null);
                    // setSelectedState(selectedValue);
                    // const selectedServicea = Taluka.find(
                    //   item => item.key === selectedValue,
                    // );
                    // setTalukaname(selectedServicea.value);
                    // console.log(selectedValue);
                    // Talukaname, setTalukaname
                    const dynamicVillagePlaceholder = `Select Village Name*`;
                    setVillagePlaceholder(dynamicVillagePlaceholder);
                  }}
                  // key={selectedDistrict}
                  key={selectedTalukatv}
                  save="key"
                  data={Taluka}
                  placeholder={talukaPlaceholder || TalukaIdname}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  defaultValue={talukaPlaceholder || TalukaIdname}
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
            ) : null}
            {Servicesubname == 'Per Village' ? (
              <>
                <Text style={styles.lable}>Select Village Name*</Text>
                <SelectList
                  // key={}

                  // Inside the SelectList component for Village
                  key={selectedTalukav}
                  setSelected={selectedValue => {
                    // setSelectedState(selectedValue);
                    // console.log(selectedValue);
                    setVillageID(selectedValue);
                    const selectedServicea = Village.find(
                      item => item.key === selectedValue,
                    );
                    setVillageName(selectedServicea.value);

                    setVillageNamea(selectedServicea.value);
                    // console.log(selectedServicea.value);
                  }}
                  save="key"
                  data={Village}
                  placeholder={villagePlaceholder || VillageIdname}
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
            {Servicesubname == 'AuctionAlert' ? (
              <>
                <Text style={styles.lable}>Select Taluka Name*</Text>
                <SelectList
                  key={selectedDistrict}
                  setSelected={selectedValue => {
                    // setSelectedState(selectedValue);
                    // console.log(selectedValue);
                    setTalukaID(selectedValue);
                    const selectedService = Taluka.find(
                      item => item.key === selectedValue,
                    );
                    setVillageID(null);
                    setVillageID();
                    setTalukaname(selectedService.value);
                    // console.log(selectedValue);
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
                <Text style={styles.lable}>Select Village Name*</Text>
                <SelectList
                  // key={selectedTaluka || selectedDistrict}
                  key={selectedTaluka}
                  setSelected={selectedValue => {
                    // setSelectedState(selectedValue);
                    // console.log(selectedValue);
                    setVillageID(selectedValue);
                    const selectedServicea = Village.find(
                      item => item.key === selectedValue,
                    );
                    setVillageName(selectedServicea.value);
                    // console.log(selectedServicea.value);
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
            {/* <TextInput
              style={styles.input}
              placeholder="Enter TP No.*"
              value={TPNo}
              onChangeText={text => {
                const filteredTextcsn = text.replace(
                  /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                  '',
                );
                setTPNo(filteredTextcsn);
              }}
            /> */}
            {/* <Text style={styles.lable}>Select Start Date*</Text>
            <TouchableOpacity style={styles.inputa}>
              <Text>{selectDate}</Text>
              <Icon
                name="calendar"
                size={20}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.lable}>Select End Date*</Text>
            <TouchableOpacity style={styles.inputa}>
              <Text>{selectDatee}</Text>
              <Icon
                name="calendar"
                size={20}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity> */}
            {Servicesubname == 'Per District' ? (
              <>
                {DistrictIda == DistrictId ? (
                  <TouchableOpacity style={styles.buttona}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      // onPress={}
                      onPress={() => {
                        if (!ServicesubTypeID) {
                          showErrorToastu('Please Select Auction For Name.');
                        } else if (!DistrictId) {
                          showErrorToastu('Please Select District Name.');
                        } else if (!startDate) {
                          showErrorToastu('Please Enter startDate');
                        } else if (!endDate) {
                          showErrorToastu('Please Enter endDate');
                        } else {
                          if (Servicesubname == 'Per District') {
                            setTalukaname();
                            setVillageName();
                            setTalukaID();
                            setVillageID();
                            handleDelete();
                            setTalukaIDname(null);
                            setVillageIDname(null);
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
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : null}

            {Servicesubname == 'Per Taluka' ? (
              <>
                {DistrictIda == DistrictId && TalukaIda == TalukaId ? (
                  <TouchableOpacity style={styles.buttona}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      // onPress={}
                      onPress={() => {
                        if (!ServicesubTypeID) {
                          showErrorToastu('Please Select Auction For Name.');
                        } else if (!DistrictId) {
                          showErrorToastu('Please Select District Name.');
                        } else if (!TalukaId) {
                          showErrorToastu('Please Select Taluka Name.');
                        } else if (!startDate) {
                          showErrorToastu('Please Enter startDate');
                        } else if (!endDate) {
                          showErrorToastu('Please Enter endDate');
                        } else {
                          if (Servicesubname == 'Per Taluka') {
                            setVillageName();
                            setVillageID();
                            handleDelete();
                            setVillageIDname(null);
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
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : null}
            {Servicesubname == 'Per Village' ? (
              <>
                {DistrictIda == DistrictId &&
                TalukaIda == TalukaId &&
                VillageIda == VillageId ? (
                  <TouchableOpacity style={styles.buttona}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      // onPress={}
                      onPress={() => {
                        if (!ServicesubTypeID) {
                          showErrorToastu('Please Select Auction For Name.');
                        } else if (!DistrictId) {
                          showErrorToastu('Please Select District Name.');
                        } else if (!TalukaId) {
                          showErrorToastu('Please Select Taluka Name.');
                        } else if (!VillageId) {
                          showErrorToastu('Please Select Village Name.');
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
                            position: 'top',
                            visibilityTime: 4000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 50,
                          });
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : null}
            {Servicesubname == 'AuctionAlert' ? (
              <TouchableOpacity
                style={styles.button}
                // onPress={}
                onPress={() => {
                  if (!ServicesubTypeID) {
                    showErrorToastu('Please Select Auction For Name.');
                  } else if (!DistrictId) {
                    showErrorToastu('Please Select District Name.');
                  } else if (!TalukaId) {
                    showErrorToastu('Please Select Taluka Name.');
                  } else if (!VillageId) {
                    showErrorToastu('Please Select Village Name.');
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
          </>
          <DeleteConfirmationModal
            isVisible={modalVisible}
            onDelete={handleDelete}
          />
          <Toast />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            textColor="black"
            minimumDate={new Date()} // Set the minimum date to today
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisiblea}
            mode="date"
            textColor="black"
            minimumDate={new Date()} // Set the minimum date to today
            onConfirm={handleConfirma}
            onCancel={hideDatePickera}
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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
    marginBottom: 10,
    marginTop: 20,
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
  buttona: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    marginTop: 30,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddTPServices;
