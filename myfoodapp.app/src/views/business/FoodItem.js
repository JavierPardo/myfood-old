import React from "react";
import {Image, ImageBackground, View, StyleSheet} from "react-native";
import {Paragraph, Subheading, TouchableRipple} from "react-native-paper";

const styles = StyleSheet.create({
	container     : {flex: 1, borderRadius: 8, overflow: 'hidden'},
	content       : {flex: 1, flexDirection: 'row', marginHorizontal: 1, marginBottom: 8, padding: 4},
	imageThumbnail: {justifyContent: 'center', alignItems: 'center', aspectRatio: 1, borderRadius: 4, flex: 1,},
	title         : {textAlign: 'left', lineHeight: 14, fontSize: 14, textTransform: 'uppercase'},
	description   : {textAlign: 'left', color: '#969696',},
	price         : {textAlign: 'left', color: 'orange', fontSize: 16,},
});

export default ({name, description, price, image, onPress}) => (
	<View style={styles.container}>
		<TouchableRipple rippleColor='orange' onPress={onPress}>
			<View style={styles.content}>
				<ImageBackground source={require('../../../assets/icon.png')} style={styles.imageThumbnail}>
					{image && <Image source={{uri: image}} style={styles.imageThumbnail} resizeMode="cover"/>}
				</ImageBackground>
				<View style={{flex: 3, paddingLeft: 8}}>
					<Subheading style={styles.title}>{name}</Subheading>
					<Paragraph style={styles.description}>{description}</Paragraph>
					<Paragraph style={styles.price}>{price} BS.</Paragraph>
				</View>
			</View>
		</TouchableRipple>
	</View>
)