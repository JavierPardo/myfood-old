import React from "react";
import {View} from "react-native";
import {Checkbox, Paragraph, Text} from "react-native-paper";

export default ({name, side, price, description, status, handleChange}) => (
	<View style={{flexDirection: 'row', marginVertical: 8}}>
		<Checkbox
			status={status ? 'checked' : 'unchecked'}
			onPress={() => handleChange(name, side)}
		/>
		<View>
			<Text>{name} + {price} Bs</Text>
			<Paragraph>{description}</Paragraph>
		</View>
	</View>
)