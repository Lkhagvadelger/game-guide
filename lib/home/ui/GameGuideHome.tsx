import {
  Box,
  Text,
  HStack,
  Heading,
  Input,
  VStack,
  Flex,
  Grid,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Icon,
  toaster,
  InputGroup,
  InputRightElement,
} from "@ui/index";
import { Tile } from "./Tile";
import React from "react";
import { FaCheck, FaCross, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { guideData } from "./guideData";
import { StrategyAndTips } from "./StrategyAndTips";
import { LikeDislike } from "./LikeDislike";
export type GuideDataType = {
  key: string;
  title: string;
  short: string;
  color?: string;
  content: string;
};
export const GameGuideHome = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [selectedGuide, setSelectedGuide] = React.useState<GuideDataType>();

  // search in guide data
  const [search, setSearch] = React.useState("");
  return (
    <Box p={4} w="full" pb={"88px"} bg="#fff" fontFamily={"sans-serif"}>
      <VStack w="full">
        <Heading w="full" py="4" color="gray.800">
          Big 2 Game Guide
        </Heading>
        <Box w="full">
          <InputGroup>
            <Input
              bg="gray.100"
              minH="8"
              fontSize={"18px"}
              placeholder="Search in guide"
              fontFamily={"heading"}
              w="full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <InputRightElement
                onClick={() => {
                  setSearch("");
                }}
              >
                <Icon as={IoClose} color="green.500" />
              </InputRightElement>
            )}
          </InputGroup>
          {search.length > 0 && (
            <Box ml={-4} w="full" px={4} mr={8} position={"absolute"}>
              <Box bg="gray.100" px={4} pt={4} boxShadow={"xl"}>
                <Text pb={4}>Search result:</Text>
                {guideData
                  .filter((r) => r.content.indexOf(search) > -1)
                  .map((item) => {
                    const index = item.content.indexOf(search);
                    return (
                      <Box
                        pb={4}
                        key={item.key}
                        onClick={() => {
                          setSelectedGuide(item);
                          onOpen();
                        }}
                      >
                        <Heading>{item.title}</Heading>
                        <Text
                          dangerouslySetInnerHTML={{
                            __html:
                              "<b>" +
                              item.content
                                .substring(index)
                                .substring(0, search.length) +
                              "</b>" +
                              item.content
                                .substring(index + search.length)
                                .substring(0, 100) +
                              "...",
                          }}
                        ></Text>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          )}
        </Box>
        <Text py={2}>
          Chinese Poker, also known as Big 2, is a card game typically played
          with four players. The objective is to be the first to get rid of all
          your cards.
        </Text>
        {/* Grid 2 colums and unlimited rows show guideData in Tile*/}
        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
          {guideData.map((item) => (
            <Box
              key={item.key}
              onClick={() => {
                setSelectedGuide(item);
                onOpen();
              }}
            >
              <Tile item={item} />
            </Box>
          ))}
        </Grid>
      </VStack>
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="gray.700" fontSize={"32px"}>
            {selectedGuide?.title}
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              {selectedGuide?.title == "Strategy" ? (
                <StrategyAndTips />
              ) : (
                <>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: selectedGuide?.content!,
                    }}
                  ></Box>
                </>
              )}
              <LikeDislike />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
