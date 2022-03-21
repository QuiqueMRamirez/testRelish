import React from "react";
import { Button } from "@chakra-ui/react";

const ButtonAction = ({
  leftIcon,
  rightIcon,
  type,
  variant,
  colorScheme,
  size,
  text,
  isLoading,
  loadingText,
  operation
}) => {
  return (
    <>
      {type == "submit" ? (
        <Button
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          type={type}
          variant={variant}
          colorScheme={colorScheme}
          size={size}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          {text}
        </Button>
      ) : (
        <Button
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          type={type}
          variant={variant}
          colorScheme={colorScheme}
          size={size}
          isLoading={isLoading}
          loadingText={loadingText}
          onClick={() => {
            operation();
          }}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonAction;
