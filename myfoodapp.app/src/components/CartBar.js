import {Paragraph, TouchableRipple, useTheme} from "react-native-paper";
import React                                  from "react";
import {useSelector}                          from "react-redux";
import {useNavigation}                          from '@react-navigation/native'

export default ({}) => {
    const {colors}                           = useTheme();
    const {items: cartItems} = useSelector(store => store.cart);
    const navigation                         = useNavigation()
    if (cartItems.length === 0) return null;

    return (<TouchableRipple style={{backgroundColor: colors.accent, padding: 8}}
                             onPress={() => navigation.navigate('CartList')}>
        <Paragraph style={{color: 'white', textAlign: 'center'}}>Tienes items carrito</Paragraph>
    </TouchableRipple>)
}