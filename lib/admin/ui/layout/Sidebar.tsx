import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { BiBookmark, BiBot, BiLogOut, BiNews, BiUser } from "react-icons/bi";
import { BsOpticalAudio, BsSpeaker } from "react-icons/bs";
import { AdminNavItem } from "./AdminNavItem";

export const Sidebar = ({ selectedNav }: { selectedNav: string }) => {
  const w = 64;
  return (
    <Flex
      h="full"
      minW={{ base: w, lg: w, md: w }}
      w={{ base: w, lg: w, md: w }}
      direction="column"
      borderRight="0px"
      boxShadow="0px 0px 32px 1px rgba(0, 0, 0, 0.1)"
    >
      <Box w={"full"} pt={4}>
        <HStack w={w} h={"full"} px={4}>
          <Text
            w={w}
            textAlign={"center"}
            fontSize="24px"
            lineHeight={"26px"}
            fontWeight="700"
            color={"gray.600"}
          >
            {" "}
            НЭГЦЭГ
          </Text>
        </HStack>
      </Box>

      <Stack spacing="1" flex="1" overflow="auto" pt="6" px="4">
        <AdminNavItem href="/users" icon={<BiUser />} label="All users" />
{/* 
        <AdminNavItem
          key="chat"
          href="/chat"
          active={selectedNav == "chat"}
          icon={<BiNews />}
          label="Chat"
        /> */}
        {/* <AdminNavItem
          key="bot"
          href="/bot"
          active={selectedNav == "bot"}
          icon={<BiBot />}
          label="Bot"
        /> */}
        <AdminNavItem
          key="account"
          href="/account"
          icon={<BiUser />}
          label="My Account"
        />
        <AdminNavItem href="/auth/logout" icon={<BiLogOut />} label="Logout" />
      </Stack>
    </Flex>
  );
};
