import {MaterialCommunityIcons}       from '@expo/vector-icons';
import React                          from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {IconButton, useTheme}         from "react-native-paper";
import {useSelector}                  from "react-redux";
import {useNavigation}                from '@react-navigation/native';

export default () => {

    const {colors} = useTheme();
    const styles              = StyleSheet.create({
                                                      container         : {
                                                          position: 'absolute', top: 0, bottom: 0,
                                                      }, toggleContainer: {
            left                : (
                                      Dimensions.get('window').width - 60
                                  ) / 2,
            bottom              : 0,
            position            : 'absolute',
            backgroundColor     : colors.primary,
            justifyContent      : 'center',
            alignItems          : 'center',
            width               : 60,
            height              : 60,
            borderTopLeftRadius : 30,
            borderTopRightRadius: 30,
        }, cart                                                         : {
            position            : 'absolute',
            bottom              : 0,
            width               : Dimensions.get('window').width - 32,
            borderTopLeftRadius : 10,
            borderTopRightRadius: 10,
            padding             : 16,
            left                : 16,
            right               : 16,
            height              : 300,
            backgroundColor     : 'white',
            elevation           : 8,
        }
                                                  });
    const navigation          = useNavigation();
    const {items: cartItems}  = useSelector(store => store.cart);
    if (cartItems.length === 0) {return null;}
    return (
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
                <IconButton
                    icon={() => <MaterialCommunityIcons name="cart-outline" size={24} color="white"/>}
                    onPress={() => navigation.navigate('CartList')}
                    style={{marginHorizontal: 8}}
                />
            </View>
        </View>
    );
}
