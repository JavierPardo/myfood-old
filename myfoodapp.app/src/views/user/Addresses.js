import React, {useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {FAB, Text} from "react-native-paper";
import {useDispatch} from "react-redux";
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import {locationList} from '../../api/location';
import Header from "../../components/Header";
import LocationItem from "../../components/LocationItem";
import useApi from "../../hooks/useApi";
import {LOCATION_TYPES} from '../../utils/constants';

const styles = StyleSheet.create({
	fab: {position: 'absolute', margin: 16, right: 0, bottom: 0,},
});

export default ({navigation}) => {
	
	const dispatch                        = useDispatch();
	const {data, error, request, loading} = useApi(locationList);
	
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			request();
		});
		return unsubscribe;
	}, [navigation]);
	
	
	return <View style={{flex: 1}}>
		<Header title='Direcciones' onBackClick={() => navigation.goBack()}/>
		<ScrollView>
			<View style={{padding: 16}}>
				{
					loading
					? <View style={{padding: 16}}>
						{[1, 2, 3].map((item) => (
							<Placeholder key={item}
													 Animation={Fade}
													 Left={PlaceholderMedia}
													 style={{marginBottom: 16}}
							>
								<PlaceholderLine width={80}/>
								<PlaceholderLine/>
								<PlaceholderLine width={30}/>
							</Placeholder>
						))}
					</View>
					: data && data.length > 0
						? data.map((item, index) => {
							return (
								<LocationItem
									key={index}
									name={LOCATION_TYPES[item.iconIndex].label}
									address={item.address}
									icon={LOCATION_TYPES[item.iconIndex].icon}
									onPress={() => {
										navigation.navigate('AddressesData', {newAddress: false, locationObject: item,});
									}}
								/>
							);
						})
						: <View><Text>No tienes direcciones</Text></View>
				}
			</View>
		</ScrollView>
		<FAB
			style={styles.fab}
			small
			icon="plus"
			onPress={() => navigation.navigate('AddressesData', {newAddress: true})}
		/>
	</View>;
}
