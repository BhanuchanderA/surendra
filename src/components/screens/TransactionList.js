import React, { useState,useEffect} from 'react'
import {View,Text,Image,ImageBackground,SafeAreaView, Dimensions,TouchableOpacity,FlatList, StyleSheet, ScrollView, TextInput, Alert,Modal,BackHandler} from 'react-native';
import Color from '../fonts/colors/Color';
import Common from './Common';
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-modern-datepicker';
import { BatchAPi, callAuthAPI,Transaction_SummaryApi } from '../Redux/Config';







const TransactionList = ({navigation}) => {
    const{height,width}=Dimensions.get('window')
    const [status, SetStatus] = useState('Manager')
    const[batch,SetBatch]=useState('0.00')
    const LoginData = useSelector(state => state);
    const [SaleChk, SetSaleChk] = useState(false)
    const [EcoChk, SetEcoChk] = useState(false)
    const [ReaMChk, SetReaMChk] = useState(false)
    const [RefChk, SetRefChk] = useState(false)
    const [FullChk, SetFullChk] = useState(false)
    const [PartialChk, SetPartialChk]=useState(false)
    const[SaleShow,SetSaleShow]=useState(false)
    const [RefundShow, SetRefundShow] = useState(false)
    const [RefundBtn, SetRefundBtn] = useState(false)
    const [PartialRefundBtn, SetPartialRefundBtn] = useState(false)
    const [CompleteBtn, SetCompleteBtn] = useState(false)
    const [FromAMT,SetFromAMT]=useState('')
    const [ToAMT,SetToAMT]=useState('')
    let ToAmountRef = React.createRef();
    const [TranTy, SetTranTy] = useState([])
    const [TranSubTy, SetTranSubTy] = useState([])
    const [TranSta, SetTranSta] = useState([])
    const [TranToAmt, SetTranToAmt] = useState('')
    const [TranFromAmt,SetTranFromAmt]=useState('')
    const[TranDate,SetTranDate]=useState('')
    const [FFT, SetFFt] = useState(false)
    const [TFT,SetTFt]=useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [ShowDot,SetShowDot]=useState(false)
    const[TranList,SetTranList]=useState('No more Transactions Found')
    const [DummyToAmount,SetDummyToAmount]=useState('')

    const jwtToken = LoginData.First.userLoginData.data.jwtToken
     const TodayDate=Common.todayDate();
    const Token = LoginData.First.userPinData.data.token
    const Role = LoginData.First.userPinData.data.empRole
     const [tran,SetTran]=useState([])
    // const TransactionList = LoginData.First.userTransactionData.data
    //    console.log('Transaction TYpe',TranTy);
    //    console.log('Transcation Subtype',TranSubTy);
    //    console.log('Transtatus',TranSta)
    //    console.log('AmountTo',TranFromAmt)
    //    console.log('AmountFrom',TranToAmt)
        const[search,setSearch]=useState('')
    const [FilterIcon, ShowFilter]=useState(false)
    const [FilterData, SetFilterData] = useState([])

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

    const CheckBoXStatus = (SaleChk, EcoChk, ReaMChk, RefChk, FullChk, PartialChk) => {
        let tranTy = [];
        let tranSubTy = [];

        switch (true) {
            case SaleChk && EcoChk && ReaMChk && !RefChk && !FullChk && !PartialChk:
                tranTy = [10];
                tranSubTy = [11, 13];
                break;

            case RefChk && FullChk && PartialChk && !SaleChk && !EcoChk && !ReaMChk:
                tranTy = [9];
                tranSubTy = [10, 12];
                break;

            case SaleChk && RefChk && FullChk && PartialChk && EcoChk && ReaMChk:
                tranTy = [10, 9];
                tranSubTy = [10, 12, 11, 13];
                break;
            case SaleChk && EcoChk && !ReaMChk && !RefChk && !FullChk && !PartialChk:
                SetTranTy([10]);
                SetTranSubTy([11]);
                break;
            case SaleChk && ReaMChk && !EcoChk && !RefChk && !FullChk && !PartialChk:
                SetTranTy([10]);
                SetTranSubTy([13]);
                break;
            case RefChk && FullChk && !PartialChk && !SaleChk && !EcoChk && !ReaMChk:
                SetTranTy([9]);
                SetTranSubTy([10]);
                break;
            case FullChk && !PartialChk && !RefChk && !SaleChk && !ReaMChk && !EcoChk:
                SetTranTy([]);
                SetTranSubTy([10]);
                break;
            case PartialChk && !FullChk && !RefChk && !SaleChk && !ReaMChk && !EcoChk:
                SetTranTy([]);
                SetTranSubTy([12]);
                break;
            case EcoChk && !ReaMChk && !RefChk && !SaleChk && !FullChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([11]);
                break;
            case ReaMChk && !EcoChk && !RefChk && !SaleChk && !FullChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([13]);
                break;
            case ReaMChk && EcoChk && !RefChk && !SaleChk && !FullChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([11, 13]);
                break;
            case ReaMChk && FullChk && !RefChk && !SaleChk && !FullChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([13, 10]);
                break;
            case ReaMChk && PartialChk && !SaleChk && !RefChk && !FullChk && !EcoChk:
                SetTranTy([]);
                SetTranSubTy([13, 12]);
                break;
            case EcoChk && FullChk && !SaleChk && !RefChk && !ReaMChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([12, 10]);
                break;

            case EcoChk && PartialChk && !SaleChk && !RefChk && !FullChk && !ReaMChk:
                SetTranTy([]);
                SetTranSubTy([12, 12]);
                break;

            case FullChk && PartialChk && !SaleChk && !RefChk && !EcoChk && !ReaMChk:
                SetTranTy([]);
                SetTranSubTy([10, 12]);
                break;

            case !SaleChk && !EcoChk && !ReaMChk && !RefChk && !FullChk && !PartialChk:
                SetTranTy([]);
                SetTranSubTy([]);
                break;

            case !SaleChk && EcoChk && ReaMChk && !RefChk && FullChk && PartialChk:
                SetTranTy([]);
                SetTranSubTy([10, 11, 12, 13]);
                break;

            case !SaleChk && EcoChk && ReaMChk && RefChk && FullChk && PartialChk:
                SetTranTy([9]);
                SetTranSubTy([10, 11, 12, 13]);
                break;

            case SaleChk && EcoChk && ReaMChk && !RefChk && FullChk && PartialChk:
                SetTranTy([10]);
                SetTranSubTy([10, 11, 12, 13]);
                break;

            default:
                tranTy = [];
                tranSubTy = [];
                break;
        }
        SetTranTy(tranTy);
        SetTranSubTy(tranSubTy);
    };

    const StatusCheck = (CompleteBtn, RefundBtn, PartialRefundBtn) => {
        switch (true) {
            case CompleteBtn && !RefundBtn && !PartialRefundBtn:
                SetTranSta([1]);
                break;
            case !CompleteBtn && RefundBtn && !PartialRefundBtn:
                SetTranSta([2]);
                break;
            case !CompleteBtn && !RefundBtn && PartialRefundBtn:
                SetTranSta([3]);
                break;
            case CompleteBtn && RefundBtn && !PartialRefundBtn:
                SetTranSta([1, 2]);
                break;
            case CompleteBtn && !RefundBtn && PartialRefundBtn:
                SetTranSta([1, 3]);
                break;
            case !CompleteBtn && RefundBtn && PartialRefundBtn:
                SetTranSta([2, 3]);
                break;
            case CompleteBtn && RefundBtn && PartialRefundBtn:
                SetTranSta([1, 2, 3]);
                break;
            default:
                SetTranSta([]);
                break;
        }
    };
    const Sta = (TranSta) => {
        switch (true) {
            case (TranSta.includes(1) && TranSta.includes(2) && TranSta.includes(3)):
                SetCompleteBtn(true)
                SetRefundBtn(true)
                SetPartialRefundBtn(true)
                break
            case (TranSta.includes(2) && TranSta.includes(3)):
                SetCompleteBtn(false)
                SetRefundBtn(true)
                SetPartialRefundBtn(true)
                break
            case (TranSta.includes(1) && TranSta.includes(3)):
                SetCompleteBtn(true)
                SetRefundBtn(false)
                SetPartialRefundBtn(true)
                break
            case (TranSta.includes(1) && TranSta.includes(2)):
                SetCompleteBtn(true)
                SetRefundBtn(true)
                SetPartialRefundBtn(false)
                break
            case (TranSta.includes(1)):
                SetCompleteBtn(true)
                SetRefundBtn(false)
                SetPartialRefundBtn(false)
                break
            case (TranSta.includes(2)):
                SetCompleteBtn(false)
                SetRefundBtn(true)
                SetPartialRefundBtn(false)
                break
            case (TranSta.includes(3)):
                SetCompleteBtn(false)
                SetRefundBtn(false)
                SetPartialRefundBtn(true)
                break
            default:
                SetCompleteBtn(false)
                SetRefundBtn(false)
                SetPartialRefundBtn(false)
                break
        }
    }
    const AmountFields = (ToAMT, FromAMT) => {
        switch (true) {
            case (ToAMT != '' && FromAMT != ''):
                SetTranToAmt(ToAMT);
                SetTranFromAmt(FromAMT);
                SetFromAMT(FromAMT);
                SetToAMT(ToAMT);
                break;
            case (FromAMT != ''  && ToAMT === '' ):
                SetTranFromAmt(FromAMT);
                SetFromAMT(FromAMT);
                SetTranToAmt('');
                SetToAMT('');
                break;
            case (FromAMT === '' && ToAMT != ''):
                SetTranToAmt(ToAMT);
                SetToAMT(ToAMT);
                SetFromAMT('');
                SetTranFromAmt('');
                break;
            case (FromAMT === '' && ToAMT === ''):
                SetTranToAmt('');
                SetToAMT('');
                SetTranFromAmt('');
                SetFromAMT('');
                break;
            default:
                break;
        }
    }

    const HandleDot = () => {
        let shouldShowDot = false;

        if (CompleteBtn) {
            shouldShowDot = true;
        }
        if (RefundBtn) {
            shouldShowDot = true;
        }
        if (PartialRefundBtn) {
            shouldShowDot = true;
        }
        if (SaleChk) {
            shouldShowDot = true;
        }
        if (EcoChk) {
            shouldShowDot = true;
        }
        if (ReaMChk) {
            shouldShowDot = true;
        }
        if (RefChk) {
            shouldShowDot = true;
        }
        if (FullChk) {
            shouldShowDot = true;
        }
        if (PartialChk) {
            shouldShowDot = true;
        }
        if (ToAMT !== '' || FromAMT !== '') {
            shouldShowDot = true;
        }

        SetShowDot(shouldShowDot);
    }
 const validate=(FromAMT,ToAMT)=>{
    if(FromAMT>ToAMT)
    {
        Alert.alert('','To Amount should be greater than From Amount'),
        SetToAMT(''),
        SetDummyToAmount(TranToAmt);
    }
    else{
        SetDummyToAmount('');
    }
 }

 const handleTranList= async ()=>{
    console.log('Transaction_Summary_API_Hit')
     const requestData = {
         requestToken: Token,
         toDate: TodayDate
     };
     try {
         const res = await callAuthAPI(Transaction_SummaryApi, requestData, jwtToken);
         console.log('TransactionResponse', res);
         if (res.status == 'SUCCESS') {
            SetTran(res.data.items);
            SetFilterData(res.data.items);
         }
     } catch (error) {
         console.log(error);
     }
 }
    const handleBatch = async () => {
        console.log('Batch_API_Hit')
        const requestData = {
            requestToken: Token,
            toDate: TodayDate
        };
        try {
            const res = await callAuthAPI(BatchAPi, requestData, jwtToken);
            console.log('BatchResponse', res);
            if (res.status == 'SUCCESS') {
                SetBatch(res); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
            handleTranList();
            handleBatch();
                SetStatus(Role)
        },[]);

    useEffect(()=>{
       Filter();
       if(search.length===0)
       {
        SetFilterData(tran)
       }
    },[search.length!=0])
    const Filter = () => {
        SetFilterData(tran)
        let dummy = FilterData.filter((item) => item.receiveName.includes(search));
            SetFilterData(dummy);
        if(FilterData===''||FilterData===null)
        {
            SetTranList('No Transactions Found')  
        }
       else
        {
            SetTranList('No more Transactions Found') 
        }
    };

    const resetAllFilters = () => {
        SetTranTy([]);
        SetTranSubTy([]);
        SetSaleChk(false);
        SetRefChk(false);
        SetEcoChk(false);
        SetReaMChk(false);
        SetFullChk(false);
        SetPartialChk(false);
        SetCompleteBtn(false);
        SetRefundBtn(false);
        SetPartialRefundBtn(false);
        SetTranSta([]);
        SetTranFromAmt('');
        SetTranToAmt('');
        SetToAMT('');
        SetFromAMT('');
        SetShowDot(false);
    };
    
    const handleFilterButtonClick = () => {
        CheckBoXStatus(SaleChk, EcoChk, ReaMChk, RefChk, FullChk, PartialChk),
        StatusCheck(CompleteBtn, RefundBtn, PartialRefundBtn),
        AmountFields(FromAMT, ToAMT)
        ShowFilter(false),
        HandleDot()
    }
    const handleDate=()=>{
        setShowDatePicker(false);
    }

  return (
      <>
          <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flex: 1}}>
                  <View style={{ flexWrap: 'nowrap', backgroundColor: Color.primary_green, borderBottomEndRadius:10,borderBottomStartRadius:10}}>
                      <View style={{ flexDirection: 'column', flexWrap: 'nowrap' }}>
                          <ImageBackground source={require('../images/Back_mask.png')} resizeMethod={'resize'} resizeMode={'cover'}>
                              <View style={{ flexDirection: 'row', marginTop: 30, marginStart: 16, width: width ,marginBottom:30,alignItems:'center'}}>
                                  <TouchableOpacity activeOpacity={1} style={{ width: '35%' }} onPress={() => navigation.navigate('Dashboard')}>
                                      {
                                        <Image source={require('../images/White_back_arrow.png')} style={{ padding: 10 }} />
                                      }
                                  </TouchableOpacity>
                                  <View style={{alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                  <Text style={{fontSize:18,fontFamily:'opensans_bold',color:Color.white}}>Font Counter l</Text>
                                  <Text style={{fontSize:16,fontFamily:'opensans_bold',color:Color.white}}>TID-123456789</Text>
                                  </View>
                              </View>
                          </ImageBackground>
                      </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{flexDirection:'column',flex:1}}>
                  { status!='Employee'&&
                  <View style={{ borderColor: Color.white, borderRadius: 20, borderWidth: 2, flexWrap: 'nowrap', backgroundColor: Color.white, marginTop: 20, marginHorizontal: 16 }}>
                      <View style={{ flexDirection: 'column', marginBottom: 8}}>
                                      <Text style={{ marginHorizontal: 16, marginVertical: 16, fontFamily: 'opensans_bold',color:Color.primary_black}}>Today’s Batch</Text>
                         <View style={{ borderColor: Color.light_gray, borderWidth: 0.5, marginHorizontal: 16 }}></View>
                          <View style={{ flexDirection: 'row', padding: 16 }}>
                              <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', color: Color.primary_black }}>{batch}</Text>
                              <View style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                              <Text style={{ fontSize: 14, fontFamily: 'opensans_bold', color: Color.primary_black,marginBottom:2 }}> CYN</Text>
                              </View>
                          </View>
                      </View>
                      </View>
}
                  <View style={{ borderColor: Color.white, borderRadius: 20, borderWidth: 2, flexWrap: 'nowrap', backgroundColor: Color.white, marginTop: 20,marginHorizontal:16,marginBottom:20}}> 
                    <View style={{flexDirection:'column',marginBottom:8}}>
                        {
                              status == 'Employee' ? (
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16}}>
                                  <Text style={{ fontSize: 20, fontFamily: 'opensans_bold', color: Color.primary_black }}>Recent Transactions</Text>
                                  <Text style={{ fontSize: 16, fontFamily: 'opensans_bold', color: Color.primary_black }}>(CYN)</Text>
                              </View>) : (
                                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: Color.light_gray, borderWidth: 1,marginHorizontal:16,borderRadius:40,marginVertical:20 }}>
                                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>       
                                <Image source={require('../images/Search_Icon.png')} style={{marginHorizontal:20}}/>
                                              <TextInput placeholder='Search Transactions'
                                       value={search}
                                                          style={{ alignItems: 'flex-start', width: width * 0.4 }}
        
                                       onChangeText={(text)=>{
                                        setSearch(text);
                                       }}
                                /> 
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <View style={{borderColor:Color.light_gray,height:35,borderWidth:0.7}}></View>
                                                      <TouchableOpacity activeOpacity={1} onPress={() => { ShowFilter(true), Sta(TranSta), AmountFields(TranFromAmt, TranToAmt), SetFFt(false), SetTFt(false), HandleDot(TranTy, TranSubTy, TranSta, ToAMT, FromAMT)}} style={{padding:10}}>
                                        {ShowDot?
                                                              <Image source={require('../images/Filter_icon_Selected.png')} style={{ marginHorizontal: 20 }} /> : <Image source={require('../images/Filter_Icon.png')} style={{ marginHorizontal: 20 }} />
                                        }
                                                      </TouchableOpacity>
                                          </View>
                              </View>
                              )
                        }
                    
                      <View style={{borderColor:Color.light_gray,borderWidth:0.5,marginHorizontal:16}}></View>
                      </View>
                      <View style={{flexDirection:'row',marginBottom:20}}>
                      <FlatList
                                      data={
                                          status === 'Employee'
                                              ? tran.slice(0,10)
                                                  : search.length>0?FilterData:tran
                                      }
                          scrollEnabled={false}
                          renderItem={({item,index}) => {
                            return(
                                tran.length > 0 &&
                                status!='Employee'?(
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('SaleDetails', {'gbxId': item.gbxTransactionId, 'type': item.txnTypeDn, 'subtype': item.txnSubTypeDn })}>
                                    <View key={item.id} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                  <View style={{flexDirection:'column', width:'70%'}}>
                              <View style={{ flexDirection: 'row'}}>
                                {
                                 (item.txnTypeDn + '-' + item.txnSubTypeDn).length > 20 ? (<Text style={style.txt}>{item.txnTypeDn} - {(item.txnSubTypeDn).slice(0,10)}..</Text>):(<Text style={style.txt}>{item.txnTypeDn} - {item.txnSubTypeDn}</Text>)
                                }

                              </View>
                              <View style={{flexDirection:'row'}}>
                                                <Text style={style.txt}>{Common.convertDate(item.createdAt)} {Common.convertTime(item.createdAt).replace("AM", "am").replace("PM", "pm")}</Text>
                              </View>
                                    </View>  
                                    <View style={{width:'30%',justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}} key={index}>
                                                    {
                                                        item.txnTypeDn == 'Sale Order' ? (<Text style={[style.txt, { textAlign: 'right', color: Color.active_green,fontSize:18 }]}>+ </Text>) : (<Text style={[style.txt, { textAlign: 'right', color: Color.primary_black,fontSize:18}]}>- </Text>)
                                                    }
                                                   
                                        {
                                                            item.txnTypeDn == 'Sale Order' ? (<Text style={[style.txt, { textAlign: 'right', color: Color.active_green, fontSize: 18 }]}>{(item.amount).replace('CYN','')}</Text>) : (<Text style={[style.txt, { textAlign: 'right', color: Color.primary_black, fontSize: 18 }]}>{(item.amount).replace('CYN','')}</Text>)
                                        }
                                    </View>
                                    </View>
                                    <View style={{ borderColor: Color.light_gray, borderWidth: 0.5,marginTop:6 ,marginBottom:2}}></View>
                                </TouchableOpacity>
                                </View>
                            
                                ):(
                                        <TouchableOpacity activeOpacity={1}>
                                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                                                <View style={{ flexDirection: 'column', width: '70%' }}>
                                                    <View style={{ flexDirection: 'row' }}>

                                                        {
                                                            (item.txnTypeDn + '-' + item.txnSubTypeDn).length > 20 ? (<Text style={style.txt}>{item.txnTypeDn} - {(item.txnSubTypeDn).slice(0, 10)}..</Text>) : (<Text style={style.txt}>{item.txnTypeDn} - {item.txnSubTypeDn}</Text>)
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: 'row'}}>
                                                        <Text style={style.txt}>{Common.convertDate(item.createdAt)} {Common.convertTime(item.createdAt).replace("AM", "am").replace("PM", "pm")}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: '30%', justifyContent: 'flex-end' ,flexDirection:'row',alignItems:'center'}} key={index}>
                                                    {
                                                        item.txnTypeDn == 'Sale Order' ? (<Text style={[style.txt, { textAlign: 'right', color: Color.active_green,fontSize:18 }]}>+ </Text>) : (<Text style={[style.txt, { textAlign: 'right', color: Color.primary_black,fontSize:18}]}>- </Text>)
                                                    }
                                                    {
                                                        item.txnTypeDn == 'Sale Order' ? (<Text style={[style.txt, { textAlign: 'right', color: Color.active_green, fontSize: 18 }]}>{(item.amount).replace('CYN','')}</Text>) : (<Text style={[style.txt, { textAlign: 'right', color: Color.primary_black, fontSize: 18 }]}>{(item.amount).replace('CYN','')}</Text>)
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ borderColor: Color.light_gray, borderWidth: 0.5, marginHorizontal: 16, marginTop: 6, marginBottom: 2 }}></View>
                                        </TouchableOpacity>
                                )                                    
  )
                          }}
                      />
                    </View>
                              {tran.length>0 ?
                                  <View style={{ marginHorizontal: 20,marginTop:10,marginBottom:20,alignItems:'center',justifyContent:'center' }}>
                                      <Text style={{ fontSize: 16, fontFamily: 'opensans_regular', color: Color.primary_black }}>{TranList}</Text>
                                  </View>
                                  :
                                  <View style={{ marginHorizontal: 20, marginVertical: 50, alignItems: 'center', justifyContent: 'center' }}>
                                      <Text style={{ fontSize: 16, fontFamily: 'opensans_regular', color: Color.primary_black }}>No Transactions</Text>
                                  </View>
                              }
                      </View>
              </View>
                  </ScrollView>
              </View>
              {
                  FilterIcon &&
                  <View style={{backgroundColor: Color.white, borderRadius: 20,flexDirection:'column',flexWrap:'nowrap',height:height*0.9}}>
                      <View style={{ marginHorizontal: 8 }}>
                              <TouchableOpacity activeOpacity={1} onPress={() => ShowFilter(false)}>
                          <View style={{ flexDirection: 'column', marginHorizontal: 8 }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                                  <View style={{ borderColor: Color.primary_green, width: '20%', borderRadius: 250, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}></View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={[style.FlHtxt, { color: Color.primary_black }]}>Filter</Text>
                                  <TouchableOpacity activeOpacity={1} onPress={()=>
                                resetAllFilters()
                                  }>
                                  <Text style={[style.FlTxt, { color: Color.primary_green }]}>Reset all filters</Text>
                                      </TouchableOpacity>
                              </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                            
                                  <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{marginHorizontal:16}}>
                              <View style={{ flexDirection: 'column', marginTop: 10 }}>
                                  <View>
                                      <Text style={[style.FlTxt, { color: Color.primary_black, fontSize: 18 }]}>Transaction Type</Text>
                                        <TouchableOpacity activeOpacity={1} onPress={() => SetSaleShow(!SaleShow)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                      <CheckBox
                                                          value={SaleChk}
                                                          onValueChange={(value)=>{
                                                            SetReaMChk(value),
                                                            SetSaleChk(value),
                                                            SetEcoChk(value)
                                                          }}
                                                      />
                                              <Text style={[style.FlTxt, { color: Color.primary_black }]}>Sale Order</Text>
                                          </View>
                                              {
                                                  SaleShow ? (<Image source={require('../images/Minus_Icon.png')} />) : (<Image source={require('../images/Plus_Icon.png')} />)
                                                      }
                                      </View>
                                          </TouchableOpacity>
                                      {SaleShow &&
                                      <View style={{flexDirection:'column'}}>
                                                  <View style={{ borderColor: Color.light_gray, borderWidth: 0.8, marginVertical: 4 }}></View>
                                          <View style={{ marginStart: 16 }}>
                                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                                                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                              <CheckBox
                                                                  value={EcoChk}
                                                                  onValueChange={(value)=>{
                                                                    SetEcoChk(value)
                                                                }}
                                                              />
                                                      <Text style={[style.FlTxt, { color: Color.primary_black }]}>eCommerce</Text>
                                                  </View>
                                              </View>
                                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                                                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                              <CheckBox
                                                                  value={ReaMChk}
                                                                  onValueChange={(value)=>
                                                                    {
                                                                    SetReaMChk(value)
                                                                    }}
                                                              />
                                                      <Text style={[style.FlTxt, { color: Color.primary_black }]}>Retail / Mobile</Text>
                                                  </View>
                                              </View>
                                          </View>
                                          </View>
                                      }
                                      <TouchableOpacity activeOpacity={1} onPress={() => SetRefundShow(!RefundShow)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                      <CheckBox
                                                          value={RefChk}
                                                          onValueChange={(value)=>{
                                                            SetFullChk(value),
                                                            SetPartialChk(value),
                                                            SetRefChk(value)
                                                          }}
                                                      />
                                              <Text style={[style.FlTxt, { color: Color.primary_black }]}>Refund</Text>
                                          </View>
                                              {
                                                  RefundShow ? (<Image source={require('../images/Minus_Icon.png')} />) : (<Image source={require('../images/Plus_Icon.png')} />)
                                              }
                                      </View>
                                          </TouchableOpacity>
                                      {RefundShow &&

                                          <View style={{flexDirection:'column'}}>
                                                  <View style={{ borderColor: Color.light_gray, borderWidth: 0.8, marginVertical: 4 }}></View>
                                                  <View style={{marginStart:16}}>
                                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                                                  <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                                              <CheckBox
                                                                  value={FullChk}
                                                                  onValueChange={(value)=>{
                                                                    SetFullChk(value)
                                                                }}
                                                              />
                                                      <Text style={[style.FlTxt, { color: Color.primary_black }]}>Full</Text>
                                                  </View>
                                              </View>
                                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                                                  <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                              <CheckBox
                                                                  value={PartialChk}
                                                                  onValueChange={(value)=>{
                                                                    SetPartialChk(value)
                                                                }}
                                                              />
                                                      <Text style={[style.FlTxt, { color: Color.primary_black }]}>Partial</Text>
                                                  </View>
                                              </View>
                                          </View>
                                          </View>
                                      }
                                  </View>
                              </View>
                              </View>
                      <View style={{ borderColor: Color.light_gray, borderWidth: 1, marginVertical: 4 }}></View>
                      <View style={{ flexDirection: 'column', marginHorizontal: 16 }}>
                          <Text style={[style.FlTxt, { color: Color.primary_black, fontSize: 18 }]}>Transaction Status</Text>
                          <View style={{ marginTop: 10 }}>
                              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                  {
                                      CompleteBtn ? (
                                          <TouchableOpacity style={[style.StatusTXT, { backgroundColor: Color.light_green,borderColor:Color.primary_green }]}
                                              activeOpacity={1} onPress={() =>{SetCompleteBtn(!CompleteBtn)}}>
                                              <Text style={[style.FlTxt, { padding: 6,color:Color.primary_green }]}>Completed</Text>
                                          </TouchableOpacity>)
                                          : (
                                              <TouchableOpacity style={style.StatusTXT}
                                                  activeOpacity={1} onPress={() => {
                                                      SetCompleteBtn(!CompleteBtn)
                                                  }}>
                                                  <Text style={[style.FlTxt, { padding: 6 ,color:Color.primary_black}]}>Completed</Text>
                                              </TouchableOpacity>
                                          )
                                  }
                                  {
                                      RefundBtn ? (
                                          <TouchableOpacity style={[style.StatusTXT, { backgroundColor: Color.light_green,borderColor:Color.primary_green }]}
                                              activeOpacity={1} onPress={() => SetRefundBtn(!RefundBtn)}>
                                              <Text style={[style.FlTxt, { padding: 6,color:Color.primary_green }]}>Refund</Text>
                                          </TouchableOpacity>)
                                          : (
                                              <TouchableOpacity style={style.StatusTXT}
                                                  activeOpacity={1} onPress={() => {
                                                      SetRefundBtn(!RefundBtn)
                                                  }}>
                                                  <Text style={[style.FlTxt, { padding: 6,color:Color.primary_black }]}>Refund</Text>
                                              </TouchableOpacity>
                                          )
                                  }
                                  {
                                      PartialRefundBtn ? (
                                          <TouchableOpacity style={[style.StatusTXT, { backgroundColor: Color.light_green, width: '42%',borderColor:Color.primary_green }]}
                                              activeOpacity={1} onPress={() => SetPartialRefundBtn(!PartialRefundBtn)}>
                                              <Text style={[style.FlTxt, { padding: 6 ,color:Color.primary_green}]}>Partial Refund</Text>
                                          </TouchableOpacity>)
                                          : (
                                              <TouchableOpacity style={[style.StatusTXT, { width: '42%' }]}
                                                  activeOpacity={1} onPress={() => {
                                                      SetPartialRefundBtn(!PartialRefundBtn)
                                                  }}>
                                                  <Text style={[style.FlTxt, { padding: 6 ,color:Color.primary_black}]}>Partial Refund</Text>
                                              </TouchableOpacity>
                                          )
                                  }
                              </View>
                          </View>
                      </View>
                      <View style={{flexDirection:'column',marginTop:20,marginHorizontal:16}}>
                                  <Text style={[style.FlTxt, { color: Color.primary_black, fontSize: 18 }]}>Transaction Amount</Text>
                                  <View style={{flexDirection:'row',marginVertical:10,alignItems:'center',justifyContent:'space-between'}}>
                                      <TextInput
                                          placeholder='(CYN)'
                                          value={FromAMT}
                                          maxLength={8}
                                          keyboardType='number-pad'
                                          style={[{ height: 50, borderWidth: 1, borderRadius: 10, width: width * 0.4, paddingStart: 10, fontSize: 16 }, (FFT) ? ({ borderColor: Color.primary_green }) : ({ borderColor: Color.light_gray })]}
                                          onChangeText={(text) => {
                                              AmountFields(ToAMT, text);
                                              SetFromAMT(text);
                                          }}
                                          onFocus={() => {
                                              SetFFt(true)
                                          }}
                                          onBlur={() => {
                                              if (FromAMT.trim() === '') {
                                                  SetFromAMT('');
                                              }
                                              SetFFt(false)
                                          }}
                                          onSubmitEditing={el => ToAmountRef.current.focus()}
                                      />
                                      <TextInput
                                          placeholder='(CYN)'
                                          value={ToAMT}
                                          ref={ToAmountRef}
                                          keyboardType='number-pad'
                                          style={[{ height: 50, borderColor: Color.light_gray, borderWidth: 1, borderRadius: 10, width: width * 0.4, paddingStart: 10, fontSize: 16 }, (TFT) ? ({ borderColor: Color.primary_green }) : ({ borderColor: Color.light_gray })]}
                                          maxLength={8}
                                          onChangeText={(text) => {
                                              AmountFields(text, FromAMT);
                                              SetToAMT(text);
                                          }}
                                          onFocus={() => {
                                              SetTFt(true)
                                          }}
                                          onBlur={() => {
                                              if (ToAMT.trim() === '') {
                                                  SetToAMT('');
                                              }
                                              SetTFt(false)
                                          }}
                                          onSubmitEditing={() => {
                                              SetTFt(false);
                                              validate(FromAMT, ToAMT);
                                          }}
                                      />
                                  </View>
                                  <View style={{ marginTop: 10}}>
                                      <Text style={[style.FlTxt,{fontSize:18,color:Color.primary_black,marginBottom:10}]}>Date</Text>
                                      <TouchableOpacity activeOpacity={1} onPress={()=>setShowDatePicker(true)}>
                                      <View style={{ height: 40, borderColor: Color.light_gray, borderWidth: 1, borderRadius: 10, width: width*0.9, paddingStart: 10, fontSize: 16, borderColor: Color.light_gray, flexDirection: 'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10 }}>
                                        <Text style={{fontSize:18,fontFamily:'opensans_regular',color:Color.light_gray}}>Date Range</Text>
                                        <Image source={require('../images/Calender_Icon.png')}/>
                                      </View>
                                      </TouchableOpacity>
                                  </View>
                                 
                      </View>
                                      <View style={{marginTop:30,marginBottom:50,marginHorizontal:16}}>
                                  <TouchableOpacity style={{ backgroundColor: Color.primary_green, borderRadius: 250, height: 50, alignItems: 'center', justifyContent: 'center'}}
                                      activeOpacity={1}
                                      onPress={() =>
                                         handleFilterButtonClick() }>
                                      <Text style={{ fontFamily: 'opensans_bold', fontSize: 16, color: Color.white }}>Apply Filter</Text>
                                  </TouchableOpacity>
                              </View>
                              </ScrollView>
                          </View>
              }
          </SafeAreaView>
          <Modal visible={showDatePicker}>
              <View style={{ flex: 1 ,backgroundColor:Color.light_gray}}>
                <TouchableOpacity onPress={()=>handleDate()} activeOpacity={1}>
                 <Text> hello world</Text>
                  </TouchableOpacity>
                  <DatePicker
                      options={{
                          backgroundColor: Color.white,
                          textHeaderColor: '#FFA25B',
                          textDefaultColor: '#F6E7C1',
                          selectedTextColor: '#fff',
                          mainColor: '#F4722B',
                          textSecondaryColor: '#D6C7A1',
                          borderColor: Color.light_gray,
                      }}
                      current="2023-04-30"
                      selected="2023-04-30"
                      mode="calendar"
                      minuteInterval={30}
                      style={{ borderRadius: 10 }}
                  />
              </View>
          </Modal>
      </>
  )
}

const style=StyleSheet.create({
   txt:{
    color:Color.primary_black,
    fontSize:18,
    fontFamily:'opensans_regular'
   },
   FlTxt:{
       fontSize: 16, 
       fontFamily: 'opensans_semibold',
   },
   FlHtxt:{
       fontSize: 24,
       fontFamily: 'opensans_bold',
   },
   StatusTXT:{
       width: '30%',
        borderRadius: 250,
         borderColor: Color.light_gray, 
         borderWidth: 0.7, 
         alignItems: 'center',
          justifyContent: 'center',
         marginRight:20,
          marginVertical:10
   }
})
export default TransactionList;