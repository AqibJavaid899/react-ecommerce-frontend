import React from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

import AddressForm from "./AddressForm";

const ShippingForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px 0px">
      <Box>
        <Typography sx={{ mb: "15px" }} variant="h3">
          BILLING INFORMATION
        </Typography>

        {/* BILLING ADDRESS FORM */}
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
      {/* Same Address Checkbox */}
      <Box mb="20px">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress,
                )
              }
            />
          }
        />
      </Box>
      {/* SHIPPING ADDRESS FORM */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} variant="h3">
            SHIPPING INFORMATION
          </Typography>

          {/* BILLING ADDRESS FORM */}
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default ShippingForm;
