import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { PropTypes } from "prop-types";

function LocationMap({ lat, long }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

  const mapSize = {
    height: "50vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: lat,
    lng: long,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapSize} zoom={13} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
}

LocationMap.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};

export default LocationMap;
