import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";

import Item from "../../components/Item";
import { setItems } from "../../state/slices";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [selectedTab, setSelectedTab] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchItem = async () => {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/items?populate=image`,
        { method: "GET" },
      )
        .then((response) => response.json())
        .then((result) => dispatch(setItems(result.data)));
    };
    fetchItem();
  }, []);

  //   Filtering Items based on the Tab value
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals",
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers",
  );
  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated",
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>

      {/* Tabs for different Categories of Item */}
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        TabIndicatorProps={{
          sx: {
            display: isNonMobile ? "block" : "none",
          },
        }}
        onChange={handleTabChange}
        value={selectedTab}
        centered
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>

      {/* List of Items based on the selected tab value */}
      <Box
        margin="20px auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        rowGap="20px"
        columnGap="1.33%"
        justifyContent="space-around"
      >
        {/* All Products Items */}
        {selectedTab === "all" &&
          items.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}

        {/* New Arrivals Items */}
        {selectedTab === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}

        {/* Best Sellers Items */}
        {selectedTab === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}

        {/* Top Rated Items */}
        {selectedTab === "topRated" &&
          topRatedItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
