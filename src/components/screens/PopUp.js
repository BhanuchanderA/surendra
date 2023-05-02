import React,{useState} from 'react';
import {View,Text,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import Color from '../fonts/colors/Color';



 const PopUp = ({message,btnTxt,action}) => {
    const {height,width}=Dimensions.get('window')
    const[showPop,SetShowPop]=useState(false)
  return (
   <View style={{width:width,justifyContent:'flex-end',backgroundColor:Color.white,borderRadius:20,alignItems:'center',borderWidth:1,borderColor:Color.white}}>
          <View style={{ borderColor: Color.primary_green, width: '20%', borderRadius: 250, borderWidth: 2, alignItems: 'center', justifyContent: 'center',marginTop:6 }}></View>
          <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', alignItems: 'center' }}>Mpos</Text>
          <Text style={{fontSize:16,fontFamily:'opensans_regular',alignItems:'center',marginHorizontal:16}}>{message}</Text>
          <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={() => SetShowPop(action)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.LOtxt}>{btnTxt}</Text>
              </View>
          </TouchableOpacity>
   </View>
  )
}



export default PopUp;

const styles = StyleSheet.create({
    btn: {
        marginTop: 25,
        backgroundColor: Color.inactive_color,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24
    }
}
)