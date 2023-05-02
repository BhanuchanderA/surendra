import React,{useEffect,useState,useRef} from 'react'
import { SafeAreaView, View,Text,TouchableOpacity,Image,Dimensions,StyleSheet,TextInput, ScrollView,Alert, Keyboard,BackHandler} from 'react-native';
import Color from '../fonts/colors/Color';
import { Modal } from 'react-native-paper';
import Common from './Common';
import { useSelector, useDispatch } from 'react-redux';
import { Refund_Verify, callAuthAPI } from '../Redux/Config';
import KeyPad from './Keypad';

 const Refund = ({navigation,route}) => {
   const [show, SetShow] = useState(true)
   const[Amount,SetAmount]=useState('')
   const AmountRef = useRef('')
   const [refresh, SetRefresh] = useState(false)
   const [Rsn, SetRsn] = useState('')
   const[ShowRea,SetShowRea]=useState(false);
   const[Full,SetFull]=useState(false);
   const [Half, SetHalf] = useState(false);
   const LoginData = useSelector(state => state)
   const [Reason,SetReason]=useState('');
   const [ShowPreview, SetShowPreview] = useState(true);
   const [Kp,SetKp]=useState(true);
   const [showPop, SetShowPop] = useState(false);
   const [Message, setMessage] = useState('');
   const GbxID=route.params.gbxId
  const RefAmount=route.params.amount
   const jwtToken = LoginData.First.userLoginData.data.jwtToken
   const Token = LoginData.First.userPinData.data.token
   const { height, width } = Dimensions.get('window')
   const FullAmount = Common.convertBigDecimalUSDC(RefAmount).replace('CYN', '');
   const HalfAmount = (Common.convertBigDecimalUSDC(RefAmount) / 2).toFixed(2).replace('CYN', '');
   const EnterAmount = (price) => {
     if (Amount.length < 8 && price != -1) {
       let p = Amount;
       if (price != '.') {
         SetAmount(p + price);
       }
       else {
         if (Amount.length > 0 && Amount.includes('.')) {
           SetAmount(p);
         }
         else if (Amount.length > 0) {
           SetAmount(p + price);
         }
       }
       SetRefresh(!refresh);
       console.log(Amount);
     }
     if (Amount.length > 0 && price == -1) {
       console.log(price);
       SetAmount(Amount.substring(0, Amount.length - 1))
       SetRefresh(!refresh);
       console.log(Amount);
     }

   }
   const handleBtn=(type)=>{
    if(type==='1')
    {
      AmountRef.current.blur();
      SetFull(true);
      SetHalf(false);
      SetAmount(Common.convertBigDecimalUSDC(RefAmount).replace('CYN',''));
    }
    else {
      AmountRef.current.blur();
      SetHalf(true);
      SetFull(false);
      const halfAmount = Common.convertBigDecimalUSDC(RefAmount) / 2;
      SetAmount(halfAmount.toFixed(2).replace('CYN', ''));
    }
   }
 
 useEffect(()=>{
handleBtnColor();
 },[Amount.length])
   const handleReason=()=>{
    SetRsn(Reason.trim()),
    SetShowRea(false);
   }
   const onReasonChange = (Reason) => {
     const reg = /^[a-zA-Z ]+$/;
     if (Reason === '' || reg.test(Reason)) {
       SetReason(Reason);
     }
   }


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
   const handleRefund=async()=>{
     console.log('Refund Verify Api Hint')
     const requestData = {
       gbxTransactionId: GbxID,
       refundAmount: Common.convertBigDecimalUSDC(Amount),
        refundReason: Reason
     };
     try {
       const res = await callAuthAPI(Refund_Verify, requestData, jwtToken);
       console.log('Refund Verify Response', res);
       if (res.status == 'SUCCESS') {
          console.log('Refund Sucess')
       }
       else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
         SetShowPop(true);
         setMessage(res.response.data.error.errorDescription);
       }
     } catch (error) {
       console.log(error);
     }
   }
   const HandlePopup = () => {
     SetShowPop(false);
   }
   const handleBtnColor=()=>{
     if (FullAmount!=Amount)
     {
      AmountRef.current.focus();
       SetFull(false);
     }
     if (HalfAmount!=Amount)
      {
        AmountRef.current.focus();
        SetHalf(false);
      }
  }


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.boxbackgroundgray }}>
        <View style={{ flex: 1 }}>
          <View style={{ width: width, flexDirection: 'column' }}>
            <View style={{ height: 90, backgroundColor: Color.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
              <View style={{ flexDirection: 'row', marginHorizontal: 16, alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('SaleDetails', { 'type': 'Sale Order', 'subtype': 'Retail / Mobile', 'GbxId': GbxID })}} style={{padding:10}}>
                <Image source={require('../images/back_arrow.png')} />
                </TouchableOpacity>
                <Text style={{ color: Color.primary_black, fontSize: 16, fontFamily: 'opensans_bold' }}>Refund Transaction</Text>
                <View>
                </View>
              </View>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginVertical:40, width: width }}>
            <View style={{ backgroundColor: Color.white, borderRadius: 20, borderColor: Color.viewcolor, flexWrap: 'nowrap', marginHorizontal: 16 }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', height: 100, marginTop: 20 }}>
                <TextInput
                  {
                  ...(Amount == "" ? ({ placeholder: '0.00' }) : ({ placeholder: '' }))
                  }
                  placeholderTextColor={Color.light_gray}
                  {
                  ...(Amount.length <= 5 ? ({ fontSize: 70 }) : ((Amount.length <= 9) ? ({ fontSize: 40 }) : ({ fontSize: 30 })))
                  }
                  value={Amount}
                  style={(Amount.length > 0 ?
                    ({ textAlign: 'center' }) : ({ textAlign: 'right' })
                  )}
                  color={Color.primary_black}
                  editable={true}
                  maxLength={13}
                  ref={AmountRef}
                  autoFocus={true}
                  selectTextOnFocus={false}
                  cursorColor={Color.light_gray}
                  onChangeText={(text) => {
                    SetAmount(text)
                  }}
                  
                  showSoftInputOnFocus={false}
                />
                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end', ...(Amount.length <= 5 ? ({ marginTop: 18 }) : ((Amount.length <= 9) ? ({ marginTop: 16 }) : ({ marginTop: 10 }))) }}>
                  <Text style={{ fontFamily: 'opensans_bold', color: Color.primary_black, ...(Amount.length <= 5 ? ({ fontSize: 24 }) : ((Amount.length <= 9) ? ({ fontSize: 18 }) : ({ fontSize: 16 }))) }}> CYN</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 6 }}>
                <Text style={{ color: Color.primary_black, fontSize: 14, fontFamily: 'opensans_regular' }}>Transaction Amount: </Text>
                <Text style={{ color: Color.primary_black, fontSize: 18, fontFamily: 'opensans_bold' }}>{Common.convertBigDecimalUSDC(RefAmount).replace('CYN','')}</Text>
                <Text style={{ color: Color.primary_black, fontSize: 12, fontFamily: 'opensans_bold', marginTop: 4 }}> CYN</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                  {Full ? (
                    <TouchableOpacity style={[styles.StatusTXT, { backgroundColor: Color.light_green, borderColor: Color.primary_green }]}
                      activeOpacity={1}>
                      <Text style={[styles.FlTxt, { padding: 6, color: Color.primary_green }]}>Full Amount</Text>
                    </TouchableOpacity>)
                    : (
                      <TouchableOpacity style={styles.StatusTXT}
                        activeOpacity={1} onPress={() => {
                          handleBtn('1')
                        }}>
                        <Text style={[styles.FlTxt, { padding: 6, color: Color.dark_grey }]}>Full Amount</Text>
                      </TouchableOpacity>)
                  }
                  {
                    Half ? (
                      <TouchableOpacity style={[styles.StatusTXT, { backgroundColor: Color.light_green, borderColor: Color.primary_green }]}
                        activeOpacity={1} >
                        <Text style={[styles.FlTxt, { padding: 6, color: Color.primary_green }]}>1/2 Amount</Text>
                      </TouchableOpacity>)
                      : (
                        <TouchableOpacity style={styles.StatusTXT}
                          activeOpacity={1} onPress={() => {
                            handleBtn('2')
                          }}>
                          <Text style={[styles.FlTxt, { padding: 6, color: Color.dark_grey }]}>1/2 Amount</Text>
                        </TouchableOpacity>)
                  }
                </View>
                <View style={{ borderColor: Color.light_gray, borderWidth: 0.7, marginHorizontal: 10, marginVertical: 10 }}></View>
                    <TouchableOpacity activeOpacity={1} onPress={() => {SetShowRea(true), SetReason(Rsn)}}>
                    <View style={{ height: 100 }}>
                      {
                        (Rsn != '' && Rsn != null) ? (<Text style={{ marginHorizontal: 16, fontSize: 14, fontFamily: 'opensans_regular', color: Color.primary_black }}>{Rsn}</Text>):(
                          <Text style={{ marginHorizontal: 16, fontSize: 14, fontFamily: 'opensans_regular', color: Color.primary_black }}>Refund Reason (optional)</Text>
                        )
                      }
                    
                    </View>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
        {Kp&&
          <View style={{ backgroundColor: Color.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexWrap: 'nowrap'}}>
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
                  <Image source={require('../images/Delete.png')} style={{ marginHorizontal: width * 0.055, marginVertical: 10 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', width: width * 0.76 }}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6, marginBottom: 24 }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(0)}>
                    <Text style={[styles.keyTxt, { width: width * 0.2 }]}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount('.')}>
                    <Text style={[styles.keyTxt, { width: width * 0.45 }]}>.</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {
                (Amount > 0 ?
                  (<TouchableOpacity style={{ marginTop: 6, width: width * 0.2, height: 164, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.primary_green, borderRadius: 6, borderColor: Color.vlight_gray, borderWidth: 1 }}
                    activeOpacity={1}
                    onPress={() =>
                      Common.convertBigDecimalUSDC(Amount) != 0 ? (
                        handleRefund(),SetAmount(Common.convertBigDecimalUSDC(Amount))) : (SetAmount(Common.convertBigDecimalUSDC(Amount)))}>
                    <Text style={{ fontSize: 18, color: Color.white, marginTop: 4, fontSize: 16, textAlign: 'center', justifyContent: 'center', fontFamily: 'opensans_bold' }}>Refund</Text>
                  </TouchableOpacity>) : (
                    <View style={{ marginTop: 6, width: width * 0.2, height: 164, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.bg_inactive, borderRadius: 6, borderColor: Color.vlight_gray, borderWidth: 1 }}>
                      <Text style={{ fontSize: 18, color: Color.white, marginTop: 4, fontSize: 16, textAlign: 'center', justifyContent: 'center', fontFamily: 'opensans_bold' }}>Refund</Text>
                    </View>))
              }

            </View>
          </View>
 }
      </SafeAreaView>
      <Modal visible={ShowRea} backgroundColor={'transparent'} dismissable={false} style={{ justifyContent: 'flex-end', flexWrap: 'nowrap'}} >
        <View style={{ width: width, backgroundColor: Color.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexWrap: 'nowrap' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <View style={{ borderColor: Color.primary_green, borderRadius: 250, borderWidth: 1, width: '20%' }}></View>
          </View>
          <View style={{ width: width }}>
            <View style={{ backgroundColor: Color.boxbackgroundgray, borderRadius: 20, height: 140, margin: 25,flexDirection:'column' }}>
              <View style={{height:110}}>
              <TextInput
                placeholder='Refund Reason'
                placeholderTextColor={Color.primary_black}
                value={Reason}
                ref={AmountRef}
                keyboardType='name-phone-pad'
                style={{ alignItems: 'flex-start', marginHorizontal: 16, fontSize: 16, fontFamily: 'opensans_regular' }}
                color={Color.primary_black}
                editable={true}
                maxLength={120}
                multiline={true}
                autoFocus={true}
                selectTextOnFocus={false}
                onChangeText={onReasonChange}
              />
              </View>
              {
              Reason.length>0&&
              <View style={{alignItems:'flex-start',justifyContent:'flex-end',flexDirection:'row',marginHorizontal:25}}>
              <Text style={{ alignItems: 'center', justifyContent: 'flex-end', fontSize: 16, fontFamily: 'opensans_regular', color: Color.primary_black }}>{Reason.length}<Text style={{alignItems:'center',justifyContent:'flex-end',fontSize:16,fontFamily:'opensans_regular',color:Color.primary_black}}>/120</Text></Text>
              </View>
 }
            </View>
          </View>
          <View style={{ width: width }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 40, alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity style={{ backgroundColor: Color.white, borderColor: Color.primary_green, borderRadius: 40, width: width * 0.38, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}
                activeOpacity={1} onPress={() => {SetShowRea(false),Keyboard.dismiss()}}>
                <Text style={{ padding: 10, color: Color.primary_green, fontSize: 18, fontFamily: 'Opensans_bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: Color.primary_green, borderColor: Color.primary_green, borderRadius: 40, width: width * 0.38, alignItems: 'center', justifyContent: 'center' }}
                activeOpacity={1} onPress={() => {handleReason(),Keyboard.dismiss()}}>
                <Text style={{ padding: 10, color: Color.white, fontSize: 18, fontFamily: 'Opensans_bold' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={!ShowPreview}>

      </Modal>
      <Modal visible={showPop} style={{ justifyContent: 'flex-end' }} onDismiss={HandlePopup}>
        <View style={{ flexDirection: 'column', width: width, flexWrap: 'nowrap' }}>
          <View style={{ backgroundColor: Color.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderColor: Color.white, alignItems: 'center' }}>
            <View style={{ borderColor: Color.primary_green, width: '20%', borderRadius: 250, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}></View>
            <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', alignItems: 'center', marginVertical: 10, color: Color.primary_black }}>MPOS</Text>
            <Text style={{ fontSize: 16, fontFamily: 'opensans_regular', alignItems: 'center', marginHorizontal: 16, marginVertical: 16, color: Color.primary_black }}>{Message}</Text>
            <View style={{ width: width }}>
              <TouchableOpacity style={[styles.btn, { marginBottom: 20, backgroundColor: Color.primary_green }]} activeOpacity={1} onPress={() => SetShowPop(false)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'opensans_bold', fontSize: 24, color: Color.white,padding:10 }}>ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>   
    </>
  )
}
const styles = StyleSheet.create({
  header: {
    color: Color.primary_black,
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
    borderBottomColor: Color.light_gray
  },
  btn: {
    marginTop: 20,
    marginHorizontal: 24,
    backgroundColor: Color.Exit_button_color,
    borderColor: Color.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5
  },
  LOtxt: {
    fontSize: 24,
    fontFamily: 'opensans_bold',
    padding: 14,
    color: Color.white
  },
  txt: {
    color: Color.primary_black,
    fontSize: 18,
    fontFamily: 'opensans_regular'
  },
  FlTxt: {
    fontSize: 16,
    fontFamily: 'opensans_semibold',
  },
  FlHtxt: {
    fontSize: 24,
    fontFamily: 'opensans_bold',
  },
  StatusTXT: {
    width: '45%',
    borderRadius: 250,
    borderColor: Color.light_gray,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  keyTxt: {
    padding: 10,
    backgroundColor: Color.white,
    borderRadius: 6,
    fontSize: 18,
    borderColor: Color.vlight_gray,
    borderWidth: 0.7,
    color: Color.primary_black,
    textAlign: 'center'
  },
  Del: {
    borderRadius: 10,
    borderColor: Color.vlight_gray,
    borderWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DummyKeyTxt: {
    padding: 10,
    backgroundColor: Color.boxbackgroundgray,
    borderRadius: 10,
    fontSize: 18,
    color: Color.primary_black,
    textAlign: 'center'
  },
})


export default Refund;