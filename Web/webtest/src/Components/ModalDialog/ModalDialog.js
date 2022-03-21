import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Heading,
  keyframes,
  Text,
  Icon,
  Divider,
  useToast,
} from "@chakra-ui/react";

const ModalDialog = ({ onOpen, isOpen, onClose, modalElement }) => {
  const { album: albumInfo } = modalElement;
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalElement.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <Box align="center" mb="6">
            <Heading as="h3" size="lg">
              {modalElement.title}
            </Heading>
          </Box>
          <Box align="left" ml="3">
            <Text fontSize="sm" p="1">
              Name: {albumInfo.user.name}
            </Text>
            <Text fontSize="sm" p="1">
              Username: {albumInfo.user.username}
            </Text>
            <Text fontSize="sm" p="1">
              Phone: {albumInfo.user.phone}
            </Text>
            <Text fontSize="sm" p="1">
              Website: {albumInfo.user.website}
            </Text>
            <Text fontSize="sm" p="1">
              Company name: {albumInfo.user.company.name}
            </Text>
            <Text fontSize="sm" p="1">
              Address: {albumInfo.user.address.street} -{" "}
              {albumInfo.user.address.suite} - {albumInfo.user.address.city}
            </Text>
          </Box>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
