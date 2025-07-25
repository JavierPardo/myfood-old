import React from "react";
import {ScrollView, View,} from "react-native";
import {Button, Menu, Subheading} from "react-native-paper";
import Header from "../../components/Header";
import OrderItem from "../../components/OrderItem";

const orders = [
	{title: "Pedido #678", url: 'https://picsum.photos/200/300?l=1', status: 'en proceso', statusColor: 'orange'},
	{title: "Pedido #567", url: 'https://picsum.photos/200/300?l=2', status: 'cancelado', statusColor: 'orange'},
	{title: "Pedido #536", url: 'https://picsum.photos/200/300?l=3', status: 'en proceso', statusColor: 'orange'},
	{title: "Pedido #512", url: 'https://picsum.photos/200/300?l=4', status: 'completado', statusColor: 'green'},
	{title: "Pedido #498", url: 'https://picsum.photos/200/300?l=5', status: 'en proceso', statusColor: 'orange'},
	{title: "Pedido #468", url: 'https://picsum.photos/200/300?l=6', status: 'cancelado', statusColor: 'red'},
	{title: "Pedido #427", url: 'https://picsum.photos/200/300?l=7', status: 'en proceso', statusColor: 'orange'},
	{title: "Pedido #367", url: 'https://picsum.photos/200/300?l=8', status: 'completado', statusColor: 'green'},
	{title: "Pedido #345", url: 'https://picsum.photos/200/300?l=9', status: 'en proceso', statusColor: 'orange'},
	{title: "Pedido #345", url: 'https://picsum.photos/200/300?l=10', status: 'completado', statusColor: 'green'},
	{title: "Pedido #345", url: 'https://picsum.photos/200/300?l=11', status: 'cancelado', statusColor: 'red'},
	{title: "Pedido #345", url: 'https://picsum.photos/200/300?l=12', status: 'completado', statusColor: 'green'},
	{title: "Pedido #345", url: 'https://picsum.photos/200/300?l=13', status: 'completado', statusColor: 'green'},
];
export default ({navigation}) => {
	const [menuVisible, setMenuVisible] = React.useState(false);
	const openMenu                      = () => setMenuVisible(true);
	const closeMenu                     = () => setMenuVisible(false);
	
	return <View>
		<Header title='Mis ordenes' onBackClick={() => {
			navigation.pop();
		}}/>
		
		
		<ScrollView style={{flexDirection: 'column', padding: 16}}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
				<Subheading>Filtrar</Subheading>
				<Menu
					visible={menuVisible}
					onDismiss={closeMenu}
					anchor={<Button onPress={openMenu}>Mostrando todos</Button>}>
					<Menu.Item onPress={() => {
						closeMenu();
					}} title="Todos"/>
					<Menu.Item onPress={() => {
						closeMenu();
					}} title="Completos"/>
					<Menu.Item onPress={() => {
						closeMenu();
					}} title="En proceso"/>
					<Menu.Item onPress={() => {
						closeMenu();
					}} title="Cancelados"/>
				</Menu>
			</View>
			{orders.map((item, index) => {
				return <OrderItem key={index}
													title={item.title}
													url={item.url}
													status={item.status}
													statusColor={item.statusColor}
													onPress={() => {
														navigation.navigate('OrderDetail');
													}}/>;
			})}
		</ScrollView>
	</View>
		;
}
