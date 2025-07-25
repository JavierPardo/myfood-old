import React from "react";
import {ScrollView, View,} from "react-native";
import {Headline, Subheading, useTheme} from "react-native-paper";
import Header from "../../components/Header";
import OrderDetailItem from "../../components/OrderDetailItem";

const orders = [
	{
		id      : 1,
		name    : "Milanesa",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['carne de pollo', 'papas', 'arros blanco']
	},
	{
		id      : 2,
		name    : "Silpancho",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['doble huevo', 'papas', 'arros blanco']
	},
	{
		id      : 3,
		name    : "Lomo",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 3,
		extras  : ['Yuca', 'arros con verduras']
	},
	{
		id      : 4,
		name    : "Milanesa",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['carne de pollo', 'papas', 'arros blanco']
	},
	{
		id      : 5,
		name    : "Silpancho",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['doble huevo', 'papas', 'arros blanco']
	},
	{
		id      : 6,
		name    : "Lomo",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 3,
		extras  : ['Yuca', 'arros con verduras']
	},
	{
		id      : 7,
		name    : "Milanesa",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['carne de pollo', 'papas', 'arros blanco']
	},
	{
		id      : 8,
		name    : "Silpancho",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 2,
		extras  : ['doble huevo', 'papas', 'arros blanco']
	},
	{
		id      : 9,
		name    : "Lomo",
		url     : 'https://picsum.photos/200/300?l=1',
		price   : 15,
		quantity: 3,
		extras  : ['Yuca', 'arros con verduras']
	},
];

export default ({navigation}) => {
	const {colors} = useTheme();
	return <View style={{flexDirection: 'column', flex: 1}}>
		<Header title='Restaurante X' onBackClick={() => {
			navigation.pop();
		}}/>
		
		<ScrollView style={{flexDirection: 'column', paddingHorizontal: 16, flex: 1}}>
			{orders.map((item, index) => {
				return <OrderDetailItem key={index}
																name={item.name}
																url={item.url}
																quantity={item.quantity}
																price={item.price}
																extras={item.extras}
																onPress={() => {
																	navigation.navigate('OrderDetail');
																}}/>;
			})}
		</ScrollView>
		<View style={{
			backgroundColor: colors.primary,
			padding        : 16,
			alignItems     : 'center',
		}}>
			<Headline style={{color: 'white'}}>Total 55 Bs.</Headline>
			<Subheading style={{color: 'white'}}>Pedido para enviar a casa</Subheading>
		</View>
	</View>;
}
