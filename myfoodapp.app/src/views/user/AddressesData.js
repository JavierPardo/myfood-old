import {FontAwesome5, FontAwesome5 as Icon} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, Easing, Image, SafeAreaView, StyleSheet, View} from "react-native";
import Toast from 'react-native-easy-toast';
import MapView, {Marker} from 'react-native-maps';
import {
	Avatar,
	Button,
	Caption,
	Card,
	IconButton,
	Paragraph,
	TextInput,
	ToggleButton,
	useTheme
} from "react-native-paper";
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from "react-redux";
import MarkerOrange from '../../../assets/markers/marker_orange.svg';
import {locationAdd, locationDelete} from "../../api/location";
import Geo from "../../components/Geo";
import useApi from "../../hooks/useApi";
import {LOCATION_TYPE_HOME, LOCATION_TYPES} from "../../utils/constants";

const styles = StyleSheet.create({
	fab    : {position: 'absolute', margin: 16, right: 0, bottom: 0,},
	mapView: {width: Dimensions.get('window').width, flex: 1},
	pointer: {
		width: 40, height: 40, position: 'absolute',
		left : (Dimensions.get('window').width / 2) - 20,
		top  : ((Dimensions.get('window').height + getStatusBarHeight()) / 2) - 20,
	},
	form   : {}
});


export default ({navigation, route}) => {
	const {colors}                            = useTheme();
	// const dispatch                            = useDispatch();
	const toastRef                            = useRef();
	const mapRef                              = useRef(null);
	const [location, setLocation]             = useState(null);
	const [notes, setNotes]                   = useState('');
	const {userCurrentLocation}               = useSelector(store => store.ui.app);
	const [locationType, setLocationType]     = useState(LOCATION_TYPE_HOME);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const {newAddress, locationObject}        = route.params;
	const [collapse, setCollapse]             = useState(true);
	const [height, setHeight]                 = useState(0);
	const locationAddApi                      = useApi(locationAdd);
	const locationDeleteApi                   = useApi(locationDelete);
	
	const [cardBottom] = useState(new Animated.Value(400));
	const cardUp       = () => {
		Animated.timing(cardBottom, {
			toValue        : 0,
			duration       : 500,
			useNativeDriver: true,
			easing         : Easing.elastic(2),
		}).start();
	};
	const cardDown     = () => {
		Animated.timing(cardBottom, {
			toValue        : height - 40,
			duration       : 500,
			useNativeDriver: true,
			easing         : Easing.elastic(2),
		}).start();
	};
	
	
	useEffect(() => {
		setTimeout(() => {
			cardUp();
		}, 200);
	}, []);
	
	useEffect(() => {
		if (collapse) cardUp();
		else cardDown();
	}, [collapse]);
	
	const handleSaveSubmit = async () => {
		//TODO capturar country y city
		await locationAddApi.request({
			"coordinates": location.latitude + ',' + location.longitude,
			"address"    : location.address,
			"notes"      : notes,
			"iconIndex"  : locationType,
			"countryId"  : 26,
			"cityId"     : 1
		});
		navigation.goBack();
	};
	
	return <SafeAreaView style={{flex: 1}}>
		
		<View style={{flex: 1}}>
			<MapView
				ref={mapRef}
				style={styles.mapView}
				showsUserLocation={true}
				initialRegion={{
					latitude      : newAddress ? userCurrentLocation.latitude : Number(locationObject.coordinates.split(",")[0]),
					longitude     : newAddress ? userCurrentLocation.longitude : Number(locationObject.coordinates.split(",")[1]),
					latitudeDelta : 0.0352,
					longitudeDelta: 0.0221
				}}
				onRegionChangeComplete={async (region) => {
					let addressPromise = await Geo.from({
						lat: region.latitude,
						lng: region.longitude
					});
					setLocation({
						latitude : region.latitude,
						longitude: region.longitude,
						address  : addressPromise.results[0].formatted_address
					});
					// dispatch(requestSuccess());
				}}
				onPanDrag={() => {
					// dispatch(requestStart());
				}}
			>
				{
					!newAddress &&
					<Marker coordinate={{
						latitude : Number(locationObject.coordinates.split(",")[0]),
						longitude: Number(locationObject.coordinates.split(",")[1]),
					}}>
						<MarkerOrange style={{}} height={60} width={38}/>
					</Marker>
				}
			</MapView>
			{newAddress && <Image source={require('../../../assets/pointer.png')} style={styles.pointer}/>}
			
			<Animated.View style={{position: 'absolute', bottom: 32, translateY: cardBottom, left: 16, right: 16}}
										 onLayout={layout => {
											 setHeight(layout.nativeEvent.layout.height);
										 }}
			>
				<Card style={{}}>
					<Card.Title
						left={(props) => (
							<Avatar.Icon {...props}
													 icon={newAddress
																 ? locationAddApi.loading || locationDeleteApi.loading ? "clock" : "map-marker"
																 : () => <Icon name={LOCATION_TYPES[locationObject.iconIndex].icon}
																							 size={18}/>
													 }
													 color={'white'}/>
						)}
						right={(props) => <IconButton {...props} icon={collapse ? "chevron-down" : "chevron-up"} onPress={() => {
							setCollapse(!collapse);
						}}/>}
						title={newAddress ? 'Ubicacion' : LOCATION_TYPES[locationObject.iconIndex].label}
						subtitle={!collapse && location && location.address}
					/>
					{
						newAddress
						? (
							<Card.Content>
								<View>
									<TextInput
										label="Dirección"
										value={location && location.address}
										dense={true}
										mode={'outlined'}
										onChangeText={text => setLocation({...location, address: text})}
										style={{marginVertical: 8}}
									/>
									<TextInput
										label="Notas"
										value={notes}
										dense={true}
										mode={'outlined'}
										multiline={true}
										numberOfLines={3}
										onChangeText={text => setNotes(text)}
										style={{marginVertical: 8}}
									/>
									
									<ToggleButton.Row
										onValueChange={value => setLocationType(value)}
										value={locationType}
										style={{marginVertical: 8, flex: 1}}
									>
										{
											Object.entries(LOCATION_TYPES).map(item => (
												<ToggleButton key={item[0]}
																			style={{flex: 1,}}
																			icon={() => <FontAwesome5 name={item[1].icon}
																																size={16}
																																color={locationType === item[0] ? colors.primary : 'gray'}
																			/>}
																			value={item[0]}
												/>
											))
										}
									</ToggleButton.Row>
								</View>
							</Card.Content>
						)
						: (
							<Card.Content>
								<View>
									<Caption>Dirección</Caption>
									<Paragraph>{locationObject.address}</Paragraph>
									<View style={{height: 16}}></View>
									<Caption>Notas</Caption>
									<Paragraph>{locationObject.notes}</Paragraph>
								</View>
							</Card.Content>
						)
					}
					<Card.Actions style={{justifyContent: 'space-around'}}>
						{
							newAddress
							? <Button mode={'contained'}
												labelStyle={{color: 'white'}}
												style={{elevation: 0}}
												disabled={locationAddApi.loading}
												loading={locationAddApi.loading}
												onPress={() => {
													if (locationType !== '')
														handleSaveSubmit();
													else
														toastRef.current.show("Seleccione un tipo de ubicación", 1000);
												}}
							>Guardar</Button>
							
							: <Button mode={'contained'}
												labelStyle={{color: 'white'}}
												style={{elevation: 0}}
												disabled={locationDeleteApi.loading}
												loading={locationDeleteApi.loading}
												onPress={() => {
													setConfirmVisible(true);
												}}
							>Eliminar</Button>
						}
						
						<Button mode={'outlined'}
										disabled={locationAddApi.loading || locationDeleteApi.loading}
										onPress={() => navigation.goBack()}
						>Volver</Button>
					</Card.Actions>
				</Card>
			</Animated.View>
		</View>
		<Toast ref={toastRef}/>
		<ConfirmDialog
			title="Confirmar operación"
			message="¿Seguro de eliminar esta ubicación?"
			visible={confirmVisible}
			onTouchOutside={() => setConfirmVisible(false)}
			positiveButton={{
				title  : "YES",
				onPress: async () => {
					setConfirmVisible(false);
					await locationDeleteApi.request(locationObject.id);
					navigation.goBack();
				}
			}}
			negativeButton={{
				title: "NO", onPress: () => setConfirmVisible(false)
			}}
		/>
	</SafeAreaView>;
}
