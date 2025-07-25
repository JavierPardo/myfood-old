import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';

import React, {useState} from "react";
import {View} from "react-native";
import {Button, Text} from "react-native-paper";

import Corner from '../../../assets/Corner.svg';
import Logo from '../../../assets/Logo.svg';
import {userLoginFacebook} from "../../api/auth";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import {FACEBOOK_APP_ID} from "../../utils/constants";


const styles = {
	container         : {flexDirection: 'column', alignItems: 'center', flex: 1},
	logoContainer     : {flexDirection: 'column', alignItems: 'center', marginTop: 80, marginBottom: 60},
	title             : {fontFamily: 'GilroyExtraBold', fontSize: 32},
	googleButton      : {backgroundColor: '#ff3434', width: 350, marginBottom: 20},
	facebookButton    : {backgroundColor: '#347aff', width: 350, marginBottom: 20},
	emailButton       : {backgroundColor: '#737373', width: 350, marginBottom: 20},
	separatorContainer: {
		flexDirection : 'row',
		width         : 300,
		alignItems    : 'center',
		justifyContent: 'center',
		marginBottom  : 20
	},
	separator         : {backgroundColor: '#737373', height: 2, width: 100},
	corner            : {position: 'absolute', bottom: 0, left: 0}
};

export default ({navigation}) => {
	const [isLoggedin, setLoggedinStatus]      = useState(false);
	const [userData, setUserData]              = useState(null);
	const [isImageLoading, setImageLoadStatus] = useState(false);
	
	const loginFacebookApi = useApi(userLoginFacebook);
	const authContext      = useAuth();
	
	const goLoginEmail = () => {
		navigation.navigate('LoginEmail');
	};

	
	const loginFacebook = async () => {
		try {
			await Facebook.initializeAsync({
				appId: FACEBOOK_APP_ID,
			});
			const {
							type,
							token,
							expirationDate,
							permissions,
							declinedPermissions,
						} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ['public_profile', 'email', 'user_gender'],
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(`https://graph.facebook.com/me?fields=id,gender,first_name,last_name,email&access_token=${token}`);
				const fbUser   = await response.json();
				const user     = {
					remoteId : fbUser.id,
					firstName: fbUser.first_name,
					lastName : fbUser.last_name,
					token    : token,
					email    : fbUser.email,
					gender   : fbUser.gender
				};
				await loginFacebookApi.request(user);
				if (!loginFacebookApi.error)
					await authContext.login(loginFacebookApi.data);
				
				//	TODO display error when login failed
			} else {
				// type === 'cancel'
			}
		} catch ({message}) {
			console.log(`Facebook Login Error: ${message}`);
		}
	};
	const loginGoogle   = async () => {
		try {
			
			
			const {type, accessToken, user} = await Google.logInAsync({
				iosClientId                 : `670976931397-vrvjk6q71b8jht56su3uo5ss02i0rhm6.apps.googleusercontent.com`,
				androidClientId             : `670976931397-1dfn82dmk81qctl48h38redi3fkruj21.apps.googleusercontent.com`,
				iosStandaloneAppClientId    : `<YOUR_IOS_CLIENT_ID>`,
				androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
			});
			
			if (type === 'success') {
				// Then you can use the Google REST API
				console.log('Login.js : 77', user);
			}
		} catch (e) {
			console.log("error", e);
		}
	};
	const logout        = () => {
		setLoggedinStatus(false);
		setUserData(null);
		setImageLoadStatus(false);
	};
	
	return <View style={styles.container}>
		
		<View style={styles.logoContainer}>
			<Logo width={160} height={160}/>
			<Text style={styles.title}>MyFoodApp</Text>
		</View>
		
		<Button icon="google" style={styles.googleButton} color="#FFFFFF"
						onPress={() => {
							loginGoogle();
							// navigation.navigate('Main');
						}}>>
			Inicia con Google
		</Button>
		
		<Button icon="facebook"
						style={styles.facebookButton}
						color="#FFFFFF"
						loading={loginFacebookApi.loading}
						disabled={loginFacebookApi.loading}
						onPress={() => {
							loginFacebook();
						}}>
			Inicia con Facebook
		</Button>
		
		<View style={styles.separatorContainer}>
			<View style={styles.separator}/>
			<Text style={{margin: 5, fontFamily: "GilroyExtraBold"}}>O</Text>
			<View style={styles.separator}/>
		</View>
		<Button icon="email" style={styles.emailButton} color="#FFFFFF" onPress={goLoginEmail}>
			Inicia con correo electronico
		</Button>
		<Corner width={143} height={150}
						style={styles.corner}/>
	</View>;
}
