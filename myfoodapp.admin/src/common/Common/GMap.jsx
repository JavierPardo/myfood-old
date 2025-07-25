import React from 'react';
// import _ from 'lodash';
import {
  useLoadScript,
  GoogleMap as GoogleMap2,
  Marker,
} from '@react-google-maps/api';
import { Spinner } from 'reactstrap';
import configuration from '../../configuration';
import { useState } from 'react';

// const {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
// } = require('react-google-maps');
// const { withProps, compose } = require('recompose');

// const requiredProps = {
//   googleMapURL:
//     '//maps.google.com/maps/api/js?key=AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA', // &libraries=geometry,drawing,places
//   loadingElement: <div className="gmap">Loading...</div>,
//   containerElement: <div className="gmap" />,
//   mapElement: <div style={{ height: `100%` }} />,
// };
// export default compose(
//   withProps(requiredProps),
//   withScriptjs,
//   withGoogleMap
// )((props) => (
//   <GoogleMap
//     defaultZoom={14}
//     onMapLoad={function () { }}
//     defaultCenter={props.location}
//     onDblClick={props.onLocationSelected}
//     options={{ disableDoubleClickZoom: true }}
//   >
//     {props.locations &&
//       props.locations.map(function (location) {
//         return <Marker position={location} key={Math.random} />;
//       })}
//   </GoogleMap>
// ));

const mapContainerStyle = {
  width: '46rem',
  height: '23rem',
};

const options = {
  disableDoubleClickZoom: true,
};
export function GMap2({ onAddMapPosition, mapCenter, markers, disabled }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configuration.googleMapsApiKey,
    libraries: ['places'],
  });

  function mapClickHandler({ latLng }) {
    onAddMapPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
      id: Math.random(),
    });
  }

  if (loadError) return `Error:${JSON.stringify(loadError)}`;
  if (!isLoaded) return <Spinner />;

  return (
    <div>
      <GoogleMap2
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        onDblClick={function (params) {
          !disabled && mapClickHandler(params);
        }}
        center={mapCenter}
        options={options}
      >
        {markers &&
          markers
            .filter(function (marker) {
              return !!marker;
            })
            .map(function ({ lat, lng }) {
              return (
                <Marker key={Math.random()} position={{ lat, lng }}></Marker>
              );
            })}
      </GoogleMap2>
    </div>
  );
}
