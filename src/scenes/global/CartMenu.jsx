import { IconButton, Button, Box, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  setIsCartOpen,
  increaseItemCount,
  decreaseItemCount,
  removeFromCart,
} from "../../state/slices";
import { shades } from "../../theme";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.count * item?.attributes.price,
    0,
  );

  return (
    //   Parent Wrapper
    <Box
      display={isCartOpen ? "block" : "none"}
      width="100%"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      backgroundColor="rgba(0,0,0,0.4)"
      zIndex={10}
      overflow="auto"
    >
      {/* Cart Modal Wrapper */}
      <Box
        backgroundColor="white"
        width="max(400px, 30%)"
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
      >
        {/* Inside of Cart Styling */}
        <Box padding="30px" height="100%" overflow="auto">
          {/* Cart Header */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Cart Items List */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                {/* Image and Item Description */}
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    {/* Image */}
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${item.attributes.image.data.attributes.formats.medium.url}`}
                      height="164px"
                      width="123px"
                      alt={item?.name}
                    />
                  </Box>

                  {/* Item Meta Details */}
                  <Box flex="1 1 60%">
                    {/* Item Name and Remove Buttons */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes?.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>

                    {/* Item Description */}
                    <Typography sx={{ pr: "8px" }}>
                      {item?.attributes.shortDescription}
                    </Typography>

                    {/* Increase/Decrease Buttons and Item Amount */}
                    <FlexBox m="15px 0px" pr="8px">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            item?.count > 0 &&
                            dispatch(decreaseItemCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseItemCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Amount */}
                      <Typography fontWeight="bold">
                        ${item?.attributes?.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}

            {/* Subtotal and Checkout Button */}
            <Box m="20px 0px">
              <FlexBox m="20px 0px">
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">${totalPrice}</Typography>
              </FlexBox>
              <Button
                onClick={() => {
                  navigate("/checkout");
                  dispatch(setIsCartOpen({}));
                }}
                sx={{
                  backgroundColor: shades.primary[400],
                  color: "white",
                  minWidth: "100%",
                  borderRadius: 0,
                  padding: "20px 40px",
                  m: "20px 0px",
                }}
              >
                CHECKOUT
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
