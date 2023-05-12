import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DogoBreed from "../Components/DogoBreed";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../Styles/Homepage.css";

const List = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dogList, setDogList] = useState(null);
  const [selectBreed, setSelectBreed] = useState("");
  const [newDogBreedList, setNewDogBreedList] = useState([]);

  const selectedBreedDog = async () => {
    if (selectBreed) {
      try {
        let res = await fetch(`https://dog.ceo/api/breed/${selectBreed}/list`);
        res = await res.json();
        setNewDogBreedList(res.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    selectedBreedDog();
  }, [selectBreed]);

  const fetchData = async () => {
    if (newDogBreedList.length > 0) {
      for (let subBreed of newDogBreedList) {
        try {
          let res = await fetch(
            `https://dog.ceo/api/breed/${selectBreed}/${subBreed}/images/random`
          );
          res = await res.json();
          setDogList(res.message);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [newDogBreedList, selectBreed, openModal]);

  const handleDogList = (image) => {
    setDogList(image);
    setOpenModal(true);
  };

  const handleModal = () => {
    setOpenModal(false);
  };

  const handleSelectedDogBreed = (newBreed) => {
    setSelectBreed(newBreed);
  };

  return (
    <>
      <Box className="breed-container" box-shadow="md">
        <DogoBreed handleSelectedDogBreed={handleSelectedDogBreed} />
      </Box>
      {selectBreed ? (
        <>
          <TableContainer
            si
            px="20px"
            width={{ md: "90%" }}
            margin="auto"
            marginTop={"30px"}
          >
            <Table variant="simple">
              <TableCaption>Looks Like You Love {selectBreed}</TableCaption>
              <Thead>
                <Tr>
                  <Th
                    style={{
                      color: "black",
                      backgroundColor: "#808080",
                      margin: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    rounded="3xl"
                    fontSize={{ base: "14px", md: "xl" }}
                    w={{ base: "95%", md: "97%" }}
                    px="20px"
                  >
                    SUB-BREED
                    <Text>OPEN 1 IMAGE (MODAL)</Text>
                  </Th>
                </Tr>
              </Thead>
              {newDogBreedList.length > 0 ? (
                <Tbody>
                  {newDogBreedList.map((subBreed, index, image) => (
                    <Tr
                      display="flex"
                      justifyContent="space-between"
                      key={index}
                    >
                      <Td fontSize={{ base: "md", md: "xl" }}>
                        Sub-Breed
                        {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}
                      </Td>
                      <Td
                        w={{ base: "35%", md: "18%" }}
                        cursor="pointer"
                        fontSize={{ base: "md", md: "xl" }}
                        onClick={() => handleDogList(image)}
                      >
                        Link
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              ) : (
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  m="auto"
                  mt="32px"
                  w={{ base: "100%", md: "50%" }}
                >
                  No SubBreed Found Please try any other breed
                </Text>
              )}
            </Table>
          </TableContainer>
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
                      src={dogList}
                      alt="zoom"
                      style={{
                        width: "400px",
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
        </>
      ) : (
        <Text
          fontWeight="semibold"
          fontFamily="Philosopher"
          rounded="2xl"
          textAlign="center"
          backgroundColor="#ff3e6c"
          width={{ base: "90%", md: "50%", lg: "25%" }}
          margin="auto"
          mb="16px"
        >
          Select Any Breed To See The Subbreed Of Dogs
        </Text>
      )}
    </>
  );
};

export default List;
