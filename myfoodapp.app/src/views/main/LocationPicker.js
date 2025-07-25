import React, {useEffect, useRef, useState} from "react";
import {Dimensions, Image, ScrollView, View} from "react-native";
import MapView from 'react-native-maps';
import {Button, Headline, Surface, Text} from "react-native-paper";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useDispatch, useSelector} from "react-redux";
import LocationItem from "../../components/LocationItem";
// import {loadLocations} from "../../store/userReducer";
import {LOCATION_TYPES} from "../../utils/constants";

const styles = {
	mapView      : {width: Dimensions.get('window').width, flex: 1},
	listContainer: {flex: 1},
	pointer      : {
		width   : 40,
		height  : 40,
		position: 'absolute',
		bottom  : 0,
		left    : (Dimensions.get('window').width / 2) - 20,
		top     : (Dimensions.get('window').height / 3) - 20 - (getStatusBarHeight() / 2),
	}
};
export default ({navigation}) => {
	const mapRef                  = useRef(null);
	const [location, setLocation] = useState(null);
	const userLocation            = useSelector(store => store.ui.app.userCurrentLocation);
	const dispatch                = useDispatch();
	const {locations}             = useSelector(store => store.entities.user);
	
	
	// useEffect(() => {
	// 	dispatch(loadLocations());
	// }, []);
	
	useEffect(() => {
		if (location != null && location.latitude) {
			mapRef.current.animateCamera({
				center: {
					latitude : location.latitude,
					longitude: location.longitude,
					default  : false,
				},
				zoom  : 15
			}, 500);
		}
	}, [location]);
	
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 2}}>
				<MapView
					ref={mapRef}
					style={styles.mapView}
					showsUserLocation={true}
					initialRegion={{
						latitude      : userLocation.latitude,
						longitude     : userLocation.longitude,
						latitudeDelta : 0.0922,
						longitudeDelta: 0.0421
					}}
				/>
				<Image source={require('../../../assets/pointer.png')} style={styles.pointer}/>
				<View style={{
					position       : 'absolute',
					bottom         : 16,
					left           : 16,
					right          : 16,
					backgroundColor: 'white',
					borderRadius   : 4,
					padding        : 16,
					justifyContent : 'center'
				}}>
					<Text style={{textAlign: 'center'}}>Costo de delivery 25 Bs.</Text>
				</View>
			
			</View>
			<View style={styles.listContainer}>
				<ScrollView>
					<View style={{padding: 16}}>
						<LocationItem
							name={"Mi ubicación actual"}
							icon={'user'}
							address={''}
							onPress={() => setLocation(userLocation)}
						/>
						{
							locations.map((item, index) => {
								return <LocationItem
									key={index}
									name={LOCATION_TYPES[item.notes].label}
									address={item.address}
									icon={LOCATION_TYPES[item.notes].icon}
									onPress={async () => {
										setLocation({
											latitude : Number(item.coordinates.split(',')[0]),
											longitude: Number(item.coordinates.split(',')[1]),
										});
									}}
								/>;
							})
						}
					</View>
				</ScrollView>
			
			</View>
			<Surface style={{
				flexDirection    : 'row',
				justifyContent   : 'space-around',
				paddingVertical  : 16,
				paddingHorizontal: 8,
				backgroundColor  : 'white',
				elevation        : 1,
				borderRadius     : 4,
			}}>
				<Button mode='outlined'
								onPress={() => navigation.goBack()}
								compact={true}
				>
					Volver
				</Button>
				<Button mode='contained'
								onPress={() => navigation.navigate('BusinessDetail', {type: 'DELIVERY'})}
								labelStyle={{color: 'white'}}
								compact={true}
				>
					Escoger
				</Button>
				<Button mode='contained'
								onPress={() => navigation.navigate('BusinessDetail', {type: 'DELIVERY'})}
								labelStyle={{color: 'white'}}
								compact={true}
				>
					Guardar
				</Button>
			</Surface>
			<Surface style={{
				position      : 'absolute',
				top           : 40,
				left          : 16,
				right         : 16,
				elevation     : 1,
				padding       : 8,
				justifyContent: 'center', alignItems: 'center',
				borderRadius  : 4
			}}>
				<Headline style={{}}>Escoge tu ubicación</Headline>
			</Surface>
		</View>
	);
}
