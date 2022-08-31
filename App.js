import React, {useState, useEffect}from 'react'
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import { Alert , Modal ,SafeAreaView,FlatList,TouchableOpacity,Image} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/route/AppNavigator'
import 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import notifee ,{ EventType } from '@notifee/react-native';
import { NavigationContainer , CommonActions, useNavigation,createNavigationContainerRef} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
import AppConstance from './src/constance/AppConstance';
import { Button } from 'react-native-paper';
import CreateLoad from './src/screen/CreateLoad';
import AllLoad from './src/screen/AllLoad';
import CreateLoadconfirmation from './src/screen/CreateLoadconfirmation';
import Profile from './src/screen/Profile';
import DriverDetails from './src/screen/DriverDetails';
import Splash from './src/screen/Splash';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import ForgetPass from './src/screen/ForgetPass';
import VerificationCode from './src/screen/VerificationCode';
import ConfirmationPage from './src/screen/ConfirmationPage';
import ChangePass from './src/screen/ChangePass';
import WelcomeLogistic from './src/screen/Welcome';
import Maps from './src/screen/Maps';
import TrackYourDelivery from './src/screen/TrackYourLoad';
import { DrawerContent } from './src/route/Drawer';
import AppColors from './src/Colors/AppColors';
import Setting from './src/screen/Setting';
import Contact from './src/screen/Contact';
import AppUrlCollection from './src/UrlCollection/AppUrlCollection';

import Spinner from 'react-native-loading-spinner-overlay';


const navigationRef = createNavigationContainerRef()

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
const App = () => {
  
  const[maxRating,setMaxRating] = useState([1,2,3,4,5])
  const[defaultRating,setDefaultRating] = useState(1)

  
  const starImgFilled ='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgCorner ='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
  const [CompleteLoadModal,setCompleteLoadModal] = useState(false)
  const [spinner,setspinner]=useState(false)


  const [initialRouteName , setinitialRouteName] = useState('splash')

  const [notificationModal,setnotificationModal] = useState(false)
  const [notificationList, setnotificationList] = useState([])
 

  const Stack = createStackNavigator();
  const AppDrawer = createDrawerNavigator();
  const AppDrawerScreen = () => {
    return (
      <AppDrawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <AppDrawer.Screen
          name="welcome"
          component={WelcomeLogistic}
          options={{ headerShown: false }}
        />
  
  
  
           <AppDrawer.Screen
          name="maps"
          component={Maps}
          options={{ headerShown: false }}
        />
  
       
  
        <Stack.Screen
          name="trackYourLoad"
          component={TrackYourDelivery}
          options={{ headerShown: false }}
        />
     
      </AppDrawer.Navigator>
    );
  };
  
  const WelcomeStack = () => {
    
    return (
      <Stack.Navigator >
          <Stack.Screen name="Splash" component={Splash} options={{
            headerShown: false
          }} />
          <Stack.Screen name="login" component={Login} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="register" component={Register} options={{
            headerShown: false
          }}/>
           <Stack.Screen name="forgetPass" component={ForgetPass}options={{
            headerShown: false
          }} />
          <Stack.Screen name="verificationCode" component={VerificationCode} options={{
            headerShown: false
          }}/>
            <Stack.Screen name="confirmationPage" component={ConfirmationPage} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="changePass" component={ChangePass}options={{
            headerShown: false
          }} />
  
      </Stack.Navigator>
    );
  };


  const renderNotificationListlist = ({ item }) => {


    return (
  
      <TouchableOpacity
      onPress={()=>{
  
        setnotificationModal(false)
        navigate('incomingLoad',{item :item})
  
      }
      }
        style={{ marginVertical: 5, borderWidth: 0.5, flexDirection: 'row', borderColor: 'grey', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10, }}>
  
     
  
        <Text style={{ alignSelf: 'center', color: AppColors.Appcolor, marginLeft: 5, }}>item.state_name</Text>
      </TouchableOpacity>
  
    )
  
  }


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const send =()=>{
    
    let value = {};
  value.User_id = 53;
  
  value.load_id = '22';
  value.Status = '3',
  value.Rating = '4'

    var url =AppUrlCollection.COMPLETE;
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
       
            setCompleteLoadModal(false)
           
            console.log('register data response',responseJson);

            // setshowIndicator(true)
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
  useEffect(async() => {


requestUserPermission()

    
    messaging().onMessage(async remoteMessage => {


      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
     
      console.log(remoteMessage)

      if(remoteMessage.data.type == '3')
      {
        setCompleteLoadModal(true)
      }
      else if(remoteMessage.data.type == '2')
      {

      }
          //   if(notificationModal != true)
    //   {
    //     setnotificationModal(true)
    //   }
  
    //   setnotificationList(oldArray => [...oldArray, remoteMessage.data]);

   
    //   console.log(notificationList);
  
    // })
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
  
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigate('map');
  
    //   })
  
    // Check whether an initial notification is available
  
    // messaging().getInitialNotification().then(remoteMessage => {
    //   if (remoteMessage) {
    //     console.log(
    //       'Notification caused app to open from quit state:',
    //       remoteMessage.notification,
    //     );
    //     // setinitialRouteName('register'); // e.g. "Settings"
    //     // navigate('contact');
    //     // console.log(initialRouteName)
    //     AppConstance.notificationRecived='2'
    //   }
      // setLoading(false);
    });

  }, []);


  return (

  <NavigationContainer ref={navigationRef}>
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
       visible={CompleteLoadModal}
       animationType="fade"
       
       >
        
        <SafeAreaView style={{backgroundColor:"#000000aa",flex:1}} >
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15
        ,width:"90%" ,alignSelf:"center",height:"50%",justifyContent:"center",marginTop:"20%",
        borderWidth:1,borderColor:AppColors.Appcolor}} >
     
     <Text style={{paddingHorizontal:10}}>Hi " client Name" Your Load " " are delivered by " Driver Name "</Text>
     {/* <TextInput 
// style={{}}
placeholder="" 
            // value={message} 
            editable={false}
            numberOfLines={4}
            multiline={true}
            style={{borderWidth:1,borderColor:AppColors.Appcolor,width:"90%"
          ,alignSelf:"center"}}
            onChangeText={text=>setMessage(text)}/> */}

 <View 
            style={styles.customRatingBarStyle}
            >
              
                {
                    maxRating.map((item,key)=>{
                        return(

                          
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress ={()=> setDefaultRating(item)}
                            >
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating ?
                                        {uri: starImgFilled}
                                        :
                                        {uri : starImgCorner}
                                    }
                                />
                                
                            </TouchableOpacity>
                        )
                    })
                    
                }
                
            </View>
     <View >
     <Text style={styles.text}>
               
               {
                   defaultRating +"/"+ maxRating.length
               }
               </Text>



           </View>

           <View style={{flexDirection:"row",justifyContent:'space-around',width:"100%",
           height:'33%',marginTop:"3%"}}>

<TouchableOpacity 
 onPress={()=>setshowModal(false)}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:"50%",}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
            Ignore</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>send()}
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:15,
        height:"50%"}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
        Send                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          </Text>
        </TouchableOpacity>
        
            </View>


  


 


</View>

</SafeAreaView>

       </Modal>


      {notificationModal == true ? 
             <Modal
             transparent={true}
             visible={notificationModal}
             >
              <SafeAreaView style={{backgroundColor:"#000000aa",}} >

               
           <Text>hi mapo</Text>

          <FlatList
          data={notificationList}
          contentContainerStyle={{marginTop:10, paddingHorizontal:'2%',paddingBottom:"20%"}}
          renderItem={renderNotificationListlist}
          keyExtractor={item => item.id}
          extraData={notificationList}
        />
           <TouchableOpacity
           style={{backgroundColor:"red"}}
                onPress={()=>  setnotificationModal(false)}
                >
                <Text>hi mapo</Text>

                </TouchableOpacity>
      </SafeAreaView>
      
             </Modal>
             :null
  }


            
<Stack.Navigator initialRouteName={ initialRouteName}>
      <Stack.Screen
        name="WelcomeStack"
        component={WelcomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppDrawer"
        component={AppDrawerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="createLoad"
        component={CreateLoad}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="allLoad"
        component={AllLoad}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="CreateLoadconfirmation"
        component={CreateLoadconfirmation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
      />




      
        <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="DriverDetails"
        component={DriverDetails}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>

  </NavigationContainer>
  )
}
const styles = StyleSheet.create({


  customRatingBarStyle:{
    justifyContent:"center",
    flexDirection:"row",
    marginTop:30
  },
  starImgStyle:{
    width:40,
    height:40,
    resizeMode:'cover'

}
,
  text:{
      alignSelf:"center",
      marginTop:70,
      color:"black"
  },
})
export default App