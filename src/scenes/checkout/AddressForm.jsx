import React from "react";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { getIn } from "formik";

const AddressForm = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  // These functions basically enables better code readability
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field)),
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, 1fr)"
      sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        value={values.firstName}
        name={formattedName("firstName")}
        error={formattedError("firstName")}
        helperText={formattedHelper("firstName")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Last Name"
        value={values.lastName}
        name={formattedName("lastName")}
        error={formattedError("lastName")}
        helperText={formattedHelper("lastName")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Country"
        value={values.country}
        name={formattedName("country")}
        error={formattedError("country")}
        helperText={formattedHelper("country")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 4" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Street Address"
        value={values.street1}
        name={formattedName("street1")}
        error={formattedError("street1")}
        helperText={formattedHelper("street1")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (optional)"
        value={values.street2}
        name={formattedName("street2")}
        error={formattedError("street2")}
        helperText={formattedHelper("street2")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        type="text"
        label="City"
        value={values.city}
        name={formattedName("city")}
        error={formattedError("city")}
        helperText={formattedHelper("city")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        type="text"
        label="State"
        value={values.state}
        name={formattedName("state")}
        error={formattedError("state")}
        helperText={formattedHelper("state")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 1" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={formattedError("zipCode")}
        helperText={formattedHelper("zipCode")}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 1" }}
      />
    </Box>
  );
};

export default AddressForm;
