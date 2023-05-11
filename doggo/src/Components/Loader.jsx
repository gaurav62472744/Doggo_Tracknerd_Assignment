import React from "react";
import { Box } from "@chakra-ui/react";
// import Loader from "../Utils/loader.png";

const Loading = () => {
  return (
    <Box
      as="div"
      width="100%"
      height="100%"
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/b6/52/46/b6524696cbd3ef85969e1216b28285e7.gif")`,
      }}
    ></Box>
  );
};

export default Loading;
