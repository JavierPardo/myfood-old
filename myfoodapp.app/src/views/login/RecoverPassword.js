import React, {useState}                              from "react";
import {View}                                         from "react-native";
import {Button, Headline, Paragraph, Text, TextInput} from "react-native-paper";
import {getStatusBarHeight}                           from 'react-native-status-bar-height'

import useApi                from "../../hooks/useApi";
import {userRecoverPassword} from "../../api/user";

const styles = {
    container: {flex: 1, paddingTop: getStatusBarHeight()},
    content  : {padding: 16},
    title    : {fontFamily: 'GilroyExtraBold', fontSize: 24},
    button   : {backgroundColor: '#737373', marginBottom: 20},
};

export default ({navigation}) => {
    const recoverApi            = useApi(userRecoverPassword);
    const [email, setEmail]     = useState('');
    const [message, setMessage] = useState('')

    const handleRecover = async () => {
        await recoverApi.request({email: email})
        if (recoverApi.error) { setMessage('Surgio un error') }
        else {setMessage('Revisa tu correo electrónico')}

    }

    return <View style={styles.container}>
        <View style={styles.content}>
            <Headline style={styles.title}>Recuperar contraseña</Headline>
            <Paragraph>Ingresa tu correo electronico para recuperar tu contraseña</Paragraph>
            <TextInput dense={true}
                       style={{marginBottom: 16}}
                       value={email}
                       onChangeText={text => setEmail(text)}
                       autoCapitalize={'none'}
                       autoCompleteType={'email'}
                       keyboardType={'email-address'}
            />

            <Button mode="contained"
                    style={{marginVertical: 8}}
                    labelStyle={{color: 'white'}}
                    loading={recoverApi.loading}
                    disabled={recoverApi.loading}
                    onPress={handleRecover}>
                Enviar
            </Button>
            <Button
                color="#696969"
                mode="outlined"
                loading={recoverApi.loading}
                disabled={recoverApi.loading}
                onPress={() => navigation.goBack()}>
                Volver
            </Button>
            {message.length > 0 && <Paragraph style={{textAlign: 'center'}}>{message}</Paragraph>}
        </View>
    </View>;
}
