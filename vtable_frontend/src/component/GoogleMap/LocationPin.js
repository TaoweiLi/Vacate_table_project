import React from "react";
// import {Icon} from "@iconify"
import LocationOnIcon from "@mui/icons-material/LocationOn";

function LocationPin({text}) {
  return (
    <div className="pin">
      <LocationOnIcon className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )
}

export default LocationPin;