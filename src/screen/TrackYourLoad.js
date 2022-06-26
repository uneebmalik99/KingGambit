import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, ScrollView } from 'react-native'
import { Appbar } from "react-native-paper";

import React from 'react'

const TrackYourDelivery = ({navigation}) => {
  return (
    <View>
      <Appbar.Header style={styles.header}>
      <Text style={{color:"black",fontSize:15,}}>
        Track The Delivery
      </Text>
      
      </Appbar.Header>
      <ScrollView>
      <View style={styles.mapShow}>
        
      <Text style={{color:"black",fontSize:15,alignSelf:"center"}}>Maps</Text>
    <View style={{marginTop:170}}>
      {/* <Text style={styles.text}>Where He Pickup Load</Text>
      <Text style={styles.text2}>Where He Gonna Drop The Load</Text> */}
      
      </View>
     
</View>

<TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>Driver Name</Text>
  </ TouchableOpacity>
  <TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>
      DOT Number
</Text>
  </ TouchableOpacity>
  <TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}> MC Number
</Text>
  </ TouchableOpacity>
  <TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>
      Caution:
     1- Driving can drive 11 hours a day
     2- Once the Load is Confirmed and pickup the load cannot be cancel
</Text>
  </ TouchableOpacity>


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
    btnDelivered:{
      // width:40,
      width:"60%",
      marginTop:2,
      alignSelf:"center",
      alignItems:"center",
      borderRadius:20,
      // borderColor:'#EFDF79',
      padding:20,
      borderWidth:1,
     borderColor:'#EFDF79',
      alignContent:"center"
    },
  input: {
    height: 40,
    width:'60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center"
  },
  header: {
    elevation: 0,
    backgroundColor: '#EFDF79',
    alignItems: "center",
    justifyContent: "center",
    // width:deviceWidth*0.07,
    // height: deviceHeight * 0.07,
    // alignSelf: "flex-start",
    borderRadius:15
  },
  text:{
      alignSelf:"center"
  },
  text2:{
    alignSelf:"center",
    marginTop:50
}
,mapShow:{
    height: 300,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    borderColor:'c#EFDF79'
  }
});
export default TrackYourDelivery