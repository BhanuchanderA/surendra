import React, { useEffect } from 'react'
import {View,Text} from 'react-native'
import Color from '../fonts/colors/Color';
import { useSelector} from 'react-redux';
import { Exit_SaleApi, callAuthAPI1 } from '../Redux/Config';

 const ExitSale = ({navigation}) => {
     const LoginData = useSelector(state => state);
     const jwtToken = LoginData.First.userLoginData.data.jwtToken
     const Token = LoginData.First.userPinData.data.token
     const handleExit = async () => 
     {
        RequestData={
        };
         try {
             const res = await callAuthAPI1(Exit_SaleApi,RequestData,Token,jwtToken);
             console.log('ExitResponse', res);
             if (res.status == 'SUCCESS') {
                navigation.navigate('Dashboard')
             }
             else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
                 console.log(res.response.data.error.errorDescription);
             }
         } catch (error) {
             console.log(error);
         }
     }
    useEffect(()=>{
        handleExit();
    },[])
  return (
    <View style={{flex:1,backgroundColor:Color.white,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:16,fontFamily:'opensans_bold',color:Color.primary_black}}>Exiting Sale Mode…</Text>
    </View>

  )
}



export default ExitSale;