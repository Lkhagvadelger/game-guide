import { Box, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { FaBullseye } from "react-icons/fa";

interface NavItemProps {
  href?: string;
  label: string;
  subtle?: boolean;
  active?: boolean;
  icon: React.ReactElement;
  endElement?: React.ReactElement;
  children?: React.ReactNode;
}

export const AdminNavItem = (props: NavItemProps) => {
  const { href, active, subtle, icon, children, label, endElement } = props;
  return (
    <NextLink href={href!} passHref>
      <HStack
        borderRadius={"4px"}
        w="full"
        py="2"
        px="4"
        cursor="pointer"
        userSelect="none"
        transition="all 0.2s"
        bg={active ? "purple.500" : undefined}
        color={active ? "gray.50" : undefined}
        _hover={{
          bg: active ? "linear(to-r, purple.600, purple.300)" : "gray.100",
        }}
        _active={{
          bg: "gray.200",
          color: "gray.600",
        }}
        boxShadow={
          active
            ? "0px 0px 10px 3px rgba(0, 0, 0, 0.2)"
            : "0px 0px 5px 2px rgba(0, 0, 0, 0)"
        }
        bgGradient={active ? "linear(to-r, purple.600, purple.300)" : undefined}
      >
        <Box fontSize="lg" color={active ? "currentcolor" : "gray.400"}>
          {icon}
        </Box>
        <Box flex="1" fontWeight="400" color={subtle ? "gray.400" : undefined}>
          {label}
        </Box>
      </HStack>
    </NextLink>
  );
};
