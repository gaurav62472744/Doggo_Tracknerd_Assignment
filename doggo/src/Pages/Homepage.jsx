import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import doggo from "../Utils/doggo.png";
import "../Styles/Homepage.css";
import Loading from "../Components/Loader";

const Homepage = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectBreed, setSelectBreed] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const dogoBreeds = async () => {
    setLoading(true);
    try {
      let res = await fetch("https://dog.ceo/api/breeds/list/all");
      res = await res.json();
      setBreeds(Object.keys(res.message));
      console.log(res.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dogoBreeds();
  }, []);

  const selectedBreedDog = async () => {
    if (selectBreed) {
      setLoading(true);
      try {
        let res = await fetch(
          `https://dog.ceo/api/breed/${selectBreed}/images`
        );
        res = await res.json();
        setImages(res.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        let res = await fetch(`https://dog.ceo/api/breeds/image/random/30`);
        res = await res.json();
        setImages(res.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    selectedBreedDog();
  }, [selectBreed]);

  const handleClick = (index) => {
    if (liked) {
      setCount(count - 1);
      setLiked(false);
    } else {
      setCount(count + 1);
      setLiked(true);
    }
  };

  const handleBreedSelect = (breed) => {
    setSelectBreed(breed);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

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
        {breeds &&
          breeds.map((breed, index) => (
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
      {selectBreed ? (
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
          {selectBreed.charAt(0).toUpperCase() + selectBreed.slice(1)} Images:
          Click any one to view full image
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
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          size={{ base: "sm", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Philosopher">
              Tap Or Scroll To Zoom
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody cursor="zoom-in">
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={selectedImage}
                    alt="zoom"
                    style={{
                      width: "450px",
                      height: "400px",
                      border: "3px solid gray",
                      borderRadius: "50px",
                    }}
                  />
                </TransformComponent>
              </TransformWrapper>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Homepage;
