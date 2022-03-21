import React, { useState } from "react";
import {
  Box,
  Text,
  WrapItem,
  Wrap,
  Image,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import ModalDialog from "../ModalDialog/ModalDialog";

const ListCards = ({ elements }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementSelected, setElementSelected] = useState({});
  const shadow = useColorModeValue(
    { boxShadow: "dark-lg" },
    {
      background: "white",
      color: "teal.500",
    }
  );
  const wrapColor = useColorModeValue("white", "gray.700");
  const boxColor1 = useColorModeValue("white", "gray.900");
  const boxColor2 = useColorModeValue("gray.500", "gray.400");
  const boxColor3 = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Wrap justify="center">
        {elements.map((element) =>
          element.album && element.album.user ? (
            <WrapItem
              key={element.id}
              boxShadow="base"
              rounded="10px"
              overflow="hidden"
              bg={wrapColor}
              _hover={shadow}
            >
              <Box
                value={element.id}
                as="button"
                onClick={() => {
                  setElementSelected(element);
                  onOpen();
                }}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={element.url} alt={element.url} />

                <Box p="6" bgColor={boxColor1}>
                  <Box display="flex" alignItems="baseline">
                    <Box
                      color={boxColor2}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="12px"
                      textTransform="uppercase"
                      ml="1"
                      isTruncated
                    >
                      {element.title ? element.title : null}
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    ml="1"
                    fontWeight="semibold"
                    fontSize="xs"
                    lineHeight="tight"
                    textAlign="left"
                    isTruncated
                  >
                    Albúm: {element.album.title ? element.album.title : null}
                  </Box>

                  <Box display="flex" mt="2" alignItems="left">
                    <Box as="span" ml="1" color={boxColor3} fontSize="sm">
                      <Text fontSize="sm">{element.album.user.email}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          ) : null
        )}
        {elementSelected && elementSelected.album ? <ModalDialog
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          modalElement={elementSelected}
        />:null}
        
      </Wrap>
    </>
  );
};

export default ListCards;
