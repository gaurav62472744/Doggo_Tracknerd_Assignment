import React from "react";
import { useState, useEffect } from "react";
import { Image, Box, Text } from "@chakra-ui/react";

import doggo from "../Utils/doggo.png";
import "../Styles/Homepage.css";

const DogoBreed = ({ handleSelectedDogBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const dogoBreeds = async () => {
    try {
      let res = await fetch("https://dog.ceo/api/breeds/list/all");
      res = await res.json();
      setBreeds(Object.keys(res.message));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dogoBreeds();
  }, []);

  return (
    <>
      {breeds &&
        breeds.map((newBreed, index) => (
          <Box
            className="breeds"
            fontFamily="Philosopher"
            tabIndex={0}
            onClick={() => handleSelectedDogBreed(newBreed)}
          >
            <Text
              width="180px"
              height="100px"
              color="white"
              fontFamily="Philosopher"
              display={"flex"}
              textAlign="center"
              alignItems={"center"}
              margin="auto"
              key={index}
            >
              <Image ml="-10px" w="80px" src={doggo} />
              {newBreed.charAt(0).toUpperCase() + newBreed.slice(1)}
            </Text>
          </Box>
        ))}
    </>
  );
};

export default DogoBreed;
