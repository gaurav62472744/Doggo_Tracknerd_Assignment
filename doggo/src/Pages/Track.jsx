import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import DogoBreed from "../Components/DogoBreed";
import "../Styles/Homepage.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "../Styles/Track.css";

const Track = ({ google }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const trackCoordinates = (n) => {
    const minLat = 8.0685;
    const maxLat = 37.0902;
    const minLng = 68.1097;
    const maxLng = 97.4178;

    let newCoordinates = [];

    for (let i = 0; i < n; i++) {
      let lat = Math.random() * (maxLat - minLat) + minLat;
      let lng = Math.random() * (maxLng - minLng) + minLng;
      newCoordinates.push({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
    }

    setCoordinates(newCoordinates);
  };

  useEffect(() => {
    if (selectedBreed) {
      const fetchCoordinates = async () => {
        try {
          let res = await fetch(
            `https://dog.ceo/api/breed/${selectedBreed}/images/random/10`
          );
          res = await res.json();
          trackCoordinates(10);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCoordinates();
    } else {
      // reset coordinates if no breed is selected
      setCoordinates([]);
    }
  }, [selectedBreed]);

  const handleSelectedDogBreed = useCallback((breed) => {
    setSelectedBreed(breed);
  }, []);

  return (
    <Box>
      <Box className="breed-container" boxShadow="md">
        <DogoBreed handleSelectedDogBreed={handleSelectedDogBreed} />
      </Box>
      <Box>
        <Map
          google={google}
          className="map"
          style={{
            width: "70%",
            height: "380px",
            borderRadius: "20px",
            margin: "auto",
            marginTop: "40px",
            border: "5px solid gray",
          }}
          zoom={4}
        >
          {coordinates.map((coords, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(coords.lat),
                lng: parseFloat(coords.lng),
              }}
            />
          ))}
        </Map>
      </Box>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY,
})(Track);
