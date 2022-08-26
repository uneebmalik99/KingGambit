import React,{useState,useEffect} from 'react'
import { View,ImageBackground, Text,TextInput,StyleSheet ,ActivityIndicator,TouchableOpacity,Button, SafeAreaView, Dimensions, ScrollView, Alert } from 'react-native'
import { Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstance from '../constance/AppConstance';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import AppColors from '../Colors/AppColors';
import messaging from '@react-native-firebase/messaging';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
// const image = {require('    ')};
const Login = ({navigation}) => {

  const [email,setemail] = useState('uneebmalik99@gmail.com')
  const [password,setpassword] = useState('12345678')
  const [spinner,setspinner]=useState(false)
  const [firebasetoken, setfirebasetoken] =useState('')


  const storeData = async (responseJson) => {

    AppConstance.Login = "0";
    AppConstance.Id=responseJson.DATA.user.id;
    AppConstance.Name=responseJson.DATA.user.Name;
    AppConstance.Email=responseJson.DATA.user.Email;
    AppConstance.Phone=responseJson.DATA.user.Phone;
    AppConstance.DateofBirth=responseJson.DATA.user.Date_of_Birth;
    AppConstance.CompanyName=responseJson.DATA.user.Company_Name;
    AppConstance.EIN=responseJson.DATA.user.EIN;
    AppConstance.Role=responseJson.DATA.user.Role;
    AppConstance.PaymentType=responseJson.DATA.user.Payment_Type;
    AppConstance.BankInfo=responseJson.DATA.user.Bank_Info;
    AppConstance.BankNumber=responseJson.DATA.user.Bank_Number;
    AppConstance.CreditCardNo=responseJson.DATA.user.Credit_Card_No;
    AppConstance.ExpireDate=responseJson.DATA.user.Expire_Date;
    AppConstance.SecurityCode=responseJson.DATA.user.Security_Code;
    AppConstance.ZipCode=responseJson.DATA.user.Zip_Code;

    AppConstance.AUTH_KEY=responseJson.DATA.token;

    try {

    await AsyncStorage.setItem('Login', "1")

    await AsyncStorage.setItem('Id', responseJson.DATA.user.id.toString())

    await AsyncStorage.setItem('Name', responseJson.DATA.user.Name)
    await AsyncStorage.setItem('Email', responseJson.DATA.user.Email)
    await AsyncStorage.setItem('Phone', responseJson.DATA.user.Phone)
    await AsyncStorage.setItem('DateofBirth', responseJson.DATA.user.Date_of_Birth)
    if(responseJson.DATA.user.Company_Name != null){
      await AsyncStorage.setItem('CompanyName', responseJson.DATA.user.Company_Name)
    }
    if(responseJson.DATA.user.Company_Name != null){
      await AsyncStorage.setItem('EIN', responseJson.DATA.user.EIN)
    }
   
    await AsyncStorage.setItem('Role', responseJson.DATA.user.Role)

    await AsyncStorage.setItem('PaymentType', responseJson.DATA.user.Payment_Type)
    if(responseJson.DATA.user.Payment_Type	 == "0"){
      await AsyncStorage.setItem('BankInfo', responseJson.DATA.user.Bank_Info)
      await AsyncStorage.setItem('BankNumber', responseJson.DATA.user.Bank_Number)
    }else{
      await AsyncStorage.setItem('CreditCardNo', responseJson.DATA.user.Credit_Card_No)
      await AsyncStorage.setItem('ExpireDate', responseJson.DATA.user.Expire_Date)
      await AsyncStorage.setItem('SecurityCode', responseJson.DATA.user.Security_Code)
      await AsyncStorage.setItem('ZipCode', responseJson.DATA.user.Zip_Code)
    }

    await AsyncStorage.setItem('Token', responseJson.DATA.token)
    setspinner(false)

    navigation.navigate('AppDrawer')

    }
     catch (e) {
      setspinner(false)
alert(e)
      console.log(e)
    }
  
  }

  const loginApi =()=>{

    setspinner(true)

    let value = {};
    value.Email = email;
    value.Password=password;
    // value.Device_id=firebasetoken

    value.Device_id='ffnCLL6GQ2GWx9o7J_gemz:APA91bEgiETXXJysMxw0UtOhZ5z5cr8z6nYB1LyY6t1M8B1AwRv3Ts6E0UaE2_eDICIa2IIeojY0i3jn8DRvje256hLOUGKZFpAxKTci5p6DrrWgXy82bQKhmbCTAzjcf1xpQT23qakt'

    var url =AppUrlCollection.LOGIN;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

          if(responseJson.message == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))

            console.log('login data response',responseJson);
            // alert(responseJson.DATA)
            storeData(responseJson)

        //  loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

          }else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            setspinner(false)

            alert(responseJson.error)
          }
      console.log('login data response',responseJson);
      // setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
      
      // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
  }

  const getToken =async () =>{
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("fcm token  "+fcmToken);
      setfirebasetoken(fcmToken)
        // user has a device token
    } else {
      console.log('no token');

        // user doesn't have a device token yet
    }
  }
  useEffect(()=>{

    getToken()
     },[])
    return (
     
        <SafeAreaView style={styles.container}>
       <Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor }
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.30)'
         textStyle={{ color: AppColors.Appcolor }}
      />
            <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>

            <Appbar.Header style={styles.header}>

              <View style={styles.headview}>
                <Text style={{color:"black",fontSize:15,alignSelf:'center'}}> Login</Text>
              </View>
              
            </Appbar.Header>
          
            <ScrollView>
           
           <View style={styles.logtxt}>  

            <View style={{ width:"90%",marginTop:20,alignSelf:"center",paddingHorizontal:10}}>
              <TextInput   
        style={styles.input}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        placeholder="Enter Username or Email "
        placeholderTextColor={'grey'}
        />
            <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        onChangeText={(Text)=>{setpassword(Text)}}
        value={password}
        placeholder="Enter Password"
        placeholderTextColor={'grey'}

        secureTextEntry={true}

        
      />
           
           <TouchableOpacity 
   
    // title="Login"
     onPress={() => navigation.navigate('forgetPass')}
      >
        <Text style={styles.forgetPass}>Forget Password ?</Text>

    </TouchableOpacity>

    </View>

      <View style={styles.btnBorder}>
       <TouchableOpacity 
   style={styles.btnBorderSize}
    // title="Login"
    //  onPress={() => navigation.navigate('welcome')}
     onPress={() =>{
       

      loginApi()
    }}
      >
        <Text style={{color:"black",fontSize:15,}}>LOGIN</Text>

    </TouchableOpacity>
       </View>
      </View>
      <TouchableOpacity
        style={{marginTop:100,alignSelf:"center"}}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={{color:'#EFDF79'}}>Don't have an account? Register</Text>
      </TouchableOpacity>
      </ScrollView>
        </SafeAreaView>
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      //   justifyContent: center,
      // marginTop: 170,
        backgroundColor: "green",
        height:deviceHeight,
        width:deviceWidth,

      },

      headview:{
        height:'100%',
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        justifyContent:'center',
        backgroundColor:'#EFDF79'
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
    
    height:"51%",
    paddingVertical:10,
    width:300,
    alignSelf:"center",
  // padding:30,
  backgroundColor:'rgba(0,0,0,0.3)',
  borderRadius:15
  

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
forgetPass:{
  alignSelf:"flex-end",
  marginBottom:45,
  color:'#EFDF79'
},
btnBorder:{
 borderColor:'#EFDF79',
 borderWidth:3,
 backgroundColor:'black',
 borderRadius:150/2,
 height:150,
width:150,
alignSelf:'center',
justifyContent:"center" 
},
btnBorderSize:{
  padding:10,
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
  // height:"100%",
  // width:"100%",
  justifyContent: "center",
  height:deviceHeight,
  width:deviceWidth,
  position:'absolute',
  paddingVertical:0
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
    alignSelf:'center'
  }
  });


  // const styles = StyleSheet.create({
  //   container: {
  //     ...StyleSheet.absoluteFillObject,
  //     height: 400,
  //     width: 400,
  //     justifyContent: 'flex-end',
  //     alignItems: 'center',
  //   },
  //   map: {
  //     ...StyleSheet.absoluteFillObject,
  //   },
  //  });
export default Login
