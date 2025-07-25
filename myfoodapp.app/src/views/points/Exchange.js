import React from "react";
import {View} from "react-native";
import {Avatar, Headline, Subheading} from "react-native-paper";
import Header from "../../components/Header";

const prices = [
	{
		name : 'Bateria externa',
		cost : '400 pts',
		image: 'https://tusbolsosymochilas.com/wp-content/uploads/2019/04/BONAI-Bater%C3%ADa-Externa-para-m%C3%B3vil-5.jpg'
	},
	{
		name : 'Auriculares',
		cost : '200 pts',
		image: 'https://d34zlyc2cp9zm7.cloudfront.net/products/67007bfdd75dc86819258fd44aa1dd7c71004f85e2b0abd586ae38ca7e4f272b.webp_500'
	}
];

export default ({navigation}) => {
	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<Header title='Cambia tus puntos'
							onBackClick={() => {
								navigation.pop();
							}}/>
			<View style={{paddingHorizontal: 16}}>
				
				
				{prices.map(((price, index) => {
					return <View key={index}
											 style={{
												 flexDirection  : 'row',
												 backgroundColor: 'white',
												 padding        : 16,
												 marginVertical : 8,
												 elevation      : 2, borderRadius: 8, alignItems: 'center',
											 }}>
						<Avatar.Image size={40}
													source={{uri: price.image}} height={40} width={40}
													style={{position: 'relative'}}
						/>
						
						<Headline style={{flex: 1, marginHorizontal: 8}}>
							{price.name}
						</Headline>
						<Subheading>{price.cost}</Subheading>
					</View>;
				}))}
			</View>
		</View>
	);
}
