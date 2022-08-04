import React, { useState , useEffect} from 'react'
import { View, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, TouchableOpacity, Alert} from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width



const DriverDetails = ({navigation}) => {


  const [spinner,setspinner] = useState(false)  
  const [deviceId,setdeviceId] = useState('')
  const [showIndicator,setshowIndicator] = useState(false)
  const [selected, setSelected] = useState()
  const [paymenttype,setpaymenttype] = useState(3)
  const data = [
      {key:'0',value:'Bank Info'},{key:'1',value:'Credit Card'},
      ]
  const [email,setemail] = useState('')
  const [name,setname] = useState('')
  const [phone,setphone] = useState('')
  const [dateofbirth,setdateofbirth] = useState('')
  const [companyName,setcompanyName] = useState('')
  const [ein,setein] = useState('')
  const [bankinfo,setbankinfo] = useState('')
  const [bankacountnumber,setbankacountnumber] = useState('')
  const [creditcardnumber,setcreditcardnumber] = useState('')
  const [expiredate,setexpiredate] = useState('')
  const [securitycode,setsecuritycode] = useState('')
  const [zipcode,setzipcode] = useState('')
  const [password,setpassword] = useState('')
  const [role,setrole] = useState('')



  const registerApi =()=>{

    setshowIndicator(true)
      setTimeout(() => {
        setshowIndicator(false)
      navigation.navigate('login')
        
      }, 2000);

    let value = {};
    value.Name= name;
    value.Email = email;
    value.Phone = phone;
    value.Date_of_Birth = dateofbirth;
    value.Company_Name= companyName;
    value.EIN= ein;
    value.bankacountnumber=bankacountnumber;
    value.Password=password;
    value.Payment_Type= paymenttype;
    value.Bank_Info=bankinfo;
    value.Bank_Number=bankacountnumber;
    value.Credit_Card_No=creditcardnumber;
    value.Expire_Date=expiredate;
    value.Security_Code=securitycode;
    value.Zip_Code=zipcode;
    value.Token= 'token';
    value.Role= "0";
    value.Device_id=123


    console.log(value);

    var url =AppUrlCollection.REGISTER;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {
          if(responseJson.status == 200){
            console.log('register data response',responseJson);
            navigation.navigate('login')
            setshowIndicator(true)
          }else if(responseJson.status == 422){
            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            alert(responseJson.error)
          }
      console.log('Register user data response',responseJson);
      })
      .catch((error) => {
        alert(error)
        setshowIndicator(true)
          console.warn(error)
      });
  
}

  useEffect(() => {
    
   
    // DeviceInfo.getAndroidId().then((androidId) => {
    //   // androidId here
    //   // console.log(androidId)
    //   setdeviceId(androidId)
    //   // console.log(deviceId)


    // });
  },[]);
 
    return (
      <>
           <SafeAreaView style={styles.container}>
         
         
      <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        </ImageBackground>
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Driver Details</Text>
          <View>
            </View>
        </View>

      </Appbar.Header>


          <ScrollView>
     <View>
       



     </View>


      

    </ScrollView>
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
      alignSelf:"center",
      padding: 10,
      borderWidth: 1,
      width:"100%",
      borderColor:'#EFDF79',
      borderRadius:10,
      backgroundColor:"white",
      // width:190

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
    register_txt:
    {
      fontSize:16,
      fontWeight:'600',
      alignSelf:'center' 
    },
      logtxt:{
      // flex:1,
      paddingVertical:10,
      marginTop:10,
      borderColor:'#EFDF79',
    borderWidth:1,
    
    backgroundColor:'rgba(0,0,0,0.3)',
    width:"90%",
    alignSelf:"center",
  paddingVertical:10,
  paddingHorizontal:20,
  borderRadius:10,
  marginBottom:10,
},
header: {
  elevation: 0,
  backgroundColor: 'transparent',
  alignItems: "center",
  justifyContent: "center",
  width:deviceWidth,
  paddingHorizontal:0,
  paddingVertical:0,

},

headview:{
  height:'100%',
  width:'100%',
  flexDirection:'row',
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  paddingHorizontal:10,
  justifyContent:'space-between',
  backgroundColor:'#EFDF79'
},
image:{
  justifyContent: "center",
  height:deviceHeight,
  width:deviceWidth,
  position:'absolute',
  paddingVertical:0
},
DropDowninput:{
  width:"100%",borderWidth: 1,
  paddingHorizontal:10,
  margin: 12,
alignSelf:"center",
          borderColor:'#EFDF79',
          borderRadius:10,
          backgroundColor:"white",
        height:40
}
  });
export default DriverDetails
