import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "3px",
};

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    px: "8px",
    py: "12px",
    fontSize: "10px",
    borderRadius: "3px",
  },
  sm: {
    px: "8px",
    py: "16px",
    fontSize: "11px",
    borderRadius: "4px",
  },
  md: {
    px: "24px",
    py: "18px",
    fontSize: "14px",
    borderRadius: "6px",
  },
};

const variants = {
  delete: {
    bg: "transparent",
    color: "red.500",
    _hover: {
      bg: "red.100",
    },
    size: "sm",
    borderWidth: "1px",
    borderColor: "red.500",
  },
  default: {
    bg: "purple.600",
    color: "white",
    _hover: {
      bg: "linear(to-r, purple.600, purple.300)",
    },
  },
  solid: {
    bg: "teal.500",
    _hover: {
      bg: "teal.300",
    },
  },
  outline: {
    color: "green.500",
    bg: "transparent",
    _hover: {
      bg: "green.900",
    },
    size: "md",
    borderColor: "green.500",
  },
  outlinelight: {
    color: "gray.600",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.1)",
    bg: "white",
    _disabled: {
      color: "gray.100",
    },
    _hover: {
      bg: "gray.200",
      color: "gray.800",
    },
    size: "sm",
    borderWidth: "1px",
  },
  control: {
    bg: "green.500",
    _hover: {
      bg: "green.300",
    },
    size: "md",
    borderColor: "green.500",
    color: "white",
  },
  info: {
    size: "md",
    borderRadius: "20px",
    bg: "gray.850",
    _hover: {
      bg: "gray.850",
    },
    color: "gray.400",
    fontWeight: "400",
    px: 3,
  },
};

const defaultProps = {
  size: "sm",
  variant: "default",
  casing: "capitalize",
};

const Button = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Button;
