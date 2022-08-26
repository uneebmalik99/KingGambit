import  React,{useEffect} from "react";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./Drawer";
import Splash from '../screen/Splash';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Welcome from '../screen/Welcome';
import CreateLoad from '../screen/CreateLoad';
import Maps from '../screen/Maps';
import AllLoad from '../screen/AllLoad';
import TrackYourLoad from '../screen/TrackYourLoad';
import ForgetPass from '../screen/ForgetPass';
import VerificationCode from '../screen/VerificationCode';
import ChangePass from '../screen/ChangePass';
import ConfirmationPage from '../screen/ConfirmationPage';
import Profile from "../screen/Profile";
import DriverDetails from "../screen/DriverDetails";
import CreateLoadconfirmation from "../screen/CreateLoadconfirmation";
import AppConstance from "../constance/AppConstance";
import { useState } from "react/cjs/react.development";

const Stack = createStackNavigator();
const AppDrawer = createDrawerNavigator();


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <AppDrawer.Screen
        name="welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />



         <AppDrawer.Screen
        name="maps"
        component={Maps}
        options={{ headerShown: false }}
      />

     

      <Stack.Screen
        name="trackYourLoad"
        component={TrackYourLoad}
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

 

const AppNavigator = () => {

  const [initialRouteName ,setinitialRouteName] = useState('login')

  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: function (token) {
  //     console.log("TOKEN:", token);
  //   },
  
  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onNotification: function (notification) {
  //     console.log("NOTIFICATION:", notification);

  //     alert('sdkn')
  //  // process the notification
  
  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     // notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  
  //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //   onAction: function (notification) {
  //     console.log("ACTION:", notification.action);
  //     console.log("NOTIFICATION:", notification);
  
  //     // process the action
  //   },
  
  //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //   onRegistrationError: function(err) {
  //     console.error(err.message, err);
  //   },
  
  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },
  
  //   // Should the initial notification be popped automatically
  //   // default: true
  //   popInitialNotification: true,
  
  //   /**
  //    * (optional) default: true
  //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //    * - if you are not using remote notification or do not have Firebase installed, use this:
  //    *     requestPermissions: Platform.OS === 'ios'
  //    */
  //   requestPermissions: true,
  // });
  

  // useEffect(() => {

  //   console.log(AppConstance.initialRouteName)
  //   // alert('jihin')
   
  // }, []);

  return (
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
  );
};

export default AppNavigator;
