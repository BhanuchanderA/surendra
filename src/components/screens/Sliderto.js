import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import Slider from 'react-native-slide-to-unlock';
import LottieView from 'lottie-react-native';

import Color from '../fonts/colors/Color';

const Sliderto = (props) => {
  
  const [Show,setShow]=useState(true);

  const handleEndReached = () => {
    setShow(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View>
        <Text>Hello</Text>
       {
        Show?
       (
        <Slider
          onEndReached={handleEndReached}
          containerStyle={{
            margin: 8,
            backgroundColor: Color.slidebtn_bg,
            borderRadius: 50,
            alignItems:'center',
            justifyContent:'center',
            width: '95%'
          }}
          sliderElement={
          <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 250,
                backgroundColor: Color.white,
                margin: 4,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
              <Image
                source={require('../images/back_arrow.png')}
                resizeMode='contain'
              />
              <Image
                source={require('../images/back_arrow.png')}
                resizeMode='contain'
              />
            </View>
          }>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'opensans_bold',
              color: Color.primary_black,
            }}>
            Slide To Confirm
          </Text>
        </Slider>):(

     <View style={{width:'100%'}}>
      <View style={{marginHorizontal:16,backgroundColor:Color.slidebtn_bg,borderRadius:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:8}}>
        <View></View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'opensans_bold',
                color: Color.primary_black,
              }}>
              Verifying...
            </Text>
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 250,
              backgroundColor: Color.white,
              margin: 4,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
                    <LottieView
                      source={require('../ImagesAnim/green-loading-circle.json')}
                      autoPlay
                      style={{ height: 45, width: 45,alignItems:'center',justifyContent:'center' }}
                      hardwareAccelerationAndroid={true}
                    />
            </View>
                  </View>
      </View>
     </View>)
}
      </View>
    </SafeAreaView>
  );
};

export default Sliderto;
