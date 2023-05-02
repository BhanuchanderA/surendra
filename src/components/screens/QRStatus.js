import React,{useState,useEffect} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image,BackHandler } from 'react-native'
import Color from '../fonts/colors/Color';
import LottieView from 'lottie-react-native';

 const QRStatus = ({navigation,route}) => {
    const{height,width}=Dimensions.get('window');
    const recName=route.params.name;
    const Amount=route.params.amount;
    const status=route.params.status;
    const[Comp,SetComp]=useState(false);
    const[Fail,SetFail]=useState(false);
    const[Cancel,SetCancel]=useState(false);

    useEffect(()=>{
        if (status =='Completed')
        {
            SetComp(true);
            SetFail(false);
            SetCancel(false);
        }
        else if (status =='Failed')
        {
            SetComp(false);
            SetFail(true);
            SetCancel(false);
        }
        else{
            SetComp(false);
            SetFail(false);
            SetCancel(true);
        }
    },[status])

     useEffect(() => {
         const backAction = () => {
             return false;
         };
         const backHandler = BackHandler.addEventListener(
             'hardwareBackPress',
             backAction,
         );
         return () => backHandler.remove();
     }, []);
    
  return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
              <TouchableOpacity activeOpacity={1} onPress={() => 
                navigation.navigate('Dashboard')}>
                  <Image source={require('../images/cross.png')} style={{ marginTop: 40, marginStart: 20, marginBottom: 20 }} />
              </TouchableOpacity>
        {
            Comp&&
                      <View style={{ flexDirection: 'column'}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <LottieView
                  source={require('../ImagesAnim/teal-success-check.json')}
                  autoPlay
                  style={{ height: width*0.5, width: width*0.9,alignItems:'center',justifyContent:'center'}}
                  hardwareAccelerationAndroid={true}
              />
                      </View>
                      <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
              <Text style={{fontSize:24,color:Color.primary_black,fontFamily:'opensans_bold'}}>Payment Received</Text>
                          </View>    
                          <View style={{width:width}}>        
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginHorizontal:48}}>
                  <Text style={{ fontSize: 16, color: Color.primary_black, fontFamily: 'opensans_regular'}}>from </Text>
                                  <Text style={{ fontSize: 16, color: Color.primary_black, fontFamily: 'opensans_semibold' }}>{recName}</Text>
              </View>
                          </View> 
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row',marginTop:10 }}>
                  <Text style={{ fontSize: 32, color: Color.primary_black, fontFamily: 'opensans_bold' }}>{Amount}</Text>
                  <Text style={{ fontSize: 18, color: Color.primary_black, fontFamily: 'opensans_bold',marginTop:10 }}> CYN</Text>
              </View>
                      </View>
 }
 {
    Fail&&
                       <View style={{ flex:1,flexDirection: 'column',height:height,alignItems:'center',justifyContent:'center'}}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Image source={require('../images/Failed_Icon.png')}/>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                              <Text style={{ fontSize: 24, color: Color.primary_black, fontFamily: 'opensans_bold' }}>Payment Failed</Text>
                      </View>
                      <View style={{ width: width }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 48 }}>
                                  <Text style={{ fontSize: 16, color: Color.primary_black, fontFamily: 'opensans_regular', textAlign: 'center', marginTop: 10 }}>An error occurred. We were unable to complete this transaction. Please try again.</Text>
                          </View>
                  </View>
              </View>
 }
              {
                  Cancel &&
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 90 }}>
                          <Image source={require('../images/Failed_Icon.png')} />
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                          <Text style={{ fontSize: 24, color: Color.primary_black, fontFamily: 'opensans_bold' }}>Payment Canceled</Text>
                      </View>
                      <View style={{ width: width }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 48 }}>
                              <Text style={{ fontSize: 16, color: Color.primary_black, fontFamily: 'opensans_regular', textAlign: 'center', marginTop: 10 }}>The customer has canceled this transaction.</Text>
                          </View>
                      </View>
                  </View>
              }
 </View>
 {
              Comp ? (<View style={{ justifyContent: 'center' }}>
                  <TouchableOpacity style={{ backgroundColor: Color.primary_green, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Color.primary_green, marginVertical: 48, marginHorizontal: 16 }} activeOpacity={1} onPress={() =>  navigation.navigate('Pin', { 'screen': 'Sale-Order' })}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', color: Color.white, padding: 10 }}>Start New Sale</Text>
                      </View>
                  </TouchableOpacity>
              </View>) : (<View style={{ justifyContent: 'center' }}>
                      <TouchableOpacity style={{ backgroundColor: Color.primary_green, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Color.primary_green, marginVertical: 48, marginHorizontal: 16 }} activeOpacity={1} onPress={() => { navigation.navigate('Dashboard'), SetCancel(false), SetComp(false), SetFail(false) }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', color: Color.white, padding: 10 }}>Try Again</Text>
                      </View>
                  </TouchableOpacity>
              </View>)
 }
          
      </SafeAreaView>
         
  )
}



export default QRStatus;