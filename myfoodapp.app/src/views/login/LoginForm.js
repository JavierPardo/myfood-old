// import {loginUserWithEmail} from '../../store/authReducer';
import React, {useState}         from "react";
import {Controller, useForm}     from "react-hook-form";
import {View}                    from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import AuthApi                   from '../../api/auth';
import useAuth                   from "../../auth/useAuth";

const styles = {
    container    : {flex: 1,},
    formContainer: {flex: 1, flexDirection: 'column', paddingHorizontal: 16},
    input        : {marginBottom: 8, padding: 0},
    check        : {flexDirection: 'row', alignItems: 'center'},
    textError    : {color: 'red'}
};

export default ({navigation}) => {
    const {control, handleSubmit, errors} = useForm();
    const authContext                     = useAuth();
    const [loginFailed, setLoginFailed]   = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const onSubmit  = async data => {
        setLoginLoading(true);
        const result = await AuthApi.userLogin(data);
        if (result.ok) await authContext.login(result.data);
        setLoginFailed(!result.ok);
        setLoginLoading(false);
    };
    const goRecover = () => {
        navigation.navigate('RecoverPassword');
    };

    return <View style={styles.container}>
        <View style={styles.formContainer}>
            <Controller
                control={control}
                name="email"
                rules={{required: true}}
                defaultValue=""
                render={({onChange, onBlur, value}) => (
                    <TextInput
                        label="Correo electronico o celular"
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
            {errors.email && <Text style={styles.textError}>Correo electronico o celular es requerido.</Text>}
            <Controller
                control={control}
                name="password"
                rules={{required: true}}
                defaultValue=""
                render={({onChange, onBlur, value}) => (
                    <TextInput
                        label="Contraseña"
                        mode='outlined'
                        value={value}
                        onChangeText={text => onChange(text)}
                        onBlur={onBlur}
                        dense={true}
                        secureTextEntry={true}
                        style={styles.input}
                        error={errors.password}
                    />
                )}
            />
            {errors.password && <Text style={styles.textError}>Contraseña es requerida.</Text>}
            <Button mode="contained"
                    style={{marginVertical: 8}}
                    labelStyle={{color: 'white'}}
                    loading={loginLoading}
                    disabled={loginLoading}
                    onPress={handleSubmit(onSubmit)}>
                Iniciar
            </Button>
            <Button mode="outlined"
                    style={{marginVertical: 8}}
                    disabled={loginLoading}
                    onPress={() => navigation.goBack()}>
                Volver
            </Button>
            <Button
                style={{marginVertical: 8}}
                disabled={loginLoading}
                color={'#696969'}
                onPress={goRecover}>
                Recuperar contraseña
            </Button>
            {loginFailed && <View style={{marginVertical: 8, alignItems: 'center'}}>
                <Text style={styles.textError}>Correo electronico o contraseña incorrecto</Text>
            </View>}
        </View>
    </View>;
}
