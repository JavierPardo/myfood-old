import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {Button, Checkbox, Headline, Text} from "react-native-paper";
import {userUpdate} from "../../api/user";
import useAuth from "../../auth/useAuth";
import Header from "../../components/Header";
import useApi from "../../hooks/useApi";
import preferencesData from './data';

export default ({navigation}) => {
	
	const {authData, setAuthData}       = useAuth();
	const {user}                        = authData;
	const userApi                       = useApi(userUpdate);
	const [preferences, setPreferences] = useState({});
	
	const handleCheck = (key) => {
		const newPref = {...preferences, [key]: !preferences[key]};
		setPreferences(newPref);
	};
	
	const handleUpdate = async () => {
		const keys       = Object.keys(preferences);
		const prefString = [];
		keys.forEach((key) => {
			if (preferences[key]) prefString.push(key);
		});
		await userApi.request({
			preferences: prefString.join(', ')
		});
		setAuthData({user: {...user, preferences: prefString.join(', ')}});
		navigation.goBack();
	};
	
	useEffect(() => {
		const pref = {};
		preferencesData.forEach(group => {
			group.items.forEach(item => {
				pref[item.index] = user.preferences.indexOf(item.index) >= 0;
			});
		});
		setPreferences(pref);
	}, []);
	
	return <View>
		<Header title='Preferencias' onBackClick={() => navigation.goBack()}/>
		<ScrollView>
			<View style={{padding: 16}}>
				{
					preferencesData.map(group => {
						return (
							<View key={group.index}>
								<Headline>{group.label}</Headline>
								{
									group.items.map(item => {
										return (
											<View key={item.index} style={{flexDirection: 'row', alignItems: "center"}}>
												<Checkbox
													status={preferences[item.index] ? 'checked' : 'unchecked'}
													onPress={() => {
														handleCheck(item.index);
													}}
												/>
												<Text>{item.label}</Text>
											</View>
										);
									})
								}
								<View style={{height: 20}}></View>
							</View>
						);
					})
				}
				<Button mode='contained'
								labelStyle={{color: 'white'}}
								onPress={handleUpdate}
								loading={userApi.loading}
								disabled={userApi.loading}
				>
					Actualizar
				</Button>
			</View>
		</ScrollView>
	</View>;
}
