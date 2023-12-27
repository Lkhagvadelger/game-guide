import { SystemStyleObject, mode } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  normal: {
    color: "gray.700",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "10px",
    paddingTop: 4,
    textTransform:"capitalize"
  },
};

const defaultProps = {
  variant: "normal",
};

const FormLabel = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default FormLabel;
