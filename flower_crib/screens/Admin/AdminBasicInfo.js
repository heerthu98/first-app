import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextLink,
  TouchableOpacity,
  View,
  TextLinkContent,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';
import ImgToBase64 from 'react-native-image-base64';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';

const AdminBasicInfo = (props) => {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceMakupList, setMakeupServiceList] = useState([]);
  const [serviceOthersList, setOthersServiceList] = useState([]);

  useEffect(() => {
    const customersRef = collection(db, 'UserLogin');
    const q = query(customersRef, orderBy('date', 'desc'));

    onSnapshot(q, (snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customers);
      console.log(customers);
    });
  }, []);

  useEffect(() => {
    const serviceRef = collection(db, 'hairstyle');
    const q = query(serviceRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServiceList(services);
      console.log(services);
    });
  }, []);

  useEffect(() => {
    const serviceMakeupRef = collection(db, 'MakeUp');
    const q = query(serviceMakeupRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMakeupServiceList(services);
      console.log(services);
    });
  }, []);

  useEffect(() => {
    const serviceOthersRef = collection(db, 'Others');
    const q = query(serviceOthersRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOthersServiceList(services);
      console.log(services);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.purple}>
              <TouchableOpacity style={styles.TextLink} onPress={() => navigation.replace('ViewCustomers')}>
                <Icon name="people" type="ionicon" color="#cf18e8" size={40} paddingRight={5} />
                <Text style={styles.color}>{customers.length}</Text>
                <Text style={styles.text1}>Total Users</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.purple}>
              <TouchableOpacity style={styles.TextLink} onPress={() => navigation.replace('AdminService')}>
                <Icon name="settings" type="ionicon" color="#cf18e8" size={30} paddingRight={5} />
                <Text style={styles.color}>
                  {serviceMakupList.length + serviceList.length + serviceOthersList.length}
                </Text>
                <Text style={styles.text1}>Total Services</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.purple}>
              <TouchableOpacity style={styles.TextLink} onPress={() => navigation.replace('AdminPastAppointment')}>
                <Icon name="documents" type="ionicon" color="#cf18e8" size={30} paddingRight={5} />
                <Text style={styles.color}>45</Text>
                <Text style={styles.text1}>Total Appointments</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.purple}>
              <TouchableOpacity style={styles.TextLink} onPress={() => navigation.replace('AdminUpcomingAppointment')}>
                <Icon name="receipt" type="ionicon" color="#cf18e8" size={30} paddingRight={5} />
                <Text style={styles.color}>14</Text>
                <Text style={styles.text1}>Pending Appointments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AdminBasicInfo;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
    padding: 3,
  },

  Line: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#9ca3af',
    marginVertical: 10,
    marginLeft: '5%',
  },

  StyledButton: {
    padding: 10,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  container: {
    // marginTop: 10,
    // // marginHorizontal: 10,
    // // marginVertical: 4,
    // flex: 1,
    // width: '100%',
    // height: 400,
    // // flexWrap: 'wrap',
    // // flexDirection: 'column', // set elements horizontally, try column.
    // // backgroundColor: '#6600cc',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 175,
  },
  purple: {
    height: '80%',
    width: '45%',
    shadowColor: '#878383',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    margin: 9,
    marginEnd: 10,
    borderRadius: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    fontSize: 20,
    color: '#6600cc',
  },

  text1: {
    padding: 5,
    color: '#04131D',
    fontSize: 14,
  },
});
