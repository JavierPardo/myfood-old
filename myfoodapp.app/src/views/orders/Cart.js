import React from "react";
import {ScrollView, View,} from "react-native";
import {Button, Headline, Subheading, useTheme} from "react-native-paper";
import {useSelector} from "react-redux";
import {branchGetItem, branchGetItemOptions, branchGetSides} from "../../api/branch";
import {eventCreate, eventOrderCreate} from "../../api/event";
import Header from "../../components/Header";
import OrderDetailItem from "../../components/OrderDetailItem";
import useApi from "../../hooks/useApi";

export default ({navigation}) => {
	const {colors}                = useTheme();
	const {items, type, business} = useSelector(store => store.cart);
	// const {businessPicked: business} = useSelector(store => store.business);
	const eventApi                = useApi(eventCreate);
	const orderApi                = useApi(eventOrderCreate);
	
	

	
	const handleFinish = async () => {
		await eventApi.request(business.id, {typeId: type});
		
		if (eventApi.error) {
			console.log("error");
		} else {
			const eventId = eventApi.data;
			await orderApi.request({
				eventId    : eventId,
				orderExtras: [],
				orderItems : [],
			});
		}
		
		// console.log(business);
		// console.log(items);
		// console.log(type);
	};
	
	
	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<Header title='Carrito'
							onBackClick={() => {
								navigation.pop();
							}}/>
			
			<ScrollView style={{flexDirection: 'column', paddingHorizontal: 16, flex: 1}}>
				{items.map((item, index) => {
					return <OrderDetailItem key={index}
																	name={item.food.name}
																	url={item.food.image}
																	quantity={item.quantity}
																	price={item.food.currentPrice}
																	extras={[]}
					/>;
				})}
			</ScrollView>
			<View style={{
				backgroundColor: 'white',
				padding        : 16,
				alignItems     : 'center',
			}}>
				<Headline style={{}}>Total {
					items.reduce((total, item) => (total + Number(item.food.currentPrice)), 0)
				} BOB.</Headline>
				<Subheading style={{}}>Pedido para enviar a casa</Subheading>
				<Button mode='contained'
								style={{marginTop: 16}}
								labelStyle={{color: 'white'}}
								onPress={handleFinish}
								loading={orderApi.loading || eventApi.loading}
								disabled={orderApi.loading || eventApi.loading}
				>
					Finalizar compra
				</Button>
			</View>
		</View>
	);
}

// selectedOptions:[
// 	{
// 		optionId:10,
// 		option:"bien cocido"
// 	},
// 	{
// 		optionId:12,
// 		option:"arroz blanco"
// 	}
// ]