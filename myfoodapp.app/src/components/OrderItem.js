import {FontAwesome5} from "@expo/vector-icons";
import React from "react";
import {Image, View} from "react-native";
import {Card, Headline, TouchableRipple} from "react-native-paper";
import Tag from "./Tag";

export default ({url, title, status, statusColor, onPress}) => {
	return <Card style={{marginBottom: 8,}}>
		<TouchableRipple onPress={onPress} style={{padding: 12}}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Image
					source={{uri: url}}
					style={{width: 70, height: 70, borderRadius: 8}}
					resizeMode="cover"
				/>
				<View style={{flex: 1, paddingHorizontal: 16}}>
					<Headline>{title}</Headline>
					<Tag text={status} backgroundColor={statusColor}/>
				</View>
				<FontAwesome5 name="caret-right" size={32} color="red"/>
			</View>
		</TouchableRipple>
	</Card>;
}
