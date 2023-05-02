import React,{useEffect,useState} from 'react'
import { View, Text, SafeAreaView, Modal, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, BackHandler, ToastAndroid} from 'react-native'
import {Clipboard} from '@react-native-community/clipboard'
import Color from '../fonts/colors/Color';
import Common from '../screens/Common';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { Transaction_DetailsApi, callAuthAPI2 } from '../Redux/Config';




 const SaleDetails = ({navigation,route}) => {
    const {height,width}=Dimensions.get('window')
    const [sale,SetSale]=useState(false);
    const[Refund,SetRefund]=useState(false);
     const LoginData = useSelector(state => state);
     const GbxId=route.params.gbxId;
     const type=route.params.type;
     const subtype = route.params.subtype;
     const [Date, SetDate] = useState('')
     const [Amount, SetAmount] = useState('')
     const [TerId, SetTerId] = useState('')
     const [status, SetStatus] = useState('')
     const [EmpId, SetEmpId] = useState('')
     const [EmpName, SetEmpName] = useState('')
     const [CusEmail, SetCusEmail] = useState('')
     const [CusName, SetCusName] = useState('')
     const [RefId, SetRefID] = useState('')
     const [PurAmount, SetPurAmount] = useState('')
     const [ShowLoader, SetShowLoader] = useState(false);
     const [TotAmount, SetTotAmount] = useState('')
     const [MerName, SetMerName] = useState('')
     const [Remark, SetRemark] = useState('')
     const [CusPhone, SetCusPhone] = useState('')
     const [SaleDate,SetSaleDate]=useState('')
    const[SaleRefId,SetSaleRefId]=useState('')
    const [TipAmount,SetTipAmount]=useState('')
     const [showPop, SetShowPop] = useState(false);
     const [Message, setMessage] = useState('');
     const Type = (type =='Sale Order'?('10'):('9'))
     const SubType = (subtype =='Retail / Mobile'?('13'):('8'))
     const jwtToken = LoginData.First.userLoginData.data.jwtToken;
     const [TD, SetTD] = useState([]);
    
     const [copiedText, setCopiedText] = useState('');

     const handleCopyToClipboard = async (text) => {
         await Clipboard.setString(text);
         setCopiedText(text);
     };
     const handleDetails = async () => {
         console.log('Details_API_Hit');
         SetShowLoader(true);
         try {
             const res = await callAuthAPI2(Transaction_DetailsApi, GbxId, Type, SubType, jwtToken);
             console.log('TransactionDetails', res);
             if (res.status === 'SUCCESS') {
                 SetTD(res.data);
                 if (type === 'Sale Order') {
                     SetSale(true);
                     SetRefund(false);
                 } else if (type === 'Refund') {
                     SetSale(false);
                     SetRefund(true);
                 }
                 SetShowLoader(false);
             }
         } catch (error) {
             console.log(error);
             SetShowLoader(false);
             SetShowPop(true);
             setMessage(res.response.data.error.errorDescription);
         }
     }

     const ShowDetails=(type)=>{
         if (type === 'Sale Order') {
             SetDate(TD.createdDate);
             console.log('Transaction data', TD);
             SetAmount(TD.totalAmount);
             SetTotAmount(TD.totalAmount);
             SetStatus(TD.status);
             SetEmpId(TD.employeeId);
             SetEmpName(TD.employeeName);
             SetCusEmail(TD.customerEmail);
             SetCusName(TD.customerName);
             SetTerId(TD.terminalId);
             SetRefID(TD.referenceId);
             SetPurAmount(TD.purchaseAmount);
         }
         else if (type === 'Refund') {
             SetAmount(TD.transactionAmount);
             SetRemark(TD.remarks);
             SetStatus(TD.status);
             SetDate(TD.createdDate);
             SetRefID(TD.saleOrderReferenceId);
             SetCusEmail(TD.customerServiceEmail);
             SetMerName(TD.merchantName);
             SetCusPhone(TD.customerServicePhone);
             SetEmpId(TD.employeeId);
             SetTerId(TD.terminalId);
             SetEmpName(TD.employeeName);
             SetSaleDate(TD.saleOrderDateAndTime);
             SetSaleRefId(TD.saleOrderReferenceId);
             SetTotAmount(TD.total);
             SetTipAmount(TD.tip);
         }
     }
  useEffect(()=>{
ShowDetails(type);
  },[TD])
     useEffect(()=>{
handleDetails();
     }, [])

     const HandlePopup = () => {
         SetShowPop(false);
     }

     useEffect(() => {
         const backAction = () => {
             navigation.navigate('TransactionList');
             return true;
         };

         const backHandler = BackHandler.addEventListener(
             'hardwareBackPress',
             backAction,
         );
         return () => backHandler.remove();
     }, []);
  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'transparent'}}>
            {Refund&&
        <View style={{flex:1,backgroundColor:Color.boxbackgroundgray}}>
            <View style={{backgroundColor:Color.white,borderBottomRightRadius:10,borderBottomLeftRadius:10,width:width}}>
                      <View style={styles.TopV}>
                        <TouchableOpacity  activeOpacity={1} onPress={()=>navigation.goBack()} style={{padding:10}}>
                <Image source={require('../images/back_arrow.png')}/>
                          </TouchableOpacity> 
                      <Text style={[styles.VTxt,{color:Color.primary_black}]}>Transaction Details</Text>
                      <View></View>
                      </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={{ flexDirection: 'column' }}>
                          <View style={{ width: width }}>
                              <View style={[styles.ConV,{marginTop:20}]}>
                                  <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                      <Text style={{ fontSize: 18, fontFamily: 'opensans_bold', textAlign: 'center', marginTop: 18 ,color:Color.primary_black}}>{type}<Text style={{fontSize:18,fontFamily:'opensans_bold',color:Color.primary_black}}> - {subtype}</Text></Text>
                                      <Text style={{fontSize:32,fontFamily:'opensans_bold',color:Color.primary_green,textAlign:'center',marginTop:8}}>{Amount.replace('CYN','').trim()}<Text style={{fontSize:16,fontFamily:'opensans_bold',color:Color.primary_green}}> CYN</Text></Text>
                                      <Text style={{fontSize:16,fontFamily:'opensans_regular',textAlign:'center',marginTop:10,color:Color.primary_black,marginHorizontal:16}}>{Remark}</Text>
                                      <View style={{borderColor:Color.light_gray,borderWidth:0.5,marginTop:10,marginBottom:10}}></View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Status</Text>
                                          {status==='Failed'?(
                                          <View style={{ borderColor: Color.txn_failed_trans, borderRadius: 20, borderWidth: 1, backgroundColor: Color.txn_resend_invitation_status }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', textAlign: 'right', color: Color.error_red, paddingHorizontal: 24, paddingVertical: 6 }}>{status}</Text>
                                          </View>):(
                                          <View style={{ borderColor: Color.txn_completed_trans, borderRadius: 20, borderWidth: 1, backgroundColor: Color.txn_completed_trans }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', textAlign: 'right', color: Color.active_green, paddingHorizontal: 24, paddingVertical: 6 }}>{status}</Text>
                                          </View>
                                          )
                                          }
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Date</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{Common.convertDate(Date)} {Common.convertTime(Date).replace('Am', 'am').replace('PM', 'pm')}</Text>
                                      </View>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={{ flexDirection: 'column',marginTop:20 }}>
                          <View style={{ width: width }}>
                              <View style={styles.ConV}>
                                  <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Reference ID</Text>
                                          {/* <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end' }} onPress={() => ToastAndroid.showWithGravity('Copied'+ RefId,1000,ToastAndroid.CENTER)}>
                                              <Text style={{ color: Color.primary_black, fontSize: 16, fontFamily: 'opensans_semibold' }}>{RefId.slice(0,13)}...</Text>
                                              <Image source={require('../images/Copy_Icon.png')} />
                                          </TouchableOpacity> */}
                                              <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end' }} onPress={() => {
                                                  handleCopyToClipboard(RefId)
                                                  ToastAndroid.showWithGravity('Copied ' + RefId, 1000, ToastAndroid.CENTER);
                                              }}>
                                                  <Text style={{ color: Color.primary_black, fontSize: 16, fontFamily: 'opensans_semibold' }}>{RefId.slice(0, 13)}...</Text>
                                                  <Image source={require('../images/Copy_Icon.png')} />
                                              </TouchableOpacity>
                                      </View>            
                                  </View>
                              </View>
                          </View>
                      </View>
                <View style={{flexDirection:'column',marginBottom:30}}>
                  <View style={{flexDirection:'column'}}>
                  <Text style={{marginHorizontal:24,marginTop:20,marginBottom:10,fontSize:18,fontFamily:'opensans_bold',color:Color.primary_black}}>Merchant Information</Text>
            <View style={{width:width}}>
                  <View style={styles.ConV}>
            <View style={{flexDirection:'column',marginHorizontal:16,marginTop:10}}>
                              <View style={styles.BTxt}>
                                  <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Merchant Name</Text>
                                  <Text style={[styles.VTxt, { color: Color.primary_black }]}>{MerName}</Text>
        </View>
                              <View style={styles.BTxt}>
                                  <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Customer Service Email</Text>
                                  <Text style={[styles.VTxt, { color: Color.primary_black }]}>{CusEmail}</Text>
        </View>
                      <View style={styles.BTxt}>
                                  <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Customer Service Phone</Text>
                                  <Text style={[styles.VTxt, { color: Color.primary_black }]}>{'('}{CusPhone.slice(0,3)}{')'} {CusPhone.slice(3,6)}-{CusPhone.slice(6,10)}</Text>
                      </View>
                  </View>
                  </View>
                  </View>
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                          <Text style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}>Ledger Information</Text>
                      <View style={{ width: width }}>
                          <View style={styles.ConV}>
                              <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Terminal ID</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{TerId}</Text>
                                  </View>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Employee Name</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{EmpName}</Text>
                                  </View>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Employee ID</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{EmpId}</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                          <Text style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}>Original Transaction Details</Text>
                      <View style={{ width: width }}>
                          <View style={styles.ConV}>
                              <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Date</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{Common.convertDate(SaleDate)} {Common.convertTime(SaleDate).replace('Am', 'am').replace('PM', 'pm')}</Text>
                                  </View>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Reference ID</Text>
                                              <TouchableOpacity style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end' }} activeOpacity={1} onPress={() => ToastAndroid.showWithGravity('Copied' + RefId, 1000, ToastAndroid.CENTER)}>
                                          <Text style={{color: Color.primary_green,fontSize:16,fontFamily:'opensans_semibold',textDecorationLine:'underline' }}>{SaleRefId.slice(0,13)}...</Text>
                                          <Image source={require('../images/Copy_Icon.png')}/>
                                          </TouchableOpacity>
                                  </View>
                                  <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Transaction Amount</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{Amount}</Text>
                                  </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Tip ([1.00%])</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{TipAmount}</Text>
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Total</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{TotAmount}</Text>
                                      </View>
                              </View>
                          </View>
                      </View>
                  </View>
                      </View> 
                  </ScrollView>
        </View>
 }
        {sale&&
              <View style={{ flex: 1, backgroundColor: Color.boxbackgroundgray }}>
                  <View style={{ backgroundColor: Color.white, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, width: width }}>
                      <View style={styles.TopV}>
                          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('TransactionList')}>
                          <Image source={require('../images/back_arrow.png')} />
                          </TouchableOpacity>
                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>Transaction Details</Text>
                          <View></View>
                      </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={{ flexDirection: 'column' }}>
                          <View style={{ width: width }}>
                              <View style={[styles.ConV, { marginTop: 20 }]}>
                                  <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                      <Text style={{ fontSize: 18, fontFamily: 'opensans_bold', textAlign: 'center', marginTop: 18, color: Color.primary_black }}>{type}<Text style={{ fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}> - {subtype}</Text></Text>
                                      <Text style={{ fontSize: 32, fontFamily: 'opensans_bold', color: Color.primary_green, textAlign: 'center', marginTop: 8 }}>{Amount.replace('CYN','').trim()}<Text style={{ fontSize: 16, fontFamily: 'opensans_bold', color: Color.primary_green }}> CYN</Text></Text>
                                      <View style={{ borderColor: Color.light_gray, borderWidth: 0.5, marginTop: 10, marginBottom: 10 }}></View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Status</Text>
                                          {
                                              (status === 'Partial Refund' || status ==='Refunded')?(
                                                  <View style={{ borderColor: Color.light_orange, borderRadius: 20, borderWidth: 1, backgroundColor: Color.light_orange }}>
                                                      <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', textAlign: 'right', color: Color.orange, paddingHorizontal: 24, paddingVertical: 6 }}>{status}</Text>
                                                  </View>
                                              ):(status==='Failed'?(
                                                      <View style={{ borderColor: Color.txn_failed_trans, borderRadius: 20, borderWidth: 1, backgroundColor: Color.txn_resend_invitation_status }}>
                                                          <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', textAlign: 'right', color: Color.error_red, paddingHorizontal: 24, paddingVertical: 6 }}>{status}</Text>
                                                      </View>):(
                                                          <View style={{ borderColor: Color.txn_completed_trans, borderRadius: 20, borderWidth: 1, backgroundColor: Color.txn_completed_trans }}>
                                                              <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', textAlign: 'right', color: Color.active_green, paddingHorizontal: 24, paddingVertical: 6 }}>{status}</Text>
                                                          </View>
                                                      )
                                              )
                                          }
                                         
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Date</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{ Common.convertDate(Date) } {Common.convertTime(Date).replace("AM", "am").replace("PM", "pm")}</Text>
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Purchase Amount</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{PurAmount}</Text>
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Tip ([1.00%])</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>1.00 CYN</Text>
                                      </View>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Total</Text>
                                          <Text style={[styles.VTxt, { color: Color.primary_black }]}>{TotAmount}</Text>
                                      </View>
                                      <View style={{borderColor:Color.light_gray,borderWidth:0.5,marginTop:10,marginBottom:8}}></View>
                                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                              (status === 'Partial Refund' || status === 'Completed') ? (<TouchableOpacity activeOpacity={1} onPress={() => {navigation.navigate('Refund',{'gbxId':RefId,'amount':TotAmount}),SetSale(true)}}>
                                                  <Image source={require('../images/Refund_Icon.png')} />
                                              </TouchableOpacity
                                              >):(
                                                      <TouchableOpacity activeOpacity={1}>
                                                          <Image source={require('../images/Refund_Icon.png')} tintColor={Color.light_gray}  />
                                                      </TouchableOpacity>
                                              )
                                        }
                                      </View>
                                      <Text style={{textAlign:'center',fontSize:14,fontFamily:'opensans_regular',marginBottom:14,marginTop:4}}>Refund</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={{ flexDirection: 'column', marginTop: 20 }}>
                          <View style={{ width: width }}>
                              <View style={styles.ConV}>
                                  <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                      <View style={styles.BTxt}>
                                          <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Reference ID</Text>
                                          <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end' }} onPress={() => ToastAndroid.showWithGravity('Copied' + RefId, 1000, ToastAndroid.CENTER)}>
                                              <Text style={{ color: Color.primary_black, fontSize: 16, fontFamily: 'opensans_semibold' }}>{RefId.slice(0,13)}... </Text>
                                              <Image source={require('../images/Copy_Icon.png')} />
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={{ flexDirection: 'column', marginBottom: 30 }}>
                          <View style={{ flexDirection: 'column' }}>
                              <Text style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}>Customer Information</Text>
                              <View style={{ width: width }}>
                                  <View style={styles.ConV}>
                                      <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                          <View style={styles.BTxt}>
                                              <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Customer Name</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{CusName}</Text>
                                          </View>
                                          <View style={styles.BTxt}>
                                              <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Customer Email</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{CusEmail}</Text>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                          </View>
                          <View style={{ flexDirection: 'column' }}>
                              <Text style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}>Ledger Information</Text>
                              <View style={{ width: width }}>
                                  <View style={styles.ConV}>
                                      <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                          <View style={styles.BTxt}>
                                              <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Terminal ID</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{TerId}</Text>
                                          </View>
                                          <View style={styles.BTxt}>
                                              <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Employee Name</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{EmpName}</Text>
                                          </View>
                                          <View style={styles.BTxt}>
                                              <Text style={[styles.HTxt, { color: Color.dark_grey }]}>Employee ID</Text>
                                              <Text style={[styles.VTxt, { color: Color.primary_black }]}>{EmpId}</Text>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                          </View>
                          {/* <View style={{ flexDirection: 'column' }}>
                              <Text style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, fontSize: 18, fontFamily: 'opensans_bold', color: Color.primary_black }}>Activity Log</Text>
                              <View style={{ width: width }}>
                                  <View style={styles.ConV}>
                                    <FlatList
                                    data={Data}
                                    scrollEnabled={false}
                                    renderItem={({item,index})=>{
                                        return(
                                        <View style={{ flexDirection: 'column', marginHorizontal: 16, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={require('../images/dot.png')} />
                                                <Text style={{ color: Color.dark_grey, marginHorizontal: 8, fontSize: 16, fontFamily: 'opensans_semibold', color: Color.primary_black }}>{item.txnSubTypeDn}</Text>
                                                <Text style={{ color: Color.primary_black, marginHorizontal: 8, fontSize: 14, fontFamily: 'opensans_regular', color: Color.dark_grey }}>07/27/2020 10:36:14</Text>
                                            </View>
                                            <Text style={{ color: Color.dark_grey, fontSize: 16, fontFamily: 'opensans_regular', marginTop: 5, marginBottom: 12 }}>{item.gbxTransactionId}</Text>
                                        </View>
                                        )
                                    }}
                                    />
                                  </View>
                              </View>
                          </View> */}
                      </View>
                  </ScrollView>
              </View>
}
           <Modal visible={ShowLoader}>
               <Loader />
                    </Modal> 
    </SafeAreaView>
    <Modal visible={showPop} style={{ justifyContent: 'flex-end',flex:1 }} onDismiss={HandlePopup}>
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

const styles=StyleSheet.create({
    HTxt:{
        fontSize:16,
        fontFamily:'opensans_regular',
        width:'50%'
    },
    VTxt:{
        fontSize: 16,
        fontFamily: 'opensans_semibold',
        width:'50%',
        textAlign:'right'
    },
    BTxt:{
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginTop: 11,
         marginBottom: 16 
    },
    ConV:{
        backgroundColor: Color.white,
         borderRadius: 10, 
         marginHorizontal: 8
    },
    TopV:{
        flexDirection: 'row',
         marginHorizontal: 16,
          alignItems: 'center', 
          justifyContent: 'space-between',
           marginTop: 40, 
           marginBottom: 20
    }

})

export default SaleDetails;