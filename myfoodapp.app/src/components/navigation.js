import {createStackNavigator} from "@react-navigation/stack";
import React                  from "react";
import useAuth                from "../auth/useAuth";
import BusinessDetail         from "../views/business/BusinessDetail";
import FoodDetail             from "../views/business/FoodDetail";
import Login                  from "../views/login/Login";
import LoginWithMail          from "../views/login/LoginWithMail";
import BranchList             from "../views/main/BranchList";
import LocationPicker         from "../views/main/LocationPicker";
import Main                   from "../views/main/Main";
import CartList               from '../views/cart/CartList'
import OrderDetail            from "../views/orders/OrderDetail";
import Orders                 from "../views/orders/Orders";
import Exchange               from "../views/points/Exchange";
import ConfigList             from "../views/preferences/ConfigList";
import Configuration          from "../views/preferences/Configuration";
import Addresses              from "../views/user/Addresses";
import AddressesData          from "../views/user/AddressesData";
import ChangePassword         from "../views/user/ChangePassword";
import UserProfile            from "../views/user/UserProfile";
import RecoverPassword        from "../views/login/RecoverPassword";

const Stack = createStackNavigator();

const Navigation = () => {
    const {authData} = useAuth();

    if (!authData.user) return (<Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="LoginEmail" component={LoginWithMail}/>
        <Stack.Screen name="RecoverPassword" component={RecoverPassword}/>
    </Stack.Navigator>);
    return (<Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        {/*<Stack.Screen name="Slider" component={Slider}/>*/}
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="BranchList" component={BranchList}/>
        <Stack.Screen name="LocationPicker" component={LocationPicker}/>
        <Stack.Screen name="Orders" component={Orders}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail}/>
        <Stack.Screen name="CartList" component={CartList}/>
        <Stack.Screen name="BusinessDetail" component={BusinessDetail} initialParams={{type: 'DELIVERY'}}/>
        <Stack.Screen name="FoodDetail" component={FoodDetail}/>
        <Stack.Screen name="ConfigList" component={ConfigList}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        <Stack.Screen name="Addresses" component={Addresses}/>
        <Stack.Screen name="AddressesData" component={AddressesData}/>
        <Stack.Screen name="Configuration" component={Configuration}/>
        <Stack.Screen name="Exchange" component={Exchange}/>
    </Stack.Navigator>);
};
export default Navigation;
