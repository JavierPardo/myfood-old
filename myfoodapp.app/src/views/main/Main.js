import {FontAwesome5, MaterialCommunityIcons,}                                           from '@expo/vector-icons';
import React, {useState}                                                                 from "react";
import {ScrollView, View}                                                                from "react-native";
import {Button, Card, Headline, Searchbar, Subheading, Title, TouchableRipple, useTheme} from "react-native-paper";
import {useDispatch, useSelector}                                                        from "react-redux";
import useAuth                                                                           from "../../auth/useAuth";
import CartButton
                                                                                         from "../../components/CartButton";
import Slider                                                                            from "../../components/Slider";
import Space                                                                             from "../../components/Space";
import {setBusinessPicked}                                                               from "../../store/businessReducer";
import {stopAssistant}                                                                   from "../../store/cartReducer";
import {TYPE_DELIVERY, TYPE_PICKUP, TYPE_RESERVATION, TYPE_VIRTUAL_ASSISTANT}            from "../../utils/constants";
import UserCard                                                                          from "./UserCard";


const styles = {
    buttonLeft  : {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        marginRight   : 4,
        marginBottom  : 4,
    },
    buttonRight : {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        marginLeft    : 4,
        marginBottom  : 4,
    },
    buttonBottom: {justifyContent: 'center', alignItems: 'center', marginTop: 4,},
    headline    : {fontFamily: 'GilroyExtraBold', color: 'white', fontSize: 20, lineHeight: 20},
    subheading  : {fontFamily: 'MyriadProRegular', color: 'white', textAlign: 'center', lineHeight: 16},
};


export default ({navigation}) => {
    const {colors, roundness}                     = useTheme();
    const {authData}                              = useAuth();
    const [searchQuery, setSearchQuery]           = useState('');
    const [type, setType]                         = useState(TYPE_PICKUP);
    const dispatch                                = useDispatch();
    const {business, type: eventType, assistance} = useSelector(store => store.cart);

    const search = (caseType = 0) => {
        navigation.navigate('BranchList', {
            query: searchQuery,
            type : type.code,
            title: type.title
        });
    };

    const onContinue = async () => {
        await dispatch(setBusinessPicked({
                                             searchQuery: '', business: business, eventType: eventType,
                                         }));
        console.log('business', business)
        console.log('eventType', eventType)

        navigation.navigate('BusinessDetail');
    };

    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <ScrollView>
                <UserCard
                    user={authData.user}
                    onConfigPressed={() => {
                        navigation.navigate('ConfigList');
                    }}
                    onExchangePressed={() => {
                        navigation.navigate('Exchange');
                    }}
                />

                <Slider/>

                {/*<CartButton user={authData.user} onPress={() => navigation.navigate('Cart')}/>*/}

                {
                    !assistance.enabled
                    ? (
                        <View style={{padding: 16}}>
                            <Card>
                                <Card.Content>
                                    <Title style={{fontFamily: 'GilroyExtraBold', color: colors.primary}}>¿Qué quieres
                                        hacer?</Title>
                                    <Searchbar
                                        placeholder="Empresa, tipo de comida, plato"
                                        placeholderTextColor="#efefef"
                                        onChangeText={query => setSearchQuery(query)}
                                        value={searchQuery}
                                        style={{backgroundColor: '#cccccc', elevation: 0, marginVertical: 8}}
                                        inputStyle={{color: 'white',}}
                                        iconColor='white'
                                    />
                                    <View style={{flexDirection: 'row'}}>
                                        <Button style={{flex: 1}}
                                                mode={type === TYPE_PICKUP ? 'outlined' : 'text'}
                                                onPress={() => setType(TYPE_PICKUP)}
                                                compact={true}
                                        >
                                            Pickup
                                        </Button>
                                        <Button style={{flex: 1}}
                                                mode={type === TYPE_DELIVERY ? 'outlined' : 'text'}
                                                onPress={() => setType(TYPE_DELIVERY)}
                                                compact={true}
                                        >
                                            Delivery
                                        </Button>
                                        <Button style={{flex: 1}}
                                                mode={type === TYPE_RESERVATION ? 'outlined' : 'text'}
                                                onPress={() => setType(TYPE_RESERVATION)}
                                                compact={true}
                                        >
                                            Reserva
                                        </Button>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <Button style={{flex: 1}}
                                                mode={type === TYPE_VIRTUAL_ASSISTANT ? 'outlined' : 'text'}
                                                onPress={() => setType(TYPE_VIRTUAL_ASSISTANT)}
                                                compact={true}
                                        >
                                            Camarero Virtual
                                        </Button>
                                    </View>
                                    <Button mode='contained'
                                            labelStyle={{color: 'white'}}
                                            style={{marginVertical: 16}}
                                            onPress={search}
                                    >
                                        Buscar
                                    </Button>
                                </Card.Content>

                            </Card>
                            <View style={{flexDirection: 'row', marginTop: 16}}>
                                <TouchableRipple
                                    style={{
                                        ...styles.buttonLeft,
                                        borderRadius   : roundness,
                                        backgroundColor: colors.accent
                                    }}
                                    onPress={() => {
                                        search(TYPE_PICKUP.code);
                                    }}
                                >
                                    <View style={{flexDirection: 'column', padding: 16, alignItems: 'center'}}>
                                        <FontAwesome5 name="shopping-bag" size={32} color="white"/>
                                        <Headline style={styles.headline}>Pedir pickup</Headline>
                                        <Subheading style={styles.subheading}>
                                            para recoger
                                        </Subheading>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    style={{
                                        ...styles.buttonRight,
                                        borderRadius   : roundness,
                                        backgroundColor: colors.accent
                                    }}
                                    onPress={() => {
                                        search(TYPE_DELIVERY.code);
                                    }}
                                >
                                    <View style={{flexDirection: 'column', padding: 16, alignItems: 'center'}}>
                                        <FontAwesome5 name="bicycle" size={32} color="white"/>
                                        <Headline style={styles.headline}>Pedir delivery</Headline>
                                        <Subheading style={styles.subheading}>te lo llevamos</Subheading>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <TouchableRipple
                                style={{
                                    ...styles.buttonBottom,
                                    borderRadius   : roundness,
                                    backgroundColor: colors.accent
                                }}
                                onPress={() => {
                                    search(TYPE_RESERVATION.code);
                                }}
                            >
                                <View style={{flexDirection: 'column', padding: 16, alignItems: 'center'}}>
                                    <FontAwesome5 name="calendar" size={32} color="white"/>
                                    <Headline style={styles.headline}>Reservar</Headline>
                                    <Subheading style={styles.subheading}>Mesas o eventos especiales.</Subheading>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple
                                style={{
                                    ...styles.buttonBottom,
                                    marginTop      : 8,
                                    borderRadius   : roundness,
                                    backgroundColor: colors.accent
                                }}
                                onPress={() => {
                                    search(TYPE_VIRTUAL_ASSISTANT.code);
                                }}
                            >
                                <View style={{flexDirection: 'column', padding: 16, alignItems: 'center'}}>
                                    <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="white"/>
                                    <Headline style={styles.headline}>Camarero virtual</Headline>
                                    <Subheading style={styles.subheading}>Pide desde tu mesa</Subheading>
                                </View>
                            </TouchableRipple>
                            <Space height={50}/>
                        </View>
                    )
                    : (
                        <View style={{padding: 16}}>
                            <Headline>Asistente en ejecucion</Headline>
                            <Subheading>{business.name}</Subheading>
                            <View>
                                <Button onPress={onContinue}
                                        mode={'outlined'}
                                        dark={true}
                                >
                                    Continuar pidiendo
                                </Button>
                                <Space height={8}/>
                                <Button onPress={() => navigation.navigate('CartList')}
                                        mode={'outlined'}
                                        dark={true}
                                >
                                    Ver pedidos
                                </Button>
                                <Space height={8}/>
                                <Button onPress={() => {
                                    dispatch(stopAssistant())
                                }}
                                        mode={'contained'}
                                        dark={true}
                                >
                                    Solicitar cuenta
                                </Button>
                                <Space height={8}/>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
            <CartButton/>
        </View>
    );
}
