import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {Image, ImageBackground, View} from "react-native";
import {Headline, Subheading, TouchableRipple} from "react-native-paper";
import Tag from "./Tag";

const styles = {
	container      : {paddingHorizontal: 16, marginBottom: 16, width: "100%",},
	dataContainer  : {
		position         : 'absolute',
		bottom           : 0,
		left             : 0,
		paddingHorizontal: 16,
		paddingTop       : 0,
		paddingBottom    : 16,
		flexDirection    : 'row',
		alignItems       : 'center',
		width            : '100%'
	},
	logo           : {
		aspectRatio    : 1,
		height         : 60,
		width          : 60,
		borderRadius   : 10,
		backgroundColor: 'white',
		padding        : 5,
		marginRight    : 8
	},
	touchable      : {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: 10,},
	banner         : {width: "100%", height: 'auto',},
	headline       : {color: 'white', fontFamily: 'GilroyExtraBold'},
	subheading     : {color: 'white', lineHeight: 14},
	importantButton: {position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.11)'},
};

export default ({name, address, logoUrl, bannerUrl, schedule, tags, gallery, onBusinessClick}) => {
	return (
		<View style={styles.container}>
			<View style={{position: 'relative', width: '100%', borderRadius: 10, overflow: 'hidden'}}>
				<ImageBackground source={require('../../assets/business-bg-default.png')}
												 style={{width: '100%', aspectRatio: 3}}>
					{bannerUrl && <Image source={{uri: bannerUrl}} resizeMode="cover" style={styles.banner}/>}
				</ImageBackground>
				
				<TouchableRipple style={styles.touchable}
												 onPress={() => {
													 onBusinessClick();
												 }}>
					<LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']} start={[0, 0]} end={[0, 1]}
													style={styles.dataContainer}>
						{logoUrl &&
						 <View style={styles.logo}>
							 <ImageBackground source={require('../../assets/icon.png')}
																style={{width: '100%', aspectRatio: 1}}>
								 {logoUrl && <Image source={{uri: logoUrl}} resizeMode="cover" style={{width: 50, height: 50}}/>}
							 </ImageBackground>
							 
						 </View>}
						<View>
							<View><Headline style={styles.headline}>{name}</Headline></View>
							<View><Subheading style={styles.subheading}>{address}</Subheading></View>
							<View style={{flexDirection: 'row'}}>
								{tags.map(((tag, index) => <Tag key={index} text={tag.name} backgroundColor={tag.color}/>))}
							</View>
						</View>
					</LinearGradient>
				</TouchableRipple>
			</View>
		</View>
	);
}
