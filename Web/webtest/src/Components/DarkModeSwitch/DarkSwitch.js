import React from "react";
import { Switch, Text, useColorModeValue } from "@chakra-ui/react";

const DarkSwitch = ({toggleColorMode,isDark}) => {

  return (
    <>
      <Text fontSize="14px" color={useColorModeValue("gray.600", "white")}>
        {isDark ? 'Light' : 'Dark'}
      </Text>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} mt="10px"/>
    </>
  );
};

export default DarkSwitch;
