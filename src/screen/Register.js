import React from 'react'
import { View, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, TouchableOpacity} from 'react-native'
import { Appbar } from "react-native-paper";


const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width
const Register = ({navigation}) => {
    return (
      <>
      
           <SafeAreaView style={styles.container}>
           {/* <Appbar.Header style={styles.header}> */}
        {/* <View  style={styles.registerFirst} >
        <Text>Register</Text>

    </View> */}
    <Appbar.Header style={styles.header}>
       <Text style={{color:"black",fontSize:15,}}>Register</Text>
      </Appbar.Header>
          <ScrollView>
          <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        
          <View style={styles.logtxt}>   
          
   
             <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Enter username or Email "/>
         <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
         <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Date of Birth"/>
         <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="SNN "/> 
        <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="DL "/> 
        <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="DOT Number "
        secureTextEntry={true}
        /> 
         <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="MC Number "
        secureTextEntry={true}
        /> 
         <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder=" Bank Name"/>
        <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder=" Bank Account Holder Name "/>
            <TextInput   
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Bank Account Number"/>
         <TextInput   
        style={styles.input}
        secureTextEntry={true}
        placeholderTextColor={'black'}
        placeholder="Password"/>
      <View style={styles.btnBorder}>

     <TouchableOpacity style={styles.btnregister}
    
     onPress={() => navigation.navigate('login')}
    >
      <Text style={{color:"black",fontSize:15,}}>Sign Up</Text>
   </ TouchableOpacity>
    </View>
    {/* <TouchableOpacity 
    onPress={()=>{
      navigation.navigate('login')
    }}>
      <Text>Aready Have an Account? Login</Text>
    </TouchableOpacity> */}

    </View>
    </ImageBackground>

    </ScrollView>
    {/* </Appbar.Header> */}
    </SafeAreaView>
        
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:deviceHeight,
        width:deviceWidth,
      //   justifyContent: center,
      // marginTop: 170,
        // padding: 24,
        backgroundColor: "transparent",
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor:"white",
      borderColor:'#EFDF79',
      borderRadius:15
    },
    btnBorder:{
      borderColor:'#EFDF79',
      borderWidth:3,
      // borderRadius:200,
      // height:100,
      borderRadius:130/2,
      height:130,
      width:130,
      justifyContent:"center",
      alignSelf:"center"
    },
    btnregister :{
    //  / / width:100,
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
    registerFirst:{
      width:"100%",
      height:deviceHeight*0.09,
      // textAlign:"center",
      alignItems:"center",
      justifyContent:"center",
      borderColor:'#EFDF79',
      borderWidth:2,
      backgroundColor:'#EFDF79',
      borderRadius:200,
      // marginBottom:40
    },
      logtxt:{
      // flex:1,
      paddingVertical:10,
      marginTop:50,
      borderColor:'#EFDF79',
    borderWidth:2,
    height:"100%",
    width:300,
    alignSelf:"center",
  padding:30,
  borderRadius:15
},
header: {
  elevation: 0,
  backgroundColor:'#EFDF79',
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  alignItems: "center",
  justifyContent: "center",
  // width:deviceWidth*0.07,
  // height: deviceHeight * 0.07,
  // alignSelf: "flex-start",
  borderRadius:15
}
,
image:{
  // position:'absolute',
  height:"100%"
}
  });
export default Register
