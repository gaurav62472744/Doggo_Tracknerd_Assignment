import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import ZoomableImage from "react-zoomable-img";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import ReactImageZoom from "react-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

const DoggoModal = ({ isOpen, onClose, image }) => {
  // const props = {
  //   width: 400,
  //   height: 400,
  //   zoomWidth: 450,
  //   img: image,
  //   zoomPosition: "original",
  //   scale: 1,
  // };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="Philosopher">
          Tap Or Scroll To Zoom
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody cursor="zoom-in">
          {/* <ZoomableImage
            src={image}
            alt="zoomable"
            zoomScale={3}
            transitionDuration={1}
          /> */}
          {/* <Zoom>
            <img alt="doggo" src={image} width="500" />
          </Zoom> */}
          {/* <ReactImageZoom {...props} /> */}
          {/* <InnerImageZoom
            src={image}
            zoomSrc={image}
            zoomScale={1}
            zoomType="hover"
          /> */}
          <TransformWrapper>
            <TransformComponent>
              <img
                src={image}
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
  );
};

export default DoggoModal;
