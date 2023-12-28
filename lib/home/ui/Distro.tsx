import {
  Box,
  Button,
  Text,
  Grid,
  Heading,
  VStack,
  Table,
  Tr,
  Tbody,
} from "@ui/index";
import { shuffle } from "lodash";
import React from "react";
import { SingleHand } from "./SingelHand";
export type GuideDataType = {
  key: string;
  title: string;
  short: string;
  color?: string;
  content: any;
};
export const Distro = () => {
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
      <VStack w="full" gap={2}>
        <Heading w="full" py="4" color="gray.800">
          Average distribution of Chinese Poker hands
        </Heading>
        <Text w="full">
          Chinese Poker strategy guide, I’ll dig a bit deeper. I used a computer
          to simulate thousands of Chinese Poker games against itself to derive
          statistical hand distributions. This helps to answer questions like:
          “How good is a low pair in the front hand?” or “How often will I win
          with a low straight in the back hand?”
        </Text>
        <Text w="full">
          An analysis of 100,000 Chinese Poker games played by a computer using
          optimal strategies shows the following distribution of hand ranks for
          the individual hands:
        </Text>
        <Box
          w="full"
          p={2}
          border={"2px"}
          borderRadius={"4"}
          borderColor={"orange.300"}
        >
          <p>
            <strong>Table: Average distribution of Chinese Poker hands</strong>
          </p>
          <Table w="full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Front</th>
                <th>Middle</th>
                <th>Back</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Straight Flush</td>
                <td>0%</td>
                <td>0,00%</td>
                <td>0.99%</td>
              </tr>
              <tr>
                <td>Quads</td>
                <td>0%</td>
                <td>0.01%</td>
                <td>2.62%</td>
              </tr>
              <tr>
                <td>Full House</td>
                <td>0%</td>
                <td>0.59%</td>
                <td>34.16%</td>
              </tr>
              <tr>
                <td>Flush</td>
                <td>0%</td>
                <td>7.35%</td>
                <td>32.46%</td>
              </tr>
              <tr>
                <td>Straße</td>
                <td>0%</td>
                <td>18.22%</td>
                <td>17.64%</td>
              </tr>
              <tr>
                <td>Trips</td>
                <td>0.46%</td>
                <td>10.04%</td>
                <td>0.29%</td>
              </tr>
              <tr>
                <td>Two-Pair</td>
                <td>0.00%</td>
                <td>26.67%</td>
                <td>9.61%</td>
              </tr>
              <tr>
                <td>Pair</td>
                <td>47.08%</td>
                <td>33.00%</td>
                <td>2.23%</td>
              </tr>
              <tr>
                <td>High Card</td>
                <td>52.46%</td>
                <td>4.12%</td>
                <td>0,00%</td>
              </tr>
            </tbody>
          </Table>
        </Box>
        <Box>
          This distribution initially shows some points that are probably
          obvious to an avid Chinese Poker player:
          <Box px={4} py={2}>
            <ul>
              <li>
                The front hand will contain a pair at least half the time.
                Interestingly enough, more than 90% of all 13 card distributions
                allow for a pair in the front hand. But forcing the pair in the
                front hand often weakens the other hands too much. Thus, if you
                set your hand optimally, you’ll see a pair in the front roughly
                half the time.{" "}
              </li>{" "}
              <li>
                In more than 60% of all cases, the middle hand consists of two
                pairs or just a pair. Meaning: The quality of the two pairs (or
                the one pair) is an important factor for this hand.{" "}
              </li>{" "}
              <li>
                {" "}
                Full houses and flushes each make up roughly one third of all
                possible back hand combinations. When evaluating this hand, the
                quality of the flush or full house plays a significant role. For
                example an Ace-King-high flush is much better than a Ten-high
                flush.
              </li>
            </ul>
          </Box>
        </Box>
        <Box>
          <Heading w="full" py="4" color="gray.800">
            Detailed front-hand evaluation
          </Heading>
          <Text pb={4}>
            Only three different ranks (trips, pair, high card) are possible in
            the front hand. The following table shows how those are distributed
            in detail:
          </Text>
          <Box
            w="full"
            p={2}
            border={"2px"}
            borderRadius={"4"}
            borderColor={"orange.300"}
          >
            <p>
              <strong>
                Table: Average distribution of Chinese Poker front hands
              </strong>
            </p>

            <Table w="full">
              <thead>
                <Tr textAlign={"center"}>
                  <th>
                    <strong>Percentile</strong>
                  </th>
                  <th>
                    <strong>Hand</strong>
                  </th>
                </Tr>
              </thead>
              <Tbody textAlign="center">
                <tr>
                  <td>95%</td>
                  <td>A-A-x</td>
                </tr>
                <tr>
                  <td>90%</td>
                  <td>K-K-x</td>
                </tr>
                <tr>
                  <td>85%</td>
                  <td>Q-Q-x</td>
                </tr>
                <tr>
                  <td>80%</td>
                  <td>J-J-x</td>
                </tr>
                <tr>
                  <td>75%</td>
                  <td>T-T-x</td>
                </tr>
                <tr>
                  <td>70%</td>
                  <td>8-8-x</td>
                </tr>
                <tr>
                  <td>65%</td>
                  <td>7-7-x</td>
                </tr>
                <tr>
                  <td>60%</td>
                  <td>5-5-x</td>
                </tr>
                <tr>
                  <td>55%</td>
                  <td>3-3-x</td>
                </tr>
                <tr>
                  <td>50%</td>
                  <td>A-K-Q</td>
                </tr>
                <tr>
                  <td>45%</td>
                  <td>A-K-8</td>
                </tr>
                <tr>
                  <td>40%</td>
                  <td>A-Q-x</td>
                </tr>
                <tr>
                  <td>35%</td>
                  <td>A-J-x</td>
                </tr>
                <tr>
                  <td>30%</td>
                  <td>A-T-x</td>
                </tr>
                <tr>
                  <td>25%</td>
                  <td>A-6-x</td>
                </tr>
                <tr>
                  <td>20%</td>
                  <td>K-Q-x</td>
                </tr>
                <tr>
                  <td>15%</td>
                  <td>K-8-x</td>
                </tr>
                <tr>
                  <td>10%</td>
                  <td>Q-J-x</td>
                </tr>
                <tr>
                  <td>5%</td>
                  <td>J-T-x</td>
                </tr>
                <tr>
                  <td>0%</td>
                  <td>4-3-2</td>
                </tr>
              </Tbody>
            </Table>
          </Box>
          <Text py={2}>
            This table shows how often you can expect to win with each hand. A
            pair of queens in the front hand for example will win on average at
            least 85% of the time, a hand like A-K-Q-high will win at least 50%
            of the time against an opponent with random cards who sets his hands
            optimally.
          </Text>
          <Text py={2}>
            As you can see, pairs are quite evenly distributed, but high card
            hands consist almost only of A-high or K-high combinations. When
            evaluating A-high hands the kickers play a vital role. A-K-Q wins
            25% more often on average than A-6-3.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
