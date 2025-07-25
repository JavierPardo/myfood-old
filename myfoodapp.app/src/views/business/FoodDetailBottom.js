import React from "react";
import {View, StyleSheet} from "react-native";
import {Button, IconButton, Subheading} from "react-native-paper";

const styles = StyleSheet.create({
	container  : {flexDirection: 'column',},
	priceResume: {
		flexDirection  : 'row',
		justifyContent : 'space-around',
		alignItems     : 'center',
		backgroundColor: 'white',
		paddingVertical: 8
	},
	text       : {flex: 3, textAlign: 'center'},
	bottom     : {padding: 8, backgroundColor: 'white'},
});

export default ({onMinusClick, onPlusClick, onAddClick, quantity, foodName, amount}) => (
	<View style={styles.container}>
		<View
			style={styles.priceResume}>
			<IconButton icon="minus" style={{flex: 1}} onPress={onMinusClick}/>
			<View>
				<Subheading style={styles.text}>{quantity} x {foodName}</Subheading>
				<Subheading style={styles.text}>{amount} BS.</Subheading>
			</View>
			<IconButton icon="plus" style={{flex: 1}} onPress={onPlusClick}/>
		</View>
		<View style={styles.bottom}>
			<Button mode='contained' onPress={onAddClick} labelStyle={{color: 'white'}}>Agregar al carrito</Button>
		</View>
	</View>
)