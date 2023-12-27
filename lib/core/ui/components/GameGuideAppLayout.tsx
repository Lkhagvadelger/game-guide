/* eslint-disable @next/next/no-css-tags */
import { GameGuideHome } from "@lib/home/ui/GameGuideHome";
import { Hand } from "@lib/home/ui/Hand";

import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { Router, useRouter } from "next/router";
import React, { ReactNode } from "react";
import { HiHand, HiHome, HiOutlineHand, HiOutlineHome } from "react-icons/hi";

export enum GameGuideAppNavigationKey {
  home = "home",
  hand = "hand",
}

type GameGuideAppNavigationType = {
  icon: ReactNode;
  isActive: boolean;
  activeIcon: ReactNode;
  text: string;
  ping?: boolean;
  screen: ReactNode;
  experimental?: boolean;
};

type GameGuideAppNavigationItemType = {
  [key in GameGuideAppNavigationKey]: GameGuideAppNavigationType;
};

export const GameGuideAppNavigationData: GameGuideAppNavigationItemType = {
  home: {
    icon: <Icon as={HiOutlineHome} />,
    isActive: true,
    activeIcon: <Icon as={HiHome} />,
    text: "home",
    screen: <GameGuideHome />,
  },
  hand: {
    icon: <Icon as={HiOutlineHand} />,
    isActive: true,
    activeIcon: <Icon as={HiHand} />,
    text: "hand",
    screen: <Hand />,
  },
};

export const GameGuideAppLayout = ({
  children,
  selectedNav,
  onNavChange,
}: {
  children?: ReactNode;
  selectedNav?: any;
  onNavChange?: (nav: GameGuideAppNavigationKey) => void;
}) => {
  const { t: to, lang } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  Router.events.on("routeChangeStart", () => {
    onOpen();
  });
  Router.events.on("routeChangeError", () => {
    onClose();
  });
  Router.events.on("routeChangeComplete", () => {
    onClose();
  });

  return (
    <>
      <Box as="main" w="full" bg="#FFFFFF" fontFamily={"Golos Text Variable"}>
        {children}
        {selectedNav && (
          <NavToolbox
            selectedNav={selectedNav}
            onNavChange={onNavChange ? onNavChange : () => {}}
          />
        )}
        <Modal
          size={"full"}
          finalFocusRef={finalRef}
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset={"slideInBottom"}
          closeOnOverlayClick={false}
        >
          <ModalOverlay bg="whiteAlpha.900" zIndex="100" />
          <ModalContent
            h="calc(100vh-200px)"
            w="10vw"
            bg="rgba(255, 255, 255, 0)"
            borderRadius={"0px"}
            textAlign={"center"}
            boxShadow={"none"}
          >
            <Box w="full" justifyContent="center" display="flex" mt="auto">
              <Box mt={"-132px"}>
                <Box
                  minW="140px"
                  color={"orange.50"}
                  bg={"orange.10"}
                  borderColor={"orange.50"}
                  borderRadius="4px"
                  border={"1px"}
                  px="4"
                  py="2"
                >
                  <Text fontSize="xs" fontWeight="500" color={"pink.700"}>
                    {to(`app.loading`)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
const NavToolbox = ({
  selectedNav,
  onNavChange,
}: {
  selectedNav: GameGuideAppNavigationKey;
  onNavChange: (nav: GameGuideAppNavigationKey) => void;
}) => {
  const router = useRouter();
  let bgColor = "#fff";

  return (
    <HStack
      mt={"-64px"}
      top={"100%"}
      pos={"fixed"}
      boxShadow="0px -8px 12px 0px rgba(0, 0, 0, 0.16)"
      px={0}
      paddingTop={3}
      h="64px"
      w={"full"}
      gap={3}
      background={bgColor}
      zIndex="101"
    >
      {Object.keys(GameGuideAppNavigationData)
        .filter(
          (itemKey: string) =>
            GameGuideAppNavigationData[itemKey as GameGuideAppNavigationKey]
              .isActive
        )
        .map((itemKey: string, i) => (
          <NavButton
            key={i}
            nav={
              GameGuideAppNavigationData[itemKey as GameGuideAppNavigationKey]
            }
            selectedNav={selectedNav}
            myKey={itemKey as GameGuideAppNavigationKey}
            onNavChange={onNavChange}
          />
        ))}
    </HStack>
  );
};

const NavButton = ({
  nav,
  selectedNav,
  myKey,
  onNavChange,
}: {
  nav: GameGuideAppNavigationType;
  selectedNav: GameGuideAppNavigationKey;
  myKey: GameGuideAppNavigationKey;
  onNavChange?: (nav: GameGuideAppNavigationKey) => void;
}) => (
  <Box
    display={"inline-block"}
    fontSize={"32px"}
    h={"full"}
    w={"full"}
    textAlign={"center"}
    marginInlineStart={"0 !important"}
    color="blue.600"
  >
    {selectedNav !== myKey ? (
      <NextLink
        href={{
          pathname: `/guide/[nav]`,
          query: { nav: nav.text.toLowerCase() },
        }}
      >
        <Box h={"32px"} w={"full"}>
          <Box
            mx="auto"
            style={{
              position: "relative",
              visibility: selectedNav !== myKey ? "visible" : "hidden",
            }}
            width={32}
            height={32}
          >
            {nav.icon}
          </Box>
        </Box>
      </NextLink>
    ) : (
      <Box h={"32px"} w={"full"}>
        <Box
          mx="auto"
          style={{
            position: "relative",
            visibility: selectedNav == myKey ? "visible" : "hidden",
          }}
          width={32}
          height={32}
        >
          {nav.activeIcon}
        </Box>
      </Box>
    )}
  </Box>
);
