import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";

const styles = {
	container: {
		backgroundColor: 'green',
		
		borderRadius     : 4,
		justifyContent   : 'center',
		alignItems       : 'center',
		paddingVertical  : 2,
		paddingHorizontal: 4,
		marginRight      : 4,
		marginBottom     : 4,
	},
	text     : {color: 'white', textTransform: 'uppercase', fontSize: 10}
};

export default ({text, backgroundColor}) => {
	return <View style={{...styles.container, backgroundColor: backgroundColor}}>
		<Text style={styles.text}>{text}</Text>
	</View>;
}
