import React from 'react'
import{Text,View,SafeAreaView,TouchableOpacity,Dimensions,Image} from 'react-native'
import Color from '../fonts/colors/Color'

const Terminate = ({navigation}) => {
    const{height,width}=Dimensions.get('screen')
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Color.white}}>
        <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
          <Image source={require('../images/Failed_Icon.png')} style={{marginTop:240}}/>
              <Text style={{fontSize:24,fontFamily:'opensans_bold',color:Color.primary_black,marginTop:10}}>Terminal Deactivated</Text>
              <Text style={{fontSize:16,fontFamily:'opensans_semibold',color:Color.primary_black,marginHorizontal:16,textAlign:'center'}}>This terminal has been deactivated and is no longer accessible.</Text>
        </View>
      <View style={{ width: width }}>
        <TouchableOpacity style={{ backgroundColor: Color.primary_green, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Color.primary_green, marginTop: 10, marginHorizontal: 16, marginBottom: 40 }} activeOpacity={1} onPress={() => navigation.navigate('Onboarding')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', color: Color.white, padding: 10 }}>Okay</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};



export default Terminate;