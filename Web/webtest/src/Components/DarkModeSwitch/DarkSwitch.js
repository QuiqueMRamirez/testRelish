import React from "react";
import { Switch } from "@chakra-ui/react";

const DarkSwitch = ({toggleColorMode,isDark}) => {

  return (
    <>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} mt="10px"/>
    </>
  );
};

export default DarkSwitch;
