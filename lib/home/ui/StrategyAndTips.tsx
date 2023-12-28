import { Text, Box, Flex, Heading, HStack, Icon, Grid } from "@chakra-ui/react";
import { GuideDataType } from "./GameGuideHome";
import { SingleHand } from "./SingelHand";
import { FaArrowDown } from "react-icons/fa";

export const StrategyAndTips = () => {
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
  const exampleHand1 = [
    { rank: "A", suit: "♠", color: "black" },
    { rank: "A", suit: "♥", color: "red" },
    { rank: "K", suit: "♦", color: "red" },
    { rank: "K", suit: "♣", color: "black" },
    { rank: "J", suit: "♠", color: "black" },
    { rank: "T", suit: "♥", color: "red" },
    { rank: "8", suit: "♦", color: "red" },
    { rank: "8", suit: "♠", color: "black" },
    { rank: "6", suit: "♥", color: "red" },
    { rank: "5", suit: "♦", color: "red" },
    { rank: "5", suit: "♣", color: "black" },
    { rank: "2", suit: "♠", color: "black" },
    { rank: "2", suit: "♥", color: "red" },
  ];
  const exampleHand2 = [
    { rank: "A", suit: "♠", color: "black" },
    { rank: "Q", suit: "♥", color: "red" },
    { rank: "Q", suit: "♦", color: "red" },
    { rank: "J", suit: "♣", color: "black" },
    { rank: "9", suit: "♠", color: "black" },
    { rank: "8", suit: "♥", color: "red" },
    { rank: "8", suit: "♦", color: "red" },
    { rank: "7", suit: "♠", color: "black" },
    { rank: "5", suit: "♥", color: "red" },
    { rank: "5", suit: "♦", color: "red" },
    { rank: "4", suit: "♣", color: "black" },
    { rank: "3", suit: "♠", color: "black" },
    { rank: "3", suit: "♥", color: "red" },
  ];
  return (
    <Box w="full">
      <Box>
        <Heading>Strategy and Tips</Heading>
        <Text>
          There are several hand types that occur very frequently when playing
          Chinese Poker and many of them have one and only one optimal solution.
          In this section, I'll provide tips and tricks on how to play certain
          hand types.
        </Text>
        <Heading py={4}>5 pair</Heading>
        <Text>
          A common hand in Chinese Poker is a 5 pair hand without any straight
          or flush opportunity. The optimal setting for this hand is:
          <br />
          <br />
          <b>Front hand: </b>Highest pair with the highest kicker
          <br />
          <b>Middle hand:</b> 3rd and 4th highest pair
          <br />
          <b>Back hand:</b> 2nd and 5th highest pair <br />
          <br />A 5 pair hand is never strong in Chinese Poker and its strength
          is mostly determined by the strength of the front hand. But this hand
          is almost always playable if the highest pair is somewhat decent.
        </Text>
        <Heading py={4}>5 Pair Example</Heading>
        <Flex gap={2}>
          <Grid w="full" templateColumns="repeat(7, minmax(40px, 1fr))" gap={1}>
            {exampleHand1.map((card, index) => {
              return (
                <SingleHand
                  key={index}
                  color={card.color}
                  rank={card.rank}
                  suit={card.suit}
                />
              );
            })}
          </Grid>
        </Flex>
        <Box py={2} w="full" textAlign={"center"}>
          {" "}
          <Icon as={FaArrowDown} />
          <Icon as={FaArrowDown} />
          <Icon as={FaArrowDown} />
        </Box>
        <Box>
          <Flex gap={2}>
            <Text as={"span"}>Front:</Text>

            {exampleHand1
              .filter((r) => ["A", "J"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
        <Box py={2}>
          <Flex gap={2}>
            <Text as={"span"}>Middle:</Text>
            {exampleHand1
              .filter((r) => ["8", "T", "5"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
        <Box>
          <Flex gap={2}>
            <Text as={"span"}>Back:</Text>
            {exampleHand1
              .filter((r) => ["K", "2", "6"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
      </Box>
      <Box>
        <Heading py={4}>4 pair</Heading>
        <Text>
          Even more common than 5 pairs is a 4-pair hand in Chinese Poker. 4
          Pairs without straight or flush options is significantly worse than 5
          Pairs. Optimal solution:
          <br />
          <br />
          <b>Front hand: </b>2nd highest pair
          <br />
          <b>Middle hand:</b> Highest pair
          <br />
          <b>Back hand:</b> The two lower pairs
          <br />
          <br />
          The strength of 4-pair hands is determined by the strength of the 2nd
          highest pair. You only have a realistic chance to win the front hand
          as one pair in the middle and two (low) pair in the back are almost
          always too weak to win a hand. Thus a 4-pair hand is only as good as
          the 2nd-highest pair.
        </Text>
        <Heading py={4}>4 Pair Example</Heading>
        <Flex gap={2}>
          <Grid w="full" templateColumns="repeat(7, minmax(40px, 1fr))" gap={1}>
            {exampleHand2.map((card, index) => {
              return (
                <SingleHand
                  key={index}
                  color={card.color}
                  rank={card.rank}
                  suit={card.suit}
                />
              );
            })}
          </Grid>
        </Flex>
        <Box py={2} w="full" textAlign={"center"}>
          <Icon as={FaArrowDown} />
          <Icon as={FaArrowDown} />
          <Icon as={FaArrowDown} />
        </Box>
        <Box>
          <Flex gap={2}>
            <Text as={"span"}>Front:</Text>
            {exampleHand2
              .filter((r) => ["A", "8"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
        <Box py={2}>
          <Flex gap={2}>
            <Text as={"span"}>Middle:</Text>
            {exampleHand2
              .filter((r) => ["Q", "J", "9", "7"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
        <Box>
          <Flex gap={2}>
            <Text as={"span"}>Back:</Text>
            {exampleHand2
              .filter((r) => ["5", "4", "3"].includes(r.rank))
              .map((card, index) => {
                return (
                  <SingleHand
                    key={index}
                    color={card.color}
                    rank={card.rank}
                    suit={card.suit}
                  />
                );
              })}
          </Flex>
        </Box>
      </Box>
      <Flex py={4} gap={4} direction={"column"}>
        <Heading>Full House in the back</Heading>
        <Text>
          The quality of a full house in the backhand is decided only by the
          strength of the trips. The pair to go with it doesn’t matter.
          Accordingly, you should always assign the lowest available pair to it.
        </Text>
        <Text>
          A small full house (fives full or smaller) in the backhand is rarely
          worth more than a good flush. If you can set a flush in the backhand
          by breaking up a small full house, it is often worth doing so and
          placing the
        </Text>
      </Flex>
    </Box>
  );
};
