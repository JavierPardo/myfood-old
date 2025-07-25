import Icon from '@expo/vector-icons/Ionicons';
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
	{
		key            : 'one',
		title          : 'Pick Up',
		text           : 'No hagas colas\n\nHas tu pedido en MyFoodApp y solo pasa a recogerlo',
		image          : require('../../../assets/intro/pickup.png'),
		backgroundColor: '#da2d2d',
	},
	{
		key            : 'two',
		title          : 'Delivery',
		text           : 'No salgas de casa,\n\nte llevamos tu comida hasta donde estes',
		image          : require('../../../assets/intro/delivery.png'),
		backgroundColor: '#f6991d',
	},
	{
		key            : 'three',
		title          : 'Reservas',
		text           : 'Tienes algun evento cercano?\n\nRealiza un reserva anticipada en el lugar que elijas',
		image          : require('../../../assets/intro/reservation.png'),
		backgroundColor: '#da2d2d',
	},
	{
		key            : 'four',
		title          : 'Camarero Virtual',
		text           : 'Solo sientate en tu mesa\n\nhas tu pedido en MyFoodApp\n\ny llevaremos tu pedido hasta tu mesa',
		image          : require('../../../assets/intro/virtual-assistant.png'),
		backgroundColor: '#f6991d',
	}
];
const styles = StyleSheet.create({
	slide       : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center',
		backgroundColor: 'gray',
	},
	image       : {
		width : 320,
		height: 320,
		
	},
	text        : {
		color    : 'rgba(255, 255, 255, 0.8)',
		textAlign: 'center',
	},
	title       : {
		marginVertical: 32,
		fontSize      : 22,
		color         : 'white',
		textAlign     : 'center',
	},
	buttonCircle: {
		width          : 40,
		height         : 40,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius   : 20,
		justifyContent : 'center',
		alignItems     : 'center',
	},
});
export default ({navigation}) => {
	const _renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon
					name="md-arrow-round-forward"
					color="rgba(255, 255, 255, .9)"
					size={24}
				/>
			</View>
		);
	};
	const _renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon
					name="md-checkmark"
					color="rgba(255, 255, 255, .9)"
					size={24}
				/>
			</View>
		);
	};
	const renderItem        = ({item}) => {
		return (
			<View style={{...styles.slide, backgroundColor: item.backgroundColor}}>
				<Image style={styles.image} source={item.image}/>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};
	const onDone            = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		navigation.navigate("Main");
	};
	return (
		<AppIntroSlider
			renderItem={renderItem}
			renderDoneButton={_renderDoneButton}
			renderNextButton={_renderNextButton}
			data={slides}
			onDone={onDone}/>
	);
}
