import React, { useState , useEffect} from 'react'
import { View,Modal,FlatList, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, TouchableOpacity, Alert} from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import AppColors from '../Colors/AppColors';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/dist/Feather'

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
import AppConstance from '../constance/AppConstance';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width



const Register = ({navigation}) => {


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
  const [state, setstate] = useState('')
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

  
  const [states, setstates] = useState([
    {
      id:1,
      statesname:'folrida'
    },
    {
      id:2,
      statesname:'Texes'
    }
  ]
    
    )
    const [Filteredstates, setFilteredstates] = useState([
      {
        id:1,
        statesname:'folrida'
      },
      {
        id:2,
        statesname:'Texes'
      }
    ]
      
      )
    

    const [statevalue ,setstatevalue] = useState('')
    const [stateid,setstateid] = useState('')
    const [showModal, setshowModal] = useState(false)


  const registerApi =()=>{

    // setshowIndicator(true)
    setspinner(true)
      // setTimeout(() => {
      //   setshowIndicator(false)
      // navigation.navigate('login')
        
      // }, 2000);

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
    value.State_id= stateid;
    value.State_Name= statevalue


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

        setspinner(false)

          if(responseJson.result == 'SUCCESS'){
            setTimeout(() => {
              Snackbar.show({
                text: 'Registered Successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor	:AppColors.Appcolor,
              });
              navigation.navigate('login')
            }, 200);
           
            console.log('register data response',responseJson);

            // setshowIndicator(true)
          }else if(responseJson.status == 422){
            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            alert(responseJson.error)
          }
      console.log('Register user data response',responseJson);
      })
      .catch((error) => {
        alert(error)
        setspinner(false)
        // setshowIndicator(true)
          console.warn(error)
      });
  
}

const searchFilterFunction = (text) => {
  if (text) {

    const newData = states.filter(
      function (item) {

        const itemData = item.state_name
          ? item.state_name.toUpperCase()
          : ''.toUpperCase();


        const textData = text.toUpperCase();

        if (itemData.indexOf(textData) > -1) {
          return itemData.indexOf(textData) > -1;
        }
      });

    setstates(newData)
    //   setFilteredDataSource(newData);

    //   setSearch(text);
    console.log('text is ' + text);
  } else {
    // Inserted text is blank
    setstates(Filteredstates)
    console.log('blank');
    //   this.setState({vehicleList: vehicleList2})
    //   setFilteredDataSource(data);
    //   setSearch(text);
  }
};

const GetStates =()=>{
  var url = AppUrlCollection.STATES;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type':  'application/json',
    }
})
    .then((response) =>  response.json() )
    .then((responseJson) => {

      setstates(responseJson)
      setFilteredstates(responseJson)
      console.log('states data response',responseJson);

        if(responseJson.message == 'SUCCESS'){
          console.log('states data response',responseJson);
       
        }else if(responseJson.status == 422){
          alert(responseJson.errors.password)
        }else if(responseJson.status == 401){
          alert(responseJson.error)
        }
    console.log('login data response',responseJson);
  //   setspinner(false)  
    })
    .catch((error) => {
      // setspinner(false)
      alert(error)
        console.warn(error)
    });
}

const renderstateslist = ({ item }) => {

  let c;
  if (statevalue == item.state_name) {
    c = 1
  }
  return (

    <TouchableOpacity
      onPress={() => { setshowModal(false); setstatevalue(item.state_name), setstateid(item.id) }}
      style={{ marginVertical: 5, borderWidth: 0.5, flexDirection: 'row', borderColor: 'grey', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10, }}>

      {c == null ?
        <Ionicons name='ios-radio-button-off-sharp' color='grey' style={{ alignSelf: 'center' }} size={20} /> :
        <Ionicons name='ios-radio-button-on' color={AppColors.Appcolor} style={{ alignSelf: 'center' }} size={20} />
      }


      <Text style={{ alignSelf: 'center', color: AppColors.Appcolor, marginLeft: 5, }}>{item.state_name}</Text>
    </TouchableOpacity>

  )

}

  useEffect(() => {
    GetStates()
    let deviceId = DeviceInfo.getDeviceId();
    setdeviceId(deviceId);
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
         
           <Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor }
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.30)'
         textStyle={{ color: AppColors.Appcolor }}
      />


      <Modal
       transparent={true}
       visible={showModal}
       >
        <SafeAreaView style={{backgroundColor:"#000000aa",flex:1}} >
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15, flex:1}} >
     
        <View
            style={{ width: deviceWidth, flexDirection: 'row', backgroundColor:AppColors.Appcolor, paddingHorizontal: 13, paddingVertical: 15, height: 55 }}>

            <TouchableOpacity
              style={{ justifyContent: 'center', paddingHorizontal:10, borderRadius:10,  }}
              onPress={() => setshowModal(false)}

            >
            <Ionicons style={{ alignSelf: 'center', }} size={22} color='white' name='ios-close' />


            </TouchableOpacity>

            <View style={{ width: '70%', justifyContent: 'center', }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>STATES</Text>
            </View>

            <View style={{ width: '10%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
                {/* <AntDesign  size={20} style={{alignSelf:'center'}} color='white' name='check'/> */}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 10,marginTop:10, justifyContent: 'center', paddingHorizontal: 5, borderBottomWidth:0.7,borderColor:AppColors.Appcolor, backgroundColor: 'white', flexDirection: 'row' }}>
            <Feather style={{ alignSelf: 'center', }} size={18} color='grey' name='search' />

            <TextInput style={{ backgroundColor: 'white', width: '90%', height: 40, paddingHorizontal: 10, borderRadius: 20 }}
              onChangeText={text => searchFilterFunction(text)}
              // onSubmitEditing={(Text) => searchFilterFunction(Text)}
              // this.callingVehicleContainerService()
              placeholder="Search State"
              placeholderTextColor='grey'
              underlineColorAndroid="transparent"
            ></TextInput>


          </View>


  


 <FlatList
          data={states}
          contentContainerStyle={{width:deviceWidth,marginTop:10, paddingHorizontal:'2%',paddingBottom:"20%"}}
          renderItem={renderstateslist}
          keyExtractor={item => item.id}
        />


</View>
</SafeAreaView>

       </Modal>


      <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        </ImageBackground>
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Register</Text>
          <View>
            </View>
        </View>

      </Appbar.Header>


          <ScrollView>
     
          <View style={styles.logtxt}>   
      {/* <ActivityIndicator size='large' color="#EFDF79" animating={showIndicator}  /> */}
          
   
             <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setname(Text)}}
        value={name}
        style={styles.input}
        placeholder="Name"/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        style={styles.input}
        placeholder="Email "/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setphone(Text)}}
        value={phone}
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
       
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setdateofbirth(Text)}}
        value={dateofbirth}
        style={styles.input}
        placeholder="Date of Birth"/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setcompanyName(Text)}}
        value={companyName}
        style={styles.input}
        placeholder="Company Name"/> 
        <TextInput   
        onChangeText={(Text)=>{setein(Text)}}
        value={ein}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="EIN"/> 

<TouchableOpacity
       onPress={() =>setshowModal(true) }
       > 
       <TextInput   
        onChangeText={(Text)=>{setstates(Text)}}
        value={statevalue}
        editable={false}
        placeholderTextColor={'grey'}
        style={[styles.input,{color:'black'}]}
        placeholder="States"/> 


</TouchableOpacity>
      

      <SelectList 
      
      dropdownStyles={{backgroundColor:"white", borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:40,  margin: 12,
      alignSelf:"center",paddingHorizontal:10,paddingVertical:8, alignContent:'center', width:"100%",borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setSelected}  
      onSelect={() => { setpaymenttype(selected)}}
      data={data}  />

{
  selected == 0
  ?
  <View >
   <TextInput   
            onChangeText={(Text)=>{setbankinfo(Text)}}
            value={bankinfo}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Bank Information"/>
        <TextInput   
            onChangeText={(Text)=>{setbankacountnumber(Text)}}
            // value={bankacountnumber}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Account Number"/>
    </View>
    :
    selected == 1?

    <View >
        <TextInput   
        onChangeText={(Text)=>{setcreditcardnumber(Text)}}
        value={creditcardnumber}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Credit Card Number"
        secureTextEntry={true}
        /> 
     <TextInput   
         onChangeText={(Text)=>{setexpiredate(Text)}}
         value={expiredate}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Expire Date"
        secureTextEntry={true}
        /> 
         <TextInput   
         onChangeText={(Text)=>{setsecuritycode(Text)}}
         value={securitycode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Security Code"/>
        <TextInput   
        onChangeText={(Text)=>{setzipcode(Text)}}
        value={zipcode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Zip Code "/>
      
    </View>
    :
    <View>

    </View>
}

        <TextInput   
         onChangeText={(Text)=>{setpassword(Text)}}
         value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        placeholder="Password"/>

        {/* <TextInput   
         onChangeText={(Text)=>{setpassword(Text)}}
         value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        placeholder="Password"/> */}

      <View style={styles.btnBorder}>

     <TouchableOpacity style={styles.btnregister}
            onPress={()=>{registerApi()}}

    //  onPress={() => navigation.navigate('login')}
    >
        {/* onPress={()=>{registerApi()}} */}
      <Text style={{color:"black",fontSize:15,}}>Sign Up</Text>
   </ TouchableOpacity>
    </View>

    </View>

    <TouchableOpacity
        style={{marginTop:50,alignSelf:"center"}}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={{color:'#EFDF79'}}>Already have an account? Login</Text>
      </TouchableOpacity>

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
export default Register
