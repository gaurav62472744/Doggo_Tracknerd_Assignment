import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
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
  const [selectBreed, setSelectBreed] = useState("");
  const handleSelectedDogBreed = (newBreed) => {
    setSelectBreed(newBreed);
  };

  // const [length, setLength] = useState(false);
  const [newSubBreed, setNewSubBreed] = useState([]);

  const subBreed = async () => {
    try {
      let res = await fetch(`https://dog.ceo/api/breed/${selectBreed}/list`);
      res = await res.json();
      setNewSubBreed(res.message);
      // setLength(res.message.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    subBreed();
  }, [selectBreed]);

  return (
    <>
      <Box className="breed-container" box-shadow="md">
        <DogoBreed handleSelectedDogBreed={handleSelectedDogBreed} />
      </Box>
      {selectBreed ? (
        <>
          {newSubBreed.length === 0 ? (
            <>
              <Text>No Sub Bread Found</Text>
            </>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <TableCaption>
                  <Text> Looks Like You Love {selectBreed} </Text>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>SUB-BREED</Th>

                    <Th isNumeric>OPEN IMAGE MODAL</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* {newSubBreed.forEach((subBreed, index) => (
                    <Tr key={index}>
                      <Td> {subBreed}</Td>
                    </Tr>
                  ))} */}
                  {newSubBreed.map((subBreed, index) => (
                    <Tr key={index} fontSize={"xl"}>
                      <Td>
                        <Text>Sub-breed {subBreed}</Text>
                      </Td>
                      <Td>
                        <Flex justifyContent="flex-end">
                          <button

                          // onClick={() => handleModalOpen(subBreedImage)}
                          >
                            Link
                          </button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <Text> Select Any breed to see sub breed</Text>
      )}
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default List;
