import {
  Flex,
  Box,
  DrawerContent,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  useDisclosure,
  useBreakpoint,
  Button,
  Icon,
} from "@chakra-ui/react";
import { ChangePasswordPage } from "@lib/profile/ui";
import { UserList } from "@lib/user/ui";
import React from "react";
import { ReactChild, ReactChildren } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Sidebar } from "./Sidebar";

type Props = {
  selectedNav: string;
  children: ReactChildren | ReactChild;
};

export const AdminProvider = ({ selectedNav, children }: Props) => {
  const bp = useBreakpoint();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex h="100vh" flexDirection="column">
      <Flex flex="1" overflow="hidden" bg="#fff" color="gray.900" fontSize="sm">
        {bp !== "sm" && bp !== "base" ? (
          <Sidebar selectedNav={selectedNav} />
        ) : (
          <>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Sidebar selectedNav={selectedNav} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}

        <Flex
          display={{
            base: "block",
            lg: "block",
          }}
          width={"full"}
          minW={96}
          direction="column"
          overflowY="auto"
          px={4}
          py={2}
        >
          <>{children}</>
        </Flex>
      </Flex>
    </Flex>
  );
};
