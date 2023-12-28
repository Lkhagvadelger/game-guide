import { Box, Button, Text, Grid, Heading, VStack } from "@ui/index";
import { shuffle } from "lodash";
import React from "react";
export type GuideDataType = {
  key: string;
  title: string;
  short: string;
  color?: string;
  content: any;
};
export const SingleHand = ({
  color,
  rank,
  suit,
}: {
  color: string;
  rank: string;
  suit: string;
}) => {
  return (
    <Box
     w="auto"
      border="1px"
      borderRadius={"8px"}
      borderColor={"gray.200"}
      color={color}
      bg="orange.50"
      textAlign={"center"}
    >
      {rank}
      <Text as="span" fontSize="xs">
        {suit}
      </Text>
    </Box>
  );
};
