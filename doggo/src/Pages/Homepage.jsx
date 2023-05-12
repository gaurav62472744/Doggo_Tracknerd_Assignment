import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
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
import "../Styles/Homepage.css";
import Loading from "../Components/Loader";
import DogoBreed from "../Components/DogoBreed";

const Homepage = () => {
  const [selectBreed, setSelectBreed] = useState("");
  const [dogImages, setDogImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDogImage, setSelectedDogImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedImages, setLikedImages] = useState([]);
  const [likeCounts, setLikeCounts] = useState(
    new Array(dogImages.length).fill(0)
  );

  const selectedBreedDog = async () => {
    if (selectBreed) {
      setLoading(true);
      try {
        let res = await fetch(
          `https://dog.ceo/api/breed/${selectBreed}/images`
        );
        res = await res.json();
        setDogImages(res.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        let res = await fetch(`https://dog.ceo/api/breeds/image/random/30`);
        res = await res.json();
        console.log(res);
        setDogImages(res.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    selectedBreedDog();
  }, [selectBreed]);

  const handleSelectedDogBreed = (newBreed) => {
    setSelectBreed(newBreed);
  };

  const handleSelectedDogImages = (newImage) => {
    setSelectedDogImage(newImage);
    setOpenModal(true);
  };

  const handleModal = () => {
    setSelectedDogImage(null);
    setOpenModal(false);
  };

  // likes count

  const handleClick = (index) => {
    const newLikedImages = [...likedImages];
    const newLikeCounts = [...likeCounts];

    if (newLikedImages.includes(index)) {
      newLikedImages.splice(newLikedImages.indexOf(index), 1);
      newLikeCounts[index] =
        typeof newLikeCounts[index] === "number" ? newLikeCounts[index] - 1 : 0;
    } else {
      newLikedImages.push(index);
      newLikeCounts[index] =
        typeof newLikeCounts[index] === "number" ? newLikeCounts[index] + 1 : 1;
    }

    setLikedImages(newLikedImages);
    setLikeCounts(newLikeCounts);
  };

  return (
    <>
      <Box className="breed-container" box-shadow="md">
        <DogoBreed handleSelectedDogBreed={handleSelectedDogBreed} />
      </Box>
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
          {selectBreed.charAt(0).toUpperCase() + selectBreed.slice(1)} Dogs
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
          margin="auto"
          mb="16px"
        >
          Select Any Doggo Breed From Above
        </Text>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="dogo-gallery">
          {dogImages.map((newImage, index) => (
            <Box
              className="dogo-image"
              fontFamily="Philosopher"
              borderRadius={"20px"}
              backgroundColor={"#808080"}
              border={"2px solid black"}
            >
              <Image
                width="94%"
                onClick={() => handleSelectedDogImages(newImage)}
                height={"90%"}
                padding={"20px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                margin={"auto"}
                key={index}
                src={newImage}
                alt="dog"
              />

              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box onClick={() => handleClick(index)}>
                  {likedImages.includes(index) ? "❤️" : "🤍"}
                </Box>
                <Text ml={2} fontWeight="bold">
                  {likeCounts[index]}
                </Text>
              </Box>
            </Box>
          ))}
        </div>
      )}
      {selectedDogImage && (
        <Modal
          isOpen={openModal}
          onClose={handleModal}
          size={{ base: "sm", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Philosopher">
              Tap Or Scroll To Zoom In and Zoom Out
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody cursor="zoom-in">
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    src={selectedDogImage}
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
