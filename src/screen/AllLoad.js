import { View, Text,Modal, TouchableOpacity, TextInput, StyleSheet, FlatList,Dimensions, ScrollView,Image, Platform } from 'react-native'
import { Avatar, Button, Title, Card, Paragraph } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AppConstance from '../constance/AppConstance';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import AppColors from '../Colors/AppColors';
import Snackbar from 'react-native-snackbar';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const AllLoad = ({route, navigation }) => {
  const { status } = route.params;

  
  

  const [data,setdata] = useState([])
  const [spinner,setspinner]=useState(false) 

  const [cancelmodal , setcancelmodal] = useState(false)
  const [modalVisible ,setmodalVisible] = useState(true)
  const [currentloclat,setcurrentloclat ]=useState(47.116386)
  const [currentloclon,setcurrentloclon ]=useState(-101.299591)
  const [docknumber, setdocknumber] = useState('')
  const [price, setprice] = useState()
  const [distance, setdistance] =useState('')
  const [driverprice, setdriverprice] = useState()
  const [totalprice, settotalprice] = useState()
  const [weight ,setweight] = useState('')
  const [pickuptimedate, setpickuptimedate] = useState()
  const [dropofftimedate, setdropofftimedate] = useState()
  const [ item1 , setitem1] = useState({})

  const CreateLoadAPI =(item)=>{

    setspinner(true)
    let value = {};
    value.User_id = AppConstance.Id;
    value.P_Address=item.P_Address;
    value.P_Latitude = item.P_Latitude;
    value.P_Longitude= item.P_Longitude,
    value.D_Address= item.D_Address
    value.D_Latitude = item.D_Latitude;
    value.D_Longitudes= item.D_Longitudes,
    value.Load_Description='none';
    value.Dock_Number =item.Dock_Number
    value.Destination= "vdvd";
    value.Vehicle_Type= '0'
    value.Pick_up_Time=item.Pick_up_Time
    value.Drop_of_Time = item.Drop_of_Time;
    value.Pricing='5' 
    value.Driver_Price=item.Driver_Price
    value.Total_Price=item.Total_Price
    value.Status="0"
    value.Weight= item.Weight
    value.Distance="2000KM"
    console.log(value);
 

    var url =AppUrlCollection.Re_Genrated_LOAD;

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
        // navigation.navigate('welcome')
        console.log('login data response',responseJson);
        setspinner(false)

        setTimeout(() => {
          Snackbar.show({
            text: 'Load Re Generated Successfully',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor	:AppColors.Appcolor,
          });
          // navigation.navigate('welcome')
        }, 200);


          if(responseJson.j == 'iih'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))
            setspinner(false)
            console.log('login data response',responseJson);
            

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


  const LoadApi =()=>{
  //  alert(AppConstance.Id)

    setspinner(true)
// console.log(AppConstance.AUTH_KEY)
    // setshowIndicator(true)
    setTimeout(() => {
      // setshowIndicator(false)
    // navigation.navigate('welcome')
      
    }, 2000);

    var url ;
    if(status == ''){
      url = AppUrlCollection.LOADS +'?User_id='+AppConstance.Id;

    }
    else{
      url = AppUrlCollection.LOADS +'?User_id='+AppConstance.Id + '&Status='+status;

    }

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+AppConstance.AUTH_KEY
    }
})
    .then((response) =>  response.json() )
    .then((responseJson) => {

      setdata(responseJson)
      setspinner(false)
        if(responseJson.message == 'SUCCESS'){
          console.log('login data response ataa',responseJson);
          setspinner(false)
       
        }else if(responseJson.length ==0 ) {
          // alert(JSON.stringify(responseJson))
          setspinner(false)

        }
    

  //   setspinner(false)  
    })
    .catch((error) => {
      setspinner(false)
      alert(error)
        console.warn(error)
    });
    
    // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
}

const deleteItem =(id) =>{



  const filteredData = data.filter(item => item.id !== id);
  //Updating List Data State with NEW Data.
  setdata(filteredData);

    }

const cancelapi = (item)=>{
  setspinner(true)

  let value = {};
  value.load_id = item1.id;
  value.Status= "3";
value.user_type ="1";



  var url = AppUrlCollection.CANCEL_RIDE;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(value),
})
    .then((response) =>  response.json() ) 
    .then((responseJson) => {

      if(responseJson.result == "Success")
      {
        setcancelmodal(false)
        deleteItem(item1.id)
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


useEffect(()=>{
  LoadApi()
},[])


const nextpage = (data)=>{


  let plat1 = data.P_Latitude
  plat1= parseFloat(plat1)
  // console.log(d)
  let plong1 = data.P_Longitude
  plong1= parseFloat(plong1)
  // console.log(d)
  let dlat1 = data.D_Latitude
  dlat1= parseFloat(dlat1)
  // console.log(d)
  let dlong1 = data.D_Longitudes
  dlong1= parseFloat(dlong1)
  

  // alert(d)
  navigation.navigate('trackYourLoad',{data:data , plat:plat1, plong:plong1, dlat:dlat1, dlong:dlong1  })
}



  const renderItem = ({ item }) => (

     <TouchableOpacity 
                  style={{width:"100%",borderRadius:15,borderRadius:10, marginTop:10,backgroundColor:AppColors.AppGrey}}
                    onPress={() => {
                      
                      nextpage(item);
                    }}>

      <View style={{  backgroundColor: AppColors.Appcolor,borderRadius:10, justifyContent:"center"}}>
          <Text style={styles.txt}>Dock Number:{item.Dock_Number}</Text>
      </View>

      <View style={{  paddingVertical:"2%", paddingHorizontal:'3%',flexDirection: "row" }}>

          <View style={{  width: "90%",paddingHorizontal:"1%", alignItems: "flex-start", justifyContent: "space-around" }}>

            <View style={{  width: "100%",  flexDirection:'row' }}>
             
 <Ionicons   name='ios-location-outline' style={{alignSelf:'center'}} color={AppColors.Appcolor} size={20}/>
 {/* <Ionicons   name='arrow-forward-outline' color={AppColors.Appcolor} size={20}/> */}
              <Text style={styles.txt}>Pick Up: {item.P_Address}</Text>
            </View>

            <View style={{  width: "100%" , flexDirection:'row'}}>
 <Ionicons   name='ios-locate-outline' style={{alignSelf:'center'}} color={AppColors.Appcolor} size={20}/>
 {/* <Ionicons   name='arrow-forward-outline' color={AppColors.Appcolor} size={20}/> */}

              <Text style={styles.txt}>Drop Off: {item.D_Address}</Text>
            </View>

            <View style={{  width: "100%",marginBottom:"2%",flexDirection:"row"  , marginTop:8,  justifyContent:"space-between"}}>
              {/* <Text style={{color: 'white',marginLeft:"33%", alignSelf:"center"}}>Status: {item.Status == '0'? "Pending": item.Status == '1'? "In Transit":  item.Status == '2'? "Completed": "Cancalled"}</Text> */}

<View style={{  width: "20%",}}>

      {status == '0' ?   
            <TouchableOpacity style={{width:"100%", }}
            onPress={()=>CreateLoadAPI(item)}
            >
<Ionicons   name='reload' color={AppColors.Appcolor} size={20}/>

       
          </TouchableOpacity>
          :
        status == '3'?

          <TouchableOpacity style={{width:"100%", }}
            onPress={()=>CreateLoadAPI(item)}
            >
<Ionicons   name='reload' color={AppColors.Appcolor} size={20}/>

       
          </TouchableOpacity>
          :
          null
      }
</View>
<View style={{  width: "60%",}}>
 <Text style={{color: 'white', alignSelf:"center",}}>Status: {item.Status == '0'? "Pending": item.Status == '1'? "In Transit":  item.Status == '2'? "Completed": "Cancalled"}</Text>
  
</View>
<View style={{  width: "30%",marginTop:"-3%"}}>
{
          status == '1'?
          <TouchableOpacity
 style={{backgroundColor:"#FF5A5A",height:40,width:80,alignItems:"center",
 justifyContent:"center",borderRadius:15,marginLeft:"10%"}}
 onPress={()=> {setitem1(item); setcancelmodal(true)}}

 >
  <Text style={{color:"white"}}>Cancel</Text>
</TouchableOpacity>
:
null
        }
</View>

{/* {
          status == '1'?
          <TouchableOpacity
 style={{backgroundColor:"#FF5A5A",height:40,width:80,alignItems:"center",
 justifyContent:"center",borderRadius:15,marginLeft:"10%"}}
 onPress={()=> {setitem1(item); setcancelmodal(true)}}

 >
  <Text style={{color:"white"}}>Cancel</Text>
</TouchableOpacity>
:
null
        } */}
          {/* {status == '0' ?   
            <TouchableOpacity style={{width:"100%", }}
            onPress={()=>CreateLoadAPI(item)}
            >
<Ionicons   name='reload' color={AppColors.Appcolor} size={20}/>

       
          </TouchableOpacity>
          :
          null
      } */}
      
            </View>

         

            {/* {status == '0' ?   
            <TouchableOpacity style={{width:"100%",}}
            onPress={()=>CreateLoadAPI(item)}
            >
          <View style={{ height:"50%",borderRadius:10, justifyContent:"center"}}>

<Ionicons   name='reload' color={AppColors.Appcolor} size={20}/>
      </View>
          </TouchableOpacity>
          :
          null
      } */}
         {/* { status == '3'?
          <TouchableOpacity style={{width:"100%",}}
          onPress={()=>CreateLoadAPI(item)}
          >
        <View style={{ height:"50%",borderRadius:10, justifyContent:"center"}}>

<Ionicons   name='reload' color={AppColors.Appcolor} size={20}/>
    </View>
        </TouchableOpacity>
        :
          <View 
          style={{ height:"10%",borderRadius:10, justifyContent:"center"}}>
        </View>} */}


        

          </View>
          
      </View>


     </TouchableOpacity>

  );

  return (


    <SafeAreaView>
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
  <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Loads</Text>
  <View>
    </View>
</View>

<Modal
       transparent={true}
       visible={cancelmodal}
       animationType="fade"
       
       >
        
        <SafeAreaView style={{backgroundColor:"#000000aa",justifyContent:'center', flex:1}} >
          
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15
        ,width:"90%" ,alignSelf:"center",marginTop:"0%", borderColor:AppColors.Appcolor}} >


          
<View style={{height:40,paddingHorizontal:5, width:'100%', backgroundColor:AppColors.AppGrey ,justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15,}}>

<TouchableOpacity 
 onPress={()=> { setcancelmodal(false)}}
style={{justifyContent:'center', alignSelf:'flex-end' 

 }}>

<Ionicons onPress={()=> setcancelmodal(false)} name='ios-close-outline'style={{alignSelf:'center', }} size={25} />
</TouchableOpacity>


</View>

     
     <Text style={{alignSelf:'center',paddingVertical:20, fontSize:18}}>Do you want to Cancel This Load ?</Text>

           <View style={{flexDirection:"row",paddingVertical:15, justifyContent:'space-around', width:"100%", 
        marginTop:"0%"}}>
         

<TouchableOpacity 
 onPress={()=> { setitem1(); setcancelmodal(false)}}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:40,}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=> { cancelapi(item1)}}
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:15,
        height:40}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
          </Text>
        </TouchableOpacity>
        
            </View>


  


 


</View>

</SafeAreaView>

       </Modal>

</Appbar.Header>
  
      <ScrollView>

        {/* <Text style={styles.text}>All Load</Text> */}
{data.length>0?
 <FlatList
 data={data}
 contentContainerStyle={{width:deviceWidth, paddingHorizontal:'5%',paddingBottom:"30%"}}
 renderItem={renderItem}
 keyExtractor={item => item.id}
/>
:
<View style={{height:deviceHeight,justifyContent:'center', width:deviceWidth}}>
<Text style={{alignSelf:'center'}}>No Loads</Text>
  </View>

}

       
      </ScrollView>
    </SafeAreaView>
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
  input: {
    height: 150,
    width: '70%',
    marginTop: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center"
  }, text: {
    alignSelf: "center",
    marginTop: 70,
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
  card: {
    margin: 10,
    elevation: 5, // elevation shahdow deny k liye
    borderWidth: 2, borderRadius: 10, borderColor: '#EFDF79',
    backgroundColor: "lightgrey"

  },
  headview:{
        height:'100%',
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        flexDirection:'row',
        paddingHorizontal:10,
        justifyContent:'space-between',
        backgroundColor:AppColors.Appcolor
      },
  txt: {
    color: 'white',
    alignSelf:"center",
    marginLeft:5,
    // justifyContent:"center"
  }
});

export default AllLoad