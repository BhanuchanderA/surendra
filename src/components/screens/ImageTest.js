import React,{useState} from 'react';
import {Image,View,Text} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import Color from '../fonts/colors/Color';

 const ImageTest = (props) => {
const[name,setName]=useState(false)
const[Move,SetMove]=useState(false);
   const CustomThumbIcon = () => (
     <View style={{ flexDirection: 'row' }}>
       <Image source={require('../images/back_arrow.png')} resizeMode="contain" />
       <Image source={require('../images/back_arrow.png')} resizeMode="contain" />
     </View>
   );
  return (
    <View style={{flex:1}}>
          <Text>Hello</Text>
      <SwipeButton
        disabled={Move}
        //disable the button by doing true (Optional)
        swipeSuccessThreshold={70}
        height={45}
        //height of the button (Optional)
        width={330}
      
        railBorderColor={Color.slidebtn_bg}
        railBackgroundColor={Color.slidebtn_bg}
        railFillBackgroundColor='transparent'
        railFillBorderColor='transparent'  
      title={name?('verifying'):('swipe to confirm')}
      thumbIconBackgroundColor={Color.white}
      thumbIconBorderColor={Color.white}
      thumbIconImageSource={ require('../images/back_arrow.png')}
        // !name?(require('../images/back_arrow.png')):(require('../images/Closed.eye.png.png'))}
        //Text inside the button (Optional)
        //thumbIconImageSource={thumbIcon}
        //You can also set your own icon for the button (Optional)
        onSwipeSuccess={() => {
          setName(true);
          SetMove(!Move);
        }}
        //After the completion of swipe (Optional)
        // railFillBackgroundColor="#e688a1" //(Optional)
        // railFillBorderColor="#e688ff" //(Optional)
        // thumbIconBackgroundColor="#ed9a73" //(Optional)
        // thumbIconBorderColor="#ed9aff" //(Optional)
        // railBackgroundColor="#bbeaa6" //(Optional)
        // railBorderColor="#bbeaff" //(Optional)
      />
    </View>
  )
}



export default ImageTest;