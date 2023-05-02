import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import Pin from './Pin';
import GenerateQRCode from './GenerateQRCode';
import TransactionList from './TransactionList';
import SaleDetails from './SaleDetails';
import Logins from './Logins';
import ExitSale from './ExitSale';
import Terminate from './Terminate';
import Details from './Details';
import Loader from './Loader';
import Refund from './Refund';
import KeyPad from './Keypad';
import QRStatus from './QRStatus';
import Sliderto from './Sliderto';
import ImageTest from './ImageTest';
import Fit from './Fit';


const Stack = createNativeStackNavigator();

 const NavScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false, statusBarHidden: true, animation: 'slide_from_bottom' }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Fit" component={Fit} />
        <Stack.Screen name="ImageTest" component={ImageTest} />
        <Stack.Screen name="Dashboard" component={Dashboard}  />
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="Logins" component={Logins} />
        <Stack.Screen name="Pin" component={Pin} />
        <Stack.Screen name="GenerateQRCode" component={GenerateQRCode}  />
        <Stack.Screen name="TransactionList" component={TransactionList} options={{animation:'slide_from_right',headerShown:false,statusBarHidden:true}}/>
        <Stack.Screen name="SaleDetails" component={SaleDetails} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ExitSale" component={ExitSale} />
        <Stack.Screen name="Terminate" component={Terminate} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Refund" component={Refund} />
        <Stack.Screen name="Keypad" component={KeyPad} />
        <Stack.Screen name="QRStatus" component={QRStatus} />
        <Stack.Screen name="Sliderto" component={Sliderto} />
  
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavScreens;