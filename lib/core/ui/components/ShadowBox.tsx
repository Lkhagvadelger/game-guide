import { Box, BoxProps } from "@ui/index";

export const ShadowBox = (props: BoxProps) => (
  <Box
    boxShadow="0px 0px 4px 1px rgba(0, 0, 0, 0.1)"
    borderRadius={4}
    bg="offWhite"
    p={{ base: "2", md: "4" }}
    {...props}
  />
);
