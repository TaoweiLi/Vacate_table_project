import React from 'react';
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "./Map.scss";

function Map({ location, zoomLevel, restaurant }) {
  const redirectUrl = `https://www.google.com/maps/search/${restaurant.name} ${restaurant.address}`

  return (
    <div>
      {/* {<h2 className="map-h2">Come Visit Us At Our Campus</h2>} */}
      <a target="_blank" rel="noopener noreferrer" href={redirectUrl}>
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDfNoYvBcS8E7_xp2Q9qH54VJfmCxGQTl4" }}
            defaultCenter={location}
            defaultZoom={13}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
            />

          </GoogleMapReact>
        </div>
      </a>
      {/* <div>Map</div> */}
    </div>
  )
}

export default Map;