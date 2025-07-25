import {FontAwesome5} from "@expo/vector-icons";
import React from "react";
import {Avatar, Card, IconButton} from "react-native-paper";

const styles = {
	surface   : {elevation: 1, borderRadius: 8, marginBottom: 8, overflow: 'hidden'},
	container : {flexDirection: 'row', padding: 8, alignItems: 'center',},
	iconLeft  : {margin: 8},
	iconRight : {margin: 8},
	subheading: {margin: 0},
};

export default ({name, address, icon, onPress}) => {
	return (
		<Card style={{marginBottom: 4}}>
			<Card.Title
				title={name}
				subtitle={address}
				left={(props) => (
					<Avatar.Icon {...props}
											 icon={() => (
												 <FontAwesome5
													 name={icon}
													 size={18}
													 color="white"/>
											 )}
											 color={'white'}/>
				)}
				right={(props) => <IconButton {...props} icon="eye" color='#aaaaaa' onPress={onPress}/>}
			/>
		</Card>
	);
}
