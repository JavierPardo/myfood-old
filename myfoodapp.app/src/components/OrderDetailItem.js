import React from "react";
import {Image, View} from "react-native";
import {Card, Headline, TouchableRipple} from "react-native-paper";
import Tag from "./Tag";

export default ({url, name, quantity, price, extras, onPress}) => {
	return <Card style={{marginVertical: 8,}}>
		<TouchableRipple onPress={onPress} style={{padding: 12}}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Image
					source={{uri: url}}
					style={{width: 70, height: 70, borderRadius: 8}}
					resizeMode="cover"
				/>
				<View style={{flex: 1, paddingHorizontal: 16}}>
					<Headline>{quantity} x {name}</Headline>
					<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
						{extras.map((extra, index) => {
							return <Tag key={index} text={extra} backgroundColor='orange'/>;
						})}
					</View>
				
				</View>
				<Headline>{quantity * price} Bs</Headline>
			</View>
		</TouchableRipple>
	</Card>;
}
