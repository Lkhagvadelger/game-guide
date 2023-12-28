import { Text,HStack, Button, Icon, Box } from "@chakra-ui/react";
import { toaster } from "@ui/index";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export const LikeDislike = () => {
  const showLikedToaster = () => {
    toaster.success("Thank you for your feedback");
  };
  const showDislikedToaster = () => {
    toaster.info("Thank you for your feedback");
  };
  return (
    <Box my={8}>
      <Text> Was this helpful?</Text>
      <HStack>
        <Button
          onClick={showLikedToaster}
          size="md"
          fontSize={"24px"}
          bg="green.400"
        >
          <Icon as={FaThumbsUp} />
        </Button>
        <Button
          onClick={showDislikedToaster}
          size="md"
          fontSize={"24px"}
          bg={"red.400"}
        >
          <Icon as={FaThumbsDown} />
        </Button>
      </HStack>
    </Box>
  );
};
