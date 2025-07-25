import React, {useState, useEffect} from "react";
import {Image, ImageBackground, ScrollView, View} from "react-native";
import {Headline, Paragraph, TextInput} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {branchGetItem, branchGetItemOptions, branchGetSides} from "../../api/branch";
import Header from "../../components/Header";
import Tag from "../../components/Tag";
import useApi from "../../hooks/useApi";
import {addCartItem} from "../../store/cartReducer";
import FoodDetailBottom from "./FoodDetailBottom";
import LoadingMessage from "./LoadingMessage";
import OptionItem from "./OptionItem";
import SideItem from "./SideItem";

const styles = {
	banner: {aspectRatio: 1}
};
export default ({navigation}) => {
	const {businessPicked, eventType, foodPicked} = useSelector(store => store.business);
	const [quantity, setQuantity]                 = useState(1);
	const [notes, setNotes]                       = useState('');
	const [chosenSides, setChosenSides]           = useState({});
	const [chosenOptions, setChosenOptions]       = useState({});
	const [totalAmount, setTotalAmount]           = useState(0);
	
	const itemApi   = useApi(branchGetItem); // data already send in items list
	const optionApi = useApi(branchGetItemOptions);
	const sideApi   = useApi(branchGetSides);
	const dispatch  = useDispatch();
	
	useEffect(() => {
		console.log("food", foodPicked.id);
		if (businessPicked) {
			const bootstrap = () => {
				sideApi.request(businessPicked.id);
				optionApi.request(foodPicked.id);
			};
			bootstrap();
		}
	}, [businessPicked]);
	
	useEffect(() => {
		let amount = Number(foodPicked.currentPrice);
		Object.keys(chosenSides).forEach(sideId => {
			amount += Number(chosenSides[sideId].currentPrice);
		});
		setTotalAmount(quantity * amount);
	}, [chosenSides, quantity]);
	
	const recalculatePrice = () => {
	
	};
	
	const handleOptionChange = (name, value) => {
		setChosenOptions({...chosenOptions, [name]: value});
	};
	const handleSideChange   = (name, value) => {
		if (chosenSides[name]) {
			const tempSides = {...chosenSides};
			delete tempSides[name];
			setChosenSides(tempSides);
		} else
			setChosenSides({...chosenSides, [name]: value});
	};
	const handleAddToCart    = async () => {
		await dispatch(addCartItem({
			businessPicked: businessPicked,
			eventType     : eventType,
			food          : foodPicked,
			sides         : chosenSides,
			options       : chosenOptions,
			totalAmount   : totalAmount,
			quantity      : quantity,
			note          : notes,
		}));
		navigation.goBack();
	};
	
	return <View style={{flex: 1}}>
		<Header title={foodPicked.name} onBackClick={() => navigation.goBack()}/>
		
		<View style={{flex: 1}}>
			<ScrollView>
				<ImageBackground source={require('../../../assets/business-bg-default.png')}
												 style={{width: '100%'}}>
					<Image source={{uri: foodPicked.image}} resizeMode="cover" style={styles.banner}/>
				</ImageBackground>
				<View style={{padding: 16,}}>
					<Headline>Información</Headline>
					<Paragraph>{foodPicked.description}</Paragraph>
					<Tag text={`tiempo de preparación: ${foodPicked.prepTimeMins} min`} backgroundColor={'#696969'}/>
					{optionApi.loading && <LoadingMessage message='Cargando opciones . . .'/>}
					{
						optionApi.data && optionApi.data.length > 0 &&
						<>
							<Headline>Opciones</Headline>
							{optionApi.data.map(option => <OptionItem key={option.id}
																												name={option.name}
																												value={chosenOptions[option.name]}
																												choices={option.choices}
																												onChangeHandler={handleOptionChange}/>)}
						</>
					}
					
					{sideApi.loading && <LoadingMessage message='Cargando extras . . .'/>}
					{
						sideApi.data &&
						<>
							<Headline>Extras</Headline>
							{sideApi.data.map(side => <SideItem key={side.id}
																									name={side.name}
																									description={side.description}
																									price={side.currentPrice}
																									side={side}
																									status={!!chosenSides[side.name]}
																									handleChange={handleSideChange}/>)}
						</>
					}
					<TextInput mode='outlined'
										 label={'Nota'}
										 numberOfLines={3}
										 multiline={true}
										 dense={true}
										 value={notes}
										 onChangeText={text => setNotes(text)}
										 placeholder={'alguna observación'}
					/>
				</View>
			</ScrollView>
		</View>
		<FoodDetailBottom foodName={foodPicked.name}
											amount={totalAmount}
											quantity={quantity}
											onMinusClick={() => {
												if (quantity > 1) setQuantity(quantity - 1);
											}}
											onPlusClick={() => {
												setQuantity(quantity + 1);
											}}
											onAddClick={handleAddToCart}/>
	</View>;
}
