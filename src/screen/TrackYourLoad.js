import React,{useState,useRef,useEffect} from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, ScrollView, Image } from 'react-native'
import { Appbar } from "react-native-paper";
import StarReview from 'react-native-star-review';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import MapView, { PROVIDER_GOOGLE ,Geojson, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';

const TrackYourDelivery = ({route, navigation}) => {
  // const reference = database().ref('/DriverLocations');

  const { data ,plat ,plong,dlat,dlong} = route.params;
  
// console.log(data);
  const GOOGLE_MAPS_APIKEY ='AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo'
  const[location,setLocation] =useState({
    pickupLocation:{
      latitude: data.P_Latitude,
      longitude: data.P_Longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropUpLocation:{
      latitude:data.D_Latitude,
      longitude: data.D_Longitudes,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  
  })
  const mapRef =useRef()

  const [driverplatitude, setdriverplatitude] = useState(plat)
  const [driverplongitude, setdriverplongitude] = useState(plong)
  
  const [platitude , setplatitude] = useState(plat)
  const [plongitude , setplongitude] = useState(plong)
  const [dlatitude , setdlatitude] = useState(dlat)
  const [dlongitude , setdlongitude] = useState(dlong)

  const {pickupLocation,dropUpLocation} = location

  useEffect(()=>{

    database()
    .ref('/kingGamBit/Loads/1')
    .on('value', snapshot => {

      let C_Latitude = snapshot.child('C_Latitude');
      let C_Longitude = snapshot.child('C_Longitude');
      // setdriverplatitude(C_Latitude)
      // setdriverplongitude(C_Longitude)
      console.log(C_Latitude , C_Longitude);

      console.log('User data: ', snapshot.val());
    });
    
  // console.log(parseFloat(data.P_Latitude));


     },[])


  return (
    <View>
      <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Track Your Load</Text>
          <View>
            </View>
        </View>

      </Appbar.Header>

    <ScrollView>
      <View style={styles.mapShow}>

      <MapView 
    style={{width:"100%",height:"100%"}}
    initialRegion={
      {
        latitude:platitude, longitude:plongitude,
        latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }
    }
  >

<Marker
    coordinate={{latitude:platitude, longitude:plongitude}}
   
    >
      </Marker>

{/* {data.Driver_Id != null ? */}
    <Marker
    coordinate={{latitude:driverplatitude, longitude:driverplongitude}}
   
    >
            <Image source={require('../assets/car.png')} resizeMode={'contain'} resizeMethod={'resize'}  />

      </Marker>
      {/* :
      null

} */}


    <Marker
    coordinate={{latitude:dlatitude, longitude:dlongitude}}
    />

  <MapViewDirections
    origin={{latitude:platitude, longitude:plongitude}}
    destination={{latitude:dlatitude, longitude:dlongitude}}
    apikey={GOOGLE_MAPS_APIKEY}
    // stroke
    strokeWidth={3}
    strokeColor='red'
   
  />
    
  </MapView>
     
      </View>



<View style={{paddingHorizontal:20, width:'100%'}}>

{data.Driver_Id != null ?
<View>
<TouchableOpacity
// onPress={()=> {navigation.navigate('DriverDetails',{id:data.Driver_Id})}}
style={{width:'90%',marginTop:10, borderWidth:1.2, borderRadius:15,borderColor:'#EFDF79', height:80,alignSelf:'center', flexDirection:'row'}}>
<View style={{  padding:"2%", width: "25%", height: "100%" }}>
            <Image source={require('../assets/bk.png')}  style={{width:"100%",borderRadius:400/2, height:"100%"}} />
          </View>

  <View style={{height:'100%', width:'75%', }}>
    <View style={{height:'30%',width:'100%', justifyContent:'flex-end', }}>
      <View style={{borderRadius:10,height:'100%', alignSelf:'flex-end',backgroundColor:'black', paddingHorizontal:'8%', borderRadius:10,borderColor:'#EFDF79', borderWidth:2}}>
        <Text style={{color:'#EFDF79'}}>Accepted</Text>
      </View>
    </View>

    <View style={{height:'75%',justifyContent:'center', paddingHorizontal:'5%'}}>
      <Text style={{alignSelf:'center'}}>Driver Name</Text>
      <StarReview 
       ratings={2}
       stars={5}
       starColor="#EFDF79"
    
     />
    </View>
  </View>

  </TouchableOpacity>

  


  <View style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>
      DOT Number
</Text>
  </View>
  <View style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}> MC Number
</Text>
  </View>

</View>
:

null}
  <View style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>
      Caution:
     1- Driving can drive 11 hours a day
     2- Once the Load is Confirmed and pickup the load cannot be cancel
</Text>
  </View>
</View>

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
      width:"90%",
      marginTop:10,
      alignSelf:"center",
      alignItems:"center",
      borderRadius:15,
      padding:20,
      borderWidth:1.2,
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
  },
  text2:{
    alignSelf:"center",
    marginTop:50
}
,mapShow:{
    height: deviceHeight*0.5,
    margin: 10,
    borderColor:'c#EFDF79'
  }
});
export default TrackYourDelivery