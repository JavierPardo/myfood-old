import {LinearGradient} from 'expo-linear-gradient';
import React from "react";
import {View} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {getStatusBarHeight} from 'react-native-status-bar-height';

import LogoWhite from '../../assets/LogoWhite.svg';


export default ({title, onBackClick, onMenuClick}) => {
	const height = getStatusBarHeight();
	return <LinearGradient
		colors={['#f6991d', '#da2d2d',]}
		start={[0, 1]}
		end={[1, 0]}
		style={{paddingTop: height}}>
		<View style={{flexDirection: 'row', alignItems: 'center', padding: 8}}>
			{
				onBackClick && <IconButton
					icon="arrow-left-bold"
					color='white'
					size={20}
					onPress={() => onBackClick()}
					style={{marginHorizontal: 8}}
				/>
			}
			<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
				<LogoWhite width={24} height={24} style={{marginHorizontal: 8}}/>
				<Text style={{fontFamily: 'GilroyExtraBold', fontSize: 24, color: 'white'}}>{title}</Text>
			</View>
			{
				onMenuClick && <IconButton
					icon="settings"
					color='white'
					size={20}
					onPress={() => onMenuClick()}
					style={{marginHorizontal: 8}}
				/>
			}
		</View>
	</LinearGradient>;
};
