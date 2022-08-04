import React, {useEffect}from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/route/AppNavigator'
import 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
// import Splash from './comp/Splash'

const App = () => {


  

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('notifiif')
    });

    return unsubscribe;
  }, []);

  // DeviceInfo.getAndroidId().then((androidId) => {
  //   // androidId here
  //   console.log(androidId)
  // });
  return (
    // <View>
    //   {/* <AppNavigator /> */}
    //   <Text>hi</Text>
    //  </View>

    <NavigationContainer>
   <AppNavigator />
  </NavigationContainer>
  )
}

export default App
