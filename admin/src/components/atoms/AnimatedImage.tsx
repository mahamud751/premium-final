import Image from "next/image";
import { Box } from "@mui/material";

const AnimatedImage = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        animation: "bounce 1s infinite",
        marginLeft: 1,
      }}
    >
      <Image src={"/assets/1.jpg"} width={60} height={60} alt="icon" />
    </Box>
  );
};

export default AnimatedImage;
