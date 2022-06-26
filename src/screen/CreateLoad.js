import React from 'react'
import { View, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"

import { Appbar } from "react-native-paper";

const CreateLoad = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>
  <Text style={{color:"black",fontSize:15,alignSelf:'center'}}> Login</Text>
</View>

</Appbar.Header>
      <ScrollView>
      
    <TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('maps')}
>
<TextInput   
style={styles.input}
placeholder="Pick-Up Location"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Destination"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Load Details"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Dock Number"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Pick-Up Time"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Drop of Time"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>

<TextInput   
style={styles.input}
placeholder="Confirmed Pricing"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
onPress={() => navigation.navigate('allLoad')}
>
<TextInput   
style={styles.brnAccept}
placeholder="Accept"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
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
      brnAccept: {
        height: 50,
        width:'60%',
        // margin: 7,
        borderWidth: 1,
        borderColor:'#EFDF79',
        padding: 10,
        alignSelf:"center",
        textAlign:"center",
        borderRadius:10,
        backgroundColor:"#EFDF79"
      },
    input: {
      height: 50,
      width:'60%',
      // margin: 7,
      borderWidth: 1,
      borderColor:'#EFDF79',
      padding: 10,
      alignSelf:"center",
      textAlign:"center",
      borderRadius:10
    },
    header: {
      elevation: 0,
      backgroundColor: 'transparent',
      alignItems: "center",
      justifyContent: "center",
      width:deviceWidth,
      paddingHorizontal:0,
      paddingVertical:0,
      // width:deviceWidth*0.07,
      // height: deviceHeight * 0.07,
      // alignSelf: "flex-start",
    
    },
    
    headview:{
      height:'100%',
      width:'100%',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      justifyContent:'center',
      backgroundColor:'#EFDF79'
    },
    text:{
        alignSelf:"center"
    }
  });
export default CreateLoad