import * as WebBrowser                     from 'expo-web-browser';
import React                               from "react";
import {Linking, ScrollView, View}         from "react-native";
import MapView, {Marker}                   from "react-native-maps";
import {Button, Headline, Paragraph, Text} from "react-native-paper";
import Tag                                 from "../../components/Tag";


export default ({business}) => {
    const hasCoordinates = business.coordinates.length > 0 && business.coordinates.split(',').length === 2;
    const coordinates    = hasCoordinates
                           ? {
            latitude      : business.coordinates.split(',')[0],
            longitude     : business.coordinates.split(',')[1],
            latitudeDelta : 0.0922,
            longitudeDelta: 0.0421,
        }
                           : {};


    const makeCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const openWhatsapp = async (phone) => {
        await WebBrowser.openBrowserAsync(`https://wa.me/${phone}`);
    };

    const openMail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };


    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, paddingHorizontal: 16}}>
                <Headline style={{marginTop: 16}}>Información</Headline>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia massa eu scelerisque
                    aliquam.
                    Ut ut sapien id dui luctus placerat. Duis a enim ac velit vehicula pharetra id id nibh. Duis in
                    molestie
                    tellus, et tristique massa.</Paragraph>
                <View style={{flexDirection: 'row', padding: 8}}>
                    <Tag text='Aire acondicionado' backgroundColor='orange'/>
                    <Tag text='Parqueo' backgroundColor='orange'/>
                    <Tag text='Wifi' backgroundColor='orange'/>
                </View>
                <Headline>Horarios (no hay horarios)</Headline>
                <Paragraph>Lun-Vie 9:30am-10:00pm</Paragraph>
                <Paragraph>Sab-Dom 9:00am-11:30pm</Paragraph>
                {
                    business.address &&
                    <>
                        <Headline>Dirección</Headline>
                        <Paragraph>{business.address}</Paragraph>
                    </>
                }
                {
                    hasCoordinates &&
                    <MapView style={{height: 200}} initialRegion={coordinates}>
                        <Marker coordinate={coordinates}>
                            <View style={{padding: 4, borderRadius: 4, backgroundColor: 'white'}}>
                                <Text>{business.address}</Text>
                            </View>
                        </Marker>
                    </MapView>
                }
            </ScrollView>

            <View style={{padding: 16}}>
                {
                    business.phone &&
                    <Button icon='phone'
                            mode='contained'
                            style={{marginVertical: 4}}
                            labelStyle={{color: 'white'}}
                            onPress={() => {
                                makeCall(business.phone);
                            }}
                    >
                        Llamar
                    </Button>
                }
                {
                    business.whatsapp &&
                    <Button icon='whatsapp'
                            mode='outlined'
                            style={{marginVertical: 4}}
                            onPress={() => {
                                openWhatsapp(business.whatsapp);
                            }}
                    >
                        Contactar por whatsapp
                    </Button>
                }
                {
                    business.email &&
                    <Button icon='email'
                            mode='outlined'
                            style={{marginVertical: 4}}
                            onPress={() => {
                                openMail(business.email);
                            }}
                    >
                        Escribir por email
                    </Button>
                }
            </View>
        </View>
    );
};
