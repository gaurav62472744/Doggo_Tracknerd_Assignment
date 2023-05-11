import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import DogoBreed from "../Components/DogoBreed";
import "../Styles/Homepage.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const Track = ({ google }) => {
  const [selectBreed, setSelectBreed] = useState("");
  const handleSelectedDogBreed = (newBreed) => {
    setSelectBreed(newBreed);
  };
  const style = {
    width: "100%",
    height: "100%",
  };
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <Box className="breed-container" box-shadow="md">
        <DogoBreed handleSelectedDogBreed={handleSelectedDogBreed} />
      </Box>

      <Map
        google={google}
        style={{
          width: "70%",
          height: "400px",
          borderRadius: "50px",
          margin: "auto",
          marginTop: "40px",
          border: "5px solid gray",
        }}
        zoom={14}
      >
        <Marker name={"Current location"} />

        <InfoWindow></InfoWindow>
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY,
})(Track);
