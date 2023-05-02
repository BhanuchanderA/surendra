import React from 'react';
import {View,SafeAreaView,Text} from 'react-native'
import LottieView from 'lottie-react-native';
import Color from '../fonts/colors/Color';


 const Loader = () => {
  return (
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}} >
          <View style={{ backgroundColor: Color.primary_green, width:150,height:150,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
              <LottieView
                  source={require('../ImagesAnim/green-loading-circle.json')}
                  autoPlay
                  style={{ height: 90, width: 90 }}
                  hardwareAccelerationAndroid={true}
              />
              <Text style={{fontSize:16,fontFamily:'opensans_bold',color:Color.white}}>Loading...</Text>
          </View>
    </View>
      </SafeAreaView>
  )
}



export default Loader;