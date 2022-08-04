import React,{useState, useEffect} from 'react'
import { View,Button,Modal,Image, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, ScrollView, PermissionsAndroid } from 'react-native'
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import DatePicker from 'react-native-date-picker'
import { Appbar } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE ,Geojson, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import AppColors from '../Colors/AppColors';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Geocoder from 'react-native-geocoding';
import {getDistance, getPreciseDistance} from 'geolib';
import SelectList from 'react-native-dropdown-select-list'
import Spinner from 'react-native-loading-spinner-overlay';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const CreateLoad = ({navigation}) => {

  const [currentloclat,setcurrentloclat ]=useState(48.8587741)
  const [currentloclon,setcurrentloclon ]=useState(2.2069771)
  const [pickupaddress , setpickupaddress] = useState('')
  const [ vehicletype , setvehicletype] = useState('')
  const [selected, setSelected] = useState()

  const data = [
    {key:'0',value:'Reefer Van'},{key:'1',value:'Dry Van'},{key:'2',value:'Flatbed Van'},
    ]
  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [64.165329, 48.844287],
        }
      }
    ]
  };
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ])
  const [platitude , setplatitude] = useState('')
  const [plongitude , setplongitude] = useState('')
  const [platitudeDelta,setplatitudeDelta]= useState('')
  const [plongitudeDelta ,setplongitudeDelta] = useState('')
  const [dlatitude , setdlatitude] = useState('')
  const [dlongitude , setdlongitude] = useState('')
  const [dropoffaddress , setdropoffaddress] = useState('')
  const [spinner , setspinner]= useState(false)
  const   [region , setregion]  = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })
  const origin = {latitude: 48.8587741,longitude: 2.2069771,};
  const destination = {latitude: 48.8323785,longitude: 2.3361663,};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo';

  const [pmapmodel , setpmapmodel] = useState(false)
  const [dmapmodel , setdmapmodel] = useState(false)
  const [date, setDate] = useState(new Date())
  const [pickuptimeopen, setpickuptimeopen] = useState(false)
  const [dropofftimeopen, setdropofftimeopen] = useState(false) 
  const [pickuptimedate, setpickuptimedate] = useState()
  const [dropofftimedate, setdropofftimedate] = useState()
  
  const [loaddescription, setloaddescription]= useState('')
  const [docknumber, setdocknumber] = useState('')
  const [price, setprice] = useState()
  const [distance, setdistance] =useState('')
  const [driverprice, setdriverprice] = useState('')
  const [totalprice, settotalprice] = useState('')


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setcurrentloclat(position.coords.latitude)
            setcurrentloclon(position.coords.longitude)
          },
          (error) => console.log(error)
          //  this.setState({ error: error.message }),
          // { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: platitude, longitude: plongitude},
      {latitude: dlatitude, longitude: dlongitude},
    );

    let d= pdis / 1000 

    setdistance(d)

console.log( `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
);
  
  };
 


useEffect(()=>{
  Geocoder.init("AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo"); // use a valid API key

  requestCameraPermission()
 
  // Geocoder.fallbackToGoogle('AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo');

},[])

  const onRegionChange=(region)=> {

    // console.log("=="+JSON.stringify(region));
    setplatitude(region.latitude);
    setplongitude(region.longitude);
    setplatitudeDelta(region.latitudeDelta);
    setplongitudeDelta(region.longitudeDelta);
  
  // alert(region.latitude)
    // this.setState({ region });
  }
  const onRegionChangeDropoff=(region)=> {

    // console.log("=="+JSON.stringify(region));
    setdlatitude(region.latitude);
    setdlongitude(region.longitude);
    // setplatitudeDelta(region.latitudeDelta);
    // setplongitudeDelta(region.longitudeDelta);
  
  // alert(region.latitude)
    // this.setState({ region });
  }

  const addressgenerator=(lat , lng)=>{
    Geocoder.from(lat, lng)
		.then(json => {
      // console.log(json.results[0].formatted_address);
        		var addressComponent = json.results[0].formatted_address;

      setpickupaddress(addressComponent)

			// console.log('--'+JSON.stringify(addressComponent));
		})
		.catch(error => console.warn(error));
    // let ret = await Geocoder.geocodePosition({lat, lng})
    // console.log('kkkhkhk');
    // alert(ret)
  }

  const daddressgenerator=(lat , lng)=>{
    Geocoder.from(dlatitude, dlongitude)
		.then(json => {

      // console.log(json.results);
        		var addressComponent = json.results[0].formatted_address;

      setdropoffaddress(addressComponent)

      calculatePreciseDistance()

			// console.log('--'+JSON.stringify(addressComponent));
		})
		.catch(error => console.warn(error));
    // let ret = await Geocoder.geocodePosition({lat, lng})
    // console.log('kkkhkhk');
    // alert(ret)
  }

  const calculateprice = (selected)=> {

    if(selected == 0 ){
      console.log("vheicletype"+"Reefer van");
      let d =distance;
      d=d*(3.59)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)

        
    }else  if (selected == 1){
      console.log("vheicletype"+"Dry van");
      let d =distance;
      d=d*(3.31)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)
    }else {
      console.log("vheicletype"+"Flatbed van");
      let d =distance;
      d=d*(3.44)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)

    }
  }

  const CreateLoadAPI =()=>{

    setspinner(true)

    
    let value = {};
    value.User_id = AppConstance.Id;

    value.P_Address=pickupaddress;
    value.P_Latitude = platitude;
    value.P_Longitude= plongitude,

    value.D_Address= dropoffaddress
    value.D_Latitude = dlatitude;
    value.D_Longitudes= dlongitude,

    value.Load_Description=loaddescription;
    value.Dock_Number=docknumber
    value.Destination= "vdvd";
    value.Vehicle_Type= vehicletype

    value.Pick_up_Time=pickuptimedate
    value.Drop_of_Time = dropofftimedate;

    value.Pricing='5' 
    value.Driver_Price=driverprice
    value.Total_Price=totalprice
    value.Status="0"

    console.log(value);
    // alert(JSON.stringaify(value))

    var url =AppUrlCollection.CREATELOAD;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+AppConstance.AUTH_KEY,
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

          if(responseJson.result == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))
            setspinner(false)
            console.log('login data response',responseJson);
            

              navigation.navigate('welcome')
            // alert(responseJson.DATA)
            // storeData(responseJson)

        //  loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

          }else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            setspinner(false)

            alert(responseJson.error)
          }
      console.log('login data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
      
  }

 

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

      <Modal  
      animationType="fade"
      visible={pmapmodel}
      style={{height:deviceHeight, width:deviceWidth}}
      >
      <View style={styles.mapcontainer}>
        
      <MapView
      scrollEnabled={false}
      onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
       showsMyLocationButton={false}
        initialRegion={{
          latitude: currentloclat,
          longitude: currentloclon,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        
      >
<Marker draggable
    coordinate={{latitude:currentloclat, longitude:currentloclon}}
    onDragEnd={(e) =>  {setregion(e.nativeEvent.coordinate) }}
  />
      
      </MapView>
      <View style={{position:'absolute',top:"3%",flexDirection:'row', justifyContent:'space-between',  width:deviceWidth, paddingHorizontal:'4%'}}>
     
      <GooglePlacesAutocomplete
      placeholder='Search'
      GooglePlacesDetailsQuery={{
        fields: 'geometry',
      }}
      fetchDetails={true}

      styles={{
        textInput:{
          height:'100%',
          borderWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
        },
        loader: {
         backgroundColor:'red'
        },
        
       }}

       renderLeftButton={()=>(
        <TouchableOpacity 
        onPress={()=> {setpmapmodel(false)}} 
        style={{backgroundColor:AppColors.Appcolor,width:'12%',marginTop:0, justifyContent:'center', borderRadius:10,marginRight:5}}>
     <Ionicons   name='md-close-outline'  color={'white'} style={{alignSelf:'center'}} size={25}/>

          </TouchableOpacity>
       )}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data);

      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
    />
        {/* <TextInput
        
        style={{width:'100%',paddingHorizontal:10, height:40,borderWidth:0.8,alignSelf:'center',  borderColor:AppColors.Appcolor, borderRadius:10, backgroundColor:'white'}}
        placeholder='Search here'
        /> */}
          {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      style={{backgroundColor:'red'}}
      query={{
        key: 'AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo',
        language: 'en',
      }}
    /> */}

    
       {/* <TouchableOpacity 
       onPress={()=> {setmap(false)}}
       style={{backgroundColor:AppColors.Appcolor , justifyContent:'center', width:'12%', borderRadius:10}}>
      <Ionicons name='md-close-outline' onPress={()=> {navigation.goBack()}} color={'white'} style={{alignSelf:'center'}} size={25}/>
        </TouchableOpacity> */}
        </View>
        {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo',
        language: 'en',
      }}
    /> */}

{/* <View style={{top:'50%', left:'50%',  zIndex: 3,
      position: 'absolute',
      marginTop: -37,
      marginLeft: -11,}}>
  <Image  style={{height:deviceHeight*0.12, width:deviceWidth*0.12}} source={require('../assets/locationimage3.png')} resizeMode="contain" />
  </View> */}

<View style={{position:'absolute',bottom:'7%', alignSelf:'flex-start', width:deviceWidth, paddingHorizontal:'5%'}}>
        
        <TouchableOpacity 
        onPress={async()=> {  
          addressgenerator(platitude,plongitude)

         setpmapmodel(false)}}
        style={{backgroundColor:AppColors.Appcolor,height:deviceHeight*0.08,justifyContent:'center', borderRadius:25}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Done</Text>
          </TouchableOpacity>
        </View>
    </View>

        </Modal>

        <Modal  
      animationType="fade"
      visible={dmapmodel}
      style={{height:deviceHeight, width:deviceWidth}}
      >
      <View style={styles.mapcontainer}>
        
      <MapView
      scrollEnabled={true}
      onRegionChange={onRegionChangeDropoff}

        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
       showsMyLocationButton={false}
        initialRegion={{
          latitude: currentloclat,
          longitude: currentloclon,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        
      >
     
      </MapView>
      <View style={{position:'absolute',top:"3%",flexDirection:'row', justifyContent:'space-between',  width:deviceWidth, paddingHorizontal:'4%'}}>
     

        <TextInput
        
        style={{width:'100%',paddingHorizontal:10, height:40,borderWidth:0.8,alignSelf:'center',  borderColor:AppColors.Appcolor, borderRadius:10, backgroundColor:'white'}}
        placeholder='Search here'
        />
 
        </View>
  

<View style={{top:'50%', left:'50%', position:'absolute'}}>
  <Image  style={{height:deviceHeight*0.12, width:deviceWidth*0.12}} source={require('../assets/locationimage3.png')} resizeMode="contain" />
  </View>

<View style={{position:'absolute',bottom:'7%', alignSelf:'flex-start', width:deviceWidth, paddingHorizontal:'5%'}}>
        
        <TouchableOpacity 
        onPress={()=> { daddressgenerator() ,setdmapmodel(false) }}
        style={{backgroundColor:AppColors.Appcolor,height:deviceHeight*0.08,justifyContent:'center', borderRadius:25}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Done</Text>
          </TouchableOpacity>
        </View>
    </View>

        </Modal>

 <DatePicker
        modal
        open={pickuptimeopen}
        date={new Date()}
        mode='datetime'
        onConfirm={(date) => {
          // alert(date)
          setpickuptimedate(date.toString())
          
          console.log(date);
          setpickuptimeopen(false)

        }}
        onCancel={() => {
          setpickuptimeopen(false)
        }}
      />
       <DatePicker
        modal
        open={dropofftimeopen}
        mode='datetime'

        // date={dropofftimedate}
        date={new Date()}

        onConfirm={(date) => {
          setdropofftimeopen(false)
          setdropofftimedate(date.toString())
        }}
        onCancel={() => {
          setdropofftimeopen(false)
          // setOpen(false)
        }}
      />
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack(null)}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Create a Load</Text>
          <View>
            </View>
        </View>

        </Appbar.Header>

      <ScrollView style={{paddingHorizontal:15}}>

      
    <View
      style={{  marginTop:20,height:50,flexDirection:'row',borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',alignSelf:'center',
      backgroundColor:"white", justifyContent:'space-between', width:'90%',}}
    >

    <TextInput   
    style={{    height: '100%',
    width:"85%",
    alignSelf:"center",
    paddingHorizontal:10,
    

    }}

    value={pickupaddress}
    placeholder="Pick-Up Location"
    placeholderTextColor={'grey'}
    />

    <TouchableOpacity 
    onPress={()=> {setpmapmodel(true)}}
    style={{borderLeftWidth:1,borderColor:'#EFDF79',width:'15%', justifyContent:'center'}}>
      <Ionicons name='ios-location' style={{alignSelf:'center'}} size={22} color={'red'} />
    </TouchableOpacity>

</View>



<View
style={{  marginTop:20,height:50,flexDirection:'row',borderWidth: 1,
borderRadius:15,
borderColor:'#EFDF79',alignSelf:'center',
backgroundColor:"white", justifyContent:'space-between', width:'90%',}}

>
<TextInput   
style={{    height: '100%',
width:"85%",
alignSelf:"center",
paddingHorizontal:10,
}}
value={dropoffaddress}
placeholder="Drop-Off Location"
placeholderTextColor={'grey'}
/>
<TouchableOpacity 
    onPress={()=> {setdmapmodel(true)}}
style={{borderLeftWidth:1,borderColor:'#EFDF79',width:'15%', justifyContent:'center'}}>
  <Ionicons name='ios-location' style={{alignSelf:'center'}} size={22} color={'red'} />
</TouchableOpacity>

</View>

<SelectList 
      
      dropdownStyles={{backgroundColor:"white", width:'90%',alignSelf:'center',  borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:50,  margin: 12,paddingVertical:10,
      alignSelf:"center",paddingHorizontal:10, alignContent:'center', width:"90%",borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setSelected}  
      onSelect={() => { setvehicletype(selected) , calculateprice(selected)}}
      data={data}  />

<View style={{marginTop:15,width:'90%',alignSelf:'center', height:50}}>
<TextInput   
style={styles.input}
value={loaddescription}
onChangeText={(text)=> {setloaddescription(text)}}
placeholder="Load Description"
placeholderTextColor={'grey'}
/>
</View>
<View style={{marginTop:15,width:'90%',alignSelf:'center',  height:50}}>

<TextInput   
style={styles.input}
placeholder="Dock Number"
value={docknumber}
onChangeText={(text)=> {setdocknumber(text)}}
placeholderTextColor={'grey'}
/>
</View>

<View
      style={{  marginTop:20,height:50,flexDirection:'row',borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',alignSelf:'center',
      backgroundColor:"white", justifyContent:'space-between', width:'90%',}}
    >

    <TextInput   
    style={{    height: '100%',
    width:"80%",
    color:'black',
    alignSelf:"center",
    paddingHorizontal:15,
    }}
    value={pickuptimedate}
    editable={false}
    placeholder="Pick-up Time"
    placeholderTextColor={'grey'}
    />
    {/* <Text>{pickuptimedate}</Text> */}

    <TouchableOpacity 
        onPress={()=> {setpickuptimeopen(true)}}

    style={{borderLeftWidth:1,borderColor:'#EFDF79',width:'15%', justifyContent:'center'}}>
      <Ionicons name='md-time-outline' style={{alignSelf:'center'}} size={22} color={'grey'} />
    </TouchableOpacity>

</View>

<View
      style={{  marginTop:20,height:50,flexDirection:'row',borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',alignSelf:'center',
      backgroundColor:"white", justifyContent:'space-between', width:'90%',}}
    >

    <TextInput   
    style={{    height: '100%',
    width:"80%",
    alignSelf:"center",
    color:'black',
    paddingHorizontal:15,
    }}
    value={dropofftimedate}
    placeholder="Drop-off Time"
    placeholderTextColor={'grey'}
    />

    <TouchableOpacity style={{borderLeftWidth:1,borderColor:'#EFDF79',width:'15%', justifyContent:'center'}}
    onPress={()=> {setdropofftimeopen(true)}}
    >
      <Ionicons name='md-time-outline' style={{alignSelf:'center'}} size={22} color={'grey'} />
    </TouchableOpacity>

</View>

<View style={{marginTop:15 ,width:'90%',alignSelf:'center',justifyContent:'center',  height:50}}>

<Text style={{ width:'100%',  height: '100%',
      paddingVertical:15,
      alignSelf:"center",
      paddingHorizontal:15,
      borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',
      backgroundColor:"white",}}>{totalprice != null ? totalprice : "Price"}</Text>
{/* <TextInput   
style={styles.input}
placeholder="Pricing"
value={price}
editable={false}
placeholderTextColor={'grey'}
/> */}
</View>




<TouchableOpacity
style={styles.brnAccept}
onPress={() => CreateLoadAPI()}
>
<Text   
style={{alignSelf:'center'}}>Create</Text>
</TouchableOpacity>
<View style={{height:50}}>


</View>
      </ScrollView>

</SafeAreaView>
  )
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
      //   justifyContent: center,
      height:deviceHeight,
      width:deviceWidth,
      },

      mapcontainer: {
        // ...StyleSheet.absoluteFillObject,
        flex:1,
        backgroundColor:'black',
        height: deviceHeight,
        width: deviceWidth,
        
        alignItems: 'center',
        alignSelf:'center',
        
      },
      map: {
        height:'100%',
        width:'100%',
        alignSelf:'center',

        // ...StyleSheet.absoluteFillObject,
      },
      brnAccept: {
        height: 50,
        width:'60%',
        marginTop:20,
        borderWidth: 1,
        justifyContent:'center',
        borderColor:'#EFDF79',
        alignSelf:"center",
        textAlign:"center",
        borderRadius:10,
        backgroundColor:"#EFDF79"
      },
    input: {
      height: '100%',
      width:"100%",
      alignSelf:"center",
      paddingHorizontal:15,
      borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',
      backgroundColor:"white",
      
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
    text:{
        alignSelf:"center"
    }
  });

export default CreateLoad