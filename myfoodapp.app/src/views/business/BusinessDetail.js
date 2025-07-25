import React, {useEffect, useState}                   from "react";
import {FlatList, Image, View, ImageBackground} from "react-native";

import {Button, Headline, useTheme} from "react-native-paper";
import {useDispatch, useSelector}   from "react-redux";
import {branchGetItems}             from "../../api/branch";
import Header                       from "../../components/Header";
import useApi                       from "../../hooks/useApi";
import {setFoodPicked}              from "../../store/businessReducer";
import AlertBlock                   from "./AlertBlock";
import FoodItem                     from "./FoodItem";
import Information                  from "./Information";
import LoadingMessage               from "./LoadingMessage";

import ReservationBlock                                                       from "./ReservationBlock";
import VirtualAssistanceBlock                                                 from "./VirtualAssistanceBlock";
import {TYPE_DELIVERY, TYPE_PICKUP, TYPE_RESERVATION, TYPE_VIRTUAL_ASSISTANT} from "../../utils/constants";
import CartButton                                                             from "../../components/CartButton";

const styles = {
    banner           : {
        aspectRatio: 3,
    }, imageThumbnail: {
        justifyContent: 'center', alignItems: 'center', aspectRatio: 1, borderRadius: 4, flex: 1,
    },
};
export default ({navigation}) => {
    const getOptions                        = (type) => {
        if (type === TYPE_RESERVATION.code) return 3;
        if (type === TYPE_VIRTUAL_ASSISTANT.code) return 4;
        return 1;
    };
    const {colors}                          = useTheme();
    const dispatch                          = useDispatch();
    const {businessPicked, eventType: type} = useSelector(store => store.business);
    const {assistance}               = useSelector(store => store.cart)
    const [display, setDisplay]             = useState(getOptions(type));
    const itemsApi                          = useApi(branchGetItems);

    const getItems = async () => {
        await itemsApi.request(businessPicked.id);
    };

    useEffect(() => {
        getItems();
    }, []);

    const handleItemClick = async (food) => {
        await dispatch(setFoodPicked(food));
        navigation.navigate('FoodDetail');
    };

    const menu = (
        <View style={{flex: 1}}>
            {itemsApi.loading && <LoadingMessage message={'Cargando menu . . .'}/>}
            {itemsApi.data && itemsApi.data.length > 0 && <View style={{paddingHorizontal: 16, flex: 1}}>
                <Headline>Menu</Headline>
                <View style={{backgroundColor: 'orange', height: 3, marginBottom: 8, borderRadius: 4}}/>
                <FlatList
                    style={{}}
                    data={itemsApi.data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={food => <FoodItem name={food.item.name}
                                                  description={food.item.description}
                                                  price={food.item.currentPrice}
                                                  image={food.item.image}
                                                  onPress={() => handleItemClick(food.item)}/>
                    }
                />
                <CartButton/>
            </View>}
        </View>
    );


    const getAlert = (type) => {
        switch (type) {
            case TYPE_DELIVERY.code:
                return (
                    <AlertBlock title={'DELIVERY'} color={colors.accent} icon={'shopping-bag'}/>
                );
            case TYPE_PICKUP.code:
                return (
                    <AlertBlock title={'PICKUP'} color={colors.accent} icon={'bicycle'}/>
                );
            case TYPE_RESERVATION.code:
                return (
                    <AlertBlock title={'RESERVATION'} color={colors.accent} icon={'calendar'}/>
                );
            case TYPE_VIRTUAL_ASSISTANT.code:
                return (
                    <AlertBlock title={'VIRTUAL ASSISTANCE'} color={colors.accent} icon={'silverware-fork-knife'}/>
                );
        }
    };

    const getData = () => {
        switch (display) {
            case 1 :
                return menu;
            case 2 :
                return <Information business={businessPicked}/>;
            case 3:
                return <ReservationBlock/>;
            case 4:
                if (assistance.enabled)
                    return menu;
                else
                    return <VirtualAssistanceBlock/>;
        }
    };
    return (
        <View style={{flex: 1}}>
            <Header title={businessPicked.name} onBackClick={() => navigation.goBack()}/>
            <ImageBackground source={require('../../../assets/business-bg-default.png')} style={{width: '100%'}}>
                <Image source={{uri: businessPicked.bannerUrl}} resizeMode="cover" style={styles.banner}/>
            </ImageBackground>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 8, backgroundColor: 'white'}}>
                {
                    type === TYPE_RESERVATION.code
                    ? <Button
                        icon='calendar'
                        style={{flex: 1}}
                        onPress={() => setDisplay(3)}>Reserva</Button>
                    : type === TYPE_VIRTUAL_ASSISTANT.code
                      ? <Button
                          icon='silverware-fork-knife'
                          style={{flex: 1}}
                          onPress={() => setDisplay(4)}>Asistente Virtual</Button>
                      : <Button
                          icon='food'
                          style={{flex: 1}}
                          onPress={() => setDisplay(1)}>Menu</Button>
                }
                <Button icon='map-marker' style={{flex: 1}} onPress={() => setDisplay(2)}>Información</Button>
            </View>
            {getAlert(type)}
            {getData()}
            <CartButton/>
        </View>
    );
}
