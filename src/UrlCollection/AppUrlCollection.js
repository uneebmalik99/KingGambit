import React,{ Component } from "react";

class AppUrlCollection extends Component{
    static BASE_URL = 'https://kinggambits.com/kinggambitapi/api/';

    static REGISTER = AppUrlCollection.BASE_URL+'register';
    static LOGIN = AppUrlCollection.BASE_URL+'login';
    static USER = AppUrlCollection.BASE_URL+'userinfo';
    static LOADS = AppUrlCollection.BASE_URL+'load';
    static CREATELOAD = AppUrlCollection.BASE_URL+'createload';

    
   

}
export default AppUrlCollection;