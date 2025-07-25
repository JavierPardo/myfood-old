import {FontAwesome5} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Subheading} from "react-native-paper";

const styles = StyleSheet.create({
	container: {
		padding       : 16,
		flexDirection : 'row',
		alignItems    : 'center',
		justifyContent: 'center'
	}
});

export default ({color, icon, title}) => (
	<View style={[styles.container, {backgroundColor: color,}]}>
		<FontAwesome5 name={icon} size={18} color="white"/>
		<Subheading style={{color: 'white', marginLeft: 16}}>{title}</Subheading>
	</View>
);
