import { Box, Alert, AlertTitle } from "@mui/material";

const Confirmation = () => {
  return (
    <Box width="80%" m="90px auto" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order -{" "}
        <strong>Congrats on making your purchase.</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
