import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,Dimensions, ScrollView,Image, Platform } from 'react-native'
import { Avatar, Button, Title, Card, Paragraph } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AppConstance from '../constance/AppConstance';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import AppColors from '../Colors/AppColors';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const AllLoad = ({ navigation }) => {


  const [data,setdata] = useState([])
  const [spinner,setspinner]=useState(false)


  const LoadApi =()=>{
  //  alert(AppConstance.Id)

    setspinner(true)
// console.log(AppConstance.AUTH_KEY)
    // setshowIndicator(true)
    setTimeout(() => {
      // setshowIndicator(false)
    // navigation.navigate('welcome')
      
    }, 2000);

  var url = AppUrlCollection.LOADS +'?User_id='+AppConstance.Id;

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
          console.log('login data response',responseJson);
          setspinner(false)
       
        }else if(responseJson.status == 422){
          alert(responseJson.errors.password)
        }else if(responseJson.status == 401){
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
    
    // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
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
                  style={{height:Platform.OS=='ios'? deviceHeight*0.15:deviceHeight*0.2,width:"100%",borderRadius:15,borderRadius:10, marginTop:10,backgroundColor:'#b3b3b3'}}
                    onPress={() => {
                      
                      nextpage(item);
                    }}>

      <View style={{ height:"20%", backgroundColor: "#EFDF79",borderRadius:10, justifyContent:"center"}}>
          <Text style={styles.txt}>Dock Number:{item.Dock_Number}</Text>
      </View>

      <View style={{  paddingVertical:"2%", height:"80%", paddingHorizontal:'3%',flexDirection: "row" }}>

          <View style={{  padding:"1%", width: "35%", height: "100%" }}>
            <Image source={require('../assets/bk.png')}  style={{width:"100%",borderRadius:10, height:"100%"}} />
          </View>




          <View style={{  width: "65%",paddingHorizontal:"1%", alignItems: "flex-start", justifyContent: "space-around" }}>

            <View style={{  width: "100%", }}>
              <Text style={styles.txt}>Pick Up Location: {item.P_Address}</Text>
            </View>

            <View style={{  width: "100%" }}>
              <Text style={styles.txt}>Drop Off Location:: {item.D_Address}</Text>
            </View>

            <View style={{  width: "100%", }}>
              <Text style={styles.txt}>Status: {item.Status == '0'? "In Transit":"Complete"}</Text>
            </View>

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
        backgroundColor:'#EFDF79'
      },
  txt: {
    color: 'black',
    alignSelf:"center",
    
  }
});

export default AllLoad