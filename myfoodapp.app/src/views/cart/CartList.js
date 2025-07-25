import React                                        from "react";
import {ScrollView, View}                           from "react-native";
import {Button, Caption, Paragraph, Subheading}     from "react-native-paper";
import Space                                        from "../../components/Space";
import {useDispatch, useSelector}                   from "react-redux";
import {clearCart, processNewOrder, removeCartItem} from "../../store/cartReducer";
import {getStatusBarHeight}                         from "react-native-status-bar-height";
import {setBusinessPicked}                          from "../../store/businessReducer";
import useApi                                       from "../../hooks/useApi";
import {eventCreate, eventOrderCreate}              from "../../api/event";


const Cart = ({navigation}) => {
    const {items: cartItems, type, business, assistance} = useSelector(store => store.cart);
    let eventApi                                         = useApi(eventCreate);
    const orderApi                                       = useApi(eventOrderCreate);

    const dispatch     = useDispatch();
    const handleDelete = foodId => {
        dispatch(removeCartItem(foodId));
    };
    const saveEvent    = async () => {
        await eventApi.request(business.id, {typeId: type});
    };
    const saveOrder    = async () => {
        const items = [];
        cartItems.forEach((item) => {
            const sides = [];
            Object.keys(item.sides).forEach(side => {
                sides.push({sideId: item.sides[side].id});
            });
            items.push({
                           itemId: item.food.id, quantity: item.quantity, notes: item.note, selectedSides: sides,
                       });
        });
        const data = {
            orderItems : items,
            orderExtras: [],
            eventId    : (
                assistance.enabled ? assistance.eventId : eventApi.data
            ),
        }
        await orderApi.request(data);
        dispatch(processNewOrder())
        navigation.goBack();
    };

    const onContinue = async () => {
        await dispatch(setBusinessPicked({
                                             searchQuery: '', business: business, eventType: type,
                                         }));
        navigation.navigate('BusinessDetail');
    };
    const onClear    = async () => {
        await dispatch(clearCart());
        navigation.goBack()
    };

    const onProceedHandler = async () => {
        // check if virtual assistance data is in store, if so,
        // just save and order, else create an event and save the order
        if (assistance.enabled) {
            await saveOrder(assistance.eventId);
        }
        else {
            await saveEvent();
            await saveOrder();
        }

    };

    return (
        <View style={{flexDirection: 'column', flex: 1, padding: 16}}>
            <Space height={getStatusBarHeight()}/>
            <ScrollView style={{flex: 1}}>
                <View>
                    <View>
                        {assistance.orders.map((cartItems, index) => {
                            return <View key={index}>
                                <Subheading>Pedido {index + 1}</Subheading>
                                {
                                    cartItems.map((item, index) => (
                                        <View key={index} style={{
                                            flexDirection  : 'row',
                                            alignItems     : 'flex-start',
                                            justifyContent : 'space-between',
                                            verticalPadding: 8
                                        }}>
                                            <View>
                                                <Paragraph>{item.quantity} x {item.food.name}</Paragraph>
                                                {Object.keys(item.options).map((option, index) => <Caption
                                                    key={index}>• {option} : {item.options[option]}</Caption>)}
                                                {Object.keys(item.sides).map((option, index) => <Caption
                                                    key={index}>✓ {option}</Caption>)}
                                                {item.note.length > 0 && <Caption>✎ {item.note}</Caption>}
                                            </View>

                                        </View>
                                    ))
                                }
                                <Space height={16}/>
                            </View>
                        })}
                    </View>

                    <Subheading>Pedido actual</Subheading>

                    {cartItems.map((item, index) => (
                        <View key={index} style={{
                            flexDirection  : 'row',
                            alignItems     : 'flex-start',
                            justifyContent : 'space-between',
                            verticalPadding: 8
                        }}>
                            <View>
                                <Paragraph>{item.quantity} x {item.food.name}</Paragraph>
                                {Object.keys(item.options).map((option, index) => <Caption
                                    key={index}>• {option} : {item.options[option]}</Caption>)}
                                {Object.keys(item.sides).map((option, index) => <Caption
                                    key={index}>✓ {option}</Caption>)}
                                {item.note.length > 0 && <Caption>✎ {item.note}</Caption>}
                            </View>

                            <Button labelStyle={{fontSize: 12}}
                                    onPress={() => handleDelete(index)}
                            >
                                Eliminar
                            </Button>
                        </View>
                    ))}
                    <Space height={16}/>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', verticalPadding: 8
                    }}>
                        <Paragraph>Total</Paragraph>
                        <Subheading>{cartItems.reduce((accumulator, currentItem) => {
                            return (
                                accumulator + Number(currentItem.totalAmount)
                            );
                        }, 0)} BOB.</Subheading>
                    </View>
                    <Space height={16}/>
                </View>
            </ScrollView>
            <View>
                <Button onPress={onContinue}
                        mode={'outlined'}
                        dark={true}
                >
                    Continuar Comprando
                </Button>
                <Space height={8}/>
                <Button onPress={onClear}
                        mode={'outlined'}
                        dark={true}
                >
                    Limpiar carrito
                </Button>
                {
                    cartItems.length > 0 && (
                        <>
                            <Space height={8}/>
                            <Button onPress={onProceedHandler}
                                    mode={'contained'}
                                    dark={true}
                            >
                                {
                                    assistance.enabled
                                    ? 'Agregar nueva orden'
                                    : 'Proceder con la compra'
                                }
                            </Button>
                        </>
                    )
                }

                <Space height={8}/>
                <Button onPress={() => {navigation.goBack()}}
                        mode={'contained'}
                        dark={true}
                        color={'#969696'}
                >
                    Volver
                </Button>
            </View>
        </View>
    );
}
export default Cart;