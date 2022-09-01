import React,{ Component } from "react";

class AppUrlCollection extends Component{
    static BASE_URL = 'https://kinggambits.com/kinggambitapi/api/';

    static REGISTER = AppUrlCollection.BASE_URL+'register';
    static LOGIN = AppUrlCollection.BASE_URL+'login';
    static USER = AppUrlCollection.BASE_URL+'userinfo';
    static LOADS = AppUrlCollection.BASE_URL+'load';
    static CREATELOAD = AppUrlCollection.BASE_URL+'createload';

    static STATES = AppUrlCollection.BASE_URL+'stateinfo'
    static COMPLETE = AppUrlCollection.BASE_URL+'CompleteLoad'
    
    static Submit_Forget =AppUrlCollection.BASE_URL+'submitForgetPasswordForm';
    static Submit_Reset =AppUrlCollection.BASE_URL+'submitResetPasswordForm';
    static Re_Genrated_LOAD =AppUrlCollection.BASE_URL+'regnerate_load';

    
   

}
export default AppUrlCollection;