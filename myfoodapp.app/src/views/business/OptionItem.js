import React from "react";
import {View, StyleSheet} from "react-native";
import {RadioButton, Subheading, Text} from "react-native-paper";

const styles = StyleSheet.create({
	container   : {flexDirection: 'column', marginVertical: 8},
	subContainer: {flexDirection: 'row', alignItems: "center"},
});

export default ({name, value, choices, onChangeHandler}) => (
	<View style={styles.container}>
		<Subheading>{name}</Subheading>
		<RadioButton.Group onValueChange={value => onChangeHandler(name, value)} value={value}>
			{
				JSON.parse(choices).map((optionItem, index) => (
					<View key={index} style={styles.subContainer}>
						<RadioButton value={optionItem} status={'unchecked'}/>
						<Text>{optionItem}</Text>
					</View>
				))
			}
		</RadioButton.Group>
	</View>
)