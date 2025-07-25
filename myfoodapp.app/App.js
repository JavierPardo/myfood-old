import {NavigationContainer} from '@react-navigation/native';
import {AppLoading} from "expo";
import {useFonts} from 'expo-font';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import auth from "./src/api/auth";
import AuthContext from "./src/auth/context";
import defaultData from "./src/auth/defaultData";
import Navigation from './src/components/navigation';
import useApi from "./src/hooks/useApi";
import configureStore from './src/store/configureStore';
import {mainTheme} from './src/utils/theme';


export default function App() {
	
	// SETTING FONTS
	const [loaded] = useFonts({
		GilroyExtraBold : require('./assets/fonts/Gilroy-ExtraBold.otf'),
		GilroyLight     : require('./assets/fonts/Gilroy-Light.otf'),
		MyriadProRegular: require('./assets/fonts/MyriadPro-Regular.otf'),
	});
	
	// REDUX SETUP
	const store = configureStore();
	
	// VALIDATING TOKEN AND USER
	const {data, error, request}  = useApi(auth.userGetCurrent);
	const [authData, setAuthData] = useState(defaultData);
	const [isReady, setIsReady]   = useState(false);
	
	useEffect(() => {
		if (!error)
			setAuthData({user: data});
	}, [data]);
	
	if (!loaded) {
		return null;
	}
	if (!isReady)
		return <AppLoading startAsync={request} onFinish={() => setIsReady(true)}/>;
	
	return (
		<AuthContext.Provider value={{authData, setAuthData}}>
			<Provider store={store}>
				<PaperProvider theme={mainTheme}>
					<NavigationContainer>
						<Navigation/>
					</NavigationContainer>
				</PaperProvider>
			</Provider>
		</AuthContext.Provider>
	);
}
