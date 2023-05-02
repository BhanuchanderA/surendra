import React, { useEffect, useState,useRef,useLayoutEffect } from 'react';
import { View, Text,TouchableOpacity, Image, SafeAreaView, ImageBackground, Dimensions, ScrollView, StyleSheet,TextInput,Keyboard,AppState,BackHandler,LayoutAnimation, Alert} from 'react-native';
import Color from '../fonts/colors/Color';
import LottieView from 'lottie-react-native';
import Common from './Common';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import { DiscardApi, Generate_QR_CodeApi ,callAuthAPI} from '../Redux/Config';
import { Modal } from 'react-native-paper';
import { Generate_QR_Code_s } from '../Redux/ActionType';

const GenerateQRCode= ({ navigation }) => {
    const [show, SetShow] = useState(false)
    const { height, width } = Dimensions.get('window')
    const[refresh,SetRefresh]=useState(false)
    const[Amount,SetAmount]=useState('')
    const[Enable,SetEnable]=useState(false)
    const dispatch = useDispatch()
    const[QR,SetQR]=useState(false)
    const[QV,SetQV]=useState('loader')
    const[AmoRe,SetAmoRe]=useState(true)
    const AmountRef = useRef('')
    const LoginData = useSelector(state => state)
    const [webSocUrl, setWebSocUrl] = useState('');
    const [UniqueId, SetUniqueId] = useState('');
    const jwtToken = LoginData.First.userLoginData.data.jwtToken
    const Token = LoginData.First.userPinData.data.token
    const LD = LoginData.First.userLoginData.data;
     const[DbaName,SetDbaName]=useState('DBA Name')
    const [Profile, SetProfile] = useState('')
    const[dataUri,SetDataUri]=useState('')
    const[ShowDis,SetShowDis]=useState(false)
    const [ShowLoader, SetShowLoader] = useState(false)
    const [TerName, SetTerName] = useState('')
    const [EmpName, SetEmpName] = useState('')
    const[QRData,SetQRData]=useState([]);
    const[CloseWeb,SetCloseWeb]=useState(false);
    const [client, setClient] = useState(null);
    const PD = LoginData.First.userPinData.data

    const handle = () => {
        SetTerName(LD.terminalName);
        SetEmpName(PD.employeeName);
    }
  
const handleD=()=>{
    // if (LD.image != null && LD.image!='')
    // {
    // SetProfile('data:image/png;base64,' + LD.image);
    // }
    SetDbaName(LD.dbaName);
}
useEffect(()=>{
handleD();
    handle();
},[])
    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
            {!QR
            AmountRef.current.blur();
            }
            Keyboard.dismiss();
            SetAmoRe(false);
        } else {
            SetAmoRe(true);
            Keyboard.dismiss();
        }
    };

    useLayoutEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

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

    const HandleShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        SetShow(!show);
    };
    const handleGenerate = async () => {
        console.log('QRCode generate API Hint');
        SetQV('');
        SetQR(true);
        const requestData = {
            amount:Amount,
            isQrCodeEnable:true,
            requestToken:Token
        };
        try {
            const res = await callAuthAPI(Generate_QR_CodeApi, requestData, jwtToken);
            console.log('QR CODE Response', res);
            if (res.status == 'SUCCESS') {
                handleWebsocket(res.data.uniqueId, res.data.mposWebsocket);
                setWebSocUrl(res.data.mposWebsocket);
                SetUniqueId(res.data.uniqueId);
                SetDataUri('data:image/png;base64,' + res.data.image);
                // SetQV('QRcode');
                // SetEnable(true);
            }
            else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
                console.log(res.response.data.error.errorDescription);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDiscard= async ()=>{
        console.log('Discard Api Hint')
        SetCloseWeb(true);
        SetShowLoader(true);
        const requestData = {
            requestToken:Token,
            uniqueId:UniqueId
        };
        try {
            const res = await callAuthAPI(DiscardApi, requestData, jwtToken);
            console.log('Discard Response', res);
            if (res.status == 'SUCCESS') {
                SetShowLoader(false);
              navigation.navigate('Dashboard')
            }
            else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
                console.log(res.response.data.error.errorDescription);
            }
        } catch (error) {
            console.log(error);
        }
    }
  
    const handleWebsocket=(Id,Url)=>{    
        // if(Url!=null&& Url!='')
        // {
        //   console.log('WEbSocket method called')
        //     const client = new WebSocket(
        //         Url,
        //         null,
        //         {
        //             headers: {
        //                 Authorization: 'Bearer' + jwtToken,
        //             }
        //         }
        //     );
        // client.onopen = () => {
        //     SetQV('QRcode');
        //     SetEnable(true);
        //     console.log('WebSocket connection opened');
        //     client.send(JSON.stringify({
        //         Authorization: jwtToken,
        //         checkoutCode: Id,
        //     }));
        // };
        //     if (CloseWeb) {
        //         console.log('WebSocket closed due to discard');
        //         client.close(1000, 'Closing WebSocket permanently');
        //     }
        // client.onmessage = (event) => {
        //     console.log('Received message:', event.data);
        //     try {
        //         const jsonObject = JSON.parse(event.data);
        //         const eventType = jsonObject.eventType;

        //         if (eventType === 'SERVER_CONNECTION') {
        //             const dataToSend = {
        //                 Authorization: jwtToken,
        //                 evenType: 'ping',
        //                 checkoutCode:Id,
        //             };

        //             client.send(JSON.stringify(dataToSend));
        //         } 
        //         else if (eventType =='SCAN_QR_CODE')
        //         {
        //             SetQV('loader');
        //         }
        //         else if (eventType === 'POS_TXN_STATUS') {
        //             navigation.navigate('QRStatus',{'amount':jsonObject.txnAmount,'recName':jsonObject.senderName,'status':jsonObject.txnStatus})
        //             client.close(1000, 'Closing WebSocket permanently');
        //         } else if (eventType === 'SESSION_EXPIRY') {
        //             client.close(1000, 'Closing WebSocket permanently');
        //         }
        //     } catch (error) {
        //         console.log('Error parsing JSON:', error.message);
        //         client.close(1000, 'Closing WebSocket permanently');
        //     }
        // };

        // client.onerror = (error) => {
        //     console.log('WebSocket error:', error.message);
        //     client.close(1000, 'Closing WebSocket permanently');
        //     SetQV('QRcode');
        //     SetEnable(true);
        // };

        // client.onclose = (event) => {
        //     console.log('WebSocket connection closed:', event.code, event.reason);
        //     client.close(1000, 'Closing WebSocket permanently');
        // };
        if (Url != null && Url !== '') {
            console.log('WebSocket method called');
            const newClient = new WebSocket(
                Url,
                null,
                {
                    headers: {
                        Authorization: 'Bearer' + jwtToken,
                    }
                }
            );
            setClient(newClient);
            newClient.onopen = () => {
                SetQV('QRcode');
                SetEnable(true);
                console.log('WebSocket connection opened');
                newClient.send(JSON.stringify({
                    Authorization: jwtToken,
                    checkoutCode: Id,
                }));
            };
            newClient.onmessage = (event) => {
                console.log('Received message:', event.data);
                try {
                    const jsonObject = JSON.parse(event.data);
                    const eventType = jsonObject.eventType;

                    if (eventType === 'SERVER_CONNECTION') {
                        const dataToSend = {
                            Authorization: jwtToken,
                            evenType: 'ping',
                            checkoutCode: Id,
                        };

                        newClient.send(JSON.stringify(dataToSend));
                    }
                    else if (eventType === 'SCAN_QR_CODE') {
                        SetQV('loader');
                    }
                    else if (eventType === 'POS_TXN_STATUS') {
                        navigation.navigate('QRStatus', { 'amount': jsonObject.txnAmount, 'recName': jsonObject.senderName, 'status': jsonObject.txnStatus })
                        newClient.close(1000, 'Closing WebSocket permanently');
                    } else if (eventType === 'SESSION_EXPIRY') {
                        newClient.close(1000, 'Closing WebSocket permanently');
                    }
                } catch (error) {
                    console.log('Error parsing JSON:', error.message);
                    newClient.close(1000, 'Closing WebSocket permanently');
                }
            };

            newClient.onerror = (error) => {
                SetQV('QRcode');
                SetEnable(true);
                console.log('WebSocket error:', error.message);
                newClient.close(1000, 'Closing WebSocket permanently');
                console.log('WebSocket error:', error.message);
            };

            newClient.onclose = (event) => {
                console.log('WebSocket connection closed:', event.code, event.reason);
                setClient(null);
            };
        }
    };

    if (client && CloseWeb) {
        console.log('WebSocket closed due to discard');
        client.close(1000, 'Closing WebSocket permanently');
    }
 const EnterAmount=(price)=>{
     if (Amount.length < 8 && price != -1) {
         let p = Amount;
         if(price!='.')
         {
            SetAmount(p + price);
         }
         else{
             if (Amount.length>0 && Amount.includes('.'))
             {
                 SetAmount(p);
             }
             else if(Amount.length>0){
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
    return (
        <>
            <SafeAreaView style={{ flex: 1, ...!QR ? ({ backgroundColor: Color.primary_green }) : ({ backgroundColor: Color.white }) }}>
                <View style={{ flex: 1,...!QR?({backgroundColor:Color.primary_green}):({backgroundColor:Color.white})}}>
                    <View style={{ flexWrap: 'nowrap', backgroundColor: Color.primary_green, ...QR&&({borderBottomEndRadius:10, borderBottomStartRadius:10})}}>
                        <View style={{ flexDirection: 'column', flexWrap: 'nowrap' }}>
                            <ImageBackground source={require('../images/Back_mask.png')} resizeMethod={'resize'} resizeMode={'cover'}>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginStart: 16, width: width }}>
                                    <TouchableOpacity activeOpacity={1} style={{ width: '40%' }} onPress={() => HandleShow()}>
                                        {
                                            !show ? (<Image source={require('../images/Menu_Icon.png')} style={{ padding: 10 }} />) : (<Image source={require('../images/WhiteColor_CrossMark.png')} style={{ padding: 10, marginStart: 6 }} />)
                                        }
                                    </TouchableOpacity>
                                    {!show ? (
                                        <View style={{ width: '60%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <View style={{ borderRadius: 150, borderColor: Color.light_gray, borderWidth: 2, width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
                                                {
                                                    Profile != null && Profile != '' ? <Image source={{ uri: Profile }} style={{ height: 44, width: 44 }} /> : <Image source={require('../images/DBA_Icon.png')} />
                                                }
                                            </View>
                                        </View>) : (<View style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ borderRadius: 150, borderColor: Color.light_gray, borderWidth: 0, width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
                                            </View>
                                        </View>
                                    )}
                                </View>
                                {!show ? (
                                    <View style={{ marginTop: 8, marginBottom: 24 }}>
                                        <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 16, color: Color.white }}>{DbaName}</Text>
                                    </View>
                                ) : (
                                    <View style={{ marginTop: 8, marginBottom: 24 }}>
                                        <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 16, color: Color.white }}></Text>
                                    </View>
                                )
                                }
                            </ImageBackground>
                            {show &&
                                <View style={{ position: 'relative', height: height, marginTop: -30 }}>
                                    <View style={{ flexDirection: 'column', width: width, height: height }}>
                                        <View style={[{ borderTopWidth: 1.5, borderTopColor: Color.light_gray }, styles.BothV]}>
                                            <Text style={[styles.header, { marginTop: 16 }]}>Current Employee</Text>
                                            <Text style={styles.txt}>{EmpName}</Text>
                                        </View>
                                        <View style={styles.BothV}>
                                            <Text style={styles.header}>Terminal Name</Text>
                                            <Text style={styles.txt}>{TerName}</Text>
                                        </View>
                                        <View style={{ marginTop: 50}}>
                                            <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={() => navigation.navigate('ExitSale')}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={styles.LOtxt}>Exit Sale Mode</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                        {!QR &&
                     (!show && AmoRe) &&
                    <ScrollView>
                    <View style={{ marginTop: 24, backgroundColor: Color.primary_green,alignItems:'center',justifyContent:'center',flexDirection:'row' }}>
                        <TextInput
                            {
                                ...(Amount=="" ? ({placeholder : '0.00'}) : ({placeholder : ''}))
                            }
                            placeholderTextColor={Color.light_gray}
                            {
                                ...(Amount.length<=5?({fontSize:100}):((Amount.length<=9)?({fontSize:70}):({fontSize:40})))
                            }
                            value={Amount}
                         style={(Amount.length > 0 ?
                             ({ textAlign: 'center' }) : ({ textAlign: 'right' })
                                    )}
                            color={Color.white}
                            editable={true}
                            ref={AmountRef}
                            autoFocus={true}
                            selectTextOnFocus={false}
                            cursorColor={Color.white}
                            onChangeText={(text) => {
                                SetAmount(text)
                            }}
                            showSoftInputOnFocus={false}
                        />
                                {Amount.length>0 ?(
                                    Amount.length <= 8 ? (<TouchableOpacity style={[styles.CroMB, {
                                        marginBottom: 90, width: 22,height: 22} ]} activeOpacity={1} onPress={()=>{
                                            SetAmount(''), AmountRef.current.focus();
}
                                    }>
                                        <Image source={require('../images/WhiteColor_CrossMark.png')} style={{ height: 15, width: 15 }} />
                                    </TouchableOpacity>) : (<TouchableOpacity style={[styles.CroMB, {
                                        marginBottom: 50, width: 18,
                                                height: 18,
                                            }]} activeOpacity={1} onPress={() => { SetAmount(''), AmountRef.current.focus(); }
                                    }>
                                        <Image source={require('../images/WhiteColor_CrossMark.png')} style={{ height: 10, width: 10 }} />
                                    </TouchableOpacity>)
                                ):(null)
}
                    </View>
                    </ScrollView>
}
                </View>
                { QR&& 
                    <View style={{ marginTop: 20, marginHorizontal: 16,flex:1 ,flexDirection:'column'}}>
                        {
                                (QV == 'QRcode') ? (<View style={{flex:1,borderColor: Color.dashboard_border_color, borderRadius: 20, borderWidth: 2, flexWrap: 'nowrap', backgroundColor: Color.white,height:height*0.9}}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 18, color: Color.primary_black, marginTop: 24 }}>Sale Amount</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 32, color: Color.primary_black, marginTop: 4, marginBottom: 16 }}>{Common.convertBigDecimalUSDC(Amount)}</Text>
                                        <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 18, color: Color.primary_black, marginBottom: 4 }}> CYN</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'column'}}>
                                            <ImageBackground source={require('../images/QR_Code_Outline.png')} style={{ height: width*0.8, width: width*0.8,alignItems:'center',justifyContent:'center' }} >
                                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    {
                                                        dataUri != null && dataUri != '' ? <Image source={{ uri: dataUri }} style={{ height: width*0.7, width: width*0.7 }} /> : <Image source={require('../images/DBA_Icon.png')} style={{ height: 200, width: 200 }} />
                                                    }
                                            
                                                </View>
                                        </ImageBackground>
                                        </View>
                                </View>) : ((QV == 'loader') ? (<View style={{flex:1, borderColor: Color.dashboard_border_color, borderRadius: 20, borderWidth: 2, flexWrap: 'nowrap', backgroundColor: Color.white,height:height*0.9 }}>
                                    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                        <LottieView 
                                                source={require('../ImagesAnim/green-loading-circle.json')}
                                                autoPlay
                                                style={{height:90,width:90}}
                                                hardwareAccelerationAndroid={true}
                                        />
                                            <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 18, color: Color.primary_black, marginTop: 12 }}>Waiting on Customer…</Text>
                                    </View>
                                    </View>) : (<View style={{ flex:1,borderColor: Color.dashboard_border_color, borderRadius: 20, borderWidth: 2, backgroundColor: Color.white,height:height*0.9 }}>
                                        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                            <LottieView
                                                source={require('../ImagesAnim/green-loading-circle.json')}
                                                autoPlay
                                                style={{ height: 90, width: 90 }}
                                                hardwareAccelerationAndroid={true}
                                            />
                                            </View>
                                    </View>))
                        }
                        
                        { !ShowDis&&
                        <View>
                            {Enable ? (<TouchableOpacity style={[styles.disBtn, { backgroundColor: Color.primary_green,borderColor:Color.primary_green,marginVertical:20}]}
                                activeOpacity={1}
                                onPress={() => SetShowDis(true)}>
                                <Text style={styles.LT}>Discard Sale</Text>
                            </TouchableOpacity>) : (<View style={[styles.disBtn,{backgroundColor:Color.bg_inactive,borderColor:Color.bg_inactive,marginVertical:20}]}>
                                    <Text style={styles.LT}>Discard Sale</Text>
                            </View>)
                            }
                        </View>
}
                    </View>
}
                </View>
                { !QR&&
                    !show&&
                <View style={{ backgroundColor: Color.boxbackgroundgray,borderTopRightRadius:10,borderTopLeftRadius:10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 6 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(1)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(2)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(3)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>3</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 6 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(4)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(5)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(6)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>6</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 6 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(7)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(8)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(9)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>9</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 6 }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(0)}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount('.')}>
                            <Text style={[styles.keyTxt, { width: width * 0.3 }]}>.</Text>
                        </TouchableOpacity>
                        <View style={[styles.Del]}>
                            <TouchableOpacity activeOpacity={1} onPress={() => EnterAmount(-1)}>
                                <Image source={require('../images/Delete.png')} style={{ marginHorizontal: 40, marginVertical: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        (Amount>0 ?
                            (<TouchableOpacity style={[styles.btn, { backgroundColor: Color.primary_green ,marginTop:10}]}
                                activeOpacity={1}
                                onPress={() => 
                                 Common.convertBigDecimalUSDC(Amount)!=0?(
                                    handleGenerate()) : (SetAmount(Common.convertBigDecimalUSDC(Amount)))}>
                                <Text style={styles.LT}>GenerateQRCode</Text>
                            </TouchableOpacity>) : (
                            <View style={[styles.btn,{backgroundColor:Color.bg_inactive,marginTop:10}]}>
                                <Text style={styles.LT}>GenerateQRCode</Text>
                            </View>))
}
                </View>
}
            </SafeAreaView>
            <Modal visible={ShowDis}>
                <SafeAreaView style={{ flex: 1,width:width,height:height,position:'absolute',flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection: 'column', alignItems:'center',justifyContent:'flex-end'}}> 
                    <View style={{width:width}}>
                            <TouchableOpacity style={{ backgroundColor: Color.white, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Color.white, marginVertical: 10, marginHorizontal: 16 }} activeOpacity={1} onPress={() => handleDiscard()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', color: Color.error_red,padding: 10 }}>Discard sale</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width}}>
                            <TouchableOpacity style={{ backgroundColor: Color.white, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Color.white, marginTop:10, marginHorizontal: 16 ,marginBottom:30}} activeOpacity={1} onPress={() =>SetShowDis(false)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize:24,fontFamily:'opensans_bold',color:Color.primary_green,padding:10}}>Continue</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>
                </SafeAreaView>
            </Modal>
            <Modal visible={ShowLoader}>
                <Loader />
            </Modal> 
        </>
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
        marginBottom:10
    },
    disBtn:{
        marginHorizontal: 24,
        backgroundColor: Color.Exit_button_color,
        borderColor: Color.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
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
        padding:14,
        fontFamily: 'opensans_bold',
        textAlign: 'center'
    },
    keyTxt: {
        padding: 16,
        backgroundColor: Color.white,
        borderRadius: 6,
        fontSize: 24,
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
    CroMB:{
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
export default GenerateQRCode;