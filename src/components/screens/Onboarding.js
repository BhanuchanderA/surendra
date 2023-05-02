import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, SafeAreaView, Dimensions, StyleSheet, BackHandler } from 'react-native';
import Color from '../fonts/colors/Color';

const Onboarding = ({ navigation }) => {
  const{height,width}=Dimensions.get("window")


  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.primary_green }}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../images/onboarding_back.png')} style={{ flex: 1}}>
          <View style={[styles.mainC,{width:width}]}>
            <View style={{ width: width}}>
            <Image source={require('../images/Mpos_logo.png')} style={{ marginHorizontal:24,alignSelf:'center'}} />
              <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={() => navigation.navigate('Logins')}>
                <Text style={styles.LT}>Log in</Text>
            </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  btn:{
    marginTop: 25, 
    backgroundColor: 'white',
     padding: 10, 
     borderRadius: 50, 
     alignItems: 'center',
      justifyContent: 'center',
       marginHorizontal:24
  },
  LT:{
    color: Color.primary_green,
     fontSize: 24, 
     fontFamily: 'opensans_bold', 
     textAlign: 'center' 
  },
  mainC:{
    flex: 1,
     justifyContent: 'center',
      alignItems: 'center'
  }
}
)
export default Onboarding;