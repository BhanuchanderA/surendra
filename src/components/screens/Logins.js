import React ,{useEffect,useState}from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image,StyleSheet, Dimensions,BackHandler, Alert, Keyboard} from 'react-native';
import { Modal, TextInput} from 'react-native-paper';
import Color from '../fonts/colors/Color';
import { useSelector, useDispatch } from 'react-redux';
import { LoginApi,callAPI } from '../Redux/Config';
import { Login } from '../Redux/ActionType';
import Loader from './Loader';
import PopUp from './PopUp';






const Logins = ({ navigation}) => {
    const{height,width}=Dimensions.get("window")
    const [Terminal, SetTerminal] = useState('');
    const [TError, SetTError] = useState(null);
    const[IsTerminal,SetIsTerminal]=useState(false);
    const [Password, SetPassword] = useState('');
    const [PError, SetPError] = useState('');
    const[Open,SetOpen]=useState(false)
    const [IsPassword, SetIsPassword] = useState(false);
    const[Error,SetError]=useState('');
    let PasswordRef = React.createRef();
    const dispatch = useDispatch();
    const [ShowLoader, SetShowLoader] = useState(false);
    const [showPop,SetShowPop]=useState(false);
    const [Message,setMessage]=useState('');


    const handleLogin = async () => {
        console.log('Login ApiHint');
        const requestData = {
            password: Password,
            terminalId: Terminal,
        };
        try {
            const res = await callAPI(LoginApi, requestData);
            console.log('LoginResponse', res);
            if (res.status=='SUCCESS' && res.data.status=='Active') {
                dispatch({
                    type: Login,
                    payload: { data: res}
                }
                );
                SetShowLoader(false);
                SetPassword('');
                SetTerminal('');
                navigation.navigate('Dashboard');
            }
            else if (res.status == 'SUCCESS' && res.data.status == 'Terminate')
            {
                SetShowLoader(false);   
                navigation.navigate('Terminate');
            }
            else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription!='')
            {
                SetShowLoader(false);
                SetShowPop(true);
                setMessage(res.response.data.error.errorDescription);
            }
            else if (res.response.message ==='Network Error')
            {
                SetShowLoader(false);
                SetShowPop(true);
                setMessage('Network Error');
            }
        }
        catch (error) {
            console.log('Error Response',error.message);
            SetShowLoader(false);
            SetShowPop(true);
            setMessage(error.message);
        }
    }

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Onboarding');
            return true; 
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove(); 
    }, []);
    handleTerminal = (Terminal) => {
        if (Terminal.length == 0) {
            SetTError('Field Required')
            SetIsTerminal(false)
        }
        else if (Terminal.length <8) {
            SetTError("Please enter valid terminal");
            SetIsTerminal(false)
        }
        else if (Terminal.length >= 8)
            SetIsTerminal(true)
    }
    OnHandleTerminal = (Terminal) => {

        if (Terminal.length >= 8)
            SetIsTerminal(true)
        else
            SetIsTerminal(false)
    }
    handlePassword = (Password) => {
        const rej = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (Password.length == 0) {
            SetPError("Field Required");
            SetIsPassword(false)
        }
        else if (!rej.test(Password)) {
            SetPError("Must be 8 - 12 characters, 1 uppercase, 1 number, 1 lower case, 1 special character.");
            SetIsPassword(false)
        }
        else if (rej.test(Password)) {
            SetPError(null);
            SetIsPassword(true)
        }
    }
    OnHandlePassword = (Password) => {
        const rej = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (Password.length == 0) {
            SetPError(null)
            SetIsPassword(false)
        }
        else if (!rej.test(Password)) {
            SetPError(null)
            SetIsPassword(false)
        }
        else if (rej.test(Password)) {
            SetPError(null)
            SetIsPassword(true)
        }
    }

    const onTerminalChange = (Terminal) => {
        const reg = /^[0-9]+$/;
        if (Terminal === '' || reg.test(Terminal)) {
            SetTerminal(Terminal);
        }
    }
    const onPasswordChange = (Password) => {
        const reg = /^[a-zA-Z0-9@#$&*!%?]+$/;
        if (Password === '' || reg.test(Password)) {
            SetPassword(Password);
        }
    }
    const HandleLoader=()=>{
              SetShowLoader(false);
    }
    const HandlePopup = () => {
        SetShowPop(false);
    }

   return (
        <SafeAreaView style={{flex:1,backgroundColor:Color.white}}>
        <View style={{ flex: 1}}>
                <TouchableOpacity style={{ height: 24, width: width, margin: 25 }} activeOpacity={1} onPress={() => navigation.navigate('Onboarding')}>
            <Image source={require('../images/cross.png')} style={{padding:10}}/>
                </TouchableOpacity>
            <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'column',width:width}}>
                <View style={{width:width}}>
                        <Image source={require('../images/Login_logo.png')} style={{ marginHorizontal: 24, alignSelf: 'center',marginBottom:20 }} />
                    <View style={{marginHorizontal:24}}>
                <TextInput
                    label={'Terminal'}
                    placeholder='Terminal ID'
                    placeholderTextColor={Color.light_gray}
                    mode='outlined'
                    outlineColor={
                        (TError) ? 'red' : 'grey'
                    }
                    activeOutlineColor={Color.primary_green}
                    autoCorrect={false}
                    keyboardType='numeric'
                    importantForAutofill='no'
                    theme={{
                        roundness: 15
                    }}
                    returnKeyType='next'
                    autoComplete='sms-otp'
                    autoFocus={true}
                    style={{ backgroundColor: 'white'}}
                    selectionColor={Color.primary_green}
                    value={Terminal}
                    onFocus={() =>
                        SetTError()
                    }
                    onChangeText={onTerminalChange}
                    onBlur={(e) =>
                        handleTerminal(Terminal)
                    }
                    blurOnSubmit={false}
                    onTextInput={(e) => OnHandleTerminal(Terminal)}
                    onSubmitEditing={el => PasswordRef.current.focus()}
                    maxLength={12}
                                left={<TextInput.Affix
                                             text='TID- |'
                                    />
                                }
                />
                {
                    (TError) ?
                        (<View style={{ flexDirection: 'row', padding: 3 }}>
                            <Image source={require('../images/Error_icon.png')} style={{ margin: 3 }} />
                            <Text style={{ color: 'red', margin: 3, marginStart: 10 }}>{TError}</Text>
                        </View>) : (<View style={{ marginTop: 15 }}></View>)
    }
                        </View>
                        <View style={{marginHorizontal:24}}>
                    <TextInput
                        label={'Password'}
                        mode='outlined'
                        placeholder='********'
                        placeholderTextColor={Color.light_gray}
                        ref={PasswordRef}
                        outlineColor={
                            (PError) ? 'red' : 'grey'
                        }
                        activeOutlineColor={Color.primary_green}
                        autoCorrect={false}
                        secureTextEntry={Open}
                        style={{ backgroundColor: 'white' }}
                        blurOnSubmit={false}
                        theme={{
                            roundness: 15
                        }}
                        autoComplete='sms-otp'
                        importantForAutofill='no'
                        value={Password}
                        fontSize={20}
                        returnKeyType='done'
                        onChangeText={onPasswordChange}
                    onSubmitEditing={el => Keyboard.dismiss()}
                        contextMenuHidden={true}
                        selection={{ start: Password.length, end: Password.length }}
                        selectTextOnFocus={false}
                        selectionColor={Color.primary_green}
                        onTextInput={(e) => {
                            OnHandlePassword(Password);
                        }
                        }
                        onFocus={(e) =>
                            OnHandlePassword(Password)
                        }
                        onBlur={(e) =>
                            handlePassword(Password)
                        }
                        maxLength={12}
                        right={<TextInput.Icon
                        forceTextInputFocus={false}
                            icon={Open ? (require('../images/Closed.eye.png')) : (require('../images/Open_Eye.png'))} onPress={() =>
                                SetOpen(!Open)
                            }
                        />
                        }
                    />
                    {
                        (PError) ?
                            (<View style={{ flexDirection: 'row', padding: 3 }}>
                                <Image source={require('../images/Error_icon.png')} style={{ margin: 3 }} />
                                <Text style={{ color: 'red', margin: 3, marginStart: 10 }}>{PError}</Text>
                            </View>) : (<View style={{ marginTop: 15 }}></View>)
                    }
                        </View>
                        {
                            (IsTerminal&&IsPassword?
                    (<TouchableOpacity style={[styles.btn,{backgroundColor:Color.primary_green}]} 
                    activeOpacity={1}
                    onPress={() =>
                        {
                      handleLogin(),
                      SetShowLoader(true),
                      Keyboard.dismiss();
                        }
                  }>
                        <Text style={styles.LT}>Log in</Text>
                                </TouchableOpacity>) : (<View style={styles.btn}>
                                    <Text style={styles.LT}>Log in</Text>
                                </View>))
}
                    </View>
                    </View> 
                </View>
           <Modal visible={ShowLoader} onDismiss={HandleLoader} style={{backgroundColor:'transparent'}}>
               <Loader />
                    </Modal> 

            <Modal visible={showPop} style={{justifyContent:'flex-end'}} onDismiss={HandlePopup}>
                   <View style={{flexDirection: 'column',width:width,flexWrap:'nowrap' }}> 
               <View style={{backgroundColor: Color.white,borderTopRightRadius:20,borderTopLeftRadius:20, borderWidth: 1,borderColor:Color.white,alignItems:'center'}}>
                   <View style={{ borderColor: Color.primary_green, width: '20%', borderRadius: 250, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}></View>
                       <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', alignItems: 'center', marginVertical: 10, color: Color.primary_black }}>Terminal ID or Password</Text>
                   <Text style={{ fontSize: 16, fontFamily: 'opensans_regular', alignItems: 'center',marginHorizontal:16,marginVertical:16,color:Color.primary_black }}>{Message}</Text>
                   <View style={{width:width}}>
                   <TouchableOpacity style={[styles.btn,{marginBottom:20,backgroundColor:Color.primary_green}]} activeOpacity={1} onPress={() => SetShowPop(false)}>
                       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                           <Text style={{ fontFamily: 'opensans_bold', fontSize: 24,color:Color.white }}>okay</Text>
                       </View>
                   </TouchableOpacity>
                       </View>
               </View>
               </View>
                </Modal>         
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 25,
        backgroundColor: Color.inactive_color,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24
    },
    LT: {
        color: Color.white,
        fontSize: 24,
        fontFamily: 'opensans_bold',
        textAlign: 'center'
    },
    mainC: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}
)
export default Logins;