import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Appearance,
  StatusBar,
} from 'react-native';
import {
  Card,
  Button,
  Badge,
  Surface,
  TextInput,
  Appbar,
} from 'react-native-paper';
import Jahernoticelog from '../../../Imeges/Jahernotice_logo.png';
import Jahernoticelogw from '../../../Imeges/JN_logo_White.png';
import LandRecords from '../../../Imeges/Icon_land_records_l.png';

import Profile from '../../../Imeges/Profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import { Icon, withBadge } from 'react-native-elements';
import TitleSearch from '../../TitleSearchComponent/TitleSearch.json';

import { SelectList } from 'react-native-dropdown-select-list';
import LandRecordState from '../../LandRecord/LandRecordState.json';
import NetInfo from '@react-native-community/netinfo';

const BadgedIcon = withBadge(15)(Icon);

const App = ({ route, navigation }) => {
  //  Page Refreshing
  const [data, setData] = useState('');
  const [TodayA, setTodayA] = useState('');
  const [TodayB, setTodayB] = useState('');
  const [TodayAn, setTodayAn] = useState('');
  const [TodayBn, setTodayBn] = useState('');
  const [UserID, setUserID] = useState('');
  // Page Loding
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadinga, setIsLoading] = useState(false);
  const [New, setNew] = useState('');
  // DashBord Api Call
  const [imgdata, setImgdata] = useState();
  const [imgdataa, setImgdataa] = useState();
  const [isloading, setLoading] = useState(true);
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [refreshpage, setRefreshpage] = useState();
  const [name, setName] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchData();
        await UserActive(); // Call UserActive on component mount
      } catch (error) {
        console.log('Initialization error:', error);
      }
    };
    initialize();
  }, []);

  const fetchData = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    let MobileNo = await AsyncStorage.getItem('MobileNo');
    console.log(Userid);
    //alert(Userid)
    if (Userid) {
      try {
        let response = await fetch(
          `https://qaapi.jahernotice.com/api/logout/${Userid}`,
        );
        let data = await response.json();
        const status = data.data;
        if (status.Username == MobileNo && status.Status === 'Active      ') {
          setName(status.Username);
        } else {
          await AsyncStorage.removeItem('UserID');
          await AsyncStorage.removeItem('Token');
          await AsyncStorage.removeItem('DeviceID');
          await AsyncStorage.removeItem('MobileNo');
          await AsyncStorage.removeItem('FirstName');
          await AsyncStorage.removeItem('LastName');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    console.log('onRefresh called');
    setRefreshing(true);
    await fetchData();
    await UserActive();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh]),
  );

  // Dashbord

  const UserActive = async () => {
    setIsLodingActive(true);
    let Userid = await AsyncStorage.getItem('UserID');

    fetch(`https://qaapi.jahernotice.com/api/mobileApp/Services/${Userid}`)
      .then(response => response.json())
      .then(result => {
        // console.log('DATA', result);
        // console.log('Data-Data', result.data);
        if (result.status === 200) {
          setIsLodingActive(false);
          setIsAtive(result.data);
          Dashbord();
          Property();
          EppStatement();
          AreaAlert();
          AajniJaherNotice();
          dataFetch();
          AuctionAlert();
          TPAlert();
          Service();
        }
      })
      .catch(error => console.log('error-mobile-sub', error));
  };

  const [IsAtivenew, setIsAtivenew] = useState();
  const [IsAtivenewTitle, setIsAtivenewTitle] = useState();
  const Service = async () => {
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(
      `https://qaapi.jahernotice.com/api2/get/ajininotice/sub/count/${Userid}`,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('DATA', result);
        if (result.status === 200) {
          setIsLodingActive(false);
          setIsAtivenew(result.AJSubCount);
          setIsAtivenewTitle(result.TCSubCount);
          console.log('Data-Data', result);
        }
      })
      .catch(error => console.log('error-mobile-sub', error));
  };

  const Dashbord = async () => {
    setLoading(true);
    let Userid = await AsyncStorage.getItem('UserID');
    let FirstName = await AsyncStorage.getItem('FirstName');
    setFirstName(FirstName);
    let LastName = await AsyncStorage.getItem('LastName');
    setLastName(LastName);
    //
    fetch(`https://qaapi.jahernotice.com/api2/app/dashboard/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setImgdata(result.data.Services);
          setLoading(false);
        }
      })
      .catch(error => console.log('error-Dashbord', error));
  };

  // Titel Search
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [datas, setDatas] = useState([]);
  const [datasn, setDatasn] = useState([]);
  const [vilagetalukadistrictdata, setvilagetalukadistrictdata] = useState('');
  const searchRef = useRef();
  const [isLoadingae, setIsLoadingae] = useState(true);

  const onSearch = search => {
    setSearch(search);
    if (search !== '') {
      let tempData = datas.filter(item => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setDatas(tempData);
    } else {
      setDatas(datasn);
    }
  };

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtPlaceholder, setDistrictPlaceholder] = useState(
    'Select Service Name',
  );
  const [handleSurveyNoSelectP, sethandleSurveyNoSelectP] = useState();
  const [handleSurveyNoSelectPkey, sethandleSurveyNoSelectPkey] = useState();
  useEffect(() => {
    // Taluka change: Update placeholder values based on selected service
    if (selectedDistrict === selectedDistrict) {
      sethandleSurveyNoSelectP('Select Service Name');
      sethandleSurveyNoSelectPkey(selectedDistrict);
      setDistrictPlaceholder('Select Service Name');
    }
  }, [selectedDistrict]);
  const dataFetch = async () => {
    try {
      let newArray = TitleSearch.data.map(item => ({
        key: item.Id_name, // Convert ID to string if needed
        value: item.Name,
      }));
      console.log(newArray);
      setDatas(newArray);
      setDatasn(newArray);
      setIsLoadingae(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  // console.log('data', datas);

  // My Property
  const [Propertyd, setPropertyD] = useState();
  const [isLoadingap, setIsLoadingp] = useState(false);
  const Property = async () => {
    setIsLoadingp(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api2/property/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setPropertyD(result.data);
          setIsLoadingp(false);
        }
      })
      .catch(error => console.log('error-PPP', error));
  };

  //EPP Estatement
  const [EppStatementd, setEppStatementD] = useState();
  const [isLoadingaep, setIsLoadingep] = useState(false);
  const EppStatement = async () => {
    setIsLoadingep(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api/Epp/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setEppStatementD(result.data);
          setIsLoadingep(false);
        }
      })
      .catch(error => console.log('error-EPP', error));
  };

  //AreaAlert
  const [AreaAlertd, setAreaAlertD] = useState();
  const [isLoadingaa, setIsLoadinga] = useState(false);
  const AreaAlert = async () => {
    setIsLoadinga(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api2/area/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setAreaAlertD(result.data);
          setIsLoadinga(false);
        }
      })
      .catch(error => console.log('error-Area', error));
  };

  //AajniJaherNotice
  const [AajniJaherNoticed, setAajniJaherNoticeD] = useState();
  const [isLoadingaaj, setIsLoadingaj] = useState(false);
  const AajniJaherNotice = async () => {
    setIsLoadingaj(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api2/ajni/jahernotice/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setAajniJaherNoticeD(result.data);
          setIsLoadingaj(false);
        }
      })
      .catch(error => console.log('error-aajni', error));
  };

  //AuctionAlert
  const [AuctionAler, setAuctionAlertD] = useState();
  const [isLoadingau, setIsLoadingau] = useState(false);
  const AuctionAlert = async () => {
    setIsLoadingau(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api/Auction/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setAuctionAlertD(result.data);
          setIsLoadingau(false);
        }
      })
      .catch(error => console.log('error-Auction1234', error));
  };

  //TPAlert
  const [TpAlertd, setTpAlertD] = useState();
  const [isLoadingtp, setIsLoadingtp] = useState(false);
  const TPAlert = async () => {
    setIsLoadingtp(true);
    let Userid = await AsyncStorage.getItem('UserID');
    fetch(`https://qaapi.jahernotice.com/api/Tp/count/${Userid}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setTpAlertD(result.data);
          setIsLoadingtp(false);
        }
      })
      .catch(error => console.log('error-TP', error));
  };

  // User Active Inactive
  const [IsActive, setIsAtive] = useState([]);
  const [isLodingActive, setIsLodingActive] = useState(true);
  // console.log('Data', IsActive);

  // Get UserID AsyncStorage
  const getuserid = () => {
    (async () => {
      let Userid = await AsyncStorage.getItem('UserID');
      setUserID(Userid1);
    })();
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(!isDarkMode);
  };

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
  const statusBarBackgroundColor =
    theme === 'LIGHT' ? 'transparent' : '#343a40';
  const [selectedValue, setSelectedValue] = useState(null);

  const [selectedState, setSelectedState] = React.useState();
  const [StateData, setStateData] = useState();
  useEffect(() => {
    State();
  }, []);
  const State = () => {
    let StateDataaa = LandRecordState.data.map(item => {
      return { key: item.StateID, value: item.StateName };
    });
    setStateData(StateDataaa);
  };
  // console.log('stssgsus', StateData);
  // console.log(selectedState);

  function capitalizeFirstWord(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const words = str.trim().split(' ');
    if (words.length === 0) {
      return str;
    }
    const capitalizedWords = words.map(word => {
      if (word.length === 0) {
        return word;
      }
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalized;
    });
    return capitalizedWords.join(' ');
  }

  numFormatter = num => {
    if (num > 999 && num < 100000) {
      return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 100000) {
      return (num / 100000).toFixed(2) + 'L'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
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
      <View
        style={{
          ...styles.row,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        }}
      >
        <View style={styles.logo}>
          <Image
            source={theme === 'LIGHT' ? Jahernoticelog : Jahernoticelogw}
            style={{
              width: '28%',
              height: 48,
              marginLeft: 4,
              resizeMode: 'contain',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.text}
        >
          <View
            style={styles.text}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text
              style={{
                ...styles.texta,
                color: theme === 'LIGHT' ? 'rgb(237, 28, 36)' : '#ffffff',
              }}
            >
              {capitalizeFirstWord(FirstName)} {capitalizeFirstWord(LastName)}
            </Text>
            <Image source={Profile} style={styles.logoP} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ width: '100%', flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardc}>
          {/* <View style={styles.containerVa}></View> */}
          {isLodingActive ? (
            <View style={styles.ActivityIndicatora}>
              <ActivityIndicator
                size="large"
                color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
              />
            </View>
          ) : (
            <View>
              <Fragment>
                {/* <View
                  style={{width: '100%', height: '8%',
    backgroundColor: '#f2d969',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    marginBottom: '-25%',}}></View> */}
                <View style={{ marginTop: 10 }}></View>
                {/* {IsActiveBasic === 1 || IsActiveEssential === 1 ? ( */}
                {/*  */}
                {
                  <Fragment>
                    <Card
                      style={{
                        ...styles.cardp,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#20272b',
                        borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 15,
                          fontWeight: 'bold',
                          marginTop: 10,
                          fontSize: 20,
                          color:
                            theme === 'LIGHT'
                              ? 'rgb(153, 153, 153)'
                              : '#ffffff',
                        }}
                      >
                        Property Protection Alerts
                      </Text>

                      {isLoadingap ? (
                        <View style={styles.ActivityIndicator}>
                          <ActivityIndicator
                            size="large"
                            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                          />
                        </View>
                      ) : (
                        <Fragment>
                          {
                            <FlatList
                              data={Propertyd}
                              renderItem={({ item }) => (
                                <Fragment>
                                  <View style={styles.rowcard}>
                                    <View
                                      style={{
                                        ...styles.rowcard,
                                        ...styles.border,
                                      }}
                                    >
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              '14 PROTECTED PROPERTIES',
                                            )
                                          }
                                        >
                                          {item.PropertyCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.PropertyCount} PPP
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.PropertyCount} PPP
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        {
                                          <View>
                                            <Text
                                              style={{
                                                ...styles.Property,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? 'rgb(153, 153, 153)'
                                                    : '#ffffff',
                                              }}
                                            >
                                              My Properties
                                            </Text>
                                          </View>
                                        }
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('BPPalert', {
                                              selectedDat: 1,
                                            })
                                          }
                                        >
                                          {item.todayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              {item.todayCount > 0 ? (
                                                <Badge
                                                  style={styles.circle}
                                                ></Badge>
                                              ) : null}
                                              <Text style={styles.textn}>
                                                {item.todayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.todayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        {
                                          <View>
                                            <Text
                                              style={{
                                                ...styles.Propertyt,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? 'rgb(237, 28, 36)'
                                                    : 'rgb(237, 28, 36)',
                                              }}
                                            >
                                              Today’s Alert
                                            </Text>
                                          </View>
                                        }
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('BPPalert', {
                                              selectedDat: 7,
                                            })
                                          }
                                        >
                                          {item._7DayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item._7DayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item._7DayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        {
                                          <View>
                                            <Text
                                              style={{
                                                ...styles.Property,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? 'rgb(153, 153, 153)'
                                                    : '#ffffff',
                                              }}
                                            >
                                              Last 7 Days
                                            </Text>
                                          </View>
                                        }
                                      </View>
                                    </View>
                                    <View style={styles.rowcard}>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('BPPalert', {
                                              selectedDat: 0,
                                            })
                                          }
                                        >
                                          {item.allCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.allCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.allCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        {
                                          <View>
                                            <Text
                                              style={{
                                                ...styles.Property,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? 'rgb(153, 153, 153)'
                                                    : '#ffffff',
                                              }}
                                            >
                                              Past Alerts
                                            </Text>
                                          </View>
                                        }
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              )}
                            />
                          }
                        </Fragment>
                      )}
                      {/* IsActiveEssential */}
                      {/* IsActiveEssential === null || IsActiveEssential === '' || (Array.isArray(IsActiveEssential) && IsActiveEssential.length === 0)
        ) */}
                      {isLoadingaep ? (
                        <View style={styles.ActivityIndicator}>
                          <ActivityIndicator
                            size="large"
                            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                          />
                        </View>
                      ) : (
                        <Fragment>
                          {
                            <FlatList
                              data={EppStatementd}
                              renderItem={({ item }) => (
                                <Fragment>
                                  <View style={styles.rowcarda}>
                                    <View
                                      style={{
                                        ...styles.rowcard,
                                        ...styles.border,
                                      }}
                                    >
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'EPPStatementCount',
                                            )
                                          }
                                        >
                                          {item.EPP_Counts > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.EPP_Counts} GPP
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.EPP_Counts} GPP
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            My Properties
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'EPPStatement',
                                              {
                                                selectedDat: 1,
                                              },
                                            )
                                          }
                                        >
                                          {item.todayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              {item.todayCount > 0 ? (
                                                <Badge
                                                  style={styles.circle}
                                                ></Badge>
                                              ) : null}
                                              <Text style={styles.textn}>
                                                {item.todayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.todayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Propertyt,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(237, 28, 36)'
                                                  : 'rgb(237, 28, 36)',
                                            }}
                                          >
                                            Today’s Alert
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'EPPStatement',
                                              {
                                                selectedDat: 7,
                                              },
                                            )
                                          }
                                        >
                                          {item._7DayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item._7DayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item._7DayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Last 7 Days
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={styles.rowcard}>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'EPPStatement',
                                              {
                                                selectedDat: 30,
                                              },
                                            )
                                          }
                                        >
                                          {item.allCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.allCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.allCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Past Alerts
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              )}
                            />
                          }
                        </Fragment>
                      )}
                    </Card>
                    <LinearGradient
                      style={styles.linearGradientn}
                      colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      locations={[0.18, 1, 1]}
                    >
                      <Text></Text>
                    </LinearGradient>
                  </Fragment>
                }

                {/* IsActiveAreaAlert */}
                <Fragment >
                  {
                    <Fragment>
                      <Card
                        style={{
                          ...styles.card,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#20272b',
                          borderColor:
                            theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                          borderWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            fontSize: 20,
                            color:
                              theme === 'LIGHT'
                                ? 'rgb(153, 153, 153)'
                                : '#ffffff',
                          }}
                        >
                          Villages / Area Alerts
                        </Text>
                        {isLoadingaa ? (
                          <View style={styles.ActivityIndicator}>
                            <ActivityIndicator
                              size="large"
                              color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                            />
                          </View>
                        ) : (
                          <Fragment>
                            <FlatList
                              data={AreaAlertd}
                              renderItem={({ item }) => (
                                <Fragment>
                                  <View style={styles.rowcard}>
                                    <View
                                      style={{
                                        ...styles.rowcard,
                                        ...styles.border,
                                      }}
                                    >
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'NoticesDisplay',
                                            )
                                          }
                                        >
                                          {item.AreaCount > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              <Text style={styles.textn}>
                                                {item.AreaCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.AreaCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            My Villages/Areas
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('Area Alert', {
                                              selectedDat: 1,
                                            })
                                          }
                                        >
                                          {item.todayCounts > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              {item.todayCounts > 0 ? (
                                                <Badge
                                                  style={styles.circlea}
                                                ></Badge>
                                              ) : null}
                                              <Text style={styles.textn}>
                                                {item.todayCounts}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.todayCounts}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>

                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Propertyt,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(237, 28, 36)'
                                                  : 'rgb(237, 28, 36)',
                                            }}
                                          >
                                            Today’s Alert
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('Area Alert', {
                                              selectedDat: 7,
                                            })
                                          }
                                        >
                                          {item._7dayCounts > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              <Text style={styles.textn}>
                                                {item._7dayCounts}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item._7dayCounts}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Last 7 Days
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={styles.rowcard}>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('Area Alert', {
                                              selectedDat: 0,
                                            })
                                          }
                                        >
                                          {item.allCounts > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.allCounts}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.allCounts}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Past Alerts
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              )}
                            />
                          </Fragment>
                        )}
                      </Card>
                      <LinearGradient
                        style={styles.linearGradient}
                        colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.18, 1, 1]}
                      >
                        <Text></Text>
                      </LinearGradient>
                    </Fragment>
                  }
                  {/* ) : null} */}
                  {/* {IsActiveAreaAlert === 0 ? (
              <View style={{marginTop: '6%'}}></View>
            ) : null} */}
                  {/* IsActiveTodaysJaherNotice */}
                  {/* {IsActiveTodaysJaherNotice === 1 ? ( */}
                  {/*  IsActiveTodaysJaherNotice === null || IsActiveTodaysJaherNotice === '' || (Array.isArray(IsActiveTodaysJaherNotice) && IsActiveTodaysJaherNotice.length === 0)
                   */}
                  {IsAtivenew == 0 ? null : (
                    <Fragment >
                      <Card
                        style={{
                          ...styles.card,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#20272b',
                          borderColor:
                            theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                          borderWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            fontSize: 20,
                            color:
                              theme === 'LIGHT'
                                ? 'rgb(153, 153, 153)'
                                : '#ffffff',
                          }}
                        >
                          Aajni Jaher Notice
                        </Text>
                        {isLoadingaaj ? (
                          <View style={styles.ActivityIndicator}>
                            <ActivityIndicator
                              size="large"
                              color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                            />
                          </View>
                        ) : (
                          <Fragment>
                            <FlatList
                              data={AajniJaherNoticed}
                              renderItem={({ item }) => (
                                <Fragment>
                                  <View style={styles.rowcard}>
                                    <View
                                      style={{
                                        ...styles.rowcard,
                                        ...styles.border,
                                      }}
                                    >
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'Ajanijahernotice',
                                              {
                                                selectedDat: 30,
                                              },
                                            )
                                          }
                                        >
                                          {item.NoOfDistrict > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.NoOfDistrict} District
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.NoOfDistrict} District
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Locations Subscribed
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'Ajanijahernotice',
                                              {
                                                selectedDat: 1,
                                              },
                                            )
                                          }
                                        >
                                          {item.todayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              {item.todayCount > 0 ? (
                                                <Badge
                                                  style={styles.circle}
                                                ></Badge>
                                              ) : null}
                                              <Text style={styles.textn}>
                                                {item.todayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.todayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(237, 28, 36)'
                                                  : 'rgb(237, 28, 36)',
                                            }}
                                          >
                                            Today
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'Ajanijahernotice',
                                              {
                                                selectedDat: 7,
                                              },
                                            )
                                          }
                                        >
                                          {item._7DayCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item._7DayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item._7DayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Propertyt,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Last 7 Days
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={styles.rowcard}>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'Ajanijahernotice',
                                              {
                                                selectedDat: 30,
                                              },
                                            )
                                          }
                                        >
                                          {item.allCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.allCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.allCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Past Notices
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              )}
                            />
                          </Fragment>
                        )}
                      </Card>
                      <LinearGradient
                        style={styles.linearGradient}
                        colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.18, 1, 1]}
                      >
                        <Text></Text>
                      </LinearGradient>
                    </Fragment>
                  )}
                  {/* )} */}
                </Fragment>
                {/* )} */}
                {/* )} */}
                {/*  IsActiveAuctionAlert === null || IsActiveAuctionAlert === '' || (Array.isArray(IsActiveAuctionAlert) && IsActiveAuctionAlert.length === 0)
                 */}
                {
                  <Fragment>
                    <Card
                      style={{
                        ...styles.card,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#20272b',
                        borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 15,
                          fontWeight: 'bold',
                          marginTop: 10,
                          fontSize: 20,
                          color:
                            theme === 'LIGHT'
                              ? 'rgb(153, 153, 153)'
                              : '#ffffff',
                        }}
                      >
                        Auction Alert
                      </Text>
                      {isLoadingau ? (
                        <View style={styles.ActivityIndicator}>
                          <ActivityIndicator
                            size="large"
                            color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                          />
                        </View>
                      ) : (
                        <Fragment>
                          <FlatList
                            data={AuctionAler}
                            renderItem={({ item }) => (
                              <Fragment>
                                <View style={styles.rowcard}>
                                  <View
                                    style={{
                                      ...styles.rowcard,
                                      ...styles.border,
                                    }}
                                  >
                                    <View style={styles.column}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate(
                                            'AuctionAlertServicesCount',
                                          )
                                        }
                                      >
                                        {item.Auction_Counts > 0 ? (
                                          <Surface style={styles.surfacea}>
                                            <Text style={styles.textn}>
                                              {item.Auction_Counts}
                                            </Text>
                                          </Surface>
                                        ) : (
                                          <View style={styles.surfacean}>
                                            <Text
                                              style={{
                                                ...styles.textnn,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? '#808080'
                                                    : '#ffffff',
                                              }}
                                            >
                                              {item.Auction_Counts}
                                            </Text>
                                          </View>
                                        )}
                                      </TouchableOpacity>
                                      <View>
                                        <Text
                                          style={{
                                            ...styles.Property,
                                            color:
                                              theme === 'LIGHT'
                                                ? 'rgb(153, 153, 153)'
                                                : '#ffffff',
                                          }}
                                        >
                                          My Auction
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.column}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate(
                                            'AuctionServiceCount',
                                            {
                                              selectedDat: 1,
                                            },
                                          )
                                        }
                                      >
                                        {item.TodayCount > 0 ? (
                                          <Surface style={styles.surfacea}>
                                            {item.TodayCount > 0 ? (
                                              <Badge
                                                style={styles.circlea}
                                              ></Badge>
                                            ) : null}
                                            <Text style={styles.textn}>
                                              {item.TodayCount}
                                            </Text>
                                          </Surface>
                                        ) : (
                                          <View style={styles.surfacean}>
                                            <Text
                                              style={{
                                                ...styles.textnn,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? '#808080'
                                                    : '#ffffff',
                                              }}
                                            >
                                              {item.TodayCount}
                                            </Text>
                                          </View>
                                        )}
                                      </TouchableOpacity>

                                      <View>
                                        <Text
                                          style={{
                                            ...styles.Propertyt,
                                            color:
                                              theme === 'LIGHT'
                                                ? 'rgb(237, 28, 36)'
                                                : 'rgb(237, 28, 36)',
                                          }}
                                        >
                                          Today’s Alert
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.column}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate(
                                            'AuctionServiceCount',
                                            {
                                              selectedDat: 7,
                                            },
                                          )
                                        }
                                      >
                                        {item._7DayCount > 0 ? (
                                          <Surface style={styles.surfacea}>
                                            <Text style={styles.textn}>
                                              {item._7DayCount}
                                            </Text>
                                          </Surface>
                                        ) : (
                                          <View style={styles.surfacean}>
                                            <Text
                                              style={{
                                                ...styles.textnn,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? '#808080'
                                                    : '#ffffff',
                                              }}
                                            >
                                              {item._7DayCount}
                                            </Text>
                                          </View>
                                        )}
                                      </TouchableOpacity>
                                      <View>
                                        <Text
                                          style={{
                                            ...styles.Property,
                                            color:
                                              theme === 'LIGHT'
                                                ? 'rgb(153, 153, 153)'
                                                : '#ffffff',
                                          }}
                                        >
                                          Last 7 Days
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={styles.rowcard}>
                                    <View style={styles.column}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate(
                                            'AuctionServiceCount',
                                            {
                                              selectedDat: 0,
                                            },
                                          )
                                        }
                                      >
                                        {item.AllCount > 0 ? (
                                          <Surface style={styles.surface}>
                                            <Text style={styles.textn}>
                                              {item.AllCount}
                                            </Text>
                                          </Surface>
                                        ) : (
                                          <View style={styles.surfacen}>
                                            <Text
                                              style={{
                                                ...styles.textnn,
                                                color:
                                                  theme === 'LIGHT'
                                                    ? '#808080'
                                                    : '#ffffff',
                                              }}
                                            >
                                              {item.AllCount}
                                            </Text>
                                          </View>
                                        )}
                                      </TouchableOpacity>
                                      <View>
                                        <Text
                                          style={{
                                            ...styles.Property,
                                            color:
                                              theme === 'LIGHT'
                                                ? 'rgb(153, 153, 153)'
                                                : '#ffffff',
                                          }}
                                        >
                                          Past Alerts
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </Fragment>
                            )}
                          />
                        </Fragment>
                      )}
                    </Card>
                    <LinearGradient
                      style={styles.linearGradient}
                      colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      locations={[0.18, 1, 1]}
                    >
                      <Text></Text>
                    </LinearGradient>
                  </Fragment>
                }
                {/*  IsActivePerTaluka === null || IsActivePerTaluka === '' || (Array.isArray(IsActivePerTaluka) && IsActivePerTaluka.length === 0)
                 */}
                {/*
                 */}
                <Fragment>
                  {
                    <Fragment>
                      <Card
                        style={{
                          ...styles.card,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#20272b',
                          borderColor:
                            theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                          borderWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            fontSize: 20,
                            color:
                              theme === 'LIGHT'
                                ? 'rgb(153, 153, 153)'
                                : '#ffffff',
                          }}
                        >
                          TP Alert
                        </Text>
                        {isLoadingtp ? (
                          <View style={styles.ActivityIndicator}>
                            <ActivityIndicator
                              size="large"
                              color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                            />
                          </View>
                        ) : (
                          <Fragment>
                            <FlatList
                              data={TpAlertd}
                              renderItem={({ item }) => (
                                <Fragment>
                                  <View style={styles.rowcard}>
                                    <View
                                      style={{
                                        ...styles.rowcard,
                                        ...styles.border,
                                      }}
                                    >
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'TownPlanningServicesCount',
                                            )
                                          }
                                        >
                                          {item.TP_Counts > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              <Text style={styles.textn}>
                                                {item.TP_Counts}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.TP_Counts}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            My TP
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'TPServiceCount',
                                              {
                                                selectedDat: 1,
                                              },
                                            )
                                          }
                                        >
                                          {item.TodayCount > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              {item.TodayCount > 0 ? (
                                                <Badge
                                                  style={styles.circlea}
                                                ></Badge>
                                              ) : null}
                                              <Text style={styles.textn}>
                                                {item.TodayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.TodayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>

                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Propertyt,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(237, 28, 36)'
                                                  : 'rgb(237, 28, 36)',
                                            }}
                                          >
                                            Today’s Alert
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'TPServiceCount',
                                              {
                                                selectedDat: 7,
                                              },
                                            )
                                          }
                                        >
                                          {item._7DayCount > 0 ? (
                                            <Surface style={styles.surfacea}>
                                              <Text style={styles.textn}>
                                                {item._7DayCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacean}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item._7DayCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Last 7 Days
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={styles.rowcard}>
                                      <View style={styles.column}>
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate(
                                              'TPServiceCount',
                                              {
                                                selectedDat: 0,
                                              },
                                            )
                                          }
                                        >
                                          {item.AllCount > 0 ? (
                                            <Surface style={styles.surface}>
                                              <Text style={styles.textn}>
                                                {item.AllCount}
                                              </Text>
                                            </Surface>
                                          ) : (
                                            <View style={styles.surfacen}>
                                              <Text
                                                style={{
                                                  ...styles.textnn,
                                                  color:
                                                    theme === 'LIGHT'
                                                      ? '#808080'
                                                      : '#ffffff',
                                                }}
                                              >
                                                {item.AllCount}
                                              </Text>
                                            </View>
                                          )}
                                        </TouchableOpacity>
                                        <View>
                                          <Text
                                            style={{
                                              ...styles.Property,
                                              color:
                                                theme === 'LIGHT'
                                                  ? 'rgb(153, 153, 153)'
                                                  : '#ffffff',
                                            }}
                                          >
                                            Past Alerts
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              )}
                            />
                          </Fragment>
                        )}
                      </Card>
                      <LinearGradient
                        style={styles.linearGradient}
                        colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.18, 1, 1]}
                      >
                        <Text></Text>
                      </LinearGradient>
                    </Fragment>
                  }
                </Fragment>

                {IsAtivenewTitle == 0 ? null : (
                  <Fragment >
                    <Card
                      style={{
                        ...styles.card,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#20272b',
                        borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 15,
                          fontWeight: 'bold',
                          marginTop: 10,
                          fontSize: 20,
                          color:
                            theme === 'LIGHT'
                              ? 'rgb(153, 153, 153)'
                              : '#ffffff',
                        }}
                      >
                        Title Search
                      </Text>
                      <View
                        style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                      >
                        <SelectList
                          setSelected={selectedValue => {
                            setSelectedDistrict(selectedValue);
                            // setSelectedDistrict(selectedValue);
                            const selectedService = datas.find(
                              item => item.key === selectedValue,
                            );
                            const dynamicDistrictPlaceholder =
                              'Select Service Name';
                            setDistrictPlaceholder(dynamicDistrictPlaceholder);
                            console.log(selectedService.value);
                            navigation.navigate('TitleSearch', {
                              vilagetalukadistrictdataa: selectedValue,
                              vilagetalukadistrictdataaName:
                                selectedService.value,
                            });
                          }}
                          key={handleSurveyNoSelectPkey}
                          save="key"
                          data={datas}
                          placeholder={
                            districtPlaceholder || 'Select Service Name'
                          }
                          boxStyles={{
                            marginTop: 4,
                            color: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                            backgroundColor:
                              theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                          }}
                          dropdownStyles={{ backgroundColor: '#ffffff' }}
                          defaultValue={
                            districtPlaceholder || 'Select Service Name'
                          }
                          onSearch={search => {
                            if (search.length >= 3) {
                              return datas.filter(item =>
                                item
                                  .toLowerCase()
                                  .includes(search.toLowerCase()),
                              );
                            } else {
                              return [];
                            }
                          }}
                        />
                      </View>
                    </Card>
                    <LinearGradient
                      style={styles.linearGradient}
                      colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      locations={[0.18, 1, 1]}
                    >
                      <Text></Text>
                    </LinearGradient>
                  </Fragment>
                )}
              </Fragment>
              {/* LandRecords */}
              {/* <Card
                style={{
                  ...styles.card,
                  backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
                  borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
                  borderWidth: 1,
                }}>
                <TouchableOpacity
                  style={styles.contacRDinerr}
                  onPress={() => navigation.navigate('LandRecord')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Image
                      source={LandRecords}
                      style={{
                        height: 50,
                        width: 50,
                        marginLeft: 15,
                        padding: 10,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          marginLeft: 8,
                          fontWeight: 'bold',
                          fontSize: 20,
                          color:
                            theme === 'LIGHT'
                              ? 'rgb(153, 153, 153)'
                              : '#ffffff',
                        }}>
                        Land Records
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
                    <FontAwesome
                      name="chevron-right"
                      size={24}
                      color={
                        theme === 'LIGHT' ? 'rgb(153, 153, 153)' : '#ffffff'
                      }
                    />
                  </View>
                </TouchableOpacity>
              </Card> */}
              {/* <Card
            style={{
              ...styles.card,
              backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
              borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
              borderWidth: 1,
            }}>
            <Text
              style={{
                marginLeft: 15,
                fontWeight: 'bold',
                marginTop: 10,
                fontSize: 20,
                color: theme === 'LIGHT' ? 'rgb(153, 153, 153)' : '#ffffff',
              }}>
              Land Record
            </Text>
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
              <SelectList
                setSelected={selectedValue => {
                  setSelectedState(selectedValue);
                  // Clear the selected value
                  if (selectedValue === 1) {
                    navigation.navigate('LandRecord', {
                      SelectState: selectedValue,
                    });
                  } else if (selectedValue === 2) {
                    navigation.navigate('LandRecord', {
                      SelectState: selectedValue,
                    });
                  } else if (selectedValue === 3) {
                    navigation.navigate('LandRecord', {
                      SelectState: selectedValue,
                    });
                  } else if (selectedValue === 4) {
                    navigation.navigate('LandRecord', {
                      SelectState: selectedValue,
                    });
                  }
                }}
                save="key"
                data={StateData}
                placeholder={'Select State'}
                boxStyles={{marginTop: 4}}
                dropdownStyles={{backgroundColor: '#ffffff'}}
                defaultValue={'Select State'}
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
            </View>
          </Card> */}
              {/* )}
          /> */}
              {/* ALL Services  */}
              <LinearGradient
                style={styles.linearGradient}
                colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.18, 1, 1]}
              >
                <Text></Text>
              </LinearGradient>
              <Text
                style={{
                  ...styles.ServiceName,
                  color: theme === 'LIGHT' ? 'rgb(237, 28, 36)' : '#ffffff',
                }}
              >
                All Services
              </Text>
              <LinearGradient
                style={styles.linearGradienta}
                colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.18, 1, 1]}
              ></LinearGradient>
              <View style={styles.Sviewa}>
                <View style={styles.imgcontaier}>
                  <View style={styles.vcard}>
                    {isloading ? (
                      <View style={styles.ActivityIndicatori}>
                        <ActivityIndicator
                          size="large"
                          color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                        />
                      </View>
                    ) : (
                      <FlatList
                        data={imgdata}
                        renderItem={({ item }) => (
                          <Fragment>
                            <View style={styles.scard}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (item.ServiceId === 1) {
                                    navigation.navigate('Propertie', {
                                      Bannerimg: item.BannerImage,
                                    });
                                  }
                                  if (item.ServiceId === 2) {
                                    navigation.navigate('Titelimag', {
                                      Bannerimg: item.BannerImage,
                                    });
                                  }
                                  if (item.ServiceId === 3) {
                                    navigation.navigate('Landimg', {
                                      Bannerimg: item.BannerImage,
                                    });
                                  }
                                  if (item.ServiceId === 4) {
                                    navigation.navigate('Areaimg', {
                                      Bannerimg: item.BannerImage,
                                    });
                                  }
                                }}
                              >
                                <Card
                                  style={{
                                    ...styles.imgcard,
                                    backgroundColor:
                                      theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                  }}
                                >
                                  <Image
                                    style={styles.imag}
                                    source={{ uri: item.ServiceIconURL }}
                                  />
                                </Card>
                              </TouchableOpacity>

                              <Text
                                style={{
                                  ...styles.textim,
                                  color:
                                    theme === 'LIGHT'
                                      ? 'rgb(153, 153, 153)'
                                      : '#ffffff',
                                }}
                              >
                                {item.ServiceName}
                              </Text>
                            </View>
                          </Fragment>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    )}
                    {/* </ScrollView> */}
                  </View>
                </View>
              </View>
              {/* </View>
          </>
          </> 
          */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  networkMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    // Add styles for your network error message container
  },

  // gradient: {
  //   borderBottomRightRadius: 100,
  //   borderBottomLeftRadius: 100,
  //   overflow: 'hidden',
  //   width: '100%',
  // },
  networkMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red', // Change the color as needed
    // Add styles for your network error message text
  },
  paragraph: {
    fontSize: 22,
    alignSelf: 'flex-end',
    fontFamily: 'RobotoCondensed-Regular',
  },
  contacRDiner11: {
    width: '96%',
    height: 100,
    padding: 10,
    marginBottom: 20,
    marginLeft: '2%',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contacRDinerr: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraphh: {
    fontSize: 25,
    alignSelf: 'flex-end',
    fontFamily: 'RobotoCondensed-Regular',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderColor: 'rgb(167, 129, 6)',
    borderBottomWidth: 4,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 50,
    width: '100%',
    marginTop: 5,
    marginLeft: 18,
  },
  text: {
    justifyContent: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  texta: {
    justifyContent: 'center',
    marginTop: '12%',
    height: '100%',
  },
  textn: {
    textAlign: 'center',
  },
  textnn: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: -19,
    color: 'rgb(237, 28, 36)',
  },
  circlea: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: -19,
    color: 'rgb(237, 28, 36)',
    marginLeft: 20,
  },
  logoP: {
    width: '20%',
    height: '52%',
    marginTop: '9%',
    marginLeft: 10,
    marginRight: 14,
    resizeMode: 'contain',
  },
  cardc: {
    width: '100%',
  },
  containerVa: {
    width: '100%',
    height: '8%',
    backgroundColor: '#f2d969',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    marginBottom: '-25%',
    // marginBottom: '-36%',
  },
  containerV: {
    width: '100%',
  },
  cardp: {
    width: '92%',
    backgroundColor: '#FFF',
    elevation: 1,
    borderRadius: 16,
    padding: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: '-13%',
    // marginTop: '8%',
  },
  card: {
    width: '92%',
    backgroundColor: '#FFF',
    marginTop: '3%',
    elevation: 1,
    borderRadius: 16,
    padding: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  cardse: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: '3%',
    elevation: 1,
    borderRadius: 10,
    padding: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
    height: 50,
  },
  rowcard: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },

  rowcarda: {
    flexDirection: 'row',
    marginTop: -5,
    justifyContent: 'center',
  },
  border: {
    borderRightWidth: 2,
    borderColor: 'rgb(204, 204, 204)',
    marginBottom: 5,
    // borderRadius: 12,
  },
  ActivityIndicator: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  ActivityIndicatora: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  ActivityIndicatori: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 50,
    marginLeft: '45%',
    marginRight: '45%',
  },
  surface: {
    padding: 7,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 2,
    elevation: 5,
    borderRadius: 6,
    textAlign: 'center',
    backgroundColor: '#FFF',
  },
  surfacen: {
    padding: 7,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
    elevation: 4,
  },
  surfacea: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 59,
    width: 59,
    marginLeft: 10,
    marginRight: 8,
    borderRadius: 30,
    elevation: 5,
    marginBottom: 5,
  },
  surfacean: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 59,
    width: 59,
    marginLeft: 10,
    marginRight: 8,
    borderRadius: 30,
    marginBottom: 5,
  },
  linearGradientn: {
    height: 8,
    marginTop: 15,
  },
  linearGradient: {
    height: 8,
    marginTop: 15,
  },
  Property: {
    textAlign: 'center',
    width: 68,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // fontWeight: 'bold',
    color: 'rgb(180, 180, 180)',
    marginBottom: 15,
  },
  Propertyt: {
    textAlign: 'center',
    width: 68,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // fontWeight: 'bold',
    color: 'rgb(237, 28, 36)',
    marginBottom: 15,
  },
  View: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
  },
  Text: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    marginTop: 15,
    paddingLeft: 20,
    elevation: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  Sviewa: {
    width: '100%',
    marginBottom: '42%',
    height: 100,
    // marginBottom: '50%',
  },
  linearGradienta: {
    height: 2,
  },
  ServiceName: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    color: 'rgb(237, 28, 36)',
  },
  linearGradientaa: {
    height: 2,
    justifyContent: 'center',
    textAlign: 'center',
  },

  imgcontaier: {
    width: '100%',
    height: '10%',
  },
  vcard: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // scard: {
  //   height: '50%',
  //   width: '22%',
  //   marginLeft: 34,
  //   marginTop: '5%',
  // },
  // imag: {
  //   height: 40,
  //   width: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   marginTop: 15,
  // },

  scard: {
    width: '22%',
    marginLeft: 34,
    marginTop: '5%',
  },
  imag: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: '18%',
  },

  imgcard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    color: '#ffffff',
  },

  textim: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: 'rgb(153, 153, 153)',
  },
  Cards: {
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
  Views: {
    elevation: 5,
    alignSelf: 'center',
    width: '96%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    height: 200,
  },
  Textsv: {
    width: '96%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  FlatLists: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
  },
});

export default App;
