import React from 'react';
import {Dimensions} from 'react-native';
import {SliderBox} from "react-native-image-slider-box";

const Slider = () => (
	<SliderBox
		images={[
			require('../../assets/slider/slide1.png'),
			require('../../assets/slider/slide2.png'),
			require('../../assets/slider/slide3.png'),
			"https://source.unsplash.com/1200x400/?soup", // Network image
		]}
		sliderBoxHeight={(Dimensions.get('window').width - 32) / 3}
		onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
		dotColor="#FFEE58"
		inactiveDotColor="#90A4AE"
		paginationBoxVerticalPadding={20}
		autoplay
		circleLoop
		resizeMethod={'resize'}
		resizeMode={'cover'}
		paginationBoxStyle={{
			position      : "absolute",
			bottom        : 0,
			alignItems    : "center",
			alignSelf     : "center",
			justifyContent: "center",
			padding       : 16,
			elevation     : 2
		}}
		dotStyle={{
			width           : 6,
			height          : 6,
			borderRadius    : 5,
			marginHorizontal: 0,
			padding         : 0,
			margin          : 0,
			backgroundColor : "rgba(128, 128, 128, 0.92)"
		}}
		ImageComponentStyle={{borderRadius: 4, width: Dimensions.get('window').width - 32, marginTop: 5}}
		imageLoadingColor="#2196F3"
	/>
);

export default Slider;
