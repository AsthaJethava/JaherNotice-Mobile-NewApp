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
} from 'react-native';
import { RadioButton, Avatar, Button, Card, Divider } from 'react-native-paper';
// import LandRecordStateID from '../LandRecord/LandRecordStateID.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {response} from 'express';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Datanot from '../../Imeges/no-data-1.gif';

// import {Card, ProgressBar} from 'react-native-elements';

const LandRecord = ({ route, navigation }) => {
  const [StateeID, setStateeID] = useState();
  const [Data, setData] = useState([]); // Initialize Data state
  const [listData, setListData] = useState();
  const [isLoding, setIsLoding] = useState();
  const [dataa, setDataa] = useState([]);
  const [datan, setDatan] = useState();

  useEffect(() => {
    listDataa();
    // const {SelectState, District} = route.params;
    // setStateeID(SelectState);
    // // console.log('UseEfrct', SelectState);
    // const stateID = SelectState;
    // // Access the JSON data based on the StateID
    // const stateData = LandRecordStateID[stateID];
    // // Log the districtname values
    // if (stateData && stateData.length > 0) {
    //   const districtNames = stateData[0].Titele.map(district => district.Title);
    //   console.log('District Names:', districtNames);
    //   setData(districtNames); // Set the Data state with districtNames
    // }
  }, []);
  //   console.log('UseEfrct==data', StateeID);

  const [selectedValue, setSelectedValue] = useState(null);
  //   console.log(selectedValue);

  const Next = () => {
    // setSelectedValue();
    // LandRecordeRura
    // LandRecordUrban
    // LandRecordForm
    navigation.navigate('LandRecordForm');
    // console.log('dsaraaa =>', selectedValue);
  };

  // const data = () => {
  //   setDataa([]);
  //   listDataa();
  // };
  const [state, setState] = useState();
  // ?SearchKey=${state}
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddend, setIsHiddend] = useState(false);
  const listDataa = async () => {
    setIsLoding(true);
    let Userid = await AsyncStorage.getItem('UserID');
    // ?SearchKey=14
    // console.log(Userid);
    fetch(`https://qaapi.jahernotice.com/api2/getLRSUser/data/${Userid}`)
      .then(response => response.json())
      .then(data => {
        // setListData(data.data);
        if (data.status === 200) {
          if (data.data.length === 0) {
            setDatan(data);
            setDataa([]);
            setIsHidden(true);
            setIsLoding(false);
            setIsHiddend(false);
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
      .catch(error => console.error(error));
  };
  // console.log('Data', datan);

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
            // backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#484c54',
          }}
          onPress={() => navigation.navigate('LandRecordForm')}
        >
          <Text style={styles.addNewPropertyText}>Add New Document</Text>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => navigation.navigate('LandRecordForm')}
          >
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
                marginTop: 20,
              }}
            />
          ) : (
            <>
              {isHidden ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop: 5,
                  }}
                >
                  <Image
                    source={require('../../Imeges/no-data-1.gif')}
                    style={{
                      width: '26%',
                      height: '30%',
                      marginTop: 160,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      color: '#000',
                    }}
                  >
                    Oops! No Data Found.
                  </Text>
                </View>
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
                          <>
                            <View style={styles.rowa}>
                              <Text
                                style={{ fontWeight: 'bold', fontSize: 16 }}
                              >
                                Document Name
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'normal',
                                  marginTop: 5,
                                  marginBottom: 5,
                                }}
                              >
                                {item.AdhocService}
                              </Text>
                            </View>
                            <Divider style={styles.Divider} />
                          </>
                          <View style={styles.containera}>
                            {item.Survey_No !== '' &&
                            item.Survey_No !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.Survey_No}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Survey No.</Text>
                              </View>
                            ) : null}

                            {item.TP_No !== '' && item.TP_No !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>{item.TP_No}</Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>TP No.</Text>
                              </View>
                            ) : null}

                            {item.Subdivision !== '' &&
                            item.Subdivision !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.Subdivision}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>
                                  Subdivision No.
                                </Text>
                              </View>
                            ) : null}
                            {item.PT_Sheet_Number !== '' &&
                            item.PT_Sheet_Number !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.PT_Sheet_Number}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>PT Sheet No.</Text>
                              </View>
                            ) : null}

                            {item.ChaltaNumber !== '' &&
                            item.ChaltaNumber !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.ChaltaNumber}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Chalta No.</Text>
                              </View>
                            ) : null}
                            {item.CitySurveyNo !== '' &&
                            item.CitySurveyNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.CitySurveyNo}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>
                                  City Survey No.
                                </Text>
                              </View>
                            ) : null}
                            {item.CTS_No !== '' && item.CTS_No !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>{item.CTS_No}</Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>CTS No</Text>
                              </View>
                            ) : null}
                            {item.KhasraNo !== '' && item.KhasraNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.KhasraNo}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Khasra No</Text>
                              </View>
                            ) : null}
                            {item.PlotNo !== '' && item.PlotNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>{item.PlotNo}</Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Plot No</Text>
                              </View>
                            ) : null}
                            {item.PrakaranNo !== '' &&
                            item.PrakaranNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.PrakaranNo}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Prakaran No</Text>
                              </View>
                            ) : null}

                            {item.DocumentNo !== '' &&
                            item.DocumentNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.DocumentNo}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Document No</Text>
                              </View>
                            ) : null}

                            {item.BuildingNo !== '' &&
                            item.BuildingNo !== null ? (
                              <View style={styles.column}>
                                <Text style={styles.value}>
                                  {item.BuildingNo}
                                </Text>
                                <Divider style={styles.Divider} />
                                <Text style={styles.label}>Building No.</Text>
                              </View>
                            ) : null}
                          </View>
                          <View style={styles.containerc}>
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                              {/* SubRegisterOffice, DocumentRegistrationDate, YearOfRegistration */}
                              {item.FP_No !== '' && item.FP_No !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>FP No. :</Text>
                                  <Text style={styles.valuec}>
                                    {item.FP_No}
                                  </Text>
                                </View>
                              ) : null}
                              {item.AvedanNo !== '' &&
                              item.AvedanNo !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Avedan No. :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.AvedanNo}
                                  </Text>
                                </View>
                              ) : null}
                              {item.SubRegisterOffice !== '' &&
                              item.SubRegisterOffice !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Sub Register Office:
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.SubRegisterOffice}
                                  </Text>
                                </View>
                              ) : null}
                              {item.DocumentRegistrationDate !== '' &&
                              item.DocumentRegistrationDate !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Document Registration Date :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {formatDate(item.DocumentRegistrationDate)}
                                  </Text>
                                </View>
                              ) : null}
                              {item.YearOfRegistration !== '' &&
                              item.YearOfRegistration !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Year Of Registration :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.YearOfRegistration}
                                  </Text>
                                </View>
                              ) : null}
                              {item.villageName !== '' &&
                              item.villageName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Village Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.villageName}
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
                              {item.CitySurveyOfficeName !== '' &&
                              item.CitySurveyOfficeName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    City Survey Office Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.CitySurveyOfficeName}
                                  </Text>
                                </View>
                              ) : null}

                              {item.WardName !== '' &&
                              item.WardName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>Ward Name :</Text>
                                  <Text style={styles.valuec}>
                                    {item.WardName}
                                  </Text>
                                </View>
                              ) : null}
                              {item.CityName !== '' &&
                              item.CityName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>City Name :</Text>
                                  <Text style={styles.valuec}>
                                    {item.CityName}
                                  </Text>
                                </View>
                              ) : null}
                              {item.SocietyName !== '' &&
                              item.SocietyName !== null ? (
                                <View style={styles.rowc}>
                                  <Text style={styles.labelc}>
                                    Society Name :
                                  </Text>
                                  <Text style={styles.valuec}>
                                    {item.SocietyName}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                          {/*  Status Pending */}
                          {/* "Status": "Received", */}
                          {item.Status === 'Pending' ? (
                            <>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginBottom: 5,
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: '#ffcd37',
                                    width: '48%',
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 100,
                                    marginTop: 5,
                                    elevation: 2,
                                    flexDirection: 'row',
                                  }}
                                >
                                  <Text
                                    style={{
                                      marginRight: 5,
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    PENDING
                                  </Text>
                                </View>
                              </View>
                            </>
                          ) : (
                            <>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('LandRecordPDF', {
                                    PdfUrl: item.DocumentUrl,
                                    fileUrl: item.DocumentUrl,
                                  })
                                }
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginBottom: 5,
                                  marginLeft: 'auto',
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: '#82e34e',
                                    width: '48%',
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 100,
                                    marginTop: 5,
                                    elevation: 2,
                                    flexDirection: 'row',
                                  }}
                                >
                                  <Text
                                    style={{
                                      marginRight: 5,
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    SUCCESSFUL
                                    {console.log(item.DocumentUrl)}
                                  </Text>
                                  <FontAwesome5
                                    name={'eye'}
                                    style={{
                                      fontSize: 24,
                                    }}
                                  />
                                </View>
                              </TouchableOpacity>
                            </>
                          )}
                        </Card.Content>
                      </Card>
                    </>
                  )}
                />
              ) : null}
            </>
          )}
        </View>
        {/* </ScrollView> */}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
