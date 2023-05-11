import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  Flex,
  Box,
  Text,
  Grid,
  Spinner,
  Button,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import axios from "axios";
import DoggoModal from "../Components/DoggoModal";
import doggo from "../Utils/doggo.png";
import "../Styles/Homepage.css";
import Loading from "../Components/Loader";

const Homepage = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  //Fetching list of breeds
  //  const dogoBreeds=()=>{

  //  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        setBreeds(Object.keys(response.data.message));
        setLoading(false);
      })

      .catch((error) => console.log(error));
  }, []);
  console.log(breeds);

  // Fetching breed images when breed is selected else random images will be display
  useEffect(() => {
    if (selectedBreed) {
      setLoading(true);
      axios
        .get(`https://dog.ceo/api/breed/${selectedBreed}/images`)
        .then((response) => {
          setImages(response.data.message);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setLoading(true);
      axios
        .get("https://dog.ceo/api/breeds/image/random/30")
        .then((response) => {
          setImages(response.data.message);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedBreed]);

  // like count

  const handleClick = (index) => {
    if (liked) {
      setCount(count - 1);
      setLiked(false);
    } else {
      setCount(count + 1);
      setLiked(true);
    }
  };

  // Function to handle breed selection
  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
  };

  // Handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <>
      <Flex
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
        padding="4"
        gap="10px"
        fontFamily="Philosopher"
        overflowY="hidden"
        overflowX="scroll"
      >
        {breeds.map((breed, index) => (
          <Box
            className="breeds"
            fontFamily="Philosopher"
            tabIndex={0}
            onClick={() => handleBreedSelect(breed)}
          >
            <Text
              width="185px"
              height="100px"
              color="white"
              fontFamily="Philosopher"
              display={"flex"}
              textAlign="center"
              alignItems={"center"}
              margin="auto"
            >
              <Image ml="-10px" w="80px" src={doggo} />
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </Text>
          </Box>
        ))}
      </Flex>
      {selectedBreed ? (
        <Text
          fontFamily="Philosopher"
          backgroundColor="#ff3e6c"
          rounded="2xl"
          textAlign="center"
          color={"black"}
          margin="auto"
          marginBottom="16px"
          fontWeight="semibold"
          fontSize={{ base: "xs", md: "md", lg: "lg" }}
          width={{ base: "90%", md: "50%", lg: "30%" }}
        >
          {selectedBreed.charAt(0).toUpperCase() + selectedBreed.slice(1)}{" "}
          Images: Click any one to view full image
        </Text>
      ) : (
        <Text
          fontWeight="semibold"
          fontFamily="Philosopher"
          rounded="2xl"
          textAlign="center"
          backgroundColor="#ff3e6c"
          width={{ base: "70%", md: "30%", lg: "20%" }}
          m="auto"
          mb="16px"
        >
          Select Any Doggo Breed From Above
        </Text>
      )}

      {loading ? (
        <Loading />
      ) : (
        // <Box
        //   fontFamily="Philosopher"
        //   display="flex"
        //   justifyContent="center"
        //   alignItems="center"
        //   w="20%"
        //   m="auto"
        //   mt="5rem"
        // >

        //   <Spinner
        //     m="auto"
        //     thickness="4px"
        //     speed="0.65s"
        //     emptyColor="gray.200"
        //     color="blue.500"
        //     size="xl"
        //   />
        // </Box>
        <div className="dogo-gallery">
          {images.map((image, index) => (
            <Box
              className="dogo-image"
              fontFamily="Philosopher"
              borderRadius={"20px"}
              backgroundColor={"#808080"}
              border={"2px solid black"}
            >
              <Image
                w="95%"
                onClick={() => handleImageSelect(image)}
                h={"90%"}
                padding={"20px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                margin={"auto"}
                key={index}
                src={image}
                alt="dog"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div onClick={() => handleClick(index)}>
                  {liked ? "❤️" : "🤍"}
                </div>
                <Text ml={2} fontWeight="bold">
                  {count}
                </Text>
              </div>
            </Box>
          ))}
        </div>
      )}
      {selectedImage && (
        <DoggoModal
          isOpen={showModal}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      )}
    </>
  );
};

export default Homepage;
