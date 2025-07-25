import React from "react";
import {Controller, useForm} from "react-hook-form";
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {userUpdate} from "../../api/user";
import useAuth from "../../auth/useAuth";
import Header from "../../components/Header";
import useApi from "../../hooks/useApi";


export default ({navigation}) => {
	
	const userApi                                    = useApi(userUpdate);
	const user                                       = useAuth();
	const {control, handleSubmit, errors, getValues} = useForm({
		defaultValues: user.authData.user,
	});
	
	const onSubmit = async data => {
		// console.log('UserProfile.js : 20', data);
		await userApi.request(data);
		navigation.goBack();
	};
	
	return <View>
		<Header title='Mi Perfil'
						onBackClick={() => navigation.goBack()}/>
		<ScrollView>
			<View style={{padding: 16}}>
				<TextInput mode='outlined'
									 label="Correo electronico"
									 dense={true}
									 disabled={true}
									 value={user.authData.user.email}
									 style={{marginBottom: 8}}
				/>
				
				<TextInput mode='outlined'
									 label="Usuario"
									 dense={true}
									 disabled={true}
									 value={user.authData.user.userName}
									 style={{marginBottom: 8}}
				/>
				<Controller
					control={control}
					name="firstName"
					rules={{required: true}}
					defaultValue=""
					render={({onChange, onBlur, value}) => (
						<TextInput
							label="Nombres"
							mode='outlined'
							value={value}
							onChangeText={text => onChange(text)}
							onBlur={onBlur}
							dense={true}
							style={styles.input}
							error={errors.firstName}
						/>
					)}
				/>
				{errors.firstName && <Text style={styles.textError}>Nombre es requerido.</Text>}
				
				<Controller
					control={control}
					name="lastName"
					rules={{required: true}}
					defaultValue=""
					render={({onChange, onBlur, value}) => (
						<TextInput
							label="Apellidos"
							mode='outlined'
							value={value}
							onChangeText={text => onChange(text)}
							onBlur={onBlur}
							dense={true}
							style={styles.input}
							error={errors.lastName}
						/>
					)}
				/>
				{errors.lastName && <Text style={styles.textError}>Apellidos es requerido.</Text>}
				
				<Controller
					control={control}
					name="phoneNumber"
					rules={{required: true}}
					defaultValue=""
					render={({onChange, onBlur, value}) => (
						<TextInput
							label="Telefono"
							mode='outlined'
							value={value}
							onChangeText={text => onChange(text)}
							onBlur={onBlur}
							dense={true}
							style={styles.input}
							error={errors.phoneNumber}
						/>
					)}
				/>
				{errors.phoneNumber && <Text style={styles.textError}>Telefono es requerido.</Text>}
				
				<Button mode='contained'
								labelStyle={{color: 'white'}}
								onPress={handleSubmit(onSubmit)}
								style={styles.button}
								loading={userApi.loading}
								disabled={userApi.loading}
				>
					Actualizar
				</Button>
				<Button mode='outlined'
								onPress={() => navigation.goBack()}
								disabled={userApi.loading}
				>
					Cancelar
				</Button>
			</View>
		</ScrollView>
	</View>;
}


const styles = StyleSheet.create({
	button: {marginVertical: 16},
	input : {marginBottom: 8},
});
