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
} from "@ui/index";
import { Tile } from "./Tile";
import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { shuffle } from "lodash";
export type GuideDataType = {
  key: string;
  title: string;
  short: string;
  color?: string;
  content: any;
};
export const WinningProbability = () => {
  // const suits = ["♠", "♥", "♦", "♣"];
  const suitsAndColor = [
    { suit: "♠", color: "black" },
    { suit: "♥", color: "red" },
    { suit: "♦", color: "red" },
    { suit: "♣", color: "black" },
  ];
  //ranks by order in Big 2
  const ranks = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
    "2",
  ];
  const deckOfCards = suitsAndColor.flatMap((suit) => {
    return ranks.map((rank) => {
      return { rank, ...suit };
    });
  });
  const [deck, setDeck] = React.useState(shuffle(deckOfCards));
  const setRandomDeck = () => {
    setDeck(shuffle(deckOfCards));
  };
  const hands = ["Hand 1", "Hand 2", "Hand 3", "Hand 4"];
  return (
    <Box p={4} w="full" pb={"88px"} bg="#fff" fontFamily={"sans-serif"}>
      <VStack w="full">
        <Heading w="full" py="4" color="gray.800">
          Big 2 Game Guide
        </Heading>
        <Box w="full">Random deck of hands</Box>
        <Button onClick={setRandomDeck}>Randomize</Button>
        <VStack w="full">
          {hands.map((hand, index) => {
            return (
              <Box w="full" key={index} color={"black"}>
                {hand}
                <Grid
                  w="full"
                  templateColumns="repeat(7, minmax(40px, 1fr))"
                  gap={1}
                >
                  {deck
                    .slice(index * 13, 13 * (index + 1))
                    .map((card, index) => {
                      return (
                        <Box
                          border="1px"
                          borderRadius={"8px"}
                          key={index}
                          color={card.color}
                          textAlign={"center"}
                        >
                          {card.rank}
                          {card.suit}
                        </Box>
                      );
                    })}
                </Grid>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};
