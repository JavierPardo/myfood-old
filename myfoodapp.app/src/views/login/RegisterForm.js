import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {View} from "react-native";
import {Button, Checkbox, Text, TextInput} from "react-native-paper";
import AuthApi from "../../api/auth";
import useAuth from "../../auth/useAuth";


const styles = {
	container: {flexDirection: 'column', paddingHorizontal: 16},
	input    : {marginBottom: 8,},
	check    : {flexDirection: 'row', alignItems: 'center'},
	textError: {color: 'red'}
};

export default ({navigation}) => {
	const {control, handleSubmit, errors, getValues} = useForm();
	const authContext                                = useAuth();
	const [registerFailed, setRegisterFailed]        = useState(false);
	const [registerLoading, setRegisterLoading]      = useState(false);
	const [flags, setFlags]                          = useState({
		characterCase      : false,
		characterLength    : false,
		passwordComparison : false,
		hasNumber          : false,
		hasSpecialCharacter: false,
	});
	
	const onSubmit = async data => {
		setRegisterLoading(true);
		const result = await AuthApi.userRegister(data);
		if (result.ok)
			await authContext.login(result.data);
		setRegisterFailed(!result.ok);
		setRegisterLoading(false);
	};
	
	return <View style={styles.container}>
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
			name="email"
			rules={{required: true}}
			defaultValue=""
			render={({onChange, onBlur, value}) => (
				<TextInput
					label="Correo electronico"
					mode='outlined'
					autoCompleteType='email'
					textContentType='emailAddress'
					keyboardType='email-address'
					autoCapitalize='none'
					value={value}
					onChangeText={text => onChange(text)}
					onBlur={onBlur}
					dense={true}
					style={styles.input}
					error={errors.email}
				/>
			)}
		/>
		{errors.email && <Text style={styles.textError}>Correo electronico es requerido.</Text>}
		
		
		<Controller
			control={control}
			name="phoneNumber"
			rules={{required: true}}
			defaultValue=""
			render={({onChange, onBlur, value}) => (
				<TextInput
					label="Celular"
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
		{errors.email && <Text style={styles.textError}>Numero de celular es requerido.</Text>}
		
		<Controller
			control={control}
			name="password"
			rules={{
				required: true,
			}}
			defaultValue=""
			render={({onChange, onBlur, value}) => (
				<TextInput
					label="Contraseña"
					mode='outlined'
					value={value}
					onChangeText={text => {
						const confirmPassword = getValues('confirmPassword');
						setFlags({
							characterCase      : /^(?=.*[a-z])(?=.*[A-Z]).+$/g.test(text),
							characterLength    : text.length > 6,
							passwordComparison : text === confirmPassword,
							hasNumber          : /^(?=.*\d).+$/g.test(text),
							hasSpecialCharacter: /[~`!@#$%\^&*+=\-\[\]\\';,./{}|\\":<>\?]/g.test(text),
						});
						onChange(text);
					}}
					onBlur={onBlur}
					dense={true}
					secureTextEntry={true}
					style={styles.input}
					error={errors.password}
				/>
			)}
		/>
		{errors.password && <Text style={styles.textError}>Password es requerido.</Text>}
		
		<Controller
			control={control}
			name="confirmPassword"
			rules={{required: true}}
			defaultValue=""
			render={({onChange, onBlur, value}) => (
				<TextInput
					label="Confirmar contraseña"
					mode='outlined'
					value={value}
					onChangeText={text => {
						const password = getValues('password');
						setFlags({
							characterCase      : flags.characterCase,
							characterLength    : flags.characterLength,
							passwordComparison : text === password,
							hasNumber          : flags.hasNumber,
							hasSpecialCharacter: flags.hasSpecialCharacter,
						});
						onChange(text);
					}}
					onBlur={onBlur}
					dense={true}
					secureTextEntry={true}
					style={styles.input}
					error={errors.confirmPassword}
				/>
			)}
		/>
		{errors.confirmPassword && <Text style={styles.textError}>La confirmación de password es requerido.</Text>}
		
		
		<View style={styles.check}>
			<Checkbox
				status={flags.characterCase ? 'checked' : 'unchecked'}
				color={'green'}
			/>
			<Text>La contraseña debe contener un caracter en mayuscula y minuscula</Text>
		</View>
		<View style={styles.check}>
			<Checkbox
				status={flags.characterLength ? 'checked' : 'unchecked'}
				color={'green'}
			/>
			<Text>La contraseña tiene que ser mayor a 6 caracteres</Text>
		</View>
		<View style={styles.check}>
			<Checkbox
				status={flags.hasNumber ? 'checked' : 'unchecked'}
				color={'green'}
			/>
			<Text>La contraseña debe contener un numero</Text>
		</View>
		<View style={styles.check}>
			<Checkbox
				status={flags.passwordComparison ? 'checked' : 'unchecked'}
				color={'green'}
			/>
			<Text>Las contraseñas deben coincidir</Text>
		</View>
		<View style={styles.check}>
			<Checkbox
				status={flags.hasSpecialCharacter ? 'checked' : 'unchecked'}
				color={'green'}
			/>
			<Text>La contraseña debe contener un caracter especial</Text>
		</View>
		<Button mode="contained"
						style={{marginVertical: 8}}
						labelStyle={{color: 'white'}}
						loading={registerLoading}
						disabled={registerLoading}
						onPress={handleSubmit(onSubmit)}>
			Registrar
		</Button>
		<Button mode="outlined"
						style={{marginVertical: 8}}
						disabled={registerLoading}
						onPress={() => navigation.goBack()}>
			Volver
		</Button>
		{registerFailed &&
		 <View style={{marginVertical: 8, alignItems: 'center'}}>
			 <Text style={styles.textError}>Correo electronico o contraseña incorrecto</Text>
		 </View>
		}
	</View>;
}
