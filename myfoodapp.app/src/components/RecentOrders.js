import React from "react";
import {View} from "react-native";
import {Button, Headline, useTheme} from "react-native-paper";
import OrderItem from "./OrderItem";

export default ({navigation}) => {
	const {colors, roundness} = useTheme();
	
	return (
		<>
			<View style={{
				flexDirection    : 'row',
				alignItems       : 'center',
				justifyContent   : 'space-between',
				paddingHorizontal: 16
			}}>
				<Headline color={colors.text} style={{fontFamily: 'GilroyExtraBold'}}>Pedidos recientes</Headline>
				<Button compact={true}
								color={colors.text}
								onPress={() => {
									navigation.navigate('Orders');
								}}
				>
					ver más
				</Button>
			</View>
			
			<View style={{paddingHorizontal: 16, paddingBottom: 16}}>
				<OrderItem
					title='Pedido 1'
					url='https://picsum.photos/200/300?l=1'
					status='en proceso'
					statusColor='green'
					onPress={() => navigation.navigate('OrderDetail')}
				/>
				<OrderItem
					title='Pedido 2'
					url='https://picsum.photos/200/300?l=2'
					status='cancelado'
					statusColor='red'
					onPress={() => navigation.navigate('OrderDetail')}
				/>
			</View>
		</>
	);
}
