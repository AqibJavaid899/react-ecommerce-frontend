import { Box, Badge, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setIsCartOpen } from "../../state/slices";
import { shades } from "../../theme";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="80%"
        margin="auto"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ONE STOP E-SHOP
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={`${cart.length}`}
            invisible={cart.length === 0}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                top: 5,
                right: 5,
                padding: "0px 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
