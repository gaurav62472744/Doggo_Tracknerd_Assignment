import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box as="div" width="100vw" height="100vh">
      <Image
        mx="auto"
        src="https://i.pinimg.com/originals/b6/52/46/b6524696cbd3ef85969e1216b28285e7.gif"
        alt=""
      />
    </Box>
  );
};

export default Loading;
