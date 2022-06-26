import React from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button } from 'react-native'


const Maps = ({navigation}) => {
    return (
        <View>

            <Text  style={styles.text}>Maps</Text>
            <View style={styles.mapShow}>

            </View>
            <TouchableOpacity
        style={{marginTop:20}}
        onPress={() => navigation.navigate('')}
      >
       <TextInput   
        style={styles.input}
        placeholder=" Location"
        editable={false}
        />
      </TouchableOpacity>
      <Button 
    title="track"
     onPress={() => navigation.navigate('TYL')}
    />
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
    input: {
      height: 40,
      width:'60%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      alignSelf:"center",
      textAlign:"center"
    },
    text:{
        alignSelf:"center"
    },mapShow:{
      height: 500,
      margin: 20,
      borderWidth: 1,
      padding: 10,
    }
  });
export default Maps
