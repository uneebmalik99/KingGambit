import { View,ImageBackground, Text,TextInput,StyleSheet ,TouchableOpacity,Button, SafeAreaView,Dimensions } from 'react-native'

import React from 'react'
import { Appbar } from "react-native-paper";


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const ForgetPass = ({navigation}) => {
  return (
    
  
  <SafeAreaView style={styles.container}>
   <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>

            <Appbar.Header style={styles.header}>

              <View style={styles.headview}>
                <Text style={{color:"black",fontSize:15,alignSelf:'center'}}> Forget Password</Text>
              </View>
              
            </Appbar.Header>
          
     <View style={styles.logtxt}>   
      <View style={{ width:"90%",marginTop:20,alignSelf:"center",paddingHorizontal:10}}>
        <TextInput   
  style={styles.input}
  placeholder="Enter Email "
  placeholderTextColor={'grey'}
  />
     
     
    

</View>

<View style={styles.btnBorder}>
 <TouchableOpacity 
style={styles.btnBorderSize}
// title="Login"
onPress={() => navigation.navigate('verificationCode')}
>
  <Text style={{color:"black",fontSize:15,}}>Submit</Text>

</TouchableOpacity>
 </View>
</View>

{/* </ImageBackground> */}
  </SafeAreaView>
  
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
    //   justifyContent: center,
    // marginTop: 170,
      backgroundColor: "#eaeaea",
      height:"100%"

    },
  input: {
    height: 60,
    width:"100%",
    alignSelf:"center",
    paddingHorizontal:15,
    margin: 12,
    borderWidth: 1,
    // padding: 10,
    borderRadius:15,
    borderColor:'#EFDF79',
    backgroundColor:"white",
    color:"black"
    
    
  },
  logtxt:{
    marginTop:120,
    borderColor:'#EFDF79',
  borderWidth:1,
  
  height:"40%",
  paddingVertical:10,
  width:300,
  alignSelf:"center",
// padding:30,
backgroundColor:'rgba(0,0,0,0.3)',
borderRadius:15


},
forgetPass:{
alignSelf:"flex-end",
// backgroundColor:'red',
marginBottom:45,
color:'#EFDF79'
},
btnBorder:{
// marginTop:30,
borderColor:'#EFDF79',
borderWidth:3,
backgroundColor:'black',
borderRadius:130/2,
height:130,
// paddingVertical:10,
width:130,
alignSelf:'center',
justifyContent:"center" 
//  justifyContent:"center"
},
btnBorderSize:{
// width:100,
padding:10,
// height:40,
// marginTop:20,
justifyContent:"center",
height:"70%",
width:'70%',
alignSelf:"center",
alignItems:"center",
borderRadius:400/2,
borderColor:'#EFDF79',
borderWidth:1,
backgroundColor:'#EFDF79',
alignContent:"center"
// fontSize:40
},
image: {
// flex: 1,
justifyContent: "center"
},
loginFirst:{
// marginTop:0,
width:"100%",
height:50,
// textAlign:"center",
alignItems:"center",
borderColor:'#EFDF79',
borderWidth:2,
backgroundColor:'#EFDF79',
// borderRadius:200,
borderBottomRightRadius:15,
borderBottomLeftRadius:15,
justifyContent:"center",
},
HeaderTxt:{
  color:'black',
  fontWeight:"500",
  fontSize:16,
  marginTop:0
}
,

headview:{
  height:'100%',
  width:'100%',
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  justifyContent:'center',
  backgroundColor:'#EFDF79'
},
image: {
  // flex: 1,
  // height:"100%",
  // width:"100%",
  justifyContent: "center",
  height:deviceHeight,
  width:deviceWidth,
  position:'absolute',
  paddingVertical:0
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

}
});
export default ForgetPass