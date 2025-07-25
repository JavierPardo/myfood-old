import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Button, Headline, IconButton, Subheading} from "react-native-paper";

const styles = StyleSheet.create({
	cardContainer: {paddingHorizontal: 16},
	cardContent  : {
		position    : 'relative',
		top         : -60,
		marginBottom: -50,
	},
	card         : {
		flex           : 1,
		paddingLeft    : 16,
		flexDirection  : 'row',
		borderRadius   : 4,
		elevation      : 2,
		backgroundColor: 'white',
		alignItems     : 'center'
	},
	cardRow      : {
		paddingLeft    : 16,
		paddingVertical: 0,
		flexDirection  : 'row',
		alignItems     : 'center',
	}
});

export default ({user, onConfigPressed, onExchangePressed}) => {
	
	return (
		<View>
			<LinearGradient
				colors={['#f6991d', '#da2d2d',]}
				start={[0, 1]}
				end={[1, 0]}
				style={{width: '100%', height: 100}}/>
			<View style={styles.cardContainer}>
				<View style={styles.cardContent}>
					<View style={{flexDirection: 'row-reverse'}}>
						<IconButton
							icon="settings"
							color={'white'}
							size={18}
							style={{margin: 0}}
							onPress={() => onConfigPressed()}
						/>
					</View>
					<View style={styles.card}>
						<Avatar.Image size={60}
													source={require('../../../assets/userprofile.png')}
													style={{position: 'relative'}}
						/>
						
						<View style={{flex: 1, position: 'relative', padding: 8}}>
							<View style={{...styles.cardRow}}>
								<Headline style={{fontFamily: 'GilroyExtraBold', color: 'gray', margin: 0}}>
									Hola {user.firstName}
								</Headline>
							
							</View>
							<View style={styles.cardRow}>
								<MaterialCommunityIcons name="coin" size={24} color="#EECC00"/>
								<Subheading style={{fontFamily: 'GilroyExtraBold', fontSize: 18, marginHorizontal: 8}}>40
									pts</Subheading>
								<Button mode={"text"}
												compact={true}
												labelStyle={{fontSize: 12}}
												contentStyle={{padding: 0}}
												onPress={() => onExchangePressed()}
								>Canjear</Button>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
