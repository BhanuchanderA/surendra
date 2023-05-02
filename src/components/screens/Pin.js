import React,{useEffect,useState} from 'react'
import {View,Text,SafeAreaView,Image,Dimensions,TouchableOpacity, StyleSheet,BackHandler} from 'react-native';
import Color from '../fonts/colors/Color';
import { useSelector,useDispatch } from 'react-redux';
import { PinApi, callAuthAPI } from '../Redux/Config';
import { Pin_s } from '../Redux/ActionType';

 const Pin = ({navigation,route}) => {
    const{height,width}=Dimensions.get('window')
     const [num, SetNum] = useState('')
    const[refresh,SetRefresh]=useState(false)
     const [ErrorCount, SetErrorCount] = useState(0)
    const[status1,SetStatus1]=useState('empty')
     const [status2, SetStatus2] = useState('empty')
     const [status3, SetStatus3] = useState('empty')
     const [status4, SetStatus4] = useState('empty')
     const ScreenName=route.params.screen;

     const LoginData = useSelector(state => state);
     const jwtToken = LoginData.First.userLoginData.data.jwtToken
     const dispatch = useDispatch();
     useEffect(() => {
         const backAction = () => {
             navigation.goBack();
             return true;
         };
         const backHandler = BackHandler.addEventListener(
             'hardwareBackPress',
             backAction,
         );
         return () => backHandler.remove();
     }, []);

     const Show=(setColor)=>{
       if(setColor=='correct')
       {
           SetStatus1('correct');
           SetStatus2('correct');
           SetStatus3('correct');
           SetStatus4('correct');
       }
       else if (setColor=='error'){
           SetStatus1('error');
           SetStatus2('error');
           SetStatus3('error');
           SetStatus4('error');
       }
       else{
           SetStatus1('empty');
           SetStatus2('empty');
           SetStatus3('empty');
           SetStatus4('empty');
           SetNum('');
       }
     };

    useEffect(()=>{
         Validate(num);
    },[num]);

    const ScreenMove=()=>{
        if(ScreenName=='Sale-Order')
        {
            navigation.replace('GenerateQRCode');
        }
        else if(ScreenName=='batch')
        {
            navigation.replace('TransactionList');
        }
    }

     const handlePin = async () => {
         const requestData = {
             pin: num,
         };
         console.log(requestData);
         try {
             const res = await callAuthAPI(PinApi, requestData, jwtToken);
             console.log('PinResponse', res);
             if (res.status=='SUCCESS') {
                 dispatch({
                     type: Pin_s,
                     payload: { data: res },
                 });
                 Show('correct');
                 ScreenMove();
                 Show('empty');
             }
             else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '')
             {
                 console.log(res.response.data.error.errorDescription);
                 Show('error');
                  SetErrorCount(ErrorCount + 1);
                  setTimeout(() => {
                     Show('empty')
                  }, 1000);
             }
         } catch (error) {
             console.log(error);
         }
     }
    const EnterPin=(pin)=>{
        if (num.length <4 && pin != -1)
        {
        let p=num;
        SetNum(p+parseInt(pin));
        SetRefresh(!refresh);
        console.log(num);
        }
        if(num.length>0 && pin==-1)
        {
            console.log(pin);
            SetNum(num.substring(0,num.length-1))
            SetRefresh(!refresh);
            console.log(num); 
        }
    }

    const Validate=(num)=>{
        if(num.length==0)
        {
            SetStatus1('empty');
             SetStatus2('empty');
             SetStatus3('empty');
             SetStatus4('empty');
        }
        else if(num.length==1)
        {
            SetStatus1('correct');
            SetStatus2('empty');
            SetStatus3('empty');
            SetStatus4('empty');
        }
        else if (num.length == 2) {
            SetStatus1('correct');
            SetStatus2('correct');
            SetStatus3('empty');
            SetStatus4('empty');
        }
        else if (num.length == 3) {
            SetStatus1('correct');
            SetStatus2('correct');
            SetStatus3('correct');
            SetStatus4('empty');
        }
        else if (num.length == 4) {
            SetStatus1('correct');
            SetStatus2('correct');
            SetStatus3('correct');
            SetStatus4('correct');
                handlePin();
        }
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Color.primary_green}}>
          <View style={{ flex: 1 }}>
              <TouchableOpacity style={{ height: 24, width: width, margin: 25 }} activeOpacity={1} onPress={() => navigation.navigate('Dashboard')}>
                  <Image source={require('../images/WhiteColor_CrossMark.png')} style={{ padding: 10 }} />
              </TouchableOpacity>
        <View style={{flex:1,marginTop:height*0.15}}>
            <Text style={{fontSize:24,color:Color.white,fontFamily:'opensans_bold',textAlign:'center'}}> Enter Your PIN</Text>
            <View style={{flexDirection:'row',width:width,alignItems:'center',justifyContent:'center',marginTop:height*0.05}}>
                <View style={{marginHorizontal:5}}>
                    {
                              status1 == 'empty' ? (<Image source={require('../images/White_Circle.png')} />) : (status1 == 'error' ? (<Image source={require('../images/Error_Circle.png')} />) : (<Image source={require('../images/Correct_Circle.png')} />))
                    }
                  </View>
                  <View style={{ marginHorizontal: 5 }}>
                          {
                              status2 == 'empty' ? (<Image source={require('../images/White_Circle.png')} />) : (status2 == 'error' ? (<Image source={require('../images/Error_Circle.png')} />) : (<Image source={require('../images/Correct_Circle.png')} />))
                          }
                  </View>
                  <View style={{ marginHorizontal: 5 }}>
                          {
                              status3 == 'empty' ? (<Image source={require('../images/White_Circle.png')} />) : (status3 == 'error' ? (<Image source={require('../images/Error_Circle.png')} />) : (<Image source={require('../images/Correct_Circle.png')} />))
                          }
                  </View>
                  <View style={{ marginHorizontal: 5 }}>
                          {
                              status4 == 'empty' ? (<Image source={require('../images/White_Circle.png')} />) : (status4 == 'error' ? (<Image source={require('../images/Error_Circle.png')} />) : (<Image source={require('../images/Correct_Circle.png')} />))
                          }
                  </View>
            </View>
            <View style={{flexDirection:'column'}}>
                {
                          (status1=='error' && status2=='error' && status3 == 'error' &&status4=='error'&&
                              <Text style={[styles.errorTxt, { marginTop: 12 }]}>Invalid PIN</Text>
                              )
                }
                {
                          (ErrorCount >= 4 &&status1=='error' && status2=='error' && status3 == 'error' &&status4=='error'&&
                              <Text style={styles.errorTxt} >Please contact your supervisor for assistance</Text> )
                }
                  </View>
        </View>
        </View>
        <View style={{height:350,flexDirection:'column',backgroundColor:Color.boxbackgroundgray,borderTopRightRadius:20,borderTopLeftRadius:20,flexWrap:'nowrap'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop:10,marginBottom:6}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>EnterPin(1)}>
                      <Text style={[styles.keyTxt,{width:width*0.3}]}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(2)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(3)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>3</Text>
                  </TouchableOpacity>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',marginVertical:6}}>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(4)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(5)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(6)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>6</Text>
                  </TouchableOpacity>

              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 6 }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(7)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={()=>EnterPin(8)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(9)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>9</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 6}}>
                  <TouchableOpacity activeOpacity={1}>
                      <Text style={[styles.DummyKeyTxt, { width: width * 0.3 }]}></Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(0)}>
                      <Text style={[styles.keyTxt, { width: width * 0.3 }]}>0</Text>
                  </TouchableOpacity>
                  <View style={[styles.Del]}>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterPin(-1)}>
                    <Image source={require('../images/Delete.png')} style={{marginHorizontal:40,marginVertical:20}}/>
                  </TouchableOpacity>
                  </View>
              </View>
        </View>
    </SafeAreaView>
  )
}


const styles=StyleSheet.create({
    errorTxt:{
        fontSize: 16,
         color: Color.white,
         fontFamily:'opensans_semibold',
        textAlign:'center'
    },
    keyTxt:{
        padding: 16,
         backgroundColor: Color.white,
          borderRadius: 6,
           fontSize: 24,
            color: Color.primary_black,
             textAlign: 'center'
    },
    Del:{
        backgroundColor: Color.boxbackgroundgray,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    DummyKeyTxt: {
        padding: 15,
        backgroundColor: Color.boxbackgroundgray,
        borderRadius: 10,
        fontSize: 24,
        color: Color.primary_black,
        textAlign: 'center'
    },
})
export default Pin;