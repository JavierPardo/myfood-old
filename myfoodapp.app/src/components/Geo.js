import Geocoder from 'react-native-geocoding';
import {API_KEY} from "../utils/constants";

Geocoder.init(API_KEY, {language: "es"});

export default Geocoder;
