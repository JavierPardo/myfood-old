import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {ScrollView, View} from "react-native";
import {Button, Checkbox, Text, TextInput} from "react-native-paper";
import Header from "../../components/Header";


const styles = {
	input: {marginBottom: 8},
	check: {flexDirection: 'row', alignItems: 'center'},
};

export default ({navigation}) => {
	
	// const userApi = useApi(user)
	const {control, handleSubmit, errors, getValues} = useForm();
	const [flags, setFlags]                          = useState({
		characterCase      : false,
		characterLength    : false,
		passwordComparison : false,
		hasNumber          : false,
		hasSpecialCharacter: false,
	});
	const onSubmit                                   = async data => {
		// setRegisterLoading(true);
		// const result = await AuthApi.userRegister(data);
		// if (!result.ok) return setRegisterFailed(true);
		// setRegisterFailed(false);
		// await authContext.login(result.data);
		// setRegisterLoading(false);
		navigation.goBack();
	};
	
	return <View>
		<Header title='Cambiar contraseña'
						onBackClick={() => navigation.goBack()}
		/>
		
		<ScrollView>
			<View style={{padding: 16}}>
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
					<Text style={{width:350}}>La contraseña debe contener un caracter en mayuscula y minuscula</Text>
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
								loading={false}
								disabled={false}
								onPress={handleSubmit(onSubmit)}>
					Actualizar
				</Button>
			</View>
		</ScrollView>
	</View>;
}
