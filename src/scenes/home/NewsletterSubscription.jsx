import { useState } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      {/* Email Icon and Header Text */}
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe to Our Newsletter</Typography>
      <Typography sx={{ mt: "4px" }}>
        and recieve $20 worth of coupon for your first order when you checkout
      </Typography>

      {/* Email Input and Submit Button */}
      <Box
        p="4px 0px"
        m="20px auto"
        width="75%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="#F2F2F2"
        borderRadius="2px"
      >
        <InputBase
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ml: 2, flex: 1 }}
        />
        <Divider sx={{ height: "30px", m: 0.5 }} orientation="vertical" />
        <Button sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default NewsletterSubscription;
