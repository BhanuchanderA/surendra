import React from 'react';
import{View,Text,SafeAreaView, Dimensions, StyleSheet,TouchableOpacity,Image} from 'react-native'
import Color from '../fonts/colors/Color';

export const Details = () => {
  const{height,width}=Dimensions.get('window')
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{flexDirection:'column',width:width,height:height}}>
        <View style={styles.BothV}>
            <Text style={styles.header}>Terminal Name</Text>
            <Text style={styles.txt}>[Terminal Name Here]</Text>
        </View>
        <View style={styles.BothV}>
          <Text style={styles.header}>Terminal ID</Text>
          <Text style={styles.txt}>TID - 12345678</Text>
        </View>
        <View style={styles.BothV}>
          <Text style={styles.header}>Location</Text>
          <Text style={styles.txt}>[Insert DBA Name]</Text>
        </View>
        <View style={styles.BothV}>
          <Text style={styles.header}>Business</Text>
          <Text style={styles.txt}>[Business Name Here]</Text>
        </View>
        </View>
        <View style={{marginTop:-height*0.3}}>
      <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={() => navigation.navigate('Login')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../images/LogOut_icon.png')} />
          <Text style={styles.LOtxt}>Log Out</Text>
        </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
 const styles=StyleSheet.create({
  header:{
     color: Color.white, 
     fontSize: 16, 
     fontFamily: 'opensans_regular'
  },
  txt:{
    color:Color.white,
    fontSize: 18,
    fontFamily: 'opensans_semibold',
    marginBottom:12
  },
  BothV:{
    marginHorizontal: 24,
     marginTop: 16,
      borderBottomWidth: 2,
       borderBottomColor: Color.light_gray
  },
  btn:{
    marginTop: 20, 
    marginHorizontal: 24, 
    backgroundColor: Color.Exit_button_color,
     borderColor: Color.white, 
     borderRadius: 50,
      alignItems: 'center',
       justifyContent: 'center', 
       borderWidth: 1.5 
  },
  LOtxt:{
  fontSize: 24, 
  fontFamily: 'opensans_bold',
   padding: 14, 
   color: Color.white

  }

 })

export default Details;