import React from "react";
import {View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
	container: {padding: 8, justifyContent: "center", marginVertical: 8},
	text     : {color: '#969696'},
});

export default ({message}) => (
	<View style={styles.container}>
		<Text style={styles.text}>{message}</Text>
	</View>
)
