import {DefaultTheme} from "react-native-paper";

const mainTheme = {
	...DefaultTheme,
	roundness: 4,
	colors   : {
		...DefaultTheme.colors,
		accent : '#da2d2d',
		primary: '#f6991d',
		text   : '#2c2d2d'
	},
	fonts    : {
		regular: {
			fontFamily: 'MyriadProRegular',
			fontWeight: 'normal',
		},
		medium : {
			fontFamily: 'GilroyExtraBold',
			fontWeight: 'normal',
		},
		light  : {
			fontFamily: 'GilroyLight',
			fontWeight: 'normal',
		},
		thin   : {
			fontFamily: 'GilroyExtraBold',
			fontWeight: 'normal',
		},
	},
};

export {mainTheme};
