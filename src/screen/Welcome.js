import { View, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, Button, ScrollView } from 'react-native'
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"

import React from 'react'

const WelcomeLogistic = ({navigation}) => {
  return (

        <SafeAreaView style={styles.container}>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>
  <Text style={{color:"black",fontSize:15,alignSelf:'center'}}> Login</Text>
</View>

</Appbar.Header>
<ScrollView>
      <View   style={styles.allLoadd}>
      <TouchableOpacity
      
        onPress={() => navigation.navigate('createLoad')}
      >
       <Text style={{color:"black",fontSize:20}}>(icon)</Text>
       <Text style={{color:"black",fontSize:20}}>Create a Load</Text>
      </TouchableOpacity>
      </View>
      
      <View   style={styles.allLoadd}>
      <TouchableOpacity
      
        onPress={() => navigation.navigate('allLoad')}
      >
       <Text style={{color:"black",fontSize:20}}>(icon)</Text>

       <Text style={{color:"black",fontSize:20}}>ALL Load</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnChkLoad}
    
    onPress={() => navigation.navigate('incomingLoad')}
   >
     <Text style={{color:"black"}}>Check ALL Lodad</Text>
  </ TouchableOpacity>
      {/* <Button title='Chk All Load' onPress={()=>navigation.navigate('incomingLoad')}></Button> */}
   
      <TextInput   
style={styles.input}
placeholder="Bank Information"
editable={false}
placeholderTextColor={'black'}

/>
<TextInput   
style={styles.input}
placeholder="Account Number and Routing Number"
editable={false}
placeholderTextColor={'black'}

/>
</ScrollView>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
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
      width:'100%',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      justifyContent:'center',
      backgroundColor:'#EFDF79'
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
  allLoadd:{marginTop:40, borderWidth:2,borderRadius:10,width:250,alignSelf:"center",
  height:150,justifyContent:"center",alignItems:"center",borderColor:'#EFDF79'}
});
export default WelcomeLogistic