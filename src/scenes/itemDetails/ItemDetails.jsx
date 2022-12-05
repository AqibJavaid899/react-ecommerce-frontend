import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { addToCart } from "../../state/slices";
import { shades } from "../../theme";
import Item from "../../components/Item";

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

  // Fetching the ItemId from the Params
  const { itemId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    // Function to get the data related to the Selected Item
    const fetchSelectedItem = async () => {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}?populate=image`,
        { method: "GET" },
      )
        .then((response) => response.json())
        .then((result) => setItem(result.data));
    };

    // Function to get all of the Items data
    const fetchAllItems = async () => {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/items?populate=image`,
        { method: "GET" },
      )
        .then((response) => response.json())
        .then((result) => setItems(result.data));
    };
    fetchSelectedItem();
    fetchAllItems();
  }, [itemId]);

  const relatedItems = items.filter(
    (data) => data?.attributes?.category === item?.attributes?.category,
  );

  const handleTabChange = (event, newTabValue) => {
    setSelectedTab(newTabValue);
  };

  return (
    <Box width="80%" margin="80px auto">
      {/* Wrapper Container */}
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* Image Styles */}
        <Box flex="1 1 40%" mb="40px">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${item?.attributes?.image.data.attributes.formats.medium.url}`}
            height="100%"
            width="100%"
            sx={{ objectFit: "contain" }}
            alt={item?.name}
          />
        </Box>

        {/* Description and Buttons */}
        <Box flex="1 1 50%">
          {/* Back and Checkout Navigation Buttons */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={() => navigate("/")}>
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => cart.length > 0 && navigate("/checkout")}
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Box>

          {/* Description and Add to Cart Button */}
          <Box m={isNonMobile ? "60px 0px 25px 10px" : "40px 0px 25px 10px"}>
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography fontWeight="bold" sx={{ mt: "8px" }}>
              ${item?.attributes?.price}
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* Add to Cart and Increase/Decrease Buttons */}
          <Box display="flex" alignItems="center" minHeight="50px" p="0 8px">
            {/* Increase/Decrease Button */}
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]} sx={{ m: "0px 5px" }}>
                {count}
              </Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to Cart Button */}
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: "1px",
                p: "10px 36px",
                minWidth: "150px",
                ":hover": {
                  backgroundColor: "#222222",
                  opacity: "0.9",
                },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Wishlist and Categories Information */}
          <Box>
            {/* Wishlist Button */}
            <Box m="12px 0px 6px 0px" display="flex" alignItems="center">
              <IconButton>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <Typography sx={{ ml: "4px" }}>ADD TO WISHLIST</Typography>
            </Box>
            {/* Category Information */}
            <Box display="flex" alignItems="center" p="0 8px">
              <Typography>
                CATEGORIES: <b>{item?.attributes?.category}</b>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Description and Reviews Tabs  */}
      <Box m={isNonMobile ? "20px 0" : "40px 0px"}>
        <Tabs onChange={handleTabChange} value={selectedTab}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>

      {/* Content based on Selected Tabs */}
      <Box display="flex" flexWrap="wrap" gap="15px">
        {selectedTab === "description" && (
          <Typography>{item?.attributes?.longDescription}</Typography>
        )}
        {selectedTab === "reviews" && <Typography>No Reviews.</Typography>}
      </Box>

      {/* Related Products */}
      <Box mt="60px" width="100%">
        <Typography
          textAlign={!isNonMobile && "center"}
          variant="h3"
          fontWeight="bold"
          color={shades.primary[300]}
        >
          RELATED PRODUCTS
        </Typography>
        <Box
          m="20px auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          rowGap="20px"
          columnGap="1.33%"
          justifyContent="space-around"
        >
          {relatedItems.slice(0, 4).map((item, itemIdx) => (
            <Item key={`${itemIdx}-${itemIdx}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
