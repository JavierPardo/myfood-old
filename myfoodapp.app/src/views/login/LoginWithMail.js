import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {Button} from "react-native-paper";
import Header from "../../components/Header";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const styles = {
	button: {
		flex  : 1,
		margin: 16,
	}
};

export default ({navigation}) => {
	const [type, setType] = useState(1);
	
	return <View style={{flex: 1}}>
		<Header title='MyFoodApp'
						onBackClick={() => navigation.pop()}/>
		<View style={{flexDirection: 'row'}}>
			<Button mode={type === 1 ? 'contained' : 'outlined'}
							color='#da2d2d'
							style={styles.button}
							onPress={() => {
								setType(1);
							}}
			>Regístrate</Button>
			<Button mode={type === 2 ? 'contained' : 'outlined'}
							color='#da2d2d'
							style={styles.button}
							onPress={() => {
								setType(2);
							}}
			>Inicia sesión</Button>
		</View>
		<ScrollView style={{flex: 1}}>
			{type === 1 ? <RegisterForm navigation={navigation}/> : <LoginForm navigation={navigation}/>}
		</ScrollView>
	</View>;
}
