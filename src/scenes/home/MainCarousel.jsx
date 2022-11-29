import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { shades } from "../../theme";

// import all the images from the assets folder in the form of object
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/),
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      //   Previous Arrow Button
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      //   Next Arrow Button
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((image, index) => (
        <Box key={`carousel-image-${index}`}>
          {/* Carousel Image */}
          <img
            src={image}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "520px",
              marginTop: "60px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          {/* Carousel Description */}
          <Box
            position="absolute"
            top="46%"
            textAlign="left"
            backgroundColor="rgba(0,0,0, 0.4)"
            padding="20px"
            color="white"
            borderRadius="2px"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "280px"}
          >
            <Typography>NEW ITEMS</Typography>
            <Typography variant={isNonMobile ? "h1" : "h2"}>
              Summer Sale
            </Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
