import { Text, Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { GuideDataType } from "./GameGuideHome";

export const Tile = ({ item }: { item: GuideDataType }) => {
  return (
    <Box>
      <Flex
        h="160px"
        bg="gray.100"
        w="full"
        border={"1px "}
        borderColor={"gray.100"}
        p="4"
        borderRadius={"8"}
        direction="column"
        justify="space-between"
      >
        <Heading>{item.title}</Heading>
        <HStack>
          <Text w="full" color="gray.600">
            {item.short}
          </Text>
          <Box
            mt={"auto"}
            minW="14px"
            maxW="14px"
            minH="14px"
            maxH="14px"
            borderRadius={"999px"}
            bg={item.color}
          ></Box>
        </HStack>
      </Flex>
    </Box>
  );
};
