import React, { Component } from "react";
import { View,ImageBackground, Text,TextInput,StyleSheet ,TouchableOpacity,Button, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import Snackbar from 'react-native-snackbar';
import AppColors from "../Colors/AppColors";

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;

class AppConstance extends Component {

  static notificationRecived="0"

  static initialRouteName= 'register';
  static Login = "0";
  static Id="";
  static Name = "" ;
  static Email = "" ;
  static Phone = "" ;
  static DateofBirth = "" ;
  static CompanyName = "" ;
  static EIN = "" ;
  static Role = "" ;
  static PaymentType = "" ;
  static BankInfo = "" ;
  static BankNumber = "" ;
  static CreditCardNo = "" ;
  static ExpireDate = "" ;
  static SecurityCode = "" ;
  static ZipCode = "" ;
  static AUTH_KEY = "";
  
  static USER_TOKEN = "";

 
  static Noti = 'allLoad';


  }

  export default AppConstance;



