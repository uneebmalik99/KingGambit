import React,{useEffect} from 'react'
import { View, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, Button, ScrollView } from 'react-native'
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import database from '@react-native-firebase/database';

import firebase from '@react-native-firebase/app';

import AppColors from '../Colors/AppColors';

const WelcomeLogistic = ({navigation}) => {
  useEffect(()=>{
database().ref('/kingGamBit/Loads/1').once('value').then((snapshot)=>   {console.log(snapshot)} )


  },[])



  return (
        <SafeAreaView style={styles.container}>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>

  <Ionicons name='menu-outline' 
  onPress={() => navigation.openDrawer()}
  style={{alignSelf:'center',}} size={30} color='white'/>
  <Text style={{color:"white",fontSize:16,fontWeight:'600', alignSelf:'center' , }}>Home</Text>
  <MaterialCommunityIcons  name='account-circle-outline' 
  onPress={() => { navigation.navigate('Profile')}}
  style={{alignSelf:'center',}} size={30} color='white'/>
</View>

</Appbar.Header>

<ScrollView style={{paddingVertical:0}}>
<View style={{height:deviceHeight}}>
<TouchableOpacity 
        onPress={() => navigation.navigate('createLoad')}

style={{borderWidth:1, height:'20%',width:'76%',alignSelf:'center',marginVertical:10, borderColor:'#EFDF79',borderRadius:10,justifyContent:'space-around', backgroundColor:AppColors.AppGrey}}>
<Feather name={'box'} style={{alignSelf:'center'}} size={30}   color={'black'} />
       <Text style={{color:"black",alignSelf:'center', fontSize:20}}>Create a Load</Text>
  </TouchableOpacity>

  <TouchableOpacity 
          onPress={() => navigation.navigate('allLoad')}

  style={{borderWidth:1, height:'20%',width:'76%',alignSelf:'center',marginVertical:10, borderColor:'#EFDF79',borderRadius:10,justifyContent:'space-around',  backgroundColor:AppColors.AppGrey}}>
<Feather name={'box'} style={{alignSelf:'center'}} size={30}   color={'black'} />
       <Text style={{color:"black",alignSelf:'center', fontSize:20}}>ALL Load</Text>
  </TouchableOpacity>

  {/* <TouchableOpacity 
          onPress={() => {savedata()}}

  style={{borderWidth:1, height:'20%',width:'76%',alignSelf:'center',marginVertical:10, borderColor:'#EFDF79',borderRadius:10,justifyContent:'space-around',  backgroundColor:AppColors.AppGrey}}>
<Feather name={'box'} style={{alignSelf:'center'}} size={30}   color={'black'} />
       <Text style={{color:"black",alignSelf:'center', fontSize:20}}>Frebase</Text>
  </TouchableOpacity> */}
</View>
</ScrollView>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  container: {
      // flex: 1,
    //   justifyContent: center,
    backgroundColor: "#eaeaea",
    height:deviceHeight,
    width:deviceWidth,
      // backgroundColor: "#eaeaea"
    },
    header: {
      elevation: 0,
      backgroundColor: 'transparent',
      alignItems: "center",
      justifyContent: "center",
      width:deviceWidth,
      paddingHorizontal:0,
      paddingVertical:0,
      // width:deviceWidth*0.07,
      // height: deviceHeight * 0.07,
      // alignSelf: "flex-start",
    
    },
    
    headview:{
      height:'100%',
      paddingHorizontal:13,
      width:'100%',
      flexDirection:'row',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      justifyContent:'space-between',
      backgroundColor:AppColors.Appcolor
    },
    btnChkLoad:{
      marginTop:20,
      alignSelf:"center",
      alignItems:"center",
      borderRadius:400/2,
      // borderColor:'#EFDF79',
      padding:20,
      borderWidth:1,
      backgroundColor:'#EFDF79',
      alignContent:"center"
    },
  input: {
    height: 40,
    width:'80%',
    // marginTop:80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center",
    color:"black",
    borderColor:'#EFDF79'
  },
  text:{
      alignSelf:"center",
      marginTop:70,
      color:"black"
  },
  allLoadd:{
    marginTop:20, borderWidth:1.5,borderRadius:10,width:'80%',height:'60%', alignSelf:"center", justifyContent:"center",alignItems:"center",borderColor:'#EFDF79'
  }
});
export default WelcomeLogistic