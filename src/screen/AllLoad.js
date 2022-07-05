import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,Dimensions, ScrollView,Image } from 'react-native'
import { Avatar, Button, Title, Card, Paragraph } from 'react-native-paper'

import React from 'react'
import { Appbar } from "react-native-paper";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const AllLoad = ({ navigation }) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1',
      title: 'Pick Up Location Distination Load Details Dock Number',
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      id: '3ac68afc-c605',

      title: 'Pick up Confirmation Drop of Location Dock Number',
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
      id: '58694a0f-3da1',

      title: 'Pick up Confirmation Drop of Location Dock Number',
      // image:require('../assets/bk.png')

    },
    {
      id: '58694a0f-3da1',

      title: 'Pick up Confirmation Drop of Location Dock Number',

    },
    {
      id: '58694a0f-3da1',

      title: 'Pick Up Location Distination Load Details Dock Number',
    },
  ];

  const Item = ({ title }) => (
    <TouchableOpacity onPress={() => navigation.navigate('trackyourDelivery')}>
      <View style={styles.input}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    // <Item title={item.title} />


    <TouchableOpacity 
    style={{height: deviceHeight*0.28,width:"100%",borderRadius:15, marginTop:10,backgroundColor:'grey'}}
    onPress={() => navigation.navigate('trackyourDelivery')}>

      {/* <View style={{ borderColor: '#EFDF79',height:"100%",borderRadius:15, borderWidth: 1,backgroundColor: "grey" }}> */}
        <View style={{ height:"17%", backgroundColor: "#EFDF79",justifyContent:"center"}}>
          {/* Load Dock Number:{item.id}  */}
          <Text style={styles.txt}>Load Dock Number:{item.id}</Text>
        </View>

        <View style={{  paddingVertical:"2%", height:"83%", paddingHorizontal:'3%',flexDirection: "row" }}>

          <View style={{  padding:"3%", width: "35%", height: "100%" }}>
            {/* <Text style={styles.txt} >35</Text> */}
            <Image source={require('../assets/bk.png')} style={{width:"100%",height:"100%"}} />
          </View>




          <View style={{  width: "65%",paddingHorizontal:"5%", alignItems: "center", justifyContent: "space-around" }}>

            <View style={{  width: "100%", }}>
              <Text style={styles.txt}>65 Pimber</Text>
            </View>

            <View style={{  width: "100%" }}>
              <Text style={styles.txt}>Pick upk Number</Text>
            </View>

            <View style={{  width: "100%", }}>
              <Text style={styles.txt}>Pick up ck Number</Text>
            </View>

          </View>

        </View>

      {/* </View> */}
    </TouchableOpacity>

  );

  return (


    <View>


      <Appbar.Header style={styles.header}>
        <Text style={{ fontSize: 20, color: 'black' }}>All Load</Text>

      </Appbar.Header>
      <ScrollView>

        {/* <Text style={styles.text}>All Load</Text> */}

        <FlatList
          data={DATA}
          contentContainerStyle={{width:deviceWidth, paddingHorizontal:'5%',paddingBottom:"30%"}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: center,
    marginTop: 170,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  input: {
    height: 150,
    width: '70%',
    marginTop: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center"
  }, text: {
    alignSelf: "center",
    marginTop: 70,
  },
  header: {
    elevation: 0,
    backgroundColor: '#EFDF79',
    alignItems: "center",
    justifyContent: "center",
    // width:deviceWidth*0.07,
    // height: deviceHeight * 0.07,
    // alignSelf: "flex-start",
    borderRadius: 15
  },
  card: {
    margin: 10,
    elevation: 5, // elevation shahdow deny k liye
    borderWidth: 2, borderRadius: 10, borderColor: '#EFDF79',
    backgroundColor: "lightgrey"

  },
  txt: {
    color: 'black',
    alignSelf:"center"
  }
});

export default AllLoad