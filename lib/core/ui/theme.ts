// theme/index.js
import {
  extendTheme,
  withDefaultColorScheme,
  ThemeConfig,
} from "@chakra-ui/react";

// Global style overrides
import { styles } from "./foundations/styles";
import { fonts } from "./foundations/fonts";

// Component style overrides
import Heading from "./overrides/heading";
import Button from "./overrides/button";
import Text from "./overrides/text";
import Input from "./overrides/input";
import Select from "./overrides/select";
import Td from "./overrides/td";
import Tr from "./overrides/tr";
import FormLabel from "./overrides/formLabel";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  config,
  styles,
  fonts,
  // Other foundational style overrides go here
  components: {
    Heading,
    Button,
    Text,
    Input,
    Select,
    Td,
    Tr,
    FormLabel
    // Other components go here
  },
};

export const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "Blue" })
);
