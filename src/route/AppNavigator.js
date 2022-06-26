import React from 'react'
import { View, Text } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const AppNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        // <View>
        //     <Text></Text>
        // </View>

        <Stack.Navigator >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="login" component={Login} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="register" component={Register} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="welcome" component={Welcome}options={{
          headerShown: false
        }} />
        <Stack.Screen name="createLoad" component={CreateLoad}options={{
          headerShown: false
        }} />
        <Stack.Screen name="maps" component={Maps}options={{
          headerShown: false
        }} />
        <Stack.Screen name="allLoad" component={AllLoad} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="trackyourDelivery" component={TrackYourLoad}options={{
          headerShown: false
        }} />
        <Stack.Screen name="forgetPass" component={ForgetPass}options={{
          headerShown: false
        }} />
        <Stack.Screen name="verificationCode" component={VerificationCode} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="changePass" component={ChangePass}options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    )
}

export default AppNavigator
