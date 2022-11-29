import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";

import { addToCart } from "../state/slices";
import { shades } from "../theme";

const Item = ({ item, width }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item.attributes;

  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    //   Image + Description
    <Box width={width}>
      {/* Image + Add Cart Button */}
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Item Image */}
        <img
          src={`http://localhost:1337${url}`}
          alt={name}
          height="400px"
          width="300px"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/item/${item.id}`)}
        />
        {/* Add to Cart and Increase/Decrease Buttons */}
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          padding="0 5%"
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Increase/Decrease Buttons */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* Add To Cart Button */}
            <Button
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Item Description */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
