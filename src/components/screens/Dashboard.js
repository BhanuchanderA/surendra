import React,{useEffect,useState} from 'react';
import { View,Text, TouchableOpacity,Image,SafeAreaView, ImageBackground, Dimensions, ScrollView,StyleSheet,Modal,Button,BackHandler,LayoutAnimation} from 'react-native';
import Color from '../fonts/colors/Color';
import { useSelector} from 'react-redux';
import { LogoutApi,ProfileUrl,callAuthAPI} from '../Redux/Config';
import Common from './Common';



const Dashboard = ({navigation}) => {
  const[show,SetShow]=useState(false);
  const{height,width}=Dimensions.get('window');
  const LoginData = useSelector(state => state);
  const [DbaName, SetDbaName] = useState('DBA Name');
  const [TerName, SetTerName] = useState('TerminalName');
  const [TerID, SetTerID] = useState('Terminal-ID');
  const [BusName, SetBusName] = useState('Business Name Here')
  const ActualData=LoginData.First.userLoginData.data;
  const[Profile,setProfile]=useState('');
  const Token=ActualData.jwtToken;
 
  const HandleShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    SetShow(!show);
  };
  
  const handle=()=>{
    SetDbaName(ActualData.dbaName);
       SetTerID(ActualData.terminalId);
       SetTerName(ActualData.terminalName);
    SetBusName(ActualData.companyName);
   
  }
  
  useEffect(()=>{
    handle();
    handleProfile();
  },[ActualData])

  useEffect(() => {
    const backAction = () => {
      if(!show)
      {
      BackHandler.exitApp();
      return true;
      }
      else{
        SetShow(false);
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleLogout= async ()=>{
    console.log('Logout Api Hint');
    RequestData = {
    };
    try {
      const res = await callAuthAPI(LogoutApi,RequestData,Token);
      console.log('LogoutResponse', res);
      if (res.status == 'SUCCESS') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      }
      else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
        Alert.alert('Mpos', res.response.data.error.errorDescription);
        console.log(res.response.data.error.errorDescription);
      }
    }
    catch (error) {
      console.log('Error Response', error);
    }
  }
     
  const handleProfile = async () => {
    console.log('Profile Api Hint');
    RequestData = {
      key: ActualData.image
    };
    try {
      const res = await callAuthAPI(ProfileUrl, RequestData, Token);
      console.log('ProfileResponse', res);
      if (res.status == 'SUCCESS') {
          console.log('Success')
          
      }
      else if (res.response.data.error.errorDescription != null || res.response.data.error.errorDescription != '') {
        Alert.alert('Mpos', res.response.data.error.errorDescription);
        console.log(res.response.data.error.errorDescription);
      }
    }
    catch (error) {
      console.log('Error Response', error);
    }
  }
  return (
    <>
    <SafeAreaView style={{flex:1}}>
    <View style={{ flex: 1 }}>
        <View style={{ flexWrap:'nowrap' ,backgroundColor: Color.primary_green, borderBottomEndRadius: 10, borderBottomLeftRadius: 10 }}>
          <View style={{flexDirection:'column',flexWrap:'nowrap'}}>
        <ImageBackground source={require('../images/Back_mask.png')} resizeMethod={'resize'} resizeMode={'cover'}>
          <View style={{width:width}}>
       <View style={{flexDirection:'row',marginTop:30,alignItems:'center',justifyContent:'space-between',marginHorizontal:16}}>
        <TouchableOpacity activeOpacity={1} onPress={()=> HandleShow()}> 
        {
                      !show ? (<Image source={require('../images/Menu_Icon.png')}  style={{padding:10}}/>) : (<Image source={require('../images/WhiteColor_CrossMark.png')} style={{padding:10,marginStart:6}} />)
        }
                </TouchableOpacity>
                {!show?(
              <View style={{justifyContent:'center',alignItems:'flex-start'}}>
                <View style={{ borderRadius: 150, borderColor: Color.light_gray, borderWidth: 2, width: 46, height: 46, alignItems: 'center', justifyContent: 'center',marginStart:-width*0.09 }}>
                  { 
                            (Profile!=null&&Profile!='') ? <Image source={Profile}  resizeMode='contain' style={{ height: 50, width: 50 }} /> : <Image source={require('../images/DBA_Icon.png')} />
                  }
                </View>
                      </View>):( <View style={{justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderRadius: 150, borderColor: Color.light_gray, borderWidth: 0, width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
                    </View>
                    </View>
                    ) }
                    <View>
                      </View>

                </View>
                </View>
       {!show?(
       <View style={{marginTop:8,marginBottom:24,marginHorizontal:16,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontFamily: 'opensans_bold', fontSize: 16, color: Color.white }}>{DbaName}</Text>
              </View>
       ):(
                <View style={{ marginTop: 8, marginBottom: 24 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 16, color: Color.white }}></Text>
                </View>
       )
            }
          </ImageBackground>
          {show&&
              <View style={{ position: 'relative', height: height, marginTop: -30 }}>
                  <View style={{ flexDirection: 'column', width: width, height: height }}>
                    <View style={styles.BothV}>
                      <Text style={styles.header}>Terminal Name</Text>
                      <Text style={styles.txt}>{TerName}</Text>
                    </View>
                    <View style={styles.BothV}>
                      <Text style={styles.header}>Terminal ID</Text>
                      <Text style={styles.txt}>{TerID}</Text>
                    </View>
                    <View style={styles.BothV}>
                      <Text style={styles.header}>Location</Text>
                      <Text style={styles.txt}>{DbaName}</Text>
                    </View>
                    <View style={styles.BothV}>
                      <Text style={styles.header}>Business</Text>
                      <Text style={styles.txt}>{BusName}</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: -height * 0.3 }}>
                    <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={() => handleLogout()}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../images/LogOut_icon.png')} />
                        <Text style={styles.LOtxt}>Log Out</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
            </View>
 }
          </View>
      </View>
      { !show&&
            <View style={{ marginTop: 20, marginHorizontal: 8, flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, borderColor: Color.dashboard_border_color, borderRadius: 20, borderWidth: 2, flexWrap: 'nowrap', backgroundColor: Color.white, height: height * 0.9, flexDirection: 'column' }}>
                <View style={{ flexWrap: 'nowrap' }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.dashboard_text_background, borderTopStartRadius: 20, borderTopEndRadius: 20, borderBottomColor: Color.dashboard_border_color, borderBottomWidth: 2 }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 22, color: Color.primary_black, marginTop: 16 }}>{TerName}</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'opensans_bold', fontSize: 14, color: Color.primary_black, marginTop: 4, marginBottom: 10 }}>{TerID}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <TouchableOpacity style={{ borderColor: Color.primary_green, borderRadius: 20, borderWidth: 1, marginHorizontal: 48, alignItems: 'center', justifyContent: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('Pin', { 'screen': 'Sale-Order' })}>
                    <View style={{ marginHorizontal: width*0.1, marginVertical: height * 0.07 }}>
                      <View style={{ borderBottomColor: 'white', borderRadius: 250, backgroundColor: Color.light_green, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, height: 140, width: 140 }}>
                        <Image source={require('../images/Register_Icon.png')} style={{ resizeMode: 'cover' }} />
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: Color.primary_green, fontSize: 24, fontFamily: 'opensans_bold' }}>Start New Sale</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={{ marginTop: 20, marginHorizontal: 8, backgroundColor: Color.white, borderColor: Color.dashboard_border_color, borderRadius: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'flex-end' }} activeOpacity={1} onPress={() => navigation.navigate('Pin', { 'screen': 'batch' })}>
                <Text style={{ fontSize: 24, fontFamily: 'opensans_bold', padding: 14, color: Color.primary_black }}>View Today’s Batch</Text>
              </TouchableOpacity>
            </View>
 }
      </View>
    </SafeAreaView>
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

  }

})
export default Dashboard;