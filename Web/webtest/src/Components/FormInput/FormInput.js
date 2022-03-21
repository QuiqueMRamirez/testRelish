import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const FormInput = ({
  value,
  name,
  placeholder,
  wHelpertext,
  helpertext,
  type,
  variant,
  onChange,
  onBlur
}) => {
  return (
    <>
      <FormControl id={name}>
        <Input
          placeholder={placeholder}
          type={type}
          variant={variant}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {wHelpertext ? <FormHelperText>{helpertext}</FormHelperText> : null}
      </FormControl>
    </>
  );
};

export default FormInput;
