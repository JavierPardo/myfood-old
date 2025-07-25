import {FontAwesome5} from '@expo/vector-icons';
import * as Facebook from "expo-facebook";
import React, {useContext} from "react";
import {View} from "react-native";
import {Subheading} from "react-native-paper";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/index";
import {useDispatch} from "react-redux";
import AuthContext from "../../auth/context";
import defaultData from "../../auth/defaultData";
import useAuth from "../../auth/useAuth";
import Header from "../../components/Header";
import {FACEBOOK_APP_ID} from "../../utils/constants";


export default ({navigation}) => {
	
	const auth = useAuth();
	
	const items    = [
		{
			label: 'Mi Perfil',
			icon : 'user',
			path : 'UserProfile',
		},
		{
			label: 'Cambiar contraseña',
			icon : 'lock',
			path : 'ChangePassword',
		},
		{
			label: 'Mis direcciones',
			icon : 'map-marker',
			path : 'Addresses',
		},
		{
			label: 'Mis preferencias',
			icon : 'cog',
			path : 'Configuration',
		},
		{
			label   : 'Cerrar sesión',
			icon    : 'sign-out-alt',
			callback:async () => {
				await Facebook.initializeAsync({
					appId: FACEBOOK_APP_ID,
				});
				await Facebook.logOutAsync()
				await auth.logOut();
			}
		},
	];
	
	
	return <View>
		<Header title='Configuración'
						onBackClick={() => navigation.goBack()}
		/>
		{
			items.map((item, index) => {
				return (
					<TouchableRipple key={index}
													 onPress={
														 item.callback
														 ? item.callback
														 : () => navigation.navigate(item.path)
													 }
													 style={{padding: 8}}>
						<Subheading>
							{item.icon ? <FontAwesome5 name={item.icon} size={16}/> : null}
							{item.icon ? "  " : null}
							{item.label}
						</Subheading>
					</TouchableRipple>
				);
			})
		}
	</View>;
}
