import { Box, Typography, useTheme } from "@mui/material";
import { typography } from "@mui/system";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      {/* Footer Wrapper */}
      <Box
        width="80%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        {/* Site Name and Description */}
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            color={shades.secondary[500]}
            sx={{ mb: "30px" }}
          >
            ONE STOP E-SHOP
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </Typography>
        </Box>

        {/* Second Column Information */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            ABOUT US
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        {/* Third Column Information */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            CUSTOMER CARE
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        {/* Fourth Column Information */}
        <Box>
          <Typography
            width="clamp(20%, 35%, 40%)"
            variant="h4"
            fontWeight="bold"
            mb="30px"
          >
            CONTACT US
          </Typography>
          <Typography mb="30px">
            50 North Red Keep, Kings Landing, GoT 10501
          </Typography>
          <Typography mb="30px">Email: aqibjaved@gmail.com</Typography>
          <Typography mb="30px">(+923) 333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
