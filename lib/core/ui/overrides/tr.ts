import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "3px",
};

const sizes: Record<string, SystemStyleObject> = {
  md: {
    px: "24px",
  },
};

const variants = {
  default: {
    p: 0,
    bg: "transparent",
  },
};

const defaultProps = {
  size: "md",
  variant: "default",
  casing: "capitalize",
};

const Tr = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Tr;
