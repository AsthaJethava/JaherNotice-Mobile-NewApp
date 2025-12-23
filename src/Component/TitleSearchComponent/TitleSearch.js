import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  LogBox,
  Appearance,
  ToastAndroid,
  StatusBar,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ActivityIndicator, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';

// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const titelSearchha = ({ navigation, route }) => {
  const [villageQueryR, setVillageQueryR] = useState('');
  const [showSuggestionsR, setShowSuggestionsR] = useState(false);
  const [villageQueryU, setVillageQueryU] = useState('');
  const [showSuggestionsU, setShowSuggestionsU] = useState(false);
  const [vilagetalukadistrictdatad, setvilagetalukadistrictdatad] = useState(
    'Select Village, Taluka, District',
  );
  const [surveynodatasnod, setsurveynodatasnod] = useState('Select Survey No.');
  const [tpnodatatnod, settpnodatatnod] = useState('Select TP No.');
  const [fpnodatafnod, setfpnodatafnod] = useState('Select FP No.');
  const [buildingnodatabnod, setbuildingnodatabnod] = useState(
    'Select Building No.',
  );
  const [societydatasonod, setsocietydatasonod] = useState('Select Society');

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);

  const [showSurveyNoDropdown, setShowSurveyNoDropdown] = useState(true); // State to control Survey No. drop-down
  const [showTPNoDropdown, setShowTPNoDropdown] = useState(false); // State to control TP No. drop-down
  const [showFPNoDropdown, setShowFPNoDropdown] = useState(false); // State to control FP No. drop-down
  const [showBuildingNoDropdown, setShowBuildingNoDropdown] = useState(false); // State to control Building No. drop-down
  const [showSocietyDropdown, setShowSocietyDropdown] = useState(false); // State to control Society drop-down
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('TitleSearch');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const [showDonationSuccessPopup, setShowDonationSuccessPopup] =
    useState(false);
  const [showDonationErrPopup401, setShowDonationErrPopup401] = useState(false);
  // VILLAGE-TALUKA-DISTRICT
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  const [search, setSearch] = useState();
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [Dataelse, setDataelse] = useState([]);
  const [vilagetalukadistrictdataa, setvilagetalukadistrictdataa] =
    useState('');
  const searchRef = useRef();
  const [isLoding, setisLoding] = useState(false);

  useEffect(() => {
    const { vilagetalukadistrictdataaName, vilagetalukadistrictdataa } =
      route.params;
    setnewData(vilagetalukadistrictdataaName);
    console.log('neroute', vilagetalukadistrictdataaName);
  }, []);
  // const onSearch = search => {
  //   setSearch(search);
  //   if (search !== '') {
  //     let tempData = Dataelse.filter(item => {
  //       return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
  //     });
  //     setData(tempData);
  //   } else {
  //     setData(Dataelse);
  //   }
  // };
  const onSearch = searchs => {
    if (searchs !== '') {
      let tempDatas = datas.filter(item => {
        return (
          typeof item === 'string' &&
          item.toLowerCase().indexOf(searchs.toLowerCase()) > -1
        );
      });
      setDatas(tempDatas);
    } else {
      setDatas(Dataelses);
    }
  };
  const [datas, setDatas] = useState([]);
  const [datasn, setDatasn] = useState([]);
  const [datasdtv, setdatasdtv] = useState([]);
  const [datasdtva, setdatasdtva] = useState([]);
  useEffect(() => {
    dataList();
    dataListU();
  }, []);
  const [placeholderValue, setPlaceholderValue] =
    useState('Type 3+ letters...');
  // https://qaapi.jahernotice.com/api2/get/ward/citysurveyoffice/distict/553105?searchKey=ahemdabad
  const [Stateid, setStateId] = useState();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const dataList = useCallback(
    async (q = '') => {
      let Userid = await AsyncStorage.getItem('UserID');
      const filterToken = q.toLowerCase();
      if (typeof q !== 'string' || q.length < 3) {
        setSuggestionsList(null);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `https://qaapi.jahernotice.com/api/get/village/taluka/district/${Userid}?searchKey=${q}`,
        );
        const data = await response.json();

        if (data && data.status === 200) {
          const suggestions = data.data.map(item => ({
            value: item,
          }));
          setdatasdtv(suggestions);
          setdatasdtva(suggestions);
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
  const handleCrossButtonPress = useCallback(() => {
    onClearPress();
  }, []);
  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => {
    // Handle any actions on suggestions list open/close
  }, []);
  // const dataList = async () => {
  //   let Userid = await AsyncStorage.getItem('UserID');
  //   fetch(
  //     `https://qaapi.jahernotice.com/api/get/village/taluka/district/553107`,
  //   )
  //     .then(response => response.json())
  //     .then(result => {
  // let newArray = result.data.map(item => {
  //   return {key: item, value: item};
  // });
  // setdatasdtv(newArray);
  // setdatasdtva(newArray);
  //     })
  //     .catch(error => console.log('error', error));
  // };
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtPlaceholder, setDistrictPlaceholder] = useState(
    'Select Village, Taluka, District',
  );
  // const dataFetch = async () => {
  // let Userid = await AsyncStorage.getItem('UserID');
  // fetch(
  //   `https://qaapi.jahernotice.com/api/get/village/taluka/district/${Userid}`,
  // )
  //   .then(response => response.json())
  //   .then(result => {
  //     let newArray = result.data.map(item => {
  //       return {key: item, value: item};
  //     });
  //     setDatas(newArray);
  //     setDatasn(newArray);
  //     setIsLoadingae(false);
  //   })
  //   .catch(error => console.log('error', error));
  // };

  const [refreshCountervtd, setRefreshCountervtd] = useState(0);
  const handleItemSelectionvtd = item => {
    if (item === '') {
      setvilagetalukadistrictdatad('Select Village, Taluka, District');
    } else {
      // Handle other item selection
      setvilagetalukadistrictdataa(item);
      setClicked(!clicked);
      onSearch('');
      setSearch('');
      tableDatas();
    }
  };
  const handleCrossPresvtd = () => {
    setClicked(!clicked);
    setRefreshCountervtd(refreshCountervtd + 1); // Increment the refreshCounter to force re-render
  };

  const handleSurveyNoSelect = vels => {
    setsurveynodatas(vels);
    tableDatat();
    setShowSurveyNoDropdown(false); // Close the Survey No. drop-down
    // console.log('okay');
  };

  // SURVEY NUMBER
  const [isHiddens, setIsHiddens] = useState(false);
  const [isHiddends, setIsHiddends] = useState(false);
  const [searchs, setSearchs] = useState();
  const [clickeds, setClickeds] = useState(false);
  const [Dataelses, setDataelses] = useState([]);
  const [surveynodatas, setsurveynodatas] = useState('');
  const [isLodings, setisLodings] = useState(false);
  const [isLodingsU, setisLodingsU] = useState(false);
  const searchsRef = useRef();

  const onSearchs = searchs => {
    if (searchs !== '') {
      let tempDatas = datas.filter(item => {
        return item.toLowerCase().indexOf(searchs.toLowerCase()) > -1;
      });
      setDatas(tempDatas);
    } else {
      setDatas(Dataelses);
    }
  };

  const tableDatas = item => {
    setisLodings(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatas', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/surveyno?area=${selectedDistrict}`,
    )
      .then(async function (response) {
        responseClone = response.clone();

        if (!response.ok) {
          const text = await responseClone.text();
          console.log('SERVER HTML ERROR:', text);
          return;
        }

        return responseClone.json();
      })
      .then(function (rejectionReason) {
        //data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrays = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatas(newArrays);
          setDataelses(newArrays);
          setisLodings(false);
          // if (rejectionReason.data.length === 0) {
          //   setDatas(null);
          //   setDataelses(null);
          //   setisLodings(false);
          //   setIsHiddens(true);
          //   setIsHiddends(false);
          // } else {
          //   let newArrays = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDatas(newArrays);
          //   setDataelses(newArrays);
          //   setisLodings(false);
          //   setIsHiddens(false);
          //   setIsHiddends(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelections = item => {
    if (item === '') {
      setsurveynodatasnod('Select Survey No.');
    } else {
      // Handle other item selection
      setsurveynodatas(item);
      setClickeds(!clickeds);
      onSearchs('');
      setSearchs('');
      tableDatat();
      searchsRef.current.clear();
    }
  };
  const [refreshCounters, setRefreshCounters] = useState(0);
  const handleItemSelectionsss = item => {
    if (item === '') {
      setsurveynodatasnod('Select Survey No.');
    } else {
      // Handle other item selection
      setsurveynodatas(item);
      setClickeds(!clickeds);
      onSearchs('');
      setSearchs('');
      tableDatat();
    }
  };

  const handleCrossPresss = () => {
    setClickeds(!clickeds);
    setRefreshCounters(refreshCounters + 1); // Increment the refreshCounter to force re-render
  };

  const handleTPNoSelect = velt => {
    settpnodatat(velt);
    tableDataf();
    setShowTPNoDropdown(false); // Close the TP No. drop-down
    // console.log('okay');
  };

  // TPNO
  const [isHiddent, setIsHiddent] = useState(false);
  const [isHiddendt, setIsHiddendt] = useState(false);
  const [searcht, setSearcht] = useState();
  const [clickedt, setClickedt] = useState(false);
  const [datat, setDatat] = useState([]);
  const [datatn, setDatatn] = useState([]);
  const [Dataelset, setDataelset] = useState([]);
  const [tpnodatat, settpnodatat] = useState('');
  const searchtRef = useRef();
  const [isLodingt, setisLodingt] = useState(false);
  const onSearcht = searcht => {
    if (searcht !== '') {
      let tempDatat = datat.filter(item => {
        return item.toLowerCase().indexOf(searcht.toLowerCase()) > -1;
      });
      setDatat(tempDatat);
    } else {
      setDatat(Dataelset);
    }
  };
  const tableDatat = async item => {
    setisLodingt(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatat', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/tpno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayt = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatat(newArrayt);
          setDataelset(newArrayt);
          setisLodingt(false);
          // if (rejectionReason.data.length === 0) {
          //   setDatat(null);
          //   setDataelset(null);
          //   setisLodingt(false);
          //   setIsHiddent(true);
          //   setIsHiddendt(false);
          // } else {
          // let newArrayt = rejectionReason.data.map(item => {
          //   return {key: item, value: item};
          // });
          // setDatat(newArrayt);
          // setDataelset(newArrayt);
          // setisLodingt(false);
          //   setIsHiddent(false);
          //   setIsHiddendt(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };
  const handleItemSelectiont = item => {
    if (item === '') {
      settpnodatatnod('Select TP No.');
    } else {
      // Handle other item selection
      settpnodatat(item);
      setClickedt(!clickedt);
      onSearcht('');
      setSearcht('');
      tableDataf();
      searchtRef.current.clear();
    }
  };
  const [refreshCountert, setRefreshCountert] = useState(0);
  const handleItemSelectiontt = item => {
    if (item === '') {
      settpnodatatnod('Select TP No.');
    } else {
      // Handle other item selection
      settpnodatat(item);
      setClickedt(!clickedt);
      onSearcht('');
      setSearcht('');
      tableDataf();
      searchtRef.current.clear();
    }
  };
  const handleCrossPrest = () => {
    setClickedt(!clickedt);
    setRefreshCountert(refreshCountert + 1); // Increment the refreshCounter to force re-render
  };

  const handleFPNoSelect = velf => {
    setfpnodataf(velf);
    tableDatab();
    setShowFPNoDropdown(false); // Close the FP No. drop-down
    // console.log('okay');
  };
  // FPNO
  const [isHiddenf, setIsHiddenf] = useState(false);
  const [isHiddendf, setIsHiddendf] = useState(false);
  const [isLodingf, setisLodingf] = useState(false);
  const [searchf, setSearchf] = useState();
  const [clickedf, setClickedf] = useState(false);
  const [dataf, setDataf] = useState([]);
  const [Dataelsef, setDataelsef] = useState([]);
  const [fpnodataf, setfpnodataf] = useState('');
  const searchfRef = useRef();
  const onSearchf = searchf => {
    if (searchf !== '') {
      let tempDataf = dataf.filter(item => {
        return item.toLowerCase().indexOf(searchf.toLowerCase()) > -1;
      });
      setDataf(tempDataf);
    } else {
      setDataf(Dataelsef);
    }
  };
  const tableDataf = async item => {
    setisLodingf(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDataf', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/fpno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayf = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDataf(newArrayf);
          setDataelsef(newArrayf);
          setisLodingf(false);
          // if (rejectionReason.data.length === 0) {
          //   setDataf(null);
          //   setDataelsef(null);
          //   setisLodingf(false);
          //   setIsHiddenf(true);
          //   setIsHiddendf(false);
          // } else {
          //   let newArrayf = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDataf(newArrayf);
          //   setDataelsef(newArrayf);
          //   setisLodingf(false);
          //   setIsHiddenf(false);
          //   setIsHiddendf(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionf = item => {
    if (item === '') {
      setfpnodatafnod('Select FP No.');
    } else {
      // Handle other item selection
      setfpnodataf(item);
      setClickedf(!clickedf);
      onSearchf('');
      setSearchf('');
      tableDataf();
      searchfRef.current.clear();
    }
  };
  const [refreshCounterf, setRefreshCounterf] = useState(0);
  const handleItemSelectionff = item => {
    if (item === '') {
      setfpnodatafnod('Select FP No.');
    } else {
      // Handle other item selection
      setfpnodataf(item);
      setClickedf(!clickedf);
      onSearchf('');
      setSearchf('');
      tableDataf();
    }
  };
  const handleCrossPresf = () => {
    setClickedf(!clickedf);
    setRefreshCounterf(refreshCounterf + 1); // Increment the refreshCounter to force re-render
  };

  const handleBuildingNoSelect = velb => {
    setbuildingnodatab(velb);
    tableDataso();
    setShowBuildingNoDropdown(false); // Close the Building No. drop-down
    // console.log('okay');
  };

  // BUILDING NO
  const [isHiddenb, setIsHiddenb] = useState(false);
  const [isHiddendb, setIsHiddendb] = useState(false);
  const [searchb, setSearchb] = useState();
  const [clickedb, setClickedb] = useState(false);
  const [datab, setDatab] = useState([]);
  const [Dataelseb, setDataelseb] = useState([]);
  const [buildingnodatab, setbuildingnodatab] = useState('');
  const searchbRef = useRef();
  const [isLodingb, setisLodingb] = useState(false);
  const onSearchb = searchb => {
    if (searchb !== '') {
      let tempDatab = datab.filter(item => {
        return item.toLowerCase().indexOf(searchb.toLowerCase()) > -1;
      });
      setDatab(tempDatab);
    } else {
      setDatab(Dataelseb);
    }
  };
  const tableDatab = async item => {
    setisLodingb(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatab', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/building?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayb = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatab(newArrayb);
          setDataelseb(newArrayb);
          // if (rejectionReason.data.length === 0) {
          //   setDatab(rejectionReason.data);
          //   setDataelseb(rejectionReason.data);
          //   setisLodingb(false);
          //   setIsHiddenb(true);
          //   setIsHiddendb(false);
          // } else {
          //   let newArrayb = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDatab(newArrayb);
          //   setDataelseb(newArrayb);
          //   setisLodingb(false);
          //   setIsHiddenb(false);
          //   setIsHiddendb(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionb = item => {
    if (item === '') {
      setbuildingnodatabnod('Select Building No.');
    } else {
      // Handle other item selection
      setbuildingnodatab(item);
      setClickedb(!clickedb);
      onSearchb('');
      setSearchb('');
      tableDatab();
      searchbRef.current.clear();
    }
  };
  const [refreshCounterb, setRefreshCounterb] = useState(0);
  const handleItemSelectionbb = item => {
    if (item === '') {
      setbuildingnodatabnod('Select Building No.');
    } else {
      // Handle other item selection
      setbuildingnodatab(item);
      setClickedb(!clickedb);
      onSearchb('');
      setSearchb('');
      tableDatab();
    }
  };
  const handleCrossPresb = () => {
    setClickedb(!clickedb);
    setRefreshCounterb(refreshCounterb + 1); // Increment the refreshCounter to force re-render
  };

  const handleSocietySelect = velso => {
    setsocietydataso(velso);
    setShowSocietyDropdown(false); // Close the Society drop-down
    // console.log('okay');
  };
  // SOCIETY
  const [isHiddenso, setIsHiddenso] = useState(false);
  const [isHiddendso, setIsHiddendso] = useState(false);
  const [isLodingso, setisLodingso] = useState(false);
  const [searchso, setSearchso] = useState();
  const [clickedso, setClickedso] = useState(false);
  const [dataso, setDataso] = useState([]);
  const [Dataelseso, setDataelseso] = useState([]);
  const [societydataso, setsocietydataso] = useState('');
  const searchsoRef = useRef();
  const onSearchso = searchso => {
    if (searchso !== '') {
      let tempDataso = dataso.filter(item => {
        return item.toLowerCase().indexOf(searchso.toLowerCase()) > -1;
      });
      setDataso(tempDataso);
    } else {
      setDataso(Dataelseso);
    }
  };
  const tableDataso = async item => {
    setisLodingso(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDataso', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/society?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayso = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDataso(newArrayso);
          setDataelseso(newArrayso);
          setisLodingso(false);
          // if (rejectionReason.data.length === 0) {
          //   setDataso(null);
          //   setDataelseso(null);
          //   setisLodingso(false);
          //   setIsHiddenso(true);
          //   setIsHiddendso(false);
          // } else {
          //   let newArrayso = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDataso(newArrayso);
          //   setDataelseso(newArrayso);
          //   setisLodingso(false);
          //   setIsHiddenso(false);
          //   setIsHiddendso(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };
  const [datasdtvU, setdatasdtvU] = useState([]);
  const [datasdtvaU, setdatasdtvaU] = useState([]);
  // https://qaapi.jahernotice.com/api2/get/village/taluka/district/553105?searchKey=ahemdabad
  const [StateidU, setStateIdU] = useState();
  const [loadingU, setLoadingU] = useState(false);
  const [suggestionsListU, setSuggestionsListU] = useState(null);
  const [selectedItemU, setSelectedItemU] = useState(null);
  const dropdownControllerU = useRef(null);
  const dataListU = useCallback(
    async (q = '') => {
      let Userid = await AsyncStorage.getItem('UserID');
      const filterToken = q.toLowerCase();
      if (typeof q !== 'string' || q.length < 3) {
        setSuggestionsListU(null);
        return;
      }
      setLoadingU(true);
      try {
        const response = await fetch(
          `https://qaapi.jahernotice.com/api2/get/ward/citysurveyoffice/distict/${Userid}?searchKey=${q}`,
        );
        const data = await response.json();

        if (data && data.status === 200) {
          const suggestions = data.data.map(item => ({
            value: item,
          }));
          setdatasdtvU(suggestions);
          setdatasdtvaU(suggestions);
          setSuggestionsList(suggestions);
        } else {
          setSuggestionsListU(null);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestionsListU(null);
      } finally {
        setLoadingU(false);
      }
    },
    [Stateid],
  );
  const handleCrossButtonPressU = useCallback(() => {
    onClearPressU();
  }, []);
  const onClearPressU = useCallback(() => {
    setSuggestionsListU(null);
  }, []);

  const onOpenSuggestionsListU = useCallback(isOpened => {
    // Handle any actions on suggestions list open/close
  }, []);
  // const dataListU = async () => {
  //   let Userid = await AsyncStorage.getItem('UserID');
  //   fetch(
  //     `https://qaapi.jahernotice.com/api2/get/ward/citysurveyoffice/distict/553107`,
  //   )
  //     .then(response => response.json())
  //     .then(result => {
  //       let newArray = result.data.map(item => {
  //         return {key: item, value: item};
  //       });
  //       setdatasdtvU(newArray);
  //       setdatasdtvaU(newArray);
  //     })
  //     .catch(error => console.log('error', error));
  // };

  // https://qaapi.jahernotice.com/api2/get/ward/citysurveyoffice/distict/:userid
  // https://qaapi.jahernotice.com/api2/get/urban/surveyno?area=Navsari - 2,Navsari,navsari
  // https://qaapi.jahernotice.com/api2/get/urban/tpno?area=Navsari - 2,Navsari,navsari
  // https://qaapi.jahernotice.com/api2/get/urban/fpno?area=Navsari - 2,Navsari,navsari
  // https://qaapi.jahernotice.com/api2/get/urban/buildingno?area=Navsari - 2,Navsari,navsari
  // https://qaapi.jahernotice.com/api2/get/urban/society?area=Navsari - 2,Navsari,navsari
  const [datasU, setDatasU] = useState([]);
  // const [datasn, setDatasn] = useState([]);
  const tableDatasU = item => {
    setisLodingsU(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatas', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/urban/surveyno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        //data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrays = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatasU(newArrays);
          // setDataelsesU(newArrays);
          setisLodingsU(false);
          // if (rejectionReason.data.length === 0) {
          //   setDatas(null);
          //   setDataelses(null);
          //   setisLodings(false);
          //   setIsHiddens(true);
          //   setIsHiddends(false);
          // } else {
          //   let newArrays = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDatas(newArrays);
          //   setDataelses(newArrays);
          //   setisLodings(false);
          //   setIsHiddens(false);
          //   setIsHiddends(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionsU = item => {
    if (item === '') {
      setsurveynodatasnodU('Select Survey No.');
    } else {
      // Handle other item selection
      setsurveynodatasU(item);
      setClickedsU(!clickeds);
      onSearchsU('');
      setSearchsU('');
      tableDatatU();
      searchsRef.current.clear();
    }
  };
  const [refreshCountersU, setRefreshCountersU] = useState(0);
  const handleItemSelectionsssU = item => {
    if (item === '') {
      setsurveynodatasnod('Select Survey No.');
    } else {
      // Handle other item selection
      setsurveynodatasU(item);
      setClickedsU(!clickeds);
      onSearchsU('');
      setSearchsU('');
      tableDatatU();
    }
  };

  const handleCrossPresssU = () => {
    setClickedsU(!clickeds);
    setRefreshCountersU(refreshCounters + 1); // Increment the refreshCounter to force re-render
  };

  const handleTPNoSelectU = velt => {
    settpnodatatU(velt);
    tableDatafU();
    setShowTPNoDropdownU(false); // Close the TP No. drop-down
    // console.log('okay');
  };

  // TPNO
  const [isHiddentU, setIsHiddentU] = useState(false);
  const [isHiddendtU, setIsHiddendtU] = useState(false);
  const [searchtU, setSearchtU] = useState();
  const [clickedtU, setClickedtU] = useState(false);
  const [datatU, setDatatU] = useState([]);
  const [datatnU, setDatatnU] = useState([]);
  const [DataelsetU, setDataelsetU] = useState([]);
  const [tpnodatatU, settpnodatatU] = useState('');
  const searchtRefU = useRef();
  const [isLodingtU, setisLodingtU] = useState(false);
  const onSearchtU = searcht => {
    if (searcht !== '') {
      let tempDatat = datatU.filter(item => {
        return item.toLowerCase().indexOf(searcht.toLowerCase()) > -1;
      });
      setDatatU(tempDatat);
    } else {
      setDatatU(Dataelset);
    }
  };
  const tableDatatU = async item => {
    setisLodingtU(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatat', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/urban/tpno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayt = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatatU(newArrayt);
          setDataelsetU(newArrayt);
          setisLodingtU(false);
          // if (rejectionReason.data.length === 0) {
          //   setDatat(null);
          //   setDataelset(null);
          //   setisLodingt(false);
          //   setIsHiddent(true);
          //   setIsHiddendt(false);
          // } else {
          // let newArrayt = rejectionReason.data.map(item => {
          //   return {key: item, value: item};
          // });
          // setDatat(newArrayt);
          // setDataelset(newArrayt);
          // setisLodingt(false);
          //   setIsHiddent(false);
          //   setIsHiddendt(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };
  const handleItemSelectiontU = item => {
    if (item === '') {
      settpnodatatnodU('Select TP No.');
    } else {
      // Handle other item selection
      settpnodatatU(item);
      setClickedtU(!clickedt);
      onSearchtU('');
      setSearchtU('');
      tableDatafU();
      searchtRef.current.clear();
    }
  };
  const [refreshCountertU, setRefreshCountertU] = useState(0);
  const handleItemSelectionttU = item => {
    if (item === '') {
      settpnodatatnod('Select TP No.');
    } else {
      // Handle other item selection
      settpnodatatU(item);
      setClickedtU(!clickedt);
      onSearchtU('');
      setSearchtU('');
      tableDatafU();
      searchtRef.current.clear();
    }
  };
  const handleCrossPrestU = () => {
    setClickedtU(!clickedt);
    setRefreshCountertU(refreshCountert + 1); // Increment the refreshCounter to force re-render
  };

  const handleFPNoSelectU = velf => {
    setfpnodatafU(velf);
    tableDatabU();
    setShowFPNoDropdownU(false); // Close the FP No. drop-down
    // console.log('okay');
  };
  // FPNO
  const [isHiddenfU, setIsHiddenfU] = useState(false);
  const [isHiddendfU, setIsHiddendfU] = useState(false);
  const [isLodingfU, setisLodingfU] = useState(false);
  const [searchfU, setSearchfU] = useState();
  const [clickedfU, setClickedfU] = useState(false);
  const [datafU, setDatafU] = useState([]);
  const [DataelsefU, setDataelsefU] = useState([]);
  const [fpnodatafU, setfpnodatafU] = useState('');
  const searchfRefU = useRef();
  const onSearchfU = searchf => {
    if (searchf !== '') {
      let tempDataf = datafU.filter(item => {
        return item.toLowerCase().indexOf(searchf.toLowerCase()) > -1;
      });
      setDatafU(tempDataf);
    } else {
      setDatafU(Dataelsef);
    }
  };
  const tableDatafU = async item => {
    setisLodingfU(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDataf', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/urban/fpno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayf = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatafU(newArrayf);
          setDataelsefU(newArrayf);
          setisLodingfU(false);
          // if (rejectionReason.data.length === 0) {
          //   setDataf(null);
          //   setDataelsef(null);
          //   setisLodingf(false);
          //   setIsHiddenf(true);
          //   setIsHiddendf(false);
          // } else {
          //   let newArrayf = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDataf(newArrayf);
          //   setDataelsef(newArrayf);
          //   setisLodingf(false);
          //   setIsHiddenf(false);
          //   setIsHiddendf(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionfU = item => {
    if (item === '') {
      setfpnodatafnodU('Select FP No.');
    } else {
      // Handle other item selection
      setfpnodatafU(item);
      setClickedfU(!clickedf);
      onSearchfU('');
      setSearchfU('');
      tableDatafU();
      searchfRef.current.clear();
    }
  };
  const [refreshCounterfU, setRefreshCounterfU] = useState(0);
  const handleItemSelectionffU = item => {
    if (item === '') {
      setfpnodatafnodU('Select FP No.');
    } else {
      // Handle other item selection
      setfpnodatafU(item);
      setClickedfU(!clickedf);
      onSearchfU('');
      setSearchfU('');
      tableDatafU();
    }
  };
  const handleCrossPresfU = () => {
    setClickedfU(!clickedf);
    setRefreshCounterfU(refreshCounterf + 1); // Increment the refreshCounter to force re-render
  };

  const handleBuildingNoSelectU = velb => {
    setbuildingnodatab(velb);
    tableDataso();
    setShowBuildingNoDropdown(false); // Close the Building No. drop-down
    // console.log('okay');
  };

  // BUILDING NO
  const [isHiddenbU, setIsHiddenbU] = useState(false);
  const [isHiddendbU, setIsHiddendbU] = useState(false);
  const [searchbU, setSearchbU] = useState();
  const [clickedbU, setClickedbU] = useState(false);
  const [databU, setDatabU] = useState([]);
  const [DataelsebU, setDataelsebU] = useState([]);
  const [buildingnodatabU, setbuildingnodatabU] = useState('');
  const searchbRefU = useRef();
  const [isLodingbU, setisLodingbU] = useState(false);
  const onSearchbU = searchb => {
    if (searchb !== '') {
      let tempDatab = databU.filter(item => {
        return item.toLowerCase().indexOf(searchb.toLowerCase()) > -1;
      });
      setDatabU(tempDatab);
    } else {
      setDatabU(Dataelseb);
    }
  };
  const tableDatabU = async item => {
    setisLodingb(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDatab', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/urban/buildingno?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayb = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          setDatabU(newArrayb);
          setDataelsebU(newArrayb);
          // if (rejectionReason.data.length === 0) {
          //   setDatab(rejectionReason.data);
          //   setDataelseb(rejectionReason.data);
          //   setisLodingb(false);
          //   setIsHiddenb(true);
          //   setIsHiddendb(false);
          // } else {
          //   let newArrayb = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDatab(newArrayb);
          //   setDataelseb(newArrayb);
          //   setisLodingb(false);
          //   setIsHiddenb(false);
          //   setIsHiddendb(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionbU = item => {
    if (item === '') {
      setbuildingnodatabnod('Select Building No.');
    } else {
      // Handle other item selection
      setbuildingnodatabU(item);
      setClickedbU(!clickedb);
      onSearchbU('');
      setSearchbU('');
      tableDatabU();
      searchbRef.current.clear();
    }
  };
  const [refreshCounterbU, setRefreshCounterbU] = useState(0);
  const handleItemSelectionbbU = item => {
    if (item === '') {
      setbuildingnodatabnodU('Select Building No.');
    } else {
      // Handle other item selection
      setbuildingnodatabU(item);
      setClickedbU(!clickedb);
      onSearchbU('');
      setSearchbU('');
      tableDatabU();
    }
  };
  const handleCrossPresbU = () => {
    setClickedb(!clickedb);
    setRefreshCounterb(refreshCounterb + 1); // Increment the refreshCounter to force re-render
  };

  const handleSocietySelectU = velso => {
    setsocietydataso(velso);
    setShowSocietyDropdown(false); // Close the Society drop-down
    // console.log('okay');
  };
  // SOCIETY
  const [isHiddensoU, setIsHiddensou] = useState(false);
  const [isHiddendsoU, setIsHiddendsou] = useState(false);
  const [isLodingsoU, setisLodingsou] = useState(false);
  const [searchsoU, setSearchsou] = useState();
  const [clickedsoU, setClickedsou] = useState(false);
  const [datasoU, setDatasou] = useState([]);
  const [DataelsesoU, setDataelsesou] = useState([]);
  const [societydatasoU, setsocietydatasou] = useState('');
  const searchsoRefU = useRef();
  const onSearchsou = searchso => {
    if (searchso !== '') {
      let tempDatasoU = datasoU.filter(item => {
        return item.toLowerCase().indexOf(searchso.toLowerCase()) > -1;
      });
      setDatasoU(tempDatasoU);
    } else {
      setDatasoU(DataelsesoU);
    }
  };
  const tableDatasoU = async item => {
    // setisLodingsoU(true);
    const { vilagetalukadistrictdataa } = route.params;
    console.log('tableDataso', item);
    fetch(
      `https://qaapi.jahernotice.com/api2/get/urban/society?area=${selectedDistrict}`,
    )
      .then(function (response) {
        responseClone = response.clone();
        return responseClone.json();
      })
      .then(function (rejectionReason) {
        // data.Records.length === 0
        if (rejectionReason.status == 200) {
          let newArrayso = rejectionReason.data.map(item => {
            return { key: item, value: item };
          });
          console.log('newArrayso', newArrayso);
          setDatasou(newArrayso);
          // setDatasoU(newArrayso);
          setDataelsesou(newArrayso);
          setisLodingsoU(false);
          // if (rejectionReason.data.length === 0) {
          //   setDataso(null);
          //   setDataelseso(null);
          //   setisLodingso(false);
          //   setIsHiddenso(true);
          //   setIsHiddendso(false);
          // } else {
          //   let newArrayso = rejectionReason.data.map(item => {
          //     return {key: item, value: item};
          //   });
          //   setDataso(newArrayso);
          //   setDataelseso(newArrayso);
          //   setisLodingso(false);
          //   setIsHiddenso(false);
          //   setIsHiddendso(true);
          // }
        }
      })
      .catch(error => console.error(error));
  };

  const handleItemSelectionso = item => {
    if (item === '') {
      setsocietydatasonod('Select Society');
    } else {
      // Handle other item selection
      setsocietydataso(item);
      setClickedso(!clickedso);
      onSearchso('');
      tableDataso();
      searchsoRef.current.clear();
    }
  };
  const [refreshCounterso, setRefreshCounterso] = useState(0);
  const handleItemSelectionssao = item => {
    if (item === '') {
      setsocietydatasonod('Select Society');
    } else {
      // Handle other item selection
      setsocietydataso(item);
      setClickedso(!clickedso);
      onSearchso('');
      tableDataso();
    }
  };
  const handleCrossPresas = () => {
    setClickedso(!clickedso);
    setRefreshCounterso(refreshCounterso + 1); // Increment the refreshCounter to force re-render
  };

  const [UserID, setUserID] = useState();
  useEffect(() => {
    getuserid();
  }, []);
  const getuserid = () => {
    (async () => {
      let Userid = await AsyncStorage.getItem('UserID');
      setUserID(Userid);
    })();
  };

  const [newData, setnewData] = useState();
  const Submit = () => {
    const { vilagetalukadistrictdataa } = route.params;
    console.log('neroute', vilagetalukadistrictdataa);
    navigation.navigate('TitleSearchCount', {
      Valuevtd: selectedDistrict,
      Values: surveynodatas,
      Valuet: tpnodatat,
      Valuef: fpnodataf,
      Valueb: buildingnodatab,
      Valueso: societydataso,
    });
  };
  const SubmitU = () => {
    const { vilagetalukadistrictdataa } = route.params;
    console.log('neroute', vilagetalukadistrictdataa);
    navigation.navigate('TitleSearchCountU', {
      Valuevtd: selectedDistrict,
      Values: surveynodatas,
      Valuet: tpnodatat,
      Valuef: fpnodataf,
      Valueb: buildingnodatab,
      Valueso: societydataso,
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // tableData();
    tableDatas();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    tableDatas();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    tableDatat();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    tableDataf();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    tableDatab();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    tableDataso();
    setRefreshing(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setsurveynodatasnod('Select Survey No.');
    settpnodatatnod('Select TP No.');
    setfpnodatafnod('Select FP No.');
    setbuildingnodatabnod('Select Building No.');
    setsocietydatasonod('Select Society');
    setsurveynodatas();
    settpnodatat();
    setfpnodataf();
    setbuildingnodatab();
    setsocietydataso();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

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

  useEffect(
    selectedDistrict => {
      tableDatas(selectedDistrict);
      tableDatasU(selectedDistrict);
      setRefreshing(false);
      setDatas([]);
      setDatasU([]);
    },
    [selectedDistrict],
  );
  useEffect(
    selectedDistrict => {
      tableDatat(selectedDistrict);
      tableDatatU(selectedDistrict);
      setRefreshing(false);
      setDatat([]);
      setDatatU([]);
    },
    [selectedDistrict],
  );
  useEffect(
    selectedDistrict => {
      tableDataf(selectedDistrict);
      tableDatafU(selectedDistrict);
      setRefreshing(false);
      setDataf([]);
      setDatafU([]);
    },
    [selectedDistrict],
  );
  useEffect(
    selectedDistrict => {
      tableDatab(selectedDistrict);
      tableDatabU(selectedDistrict);
      setRefreshing(false);
      setDatab([]);
      setDatabU([]);
    },
    [selectedDistrict],
  );
  useEffect(
    selectedDistrict => {
      tableDataso(selectedDistrict);
      tableDatasoU(selectedDistrict);
      setRefreshing(false);
      setDataso([]);
      setDatasou([]);
    },
    [selectedDistrict],
  );

  const [servicePlaceholder, setServicePlaceholder] = useState(
    'Select Sub Service Name*',
  );
  const [handleSurveyNoSelectP, sethandleSurveyNoSelectP] = useState();
  const [handleSurveyNoSelectsP, sethandleSurveyNoSelectsP] = useState();
  const [handleTPNoSelectP, sethandleTPNoSelectP] = useState();
  const [handleFPNoSelectP, sethandleFPNoSelectP] = useState();
  const [handleBuildingNoSelectP, sethandleBuildingNoSelectP] = useState();
  const [handleSocietySelectP, sethandleSocietySelectP] = useState();
  const [handleSurveyNoSelectPkey, sethandleSurveyNoSelectPkey] = useState();
  const [handleSurveyNoSelectsPkey, sethandleSurveyNoSelectsPkey] = useState();
  const [handleTPNoSelectPkey, sethandleTPNoSelectPkey] = useState();
  const [handleFPNoSelectPkey, sethandleFPNoSelectPkey] = useState();
  const [handleBuildingNoSelectPkey, sethandleBuildingNoSelectPkey] =
    useState();
  const [handleSocietySelectPkey, sethandleSocietySelectPkey] = useState();

  useEffect(() => {
    // Taluka change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      sethandleSurveyNoSelectP('Select Survey No.');
      sethandleTPNoSelectP('Select TP No.');
      sethandleFPNoSelectP('Select FP No.');
      sethandleBuildingNoSelectP('Select Building No.');
      sethandleSocietySelectP('Select Society');
      sethandleSurveyNoSelectsP('Select City Survey Number');
      sethandleSurveyNoSelectPkey(selectedDistrict);
      sethandleSurveyNoSelectsPkey(selectedDistrict);
      sethandleTPNoSelectPkey(selectedDistrict);
      sethandleFPNoSelectPkey(selectedDistrict);
      sethandleBuildingNoSelectPkey(selectedDistrict);
      sethandleSocietySelectPkey(selectedDistrict);
      setDatas([]);
      setDatasU([]);
      setDatat([]);
      setDatatU([]);
      setDataf([]);
      setDatafU([]);
      setDatab([]);
      setDatabU([]);
      setDataso([]);
      setDatasou([]);
    }
  }, [selectedDistrict]);

  // servicePlaceholder || 'Select Sub Service Name*'
  const [handleSurveyNoSelectPkeya, sethandleSurveyNoSelectPkeya] = useState();
  useEffect(() => {
    // Taluka change: Update placeholder values based on selected service
    if (
      selectedDistrict ||
      handleSurveyNoSelectPkeya === selectedDistrict ||
      handleSurveyNoSelectPkeya
    ) {
      // sethandleSurveyNoSelectP('Select Service Name');
      sethandleSurveyNoSelectPkeya(handleSurveyNoSelectPkeya);
      sethandleSurveyNoSelectP('Select Survey No.');
    }
  }, [selectedDistrict || handleSurveyNoSelectPkeya]);

  const dataI = () => {
    const dataIN = 1;
    sethandleSurveyNoSelectPkeya(dataIN + 1);
  };

  return (
    <ScrollView>
      <View
        style={{
          ...style.containernn,
          // backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
        }}
      >
        <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
        <OrientationLocker
          orientation={PORTRAIT}
          onChange={orientation => console.log('onChange', orientation)}
          onDeviceChange={orientation =>
            console.log('onDeviceChange', orientation)
          }
        />
        {/* village, taluka, district */}

        <SafeAreaView style={style.containera}>
          {/* <SelectList
            setSelected={vel => {
              setvilagetalukadistrictdataa(vel), onRefresh();
              tableDatas();
            }}
            save="value"
            data={data}
            placeholder={
              vilagetalukadistrictdataa
                ? vilagetalukadistrictdataa
                : vilagetalukadistrictdatad
            }
            boxStyles={{marginTop: 30}}
            dropdownStyles={{backgroundColor: '#ffffff'}}
          /> */}
          <Text style={style.lable}>Service Name</Text>
          <TextInput
            placeholder={newData}
            placeholderTextColor="#000000"
            editable={false}
            style={{
              borderRadius: 5,
              borderColor: '#c0c0c0',
              // backgroundColor: '#f8f8ff',
              borderColor: '#c0c0c0',
              borderWidth: 1,
              height: 45,
              padding: 10,
            }}
          />

          {newData == 'Rural' ? (
            <>
              <Text style={style.lable}>
                Select Village,Taluka,District Name
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder={placeholderValue}
                  placeholderTextColor="#000000"
                  value={villageQueryR}
                  onChangeText={text => {
                    const filteredText = text.replace(
                      /[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                      '',
                    );
                    setVillageQueryR(filteredText);
                    dataList(filteredText);
                    setShowSuggestionsR(filteredText.length >= 3);
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#f5f5f5',
                    color: 'black',
                    borderColor: '#ccc',
                    paddingLeft: 18,
                    borderWidth: 1,
                    height: 50,
                  }}
                />

                {showSuggestionsR && datasdtv?.length > 0 && (
                  <View style={style.suggestionBox}>
                    <FlatList
                      data={datasdtv}
                      keyExtractor={(_, i) => i.toString()}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={style.suggestionItem}
                          onPress={() => {
                            setVillageQueryR(item.value);
                            setPlaceholderValue(item.value);
                            setSelectedDistrict(item.value);
                            setShowSuggestionsR(false);
                            sethandleSurveyNoSelectP('Select Survey No.');
                            sethandleSurveyNoSelectsP(
                              'Select City Survey Number',
                            );
                            sethandleTPNoSelectP('Select TP No.');
                            sethandleFPNoSelectP('Select FP No.');
                            sethandleBuildingNoSelectP('Select Building No.');
                            sethandleSocietySelectP('Select Society Name');
                          }}
                        >
                          <Text style={{ color: 'black' }}>{item.value}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </View>

              {/* <SelectList
                setSelected={selectedValue => {
                  // setSelectedValue(null); // Clear the selected value
                  setSelectedDistrict(selectedValue);
                  // navigation.navigate('TitleSearch', {
                  //   vilagetalukadistrictdataa: selectedValue,
                  // });
                  //
                  tableDatas();
                  tableDatat();
                  tableDataf();
                  tableDatab();
                  tableDataso();
                }}
                save="value"
                data={datasdtv}
                placeholder={
                  districtPlaceholder || 'Select Village,Taluka,District'
                }
                defaultValue={
                  districtPlaceholder || 'Select Village,Taluka,District'
                }
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                onSearch={search => {
                  if (search.length >= 3) {
                    return datas.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              /> */}
              <Text style={style.lable}>Select Survey No.</Text>
              {/* <View style={{flexDirection: 'row'}}> */}
              <>
                <SelectList
                  setSelected={vels => handleSurveyNoSelect(vels)}
                  key={`serviced-${handleSurveyNoSelectPkey}`}
                  // key={handleSurveyNoSelectPkey}
                  save="values"
                  data={datas}
                  placeholder={handleSurveyNoSelectP || 'Select Survey No.'}
                  boxStyles={{
                    // marginTop: 25,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#f8f8ff',
                    borderColor: '#c0c0c0',
                  }}
                  isOpen={showSurveyNoDropdown} // Pass the state to indicate if it's open or not
                  onFocus={() => {
                    setShowSurveyNoDropdown(true);
                    // Close other drop-downs
                    setShowTPNoDropdown(false);
                    setShowFPNoDropdown(false);
                    setShowBuildingNoDropdown(false);
                    setShowSocietyDropdown(false);
                  }}
                  onBlur={() => setShowSurveyNoDropdown(false)}
                  onPress={() => {
                    setShowSurveyNoDropdown(true);
                    // Close other drop-downs
                    setShowTPNoDropdown(false);
                    setShowFPNoDropdown(false);
                    setShowBuildingNoDropdown(false);
                    setShowSocietyDropdown(false);
                  }}
                  // onClickItem={() => {
                  //   handleSurveyNoSelect(null);
                  // const dynamicserviPlaceholderS = `Select Survey No.`;
                  // sethandleSurveyNoSelectP(dynamicserviPlaceholderS);
                  // }}
                />
                {/* {surveynodatas !== '' && (
                    <TouchableOpacity
                      onPress={() => {
                        dataI();
                        sethandleSurveyNoSelectPkey(null);
                        const dynamicserviPlaceholderS = `Select Survey No.`;
                        sethandleSurveyNoSelectP(dynamicserviPlaceholderS);
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        X
                      </Text>
                    </TouchableOpacity>
                  )} */}
              </>
              {/* </View> */}
              <Text style={style.lable}>Select TP No.</Text>
              <SelectList
                setSelected={velt => handleTPNoSelect(velt)}
                key={`serviceb-${handleTPNoSelectPkey}`}
                //  key={handleTPNoSelectPkey} key={handleTPNoSelectPkey}
                save="valuet"
                data={datat}
                placeholder={handleTPNoSelectP || 'Select TP No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showTPNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowTPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowTPNoDropdown(false)}
                onPress={() => {
                  setShowTPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select FP No.</Text>
              <SelectList
                setSelected={velf => handleFPNoSelect(velf)}
                key={`servicea-${handleFPNoSelectPkey}`}
                // key={handleFPNoSelectPkey}
                save="valuef"
                data={dataf}
                placeholder={handleFPNoSelectP || 'Select FP No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showFPNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowFPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowFPNoDropdown(false)}
                onPress={() => {
                  setShowFPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select Building No.</Text>
              <SelectList
                setSelected={velb => handleBuildingNoSelect(velb)}
                key={`service-${handleBuildingNoSelectPkey}`}
                // key={handleBuildingNoSelectPkey}
                save="valueb"
                data={datab}
                placeholder={handleBuildingNoSelectP || 'Select Building No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showBuildingNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowBuildingNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowBuildingNoDropdown(false)}
                onPress={() => {
                  setShowBuildingNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select Society Name</Text>
              <SelectList
                setSelected={velso => handleSocietySelect(velso)}
                // key={`service-${selectedServicename}`}
                key={handleSocietySelectPkey}
                save="valueso"
                data={dataso}
                placeholder={handleSocietySelectP || 'Select Society Name'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showSocietyDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowSocietyDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                }}
                onBlur={() => setShowSocietyDropdown(false)}
                onPress={() => {
                  setShowSocietyDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                }}
              />
              <Button
                style={style.button}
                mode="contained"
                onPress={() => {
                  if (!selectedDistrict) {
                    Toast.show({
                      // type: 'success',
                      type: 'error', //  success error or 'error', 'info', 'warning'
                      text1: 'Please Select Village, Taluka, District Name',
                      position: 'bottom', // 'top' or 'bottom'
                      visibilityTime: 4000, // ms
                      autoHide: true,
                      topOffset: 30,
                      bottomOffset: 50,
                    });
                  } else if (!surveynodatas) {
                    if (!tpnodatat) {
                      if (!fpnodataf) {
                        if (!buildingnodatab) {
                          if (!societydataso) {
                            Toast.show({
                              // type: 'success',
                              type: 'error', //  success error or 'error', 'info', 'warning'
                              text1: `Please Select Any one Value`,
                              position: 'bottom', // 'top' or 'bottom'
                              visibilityTime: 4000, // ms
                              autoHide: true,
                              topOffset: 30,
                              bottomOffset: 50,
                            });
                          } else {
                            Submit();
                          }
                        } else {
                          Submit();
                        }
                      } else {
                        Submit();
                      }
                    } else {
                      Submit();
                    }
                  } else {
                    Submit();
                  }
                }}
              >
                Submit
              </Button>
            </>
          ) : null}
          {newData == 'Urban' ? (
            <>
              <Text style={style.lable}>
                Select ward,CitySurveyOffice,District Name
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder={placeholderValue}
                  placeholderTextColor="#000000"
                  value={villageQueryU}
                  onChangeText={text => {
                    const filteredText = text.replace(
                      /[^0-9A-Za-z/.+\-*]|(?<=\s)[^0-9A-Za-z/.+\-*]/g,
                      '',
                    );
                    setVillageQueryU(filteredText);
                    dataListU(filteredText);
                    setShowSuggestionsU(filteredText.length >= 3);
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#f5f5f5',
                    color: 'black',
                    borderColor: '#ccc',
                    paddingLeft: 18,
                    borderWidth: 1,
                    height: 50,
                  }}
                />

                {showSuggestionsU && datasdtvU?.length > 0 && (
                  <View style={style.suggestionBox}>
                    <FlatList
                      data={datasdtvU}
                      keyExtractor={(_, i) => i.toString()}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={style.suggestionItem}
                          onPress={() => {
                            setVillageQueryU(item.value);
                            setPlaceholderValue(item.value);
                            setSelectedDistrict(item.value);
                            setShowSuggestionsU(false);
                            sethandleSurveyNoSelectsP(
                              'Select City Survey Number',
                            );
                            sethandleTPNoSelectP('Select TP No.');
                            sethandleFPNoSelectP('Select FP No.');
                            sethandleBuildingNoSelectP('Select Building No.');
                            sethandleSocietySelectP('Select Society Name');
                          }}
                        >
                          <Text style={{ color: 'black' }}>{item.value}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </View>

              {/* <SelectList
                setSelected={selectedValue => {
                  // setSelectedValue(null); // Clear the selected value
                  setSelectedDistrict(selectedValue);
                  // navigation.navigate('TitleSearch', {
                  //   vilagetalukadistrictdataa: selectedValue,
                  // });
                  //
                  tableDatasU();
                  tableDatatU();
                  tableDatafU();
                  tableDatabU();
                  tableDatasoU();
                }}
                save="value"
                data={datasdtvU}
                placeholder={'Select Ward, CitySurveyOffice, Distict Name'}
                defaultValue={'Select Ward, CitySurveyOffice, Distict Name'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                onSearch={search => {
                  if (search.length >= 3) {
                    return datas.filter(item =>
                      item.toLowerCase().includes(search.toLowerCase()),
                    );
                  } else {
                    return [];
                  }
                }}
              /> */}
              <Text style={style.lable}>Select City Survey Number</Text>
              <SelectList
                setSelected={vels => handleSurveyNoSelect(vels)}
                key={`serviceE-${handleSurveyNoSelectsPkey}`}
                // key={handleSurveyNoSelectsPkey}
                save="values"
                data={datasU}
                placeholder={
                  handleSurveyNoSelectsP || 'Select City Survey Number'
                }
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showSurveyNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowSurveyNoDropdown(true);
                  // Close other drop-downs
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowSurveyNoDropdown(false)}
                onPress={() => {
                  setShowSurveyNoDropdown(true);
                  // Close other drop-downs
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select TP No.</Text>
              <SelectList
                setSelected={velt => handleTPNoSelect(velt)}
                key={`serviceF-${handleTPNoSelectPkey}`}
                // key={handleTPNoSelectPkey}
                save="valuet"
                data={datatU}
                placeholder={handleTPNoSelectP || 'Select TP No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showTPNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowTPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowTPNoDropdown(false)}
                onPress={() => {
                  setShowTPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select FP No.</Text>
              <SelectList
                setSelected={velf => handleFPNoSelect(velf)}
                key={`serviceG-${handleFPNoSelectPkey}`}
                // key={handleFPNoSelectPkey}
                save="valuef"
                data={datafU}
                placeholder={handleFPNoSelectP || 'Select FP No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showFPNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowFPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowFPNoDropdown(false)}
                onPress={() => {
                  setShowFPNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select Building No.</Text>
              <SelectList
                setSelected={velb => handleBuildingNoSelect(velb)}
                key={`service-${handleBuildingNoSelectPkey}`}
                // key={handleBuildingNoSelectPkey}
                save="valueb"
                data={databU}
                placeholder={handleBuildingNoSelectP || 'Select Building No.'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showBuildingNoDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowBuildingNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
                onBlur={() => setShowBuildingNoDropdown(false)}
                onPress={() => {
                  setShowBuildingNoDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowSocietyDropdown(false);
                }}
              />
              <Text style={style.lable}>Select Society Name</Text>
              <SelectList
                setSelected={velso => handleSocietySelect(velso)}
                // key={`service-${selectedServicename}`}
                key={handleSocietySelectPkey}
                save="valueso"
                data={datasoU}
                placeholder={handleSocietySelectP || 'Select Society Name'}
                boxStyles={{
                  // marginTop: 25,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                }}
                dropdownStyles={{
                  backgroundColor: '#f8f8ff',
                  borderColor: '#c0c0c0',
                }}
                isOpen={showSocietyDropdown} // Pass the state to indicate if it's open or not
                onFocus={() => {
                  setShowSocietyDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                }}
                onBlur={() => setShowSocietyDropdown(false)}
                onPress={() => {
                  setShowSocietyDropdown(true);
                  // Close other drop-downs
                  setShowSurveyNoDropdown(false);
                  setShowTPNoDropdown(false);
                  setShowFPNoDropdown(false);
                  setShowBuildingNoDropdown(false);
                }}
              />
              <Button
                style={style.button}
                mode="contained"
                onPress={() => {
                  if (!selectedDistrict) {
                    Toast.show({
                      // type: 'success',
                      type: 'error', //  success error or 'error', 'info', 'warning'
                      text1:
                        'Please Select ward, CitySurveyOffice, District Name',
                      position: 'bottom', // 'top' or 'bottom'
                      visibilityTime: 4000, // ms
                      autoHide: true,
                      topOffset: 30,
                      bottomOffset: 50,
                    });
                  } else if (!surveynodatas) {
                    if (!tpnodatat) {
                      if (!fpnodataf) {
                        if (!buildingnodatab) {
                          if (!societydataso) {
                            Toast.show({
                              // type: 'success',
                              type: 'error', //  success error or 'error', 'info', 'warning'
                              text1: `Please Select Any one Value`,
                              position: 'bottom', // 'top' or 'bottom'
                              visibilityTime: 4000, // ms
                              autoHide: true,
                              topOffset: 30,
                              bottomOffset: 50,
                            });
                          } else {
                            SubmitU();
                          }
                        } else {
                          SubmitU();
                        }
                      } else {
                        SubmitU();
                      }
                    } else {
                      SubmitU();
                    }
                  } else {
                    SubmitU();
                  }
                }}
              >
                Submit
              </Button>
            </>
          ) : null}
        </SafeAreaView>
      </View>
      <Toast />
    </ScrollView>
  );
};

const style = StyleSheet.create({
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
  containernn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  lable: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  containera: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#ff4500',
    height: 45,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
  },
  Card: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFF',
  },
  View: {
    elevation: 5,
    marginTop: 20,
    height: 300,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  Text: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
  },
  Flatlist: {
    width: '75%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
  },
  Flatlistn: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
});

export default titelSearchha;
