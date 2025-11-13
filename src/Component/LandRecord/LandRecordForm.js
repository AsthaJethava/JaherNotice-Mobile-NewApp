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
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import LandRecordState from '../LandRecord/LandRecordState.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePickerModala from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

function LandRecordForm({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    requestData();
  };

  const DeleteConfirmationModal = ({ isVisible, onDelete }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={'#b83725'} />
          </View>
        </View>
      </Modal>
    );
  };

  const [selectedState, setSelectedState] = useState();
  const [selectedStated, setselectedStated] = useState();
  const [selectedFlag, setselectedFlag] = useState();
  const [selectedStatecity, setSelectedStatecity] = useState();
  const [BaseDocumentType, setBaseDocumentType] = useState();
  const [state, setState] = useState();
  const [StateId, setStateID] = useState();
  const [AdhocServiceId, setAdhocServiceID] = useState();
  const [SurveyNo, setSurveyNo] = useState();
  const [TPNo, setTPNo] = useState();
  const [FPNo, setFPNo] = useState();
  const [Buildingno, setBuildingno] = useState();
  const [DistrictId, setDistrictID] = useState();
  const [TalukaId, setTalukaID] = useState();
  const [VillageId, setVillageID] = useState();
  const [WardId, setWardID] = useState();
  const [CitysurveyNo, setCitySurveyNo] = useState();
  const [CitySurveyOfficeId, setCitySurveyOfficeID] = useState();
  const [Societyname, setSocietyName] = useState();
  const [Subdivision, setSubdivision] = useState();
  const [City, setCity] = useState();
  const [PTSheet, setPTSheet] = useState();
  const [Chalta, setChalta] = useState();
  const [PlotNon, setPlotNo] = useState();
  const [AvedanNon, setAvedanNo] = useState();
  const [PrakaranNon, setPrakaranNo] = useState();
  const [RegionIDn, setRegionID] = useState();
  const [KhasraNon, setKhasraNo] = useState();
  const [CTS_Non, setCTS_No] = useState();
  const [SServicesname, setSServicesname] = useState();
  const [StateData, setStateData] = useState([]);
  const [Document, setDocument] = useState();
  const [Registrar, setRegistrar] = useState();
  const [Registration, setRegistration] = useState();
  const [YearOfRegistrationa, setYearOfRegistrationa] = useState();
  const [SocietyId, setsocietyId] = useState();
  const [KhataNo, setKhata_No] = useState();
  const [CopySentVia, setCopy_Sent_Via] = useState();
  const [Namereflect712, setname_reflect_7_12] = useState();
  const [Nondthtype, setnondth_type] = useState();
  const [Paymenttype, setpayment_type] = useState();
  const [Totalprice, settotal_price] = useState();
  const [AdminUserID, setAdminUser_Id] = useState();
  const [NodhNo, setNodh_No] = useState();
  const [Nondhcount, setnondh_count] = useState();

  useEffect(() => {
    State();
    ServicesList();
  }, []);

  useEffect(() => {
    if (selectedState) {
      districtList(selectedState);
      ReList(selectedState);
      dataDTV(selectedState);
      cityNamelist(selectedState);
      ServicesList(selectedState);
      State(selectedState);
      districtList();
      districtLista();
    }
  }, [selectedState]);
  useEffect(() => {
    if (RegionIDn) {
      districtLista(RegionIDn);
      // districtLista(RegionIDn);
    }
  }, [RegionIDn]);
  useEffect(() => {
    if (selectedStated) {
      CitySurveyofficeLista(selectedStated);
    }
  }, [selectedStated]);
  useEffect(() => {
    if (selectedStatecity) {
      wardList(selectedStatecity);
    }
  }, [selectedStatecity]);

  useEffect(() => {
    if (BaseDocumentType == 'Both') {
      State();
    }
  }, []);

  const State = stateID => {
    if (stateID == 6) {
      const StateDataaa = LandRecordState.datagoa.map(item => {
        return {
          key: item.BaseDocumentTypeID,
          value: item.BaseDocumentType,
          flag: item.Fleg,
        };
      });
      setStateData(StateDataaa);
    } else if (stateID == 7) {
      const StateDataa = LandRecordState.data.map(item => {
        return {
          key: item.BaseDocumentTypeID,
          value: item.BaseDocumentType,
          flag: item.Fleg,
        };
      });
      setStateData(StateDataa);
    } else if (stateID == 14) {
      const StateData = LandRecordState.datamp.map(item => {
        return {
          key: item.BaseDocumentTypeID,
          value: item.BaseDocumentType,
          flag: item.Fleg,
        };
      });
      setStateData(StateData);
    } else if (stateID == 15) {
      const StateData = LandRecordState.datamh.map(item => {
        return {
          key: item.BaseDocumentTypeID,
          value: item.BaseDocumentType,
          flag: item.Fleg,
        };
      });
      setStateData(StateData);
    }
  };

  useEffect(() => {
    fetch('https://qaapi.jahernotice.com/api/State')
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return { key: item.StateID, value: item.StateName };
        });
        setDatas(newArray);
        setDatasn(newArray);
        stateData();
        // State();
        // ServicesList();
        // districtList();
        setSelectedState();
        wardList();
        cityNamelist();
      })
      .catch(error => console.log('error=State', error));
  }, []);

  // State
  const [datas, setDatas] = useState([]);
  const [datasn, setDatasn] = useState([]);
  const stateData = () => {
    fetch(`https://qaapi.jahernotice.com/api/State`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return { key: item.StateID, value: item.StateName };
        });
        setDatas(newArray);
        setDatasn(newArray);
      })
      .catch(error => {
        console.log('error=State', error);
      });
  };

  // Services List
  const [Services, setServices] = useState([]);
  const [Servicess, setServicess] = useState([]);
  const ServicesList = stateID => {
    fetch(
      `https://qaapi.jahernotice.com/api/get/LRSServicesList/bystateID/${stateID}`,
    )
      .then(response => response.json())
      .then(result => {
        let newArray = result.result.map(item => {
          return {
            key: item.AdhocServiceID,
            value: item.AdhocService,
            keyn: item.BaseDocumentType,
            state: item.StateID,
            Servicesname: item.AdhocService,
          };
        });
        setServices(newArray);
        setServicess(newArray);
        // State();
        console.log(Services,"Services");
      })
      
      .catch(error => console.log('error=Service', error));
  };

  // City List
  const [CityNamelist, setCityName] = useState([]);
  const [CityNamelists, setCityNames] = useState([]);
  const cityNamelist = stateID => {
    fetch(`https://qaapi.jahernotice.com/api/get/Goacityname/${stateID}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.result.map(item => {
          return { key: item.CityID, value: item.CityName };
        });
        setCityName(newArray);
        setCityNames(newArray);
      })
      .catch(error => console.log('error=District', error));
  };

  // R
  const [RetList, setReList] = useState([]);
  const [RetLists, setReLists] = useState([]);
  const ReList = stateID => {
    fetch(`https://qaapi.jahernotice.com/api3/District/${stateID}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return {
            key: item.RegionID,
            value: item.DistrictName,
            // stateIDlist: item.stateID,
          };
        });
        setReList(newArray);
        setReLists(newArray);
        //
      })
      .catch(error => console.log('error=District', error));
  };
  // console.log(RetList);
  const [DistrictListsa, setDistrictListsa] = useState([]);
  const [DistrictLista, setDistrictLista] = useState([]);
  const districtLista = RegionIDn => {
    fetch(
      `https://qaapi.jahernotice.com/api3/District/${selectedState}/${RegionIDn}`,
    )
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return { key: item.DistrictID, value: item.DistrictName };
        });
        setDistrictLista(newArray);
        setDistrictListsa(newArray);
      })
      .catch(error => console.log('error=District', error));
  };
  // District List
  const [DistrictList, setDistrictList] = useState([]);
  const [DistrictLists, setDistrictLists] = useState([]);
  const districtList = stateID => {
    fetch(`https://qaapi.jahernotice.com/api3/District/${stateID}`)
      .then(response => response.json())
      .then(result => {
        let newArray = result.map(item => {
          return { key: item.DistrictID, value: item.DistrictName };
        });
        setDistrictList(newArray);
        setDistrictList(newArray);
      })
      .catch(error => console.log('error=District', error));
  };

  // CitySurveyofficeName
  const [CitySurveyofficeList, setCitySurveyofficeList] = useState([]);
  const [CitySurveyofficeLists, setCitySurveyofficeLists] = useState([]);
  const CitySurveyofficeLista = DistrictID => {
    fetch(
      `https://qaapi.jahernotice.com/api/get/CitySurveyOfficeName/${DistrictID}`,
    )
      .then(response => response.json())
      .then(result => {
        let newArray = result.result.map(item => {
          return {
            key: item.CitySurveyOfficeID,
            value: item.CitySurveyOfficeName,
          };
        });
        setCitySurveyofficeList(newArray);
        setCitySurveyofficeLists(newArray);
      })
      .catch(error => console.log('error=CityServiyOffice', error));
  };

  // Ward
  const [WardList, setwardList] = useState([]);
  const [WardListts, setwardLists] = useState([]);
  const wardList = CitySurveyOfficeID => {
    fetch(
      `https://qaapi.jahernotice.com/api/get/ListOfWard/byCitySurveyOfficeID/${CitySurveyOfficeID}`,
    )
      .then(response => response.json())
      .then(result => {
        let newArray = result.result.map(item => {
          return { key: item.WardID, value: item.WardName };
        });
        setwardList(newArray);
        setwardLists(newArray);
      })
      .catch(error => console.log('error=Ward', error));
  };

  // DTVLIST

  const [DTVNameListd, setDTVNameListd] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [PageNo, setPageNo] = useState(1);
  const [PageSize, setPageSize] = useState(600);

  const dataDTV = stateID => {
    fetch(
      `https://qaapi.jahernotice.com/api/get/LRS/villagedistricttaluka/${stateID}/${PageNo}/${PageSize}`,
    )
      .then(response => response.json())
      .then(result => {
        let newArray = result.result.map(item => ({
          key: [item.DistrictID, item.TalukaID, item.VillageID],
          value: item.VillageName,
        }));
        setDTVNameListd(prevData =>
          PageNo === 1 ? newArray : [...prevData, ...newArray],
        );
      })
      .catch(error => console.log('error=Service', error));
  };

  console.log(isDatePickerVisible);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState(
    'Select Document Registration Date',
  );
  const [selectYear, setSlectYear] = useState('Select Year of Registrationa*');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirma = date => {
    // DATE
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectDate(x1[2] + '/' + x1[1] + '/' + x1[0]);
    console.log('datata', dt);
    setRegistration(dt);
  };
  const handleConfirm = date => {
    // YESR
    const dt = new Date(date);
    const year = dt.getFullYear();
    setSlectYear(year);
    setYearOfRegistrationa(JSON.stringify(year));
    console.log(year.toString());
    hideDatePicker();
  };
  console.log('Registration', YearOfRegistrationa, Registration);

  const [isDatePickerVisiblea, setDatePickerVisibilitya] = useState(false);
  const [selectedYeara, setSelectedYeara] = useState(null);

  const showDatePickera = () => {
    setDatePickerVisibilitya(true);
  };

  const hideDatePickera = () => {
    setDatePickerVisibilitya(false);
  };

  const requestData = async () => {
    setModalVisible(true);
    let Userid = await AsyncStorage.getItem('UserID');
    const requestData = {
      UserID: Userid,
      StateID: StateId,
      AdhocServiceID: AdhocServiceId,
      Survey_No: SurveyNo,
      TP_No: TPNo,
      FP_No: FPNo,
      BuildingNo: Buildingno,
      DistrictID: DistrictId,
      TalukaID: TalukaId,
      VillageID: VillageId,
      WardID: WardId,
      CitySurveyNo: CitysurveyNo,
      CitySurveyOfficeID: CitySurveyOfficeId,
      SocietyName: Societyname,
      societyId: SocietyId,
      Khata_No: KhataNo,
      Subdivision: Subdivision,
      CityID: City,
      PT_Sheet_Number: PTSheet,
      ChaltaNumber: Chalta,
      Copy_Sent_Via: CopySentVia,
      name_reflect_7_12: Namereflect712,
      nondth_type: Nondthtype,
      payment_type: Paymenttype,
      total_price: Totalprice,
      AdminUser_Id: AdminUserID,
      Nodh_No: NodhNo,
      nondh_count: Nondhcount,
      PlotNo: PlotNon,
      AvedanNo: AvedanNon,
      PrakaranNo: PrakaranNon,
      RegionID: RegionIDn,
      KhasraNo: KhasraNon,
      CTS_No: CTS_Non,
      DocumentNo: Document,
      SubRegisterOffice: Registrar,
      DocumentRegistrationDate: Registration,
      YearOfRegistration: YearOfRegistrationa,
    };

    console.log(requestData);
    fetch(`https://qaapi.jahernotice.com/api/add/LRS_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          console.log('Rresponse data', result.data);
          console.log(result.status);
          navigation.navigate('LandRecord');
          setModalVisible(false);
          return Toast.show({
            type: 'success', // or 'error', 'info', 'warning'
            text1: `Your Request has been Successfully Submitted.'`,
            position: 'bottom', // 'top' or 'bottom'
            visibilityTime: 4000, // ms
            autoHide: true,
            topOffset: 30,
            bottomOffset: 50,
          });
        } else {
          console.log(result.status);
        }
      })
      .catch(error => console.log('error==data', error));
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.lable}>Select State Name*</Text>
          <SelectList
            setSelected={selectedValue => {
              setSelectedState(selectedValue);
              console.log(selectedValue);
              setStateID(selectedValue);
              setSServicesname();
            }}
            save="key"
            data={datas}
            placeholder={'Select State Name*'}
            boxStyles={{
              // marginTop: 20,
              borderRadius: 5,
              borderColor: '#c0c0c0',
            }}
            dropdownStyles={{
              backgroundColor: '#f8f8ff',
              borderColor: '#c0c0c0',
            }}
            defaultValue={'Select State Name*'}
            onSearch={search => {
              if (search.length >= 3) {
                return datas.filter(item =>
                  item.toLowerCase().includes(search.toLowerCase()),
                );
              } else {
                return [];
              }
            }}
          />
          <Text style={styles.lable}>Select Service Name*</Text>
          <SelectList
            setSelected={selectedValue => {
              State();
              const selectedService = Services.find(
                item => item.key === selectedValue,
              );
              setBaseDocumentType(selectedService.keyn);
              setState(selectedService.state);
              setselectedFlag(selectedService.keyn);
              setSServicesname(selectedService.Servicesname);
              setAdhocServiceID(selectedValue);
            }}
            save="key"
            data={Services}
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
                return Services.filter(item =>
                  item.toLowerCase().includes(search.toLowerCase()),
                );
              } else {
                return [];
              }
            }}
          />
          {BaseDocumentType == 'Both' ? (
            <>
              <Text style={styles.lable}>Select Base Document Type*</Text>
              <SelectList
                setSelected={selectedValue => {
                  console.log(selectedValue);
                  // setselectedFlag(selectedValue.flag);
                  const selectedFlag = StateData.find(
                    item => item.key === selectedValue,
                  )?.flag;
                  if (selectedFlag === '7/12') {
                    setselectedFlag(selectedFlag);
                    console.log('ygjgj', selectedFlag);
                  } else if (selectedFlag === 'Property Card') {
                    setselectedFlag(selectedFlag);
                    console.log('hgjhgj', selectedFlag);
                  }
                }}
                save="key"
                data={StateData}
                placeholder={'Select Base Document Type*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Base Document Type*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return StateData.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
            </>
          ) : null}

          {/* GUJRAT */}
          {console.log('okoko', selectedFlag)}
          {state === 7 && selectedFlag === '7/12' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Survey Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Survey Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSurveyNo(filteredTexts);
                }}
              />
              <Text style={styles.lable}>Enter TP Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter TP Number*"
                value={TPNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextt = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setTPNo(filteredTextt);
                }}
              />
              <Text style={styles.lable}>Enter FP Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter FP Number*"
                value={FPNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextf = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setFPNo(filteredTextf);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
                // /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!SurveyNo) {
                    showErrorToast('Please Enter Survey No.');
                  } else if (!TPNo) {
                    showErrorToast('Please Enter TP No.');
                  } else if (!FPNo) {
                    showErrorToast('Please Enter FP No.');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast('Please Enter Society Name.');
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                      text2: '', // Set text2 to an empty string to show full message
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}

          {state === 7 && selectedFlag === 'Property Card' && (
            <>
              <Text style={styles.lable}>Select District Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue);
                }}
                save="key"
                data={DistrictList}
                placeholder={'Select District Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select District Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return DistrictList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Select City Survey office Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setSelectedStatecity(selectedValue);
                  console.log(selectedValue);
                  setCitySurveyOfficeID(selectedValue);
                }}
                save="key"
                data={CitySurveyofficeList}
                placeholder={'Select City Survey office Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select City Survey office Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return CitySurveyofficeList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Select Ward Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  // setSelectedState(selectedValue);
                  console.log(selectedValue);
                  setWardID(selectedValue);
                }}
                save="key"
                data={WardList}
                placeholder={'Select Ward Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Ward Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return WardList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Enter city Survey No.*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city Survey No.*"
                value={CitysurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextcsn = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setCitySurveyNo(filteredTextcsn);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextbbsf = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextbbsf);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                // onPress={}
                onPress={() => {
                  // Validate each field
                  if (!StateId) {
                    showErrorToastu('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToastu('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToastu('Please Select District Name.');
                  } else if (!CitySurveyOfficeId) {
                    showErrorToastu('Please Select City Survey Office Name.');
                  } else if (!WardId) {
                    showErrorToastu('Please Select Ward.');
                  } else if (!CitysurveyNo) {
                    showErrorToastu('Please Enter Survey No.');
                  } else if (!Buildingno) {
                    showErrorToastu(
                      'Please Enter Building/Block/Shed/Flat No.',
                    );
                  } else if (!Societyname) {
                    showErrorToastu('Please Enter Society Name.');
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
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {/* GOA */}
          {state === 6 && selectedFlag === '7/12' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Survey Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Survey Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSurveyNo(filteredTexts);
                }}
              />
              <Text style={styles.lable}>Enter Subdivision Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Subdivision Number*"
                value={TPNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextt = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSubdivision(filteredTextt);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!SurveyNo) {
                    showErrorToast('Please Enter Survey/Get No.*');
                  } else if (!Subdivision) {
                    showErrorToast('Please Enter Subdivision No.');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name*',
                    );
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}

          {state === 6 && selectedFlag === 'Property Card' && (
            <>
              <Text style={styles.lable}>Select City Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setCity(selectedValue);
                  console.log(selectedValue);
                }}
                save="key"
                data={CityNamelist}
                placeholder={'Select City Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select City Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />

              <Text style={styles.lable}>Enter PT Sheet Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter PT Sheet Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setPTSheet(filteredTexts);
                }}
              />
              <Text style={styles.lable}>Enter Chalta Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Chalta Number*"
                value={TPNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextt = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setChalta(filteredTextt);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!City) {
                    showErrorToast('Please Select City Name.*');
                  } else if (!PTSheet) {
                    showErrorToast('Please Enter PT Sheet Number.*');
                  } else if (!Chalta) {
                    showErrorToast('Please Enter  Chalta Number.*');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name*',
                    );
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {/*  MH */}
          {state === 15 && selectedFlag === '7/12' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Survey/Get Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Survey/Get Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSurveyNo(filteredTexts);
                }}
              />
              {SServicesname == 'Dastavej / Sales Deed' && (
                <>
                  <Text style={styles.lable}>Enter Document Number</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter Document Number"
                    value={Document}
                    maxLength={10}
                    onChangeText={text => {
                      const filteredTexts = text.replace(
                        /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                        '',
                      );
                      setDocument(filteredTexts);
                    }}
                  />
                  <Text style={styles.lable}>Enter Register office</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Register office"
                    value={Registrar}
                    onChangeText={text => {
                      const filteredTexts = text.replace(
                        /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                        '',
                      );
                      setRegistrar(filteredTexts);
                    }}
                  />
                  <Text style={styles.lable}>
                    Select Document Registration Date
                  </Text>
                  <TouchableOpacity
                    style={styles.inputa}
                    onPress={showDatePickera}
                  >
                    <Text>{selectDate}</Text>
                    <Icon
                      name="calendar"
                      size={20}
                      color="#000"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </>
              )}
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // Common validations
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!SurveyNo) {
                    showErrorToast('Please Enter Survey/Get No.*');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name*',
                    );
                  } else {
                    handleDelete();
                  }

                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {state === 15 && selectedFlag === 'Property Card' && (
            <>
              <Text style={styles.lable}>Select Region (Vibhaag) Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setRegionID(selectedValue);
                  // const selectedServicea = Services.find(
                  //   item => item.key === selectedValue,
                  // );
                  // console.log('qqqq', selectedServicea.stateIDlist);
                }}
                save="key"
                data={RetList}
                placeholder={'Select Region (Vibhaag) Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Region (Vibhaag) Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return RetList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Select District Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue);
                }}
                save="key"
                data={DistrictLista}
                placeholder={'Select District Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select District Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return DistrictLista.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Select City Survey office Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setSelectedStatecity(selectedValue);
                  console.log(selectedValue);
                  setCitySurveyOfficeID(selectedValue);
                }}
                save="key"
                data={CitySurveyofficeList}
                placeholder={'Select City Survey office Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select City Survey office Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return CitySurveyofficeList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>Select Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  // setSelectedState(selectedValue);
                  console.log(selectedValue);
                  setWardID(selectedValue);
                }}
                save="key"
                data={WardList}
                placeholder={'Select Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Village Name*'}
                onSearch={search => {
                  if (search.length >= 3) {
                    return WardList.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              />
              <Text style={styles.lable}>
                Enter Nagar Bhumapan Kramank/CTC No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Nagar Bhumapan Kramank/CTC No.*"
                value={CitysurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextcsn = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setCTS_No(filteredTextcsn);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextbbsf = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextbbsf);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                // onPress={}
                onPress={() => {
                  // Validate each field
                  if (!StateId) {
                    showErrorToastu('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToastu('Please Select Service Name.');
                  } else if (!RegionIDn) {
                    showErrorToastu(
                      'Please Select Select Region (Vibhaag) Name.',
                    );
                  } else if (!DistrictId) {
                    showErrorToastu('Please Select District Name.');
                  } else if (!CitySurveyOfficeId) {
                    showErrorToastu('Please Select City Survey Office Name.');
                  } else if (!WardId) {
                    showErrorToastu('Please Select Village Name.');
                  } else if (!CTS_Non) {
                    showErrorToastu(
                      'Please Enter Nagar Bhumapan Kramank/CTC No.',
                    );
                  } else if (!Buildingno) {
                    showErrorToastu(
                      'Please Enter Building/Block/Shed/Flat No.',
                    );
                  } else if (!Societyname) {
                    showErrorToastu(
                      'Please Enter Society/Sector/Bungalow/Building Name.',
                    );
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
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {/* MP */}
          {/* Khasra-P2 == Khatauni-B1 == Bhu-Adhikar Pustika*/}
          {state === 14 &&
            (SServicesname === 'Khasra-P2' ||
              SServicesname === 'Khatauni-B1' ||
              SServicesname === 'Bhu-Adhikar Pustika') && (
              <>
                <Text style={styles.lable}>
                  Select Pin Code / Village Name*
                </Text>
                <SelectList
                  setSelected={selectedValue => {
                    setselectedStated(selectedValue);
                    console.log(selectedValue);
                    setDistrictID(selectedValue[0]);
                    setTalukaID(selectedValue[1]);
                    setVillageID(selectedValue[2]);
                  }}
                  save="key"
                  data={DTVNameListd}
                  placeholder={'Select Pin Code / Village Name*'}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  defaultValue={'Select Pin Code / Village Name*'}
                  onSearch={search => {
                    setSearchValue(search);
                    dataDTV();
                    setPageNo(PageNo + 1);
                    setPageSize(PageSize + 30);
                    if (search.length >= 3) {
                      fetchData(search);
                    }
                  }}
                />
                <Text style={styles.lable}>Enter Khasra Number*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Khasra Number*"
                  value={SurveyNo}
                  maxLength={10}
                  onChangeText={text => {
                    const filteredTexts = text.replace(
                      /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                      '',
                    );
                    setKhasraNo(filteredTexts);
                  }}
                />
                <Text style={styles.lable}>
                  Enter Building/Block/Shed/Flat No.*
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Building/Block/Shed/Flat No.*"
                  value={Buildingno}
                  maxLength={10}
                  onChangeText={text => {
                    const filteredTextb = text.replace(
                      /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                      '',
                    );
                    setBuildingno(filteredTextb);
                  }}
                />
                <Text style={styles.lable}>
                  Enter Society/Sector/Bungalow/Building Name*
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Society/Sector/Bungalow/Building Name*"
                  value={Societyname}
                  onChangeText={text => {
                    const filteredTextso = text.replace(
                      /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                      '',
                    );
                    setSocietyName(filteredTextso);
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (!StateId) {
                      showErrorToast('Please Select State.');
                    } else if (!AdhocServiceId) {
                      showErrorToast('Please Select Service Name.');
                    } else if (!DistrictId) {
                      showErrorToast('Please Select Pin Code / Village Name.');
                    } else if (!KhasraNon) {
                      showErrorToast('Please Enter Khasra No.*');
                    } else if (!Buildingno) {
                      showErrorToast(
                        'Please Enter Building/Block/Shed/Flat No.',
                      );
                    } else if (!Societyname) {
                      showErrorToast(
                        'Please Enter Society/Sector/Bungalow/Building Name*',
                      );
                    } else {
                      handleDelete();
                    }
                    function showErrorToast(message) {
                      Toast.show({
                        type: 'error',
                        text1: message,
                        position: 'bottom',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 50,
                        bottomOffset: 50,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
                </TouchableOpacity>
              </>
            )}
          {/* Abdhikar Adhilekh */}
          {state === 14 && SServicesname == 'Adhikar Abhilekh' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Plot Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Plot Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setPlotNo(filteredTexts);
                }}
              />
              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!PlotNon) {
                    showErrorToast('Please Enter Plot No.*');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name*',
                    );
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {/* Court order Copy */}
          {state === 14 && SServicesname == 'Court Order Copy' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Khasra Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Khasra Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setKhasraNo(filteredTexts);
                }}
              />
              <Text style={styles.lable}>Enter Prakaran Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Prakaran Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setPrakaranNo(filteredTexts);
                }}
              />
              <Text style={styles.lable}>Enter Avedan Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Avedan Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setAvedanNo(filteredTexts);
                }}
              />

              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  //
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!KhasraNon) {
                    showErrorToast('Please Enter Khasra No.*');
                  } else if (!PrakaranNon) {
                    showErrorToast('Please Enter Prakaran No.*');
                  } else if (!AvedanNon) {
                    showErrorToast('Please Enter Avedan No.*');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name*',
                    );
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}
          {/* Dastavej/Sales Ded */}
          {state === 14 && SServicesname == 'Dastavej / Sales Deed' && (
            <>
              <Text style={styles.lable}>Select Pin Code / Village Name*</Text>
              <SelectList
                setSelected={selectedValue => {
                  setselectedStated(selectedValue);
                  console.log(selectedValue);
                  setDistrictID(selectedValue[0]);
                  setTalukaID(selectedValue[1]);
                  setVillageID(selectedValue[2]);
                }}
                save="key"
                data={DTVNameListd}
                placeholder={'Select Pin Code / Village Name*'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                defaultValue={'Select Pin Code / Village Name*'}
                onSearch={search => {
                  setSearchValue(search);
                  dataDTV();
                  setPageNo(PageNo + 1);
                  setPageSize(PageSize + 30);
                  if (search.length >= 3) {
                    fetchData(search);
                  }
                }}
              />
              <Text style={styles.lable}>Enter Khasra Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Khasra Number*"
                value={SurveyNo}
                maxLength={10}
                onChangeText={text => {
                  const filteredTexts = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setKhasraNo(filteredTexts);
                }}
              />

              {/* <TouchableOpacity style={styles.inputa} onPress={showDatePicker}> */}

              {/* </TouchableOpacity> */}
              {/* <TouchableOpacity style={styles.inputa} onPress={showDatePickera}>
                <Text>{selectedYeara || 'Select Year'}</Text>
                <Icon
                  name="calendar"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              </TouchableOpacity> */}
              <Text style={styles.lable}>Select Year of Registrationa*</Text>
              <TouchableOpacity style={styles.inputa} onPress={showDatePicker}>
                <Text>{selectYear}</Text>
                <Icon
                  name="calendar"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              </TouchableOpacity>

              <Text style={styles.lable}>
                Enter Building/Block/Shed/Flat No.*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building/Block/Shed/Flat No.*"
                value={Buildingno}
                maxLength={10}
                onChangeText={text => {
                  const filteredTextb = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setBuildingno(filteredTextb);
                }}
              />
              <Text style={styles.lable}>
                Enter Society/Sector/Bungalow/Building Name*
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Society/Sector/Bungalow/Building Name*"
                value={Societyname}
                onChangeText={text => {
                  const filteredTextso = text.replace(
                    /^[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                    '',
                  );
                  setSocietyName(filteredTextso);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!StateId) {
                    showErrorToast('Please Select State.');
                  } else if (!AdhocServiceId) {
                    showErrorToast('Please Select Service Name.');
                  } else if (!DistrictId) {
                    showErrorToast('Please Select Pin Code / Village Name.');
                  } else if (!KhasraNon) {
                    showErrorToast('Please Enter Khasra No.');
                  } else if (!Buildingno) {
                    showErrorToast('Please Enter Building/Block/Shed/Flat No.');
                  } else if (!Societyname) {
                    showErrorToast(
                      'Please Enter Society/Sector/Bungalow/Building Name.',
                    );
                  } else {
                    handleDelete();
                  }
                  function showErrorToast(message) {
                    Toast.show({
                      type: 'error',
                      text1: message,
                      position: 'bottom',
                      visibilityTime: 4000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 50,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>REQUEST LAND RECORD</Text>
              </TouchableOpacity>
            </>
          )}

          <DeleteConfirmationModal
            isVisible={modalVisible}
            onDelete={handleDelete}
          />
          <Toast/>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            textColor="black"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="year" // Show only the year
            dateFormat="YYYY" // Customize the display format
          />
          <DateTimePickerModala
            isVisible={isDatePickerVisiblea}
            mode="date"
            textColor="black"
            onConfirm={handleConfirma}
            onCancel={hideDatePickera}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 4,
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
});

export default LandRecordForm;
