import React,{useState,useEffect} from 'react';
import {Text,Image,View,TouchableOpacity, Dimensions,StyleSheet} from 'react-native';
import Color from '../fonts/colors/Color';

const KeyPad = (props) => {
    const{height,width}=Dimensions.get('window');
    const[Amount,EnterAmount]=useState('');
  return (
    <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 6 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(1)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(2)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(3)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>3</Text>
              </TouchableOpacity>
              <View style={[styles.Del]}>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(-1)}>
                      <Image source={require('../images/Delete.png')} style={{ marginHorizontal: width*0.055, marginVertical: 10 }} />
                  </TouchableOpacity>
              </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column',width:width*0.76}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6, marginBottom: 6 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(4)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(5)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(6)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>6</Text>
              </TouchableOpacity>
          </View>
          <View></View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6, marginBottom: 6 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(7)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(8)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(9)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>9</Text>
              </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6, marginBottom: 6 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(0)}>
                  <Text style={[styles.keyTxt, { width: width * 0.2 }]}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount('.')}>
                  <Text style={[styles.keyTxt, { width: width * 0.45 }]}>.</Text>
              </TouchableOpacity>
          </View>
          </View>
              <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(1)} style={{ marginTop:6, width: width * 0.2, height: 170, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white, borderRadius: 6 }}>
                  <Text style={{fontSize: 18,color: Color.primary_black,marginTop:4,fontSize:16,textAlign:'center',justifyContent:'center'}}>Refund</Text>
                      </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        color: Color.white,
        fontSize: 16,
        fontFamily: 'opensans_regular'
    },
    txt: {
        color: Color.white,
        fontSize: 18,
        fontFamily: 'opensans_semibold',
        marginBottom: 12
    },
    btn: {
        marginHorizontal: 24,
        backgroundColor: Color.Exit_button_color,
        borderColor: Color.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        marginBottom: 10
    },
    LOtxt: {
        fontSize: 24,
        fontFamily: 'opensans_bold',
        padding: 14,
        color: Color.white
    },
    LT: {
        color: Color.white,
        fontSize: 24,
        padding: 14,
        fontFamily: 'opensans_bold',
        textAlign: 'center'
    },
    keyTxt: {
        padding: 12,
        backgroundColor: Color.white,
        borderRadius: 6,
        fontSize: 18,
        color: Color.primary_black,
        textAlign: 'center'
    },
    Del: {
        backgroundColor: Color.boxbackgroundgray,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    DummyKeyTxt: {
        padding: 15,
        backgroundColor: Color.boxbackgroundgray,
        borderRadius: 10,
        fontSize: 24,
        color: Color.primary_black,
        textAlign: 'center'
    },
    CroMB: {
        backgroundColor: Color.primary_black,
        borderRadius: 250,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: Color.white,
        fontSize: 16,
        fontFamily: 'opensans_regular'
    },
    txt: {
        color: Color.white,
        fontSize: 18,
        fontFamily: 'opensans_semibold',
        marginBottom: 12

    },
    BothV: {
        marginHorizontal: 24,
        marginTop: 16,
        borderBottomWidth: 2,
        borderBottomColor: Color.light_gray,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default KeyPad;