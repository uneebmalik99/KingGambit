import React,{useState,useRef,useEffect} from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, ScrollView, Image } from 'react-native'
import { Appbar } from "react-native-paper";
import StarReview from 'react-native-star-review';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import MapView, { PROVIDER_GOOGLE ,Geojson, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppColors from '../Colors/AppColors';
import {getDistance, getPreciseDistance} from 'geolib';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';

const TrackYourDelivery = ({route, navigation}) => {

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  // const reference = database().ref('/DriverLocations');


  const { data ,plat ,plong,dlat,dlong} = route.params;

  const [pickupaddress , setpickupaddress] = useState(data.P_Address)
  const [dropoffaddress , setdropoffaddress] = useState(data.D_Address)
  const [distance, setdistance] =useState('')
  const [driverprice, setdriverprice] = useState('')
  const [totalprice, settotalprice] = useState('Fare')
  const [driverloclat ,setdriverloclat] = useState(33.658566)
  const [driverloclong ,setdriverloclong] =  useState(73.063308)

  
 
// console.log(data);
  // const GOOGLE_MAPS_APIKEY ='AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo'

  const GOOGLE_MAPS_APIKEY ='AIzaSyDCRFvmRovo6gMuJ2hgVkQvp1VY35XnJLY'
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

  const [dropOffUpdateAdress , setdropOffUpdateAdress] = useState(data.D_Address)
  const [pickuUpdateAdress , setpickuUpdateAdress] = useState(data.P_Address)
  const [Updatepickuplat,setUpdatepickuplat] =useState(plat)
  const [Updatepickuplongi,setUpdatepickuplongi] =useState(plong)

  const [UpdateDropOfflat,setUpdateDropOfflat] =useState(dlat)

  const [UpdateDropOfflongi,setUpdateDropOfflongi] =useState(dlong)
  const [spinner,setspinner] = useState(false)  

  const {pickupLocation,dropUpLocation} = location

  useEffect(()=>{

    console.log( '----------'+JSON.stringify(data));

    if(data.Driver_Id != null){
      database()
      .ref('/kingGamBit/Loads/'+data.id)
      .on('value', snapshot => {
  
        let C_Latitude = snapshot.child('C_Latitude');
        let C_Longitude = snapshot.child('C_Longitude');

        // setdriverloclat(C_Latitude)
        // setdriverloclong(C_Longitude)
        console.log(C_Latitude , C_Longitude);
  
        console.log('User data: ', snapshot.val());
      });
    }
   
    
  // console.log(parseFloat(data.P_Latitude));


     },[])


     const calculatePreciseDistance = () => {
      var pdis = getPreciseDistance(
        {latitude: platitude, longitude: plongitude},
        {latitude: dlatitude, longitude: dlongitude},
      );
  
      let t= pdis / 1000 
      t= t *0.621371
  
  
      let d= pdis / 1000 
  
     d= d *0.621371
  
     console.log('distance'+''+ d);
      setdistance(d)
        // setDistance(t)
  
      calculateprice(d )
  
  console.log( `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
  );
    
    };

    

    const calculateprice = (dis)=> {
console.log('calculateprice');
      if(data.vehicletype == '0' ){
        console.log("vheicletype"+"Reefer van");
        
        let d =0;
        d=distance
        if(d==0){
          d=dis
        }
        d=d*(3.59)
        let p = d *(25)
        p  = p/100
        p= p+d
  
        p=p.toFixed(0)
        d=d.toFixed(0)
  
        // alert(p +"      "+ d)
  
        setdriverprice(d)
        settotalprice(p)
        // alert(p +'    '+d)
        console.log(d , p);
        refRBSheet2.current.close()
          
      }else  if (data.vehicletype == '1'){
        console.log("vheicletype"+"Dry van");
        let d =0;
        d=distance
        if(d==0){
          d=dis
        }
        d=d*(3.31)
        let p = d *(25)
        p  = p/100
        p= p+d
        p=p.toFixed(0)
        d=d.toFixed(0)
        setdriverprice(d)
        settotalprice(p)
        refRBSheet2.current.close()
  
  
      }
      else  if (data.vehicletype == '2'){
        console.log("vheicletype"+"power van");
        let d =0;
        d=distance
        if(d==0){
          d=dis
        }
        d=d*(3.00)
        let p = d *(25)
        p  = p/100
        p= p+d
        p=p.toFixed(0)
        d=d.toFixed(0)
        setdriverprice(d)
        settotalprice(p)
        refRBSheet2.current.close()
      }
      
      else {
        console.log("vheicletype"+"Flatbed van");
        let d =0;
        d=distance
        if(d==0){
          d=dis
        }
        d=d*(3.44)
        let p = d *(25)
        p  = p/100
        p= p+d
        p=p.toFixed(0)
        d=d.toFixed(0)
        setdriverprice(d)
        settotalprice(p)
        refRBSheet2.current.close()
      }
    }

   
  //  ,plat ,plong,dlat,dlong
    const  updateApiCall = ()=>
    {

      if(pickuUpdateAdress != pickupaddress || dropoffaddress != dropOffUpdateAdress){
        setspinner(true)

        let value = {};

        value.Id = data.id;
        value.notification_check = "1";
        value.P_Address = pickuUpdateAdress;
        value.D_Address= dropOffUpdateAdress;
      value.P_Latitude = Updatepickuplat;
      value.P_Longitude= Updatepickuplongi;
      value.D_Latitude= UpdateDropOfflat;
      value.D_Longitudes= UpdateDropOfflongi;
      value.Distance= distance;
      value.Total_Price = totalprice;
      value.Driver_Price = driverprice;
      
      
      
        var url = AppUrlCollection.LOADS_UPDATE;
      
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type':  'application/json',
          },
          body: JSON.stringify(value),
      })
          .then((response) =>  response.json() ) 
          .then((responseJson) => {
      
            if(responseJson.status == "1")
            {
              setspinner(false)

            }
            console.log(responseJson);
            // setcancelmodal(false)
      
        setspinner(false)
      
          })
          .catch((error) => {
            alert(error)
              console.warn(error)
        setspinner(false)
      
          });
        
      }


    }

  return (
    <View>

<Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor }
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.30)'
         textStyle={{ color: AppColors.Appcolor }}
      />
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


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={deviceHeight*0.95}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{height:'100%', paddingHorizontal:'3%'}}>
       
<GooglePlacesAutocomplete
       placeholder={pickupaddress}
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
       styles={{
         textInput:{
           height:'100%',
            marginTop:10,
           borderBottomWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <FontAwesome name='circle-o' style={{alignSelf:'center', marginTop:15,}} color={dropoffaddress !== 'From' || dropoffaddress !== "" || dropoffaddress != null ? "grey": AppColors.skyblue}  size={15} />
 
           
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
         
         console.log(JSON.stringify(details?.geometry?.location));

        //  setplatitude(details?.geometry?.location.lat)
        //  setplongitude(details?.geometry?.location.lng)
         setUpdatepickuplat(details?.geometry?.location.lat)
         setUpdatepickuplongi(details?.geometry?.location.lng)
        //  alert(details?.geometry?.location.lng)
        
        //  setpickupaddress(data.description)

         setpickuUpdateAdress(data.description)

 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     /> 

     <View style={{height:'10%',bottom:40,justifyContent:'space-around', flexDirection:'row', width:deviceWidth,alignSelf:'center', }}>
       <TouchableOpacity 
        onPress={()=> {refRBSheet.current.close()}}
       style={{height:'70%',borderWidth:0.7,borderRadius:10,borderColor:AppColors.Appcolor,  justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700', color:AppColors.Appcolor,alignSelf:'center'}}>Close</Text>
       </TouchableOpacity>

       <TouchableOpacity 
       onPress={()=> {refRBSheet.current.close()}}
       style={{height:'70%',borderWidth:0.7,borderRadius:10, borderColor:AppColors.Appcolor, justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700',color:AppColors.Appcolor, alignSelf:'center'}}>Done</Text>
       </TouchableOpacity>
       </View>
        </View>

      </RBSheet>



      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={deviceHeight*0.95}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{height:'100%', paddingHorizontal:'3%'}}>
       
<GooglePlacesAutocomplete
       
       value={dropoffaddress}
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
       styles={{
         textInput:{
           height:'100%',
            
           borderBottomWidth:1.2,marginTop:10, borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <FontAwesome name='circle-o' style={{alignSelf:'center', marginTop:18,}} color={dropoffaddress !== 'To' && dropoffaddress.length>0 !== "" || dropoffaddress != null ? "grey": AppColors.skyblue}  size={15} />
 
           
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
         
         console.log(JSON.stringify(details?.geometry?.location));


         
        //  setdlatitude(details?.geometry?.location.lat)
        //  setdlongitude(details?.geometry?.location.lng)

         setUpdateDropOfflat(details?.geometry?.location.lat)
         setUpdateDropOfflongi(details?.geometry?.location.lng)
        
         setdropOffUpdateAdress(data.description)


 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     /> 

     <View style={{height:'10%',bottom:40,justifyContent:'space-around', flexDirection:'row', width:deviceWidth,alignSelf:'center', }}>
       <TouchableOpacity 
        onPress={()=> {calculatePreciseDistance();}}
       style={{height:'70%',borderWidth:0.7,borderRadius:10,borderColor:AppColors.Appcolor,  justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700', color:AppColors.Appcolor,alignSelf:'center'}}>Close</Text>
       </TouchableOpacity>

       <TouchableOpacity 
       onPress={()=> { calculatePreciseDistance(); }}
       style={{height:'70%',borderWidth:0.7,borderRadius:10, borderColor:AppColors.Appcolor, justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700',color:AppColors.Appcolor, alignSelf:'center'}}>Done</Text>
       </TouchableOpacity>
       </View>
        </View>

      </RBSheet>

    <ScrollView>
      <View style={styles.mapShow}>

      <MapView 
    style={{width:"100%",height:"100%"}}
    provider={PROVIDER_GOOGLE}
    initialRegion={
      {
        latitude:Updatepickuplat, longitude:Updatepickuplongi,
        latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }
    }
  >
<Marker
    coordinate={{latitude:Updatepickuplat, longitude:Updatepickuplongi}}
   
    >
      </Marker>
   {/* Driver location pick from firebase */}


   <Marker
    coordinate={{latitude:driverloclat, longitude:driverloclong}}
    />
 


    <Marker
    coordinate={{latitude:UpdateDropOfflat, longitude:UpdateDropOfflongi}}
    />

  <MapViewDirections
    origin={{latitude:Updatepickuplat, longitude:Updatepickuplongi}}
    destination={{latitude:UpdateDropOfflat, longitude:UpdateDropOfflongi}}
    apikey={GOOGLE_MAPS_APIKEY}
    // stroke
    strokeWidth={3}
    strokeColor='red'
   
  />
    
  </MapView>
     
      </View>



<View style={{paddingHorizontal:5, width:'98%', alignSelf:'center'}}>


<View style={{flexDirection:'row',paddingHorizontal:5,borderColor:AppColors.Appcolor,borderWidth:1, borderRadius:10, alignSelf:'center',marginVertical:"2%",   width:'100%',}}>
          <FontAwesome name='circle-o' style={{alignSelf:'center'}}  size={15} />
          <View 
          // onPress={()=> {refRBSheet.current.open()}}
          style={{width:'85%',marginLeft:12,borderBottomWidth:0.4,borderColor:'#CACFD2',textAlignVertical:'center',justifyContent:'center', }}>
          <Text style={{fontSize:16, textAlignVertical:'center',width:'90%',  textAlign:'left'}}>{pickuUpdateAdress}</Text>
         
         </View>
        {data.Status == '0' ?  <MaterialIcons name='edit'         onPress={()=> {refRBSheet.current.open()}} 
 style={{alignSelf:"center"}}  color='grey' size={20}/>
 :
 data.Status == '1' ?  <MaterialIcons name='edit'         onPress={()=> {refRBSheet.current.open()}} 
 style={{alignSelf:"center"}}  color='grey' size={20}/>
 :
 null }

          </View>

          <View style={{flexDirection:'row' ,paddingHorizontal:5 ,borderColor:AppColors.Appcolor,borderWidth:1, borderRadius:10,alignSelf:'center',  marginTop:5, width:'100%',}}>
          <FontAwesome name='circle-o' style={{alignSelf:'center'}}   size={15} />
          <View 
          style={{width:'85%',marginLeft:12,borderBottomWidth:0.4,justifyContent:'center', borderColor:'#CACFD2',}}>
          <Text style={{fontSize:16, textAlignVertical:'center',width:'90%',   textAlign:'left'}}>{dropOffUpdateAdress}</Text>
         </View>
         {data.Status == '0' ?    <MaterialIcons name='edit'     onPress={()=> {refRBSheet2.current.open()}}
 style={{alignSelf:"center"}} color='grey' size={20}/>
 :
 data.Status == '1' ?    <MaterialIcons name='edit'     onPress={()=> {refRBSheet2.current.open()}}
 style={{alignSelf:"center"}} color='grey' size={20}/>
 
 : null }
          </View>



          {data.Status != '2' && data.Status != '3' ?

          <TouchableOpacity onPress={()=>{
    updateApiCall()
  }} style={{borderRadius:15,height:"15%",width:'40%',marginVertical:"2%",justifyContent:"center",alignSelf:"center",backgroundColor:AppColors.Appcolor}}> 
    <Text style={{alignSelf:"center",color:"white"}} >Update location</Text>
    </TouchableOpacity>  
    :

    null }




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
     borderColor:AppColors.Appcolor,
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
    backgroundColor:AppColors.Appcolor
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
    margin: 0,
    marginBottom:5,
    borderColor:'c#EFDF79'
  }
});
export default TrackYourDelivery