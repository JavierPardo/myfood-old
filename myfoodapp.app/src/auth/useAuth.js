import {useContext, useEffect} from 'react';
import auth from "../api/auth";
import useApi from "../hooks/useApi";
import AuthContext from "./context";
import defaultData from "./defaultData";
import storage from "./storage";

const useAuth = () => {
	const {authData, setAuthData} = useContext(AuthContext);
	const {data, error, request}  = useApi(auth.userGetCurrent);
	
	// REACTS TO USER DATA UPDATE
	useEffect(() => {
		if (!error && data)
			setAuthData({user: data});
	}, [data]);
	
	const logOut = async () => {
		await storage.removeToken();
		setAuthData(defaultData);
	};
	
	const login = async (token) => {
		console.log('User Token', token);
		await storage.storeToken(token);
		await request();
	};
	
	return {authData, setAuthData, logOut, login};
};

export default useAuth;
