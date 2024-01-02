/* eslint-disable @next/next/no-css-tags */
import { Distro } from "@lib/home/ui/Distro";
import { GameGuideHome } from "@lib/home/ui/GameGuideHome";
import { Hand } from "@lib/home/ui/Hand";
import { ScoreCalculator } from "@lib/home/ui/ScoreCalculator";

import { Box, HStack, Icon, useDisclosure } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { Router, useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  HiBell,
  HiHand,
  HiHome,
  HiOutlineHand,
  HiOutlineHome,
  HiOutlineTerminal,
  HiTerminal,
} from "react-icons/hi";
import { MdOutlineScore, MdScore } from "react-icons/md";
export enum GameGuideAppNavigationKey {
  home = "home",
  hand = "hand",
  distro = "distro",
  score = "score",
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
  score: {
    icon: <Icon as={MdOutlineScore} />,
    isActive: true,
    activeIcon: <Icon as={MdScore} />,
    text: "score",
    screen: <ScoreCalculator />,
  },
  hand: {
    icon: <Icon as={HiOutlineHand} />,
    isActive: true,
    activeIcon: <Icon as={HiHand} />,
    text: "hand",
    screen: <Hand />,
  },
  distro: {
    icon: <Icon as={HiOutlineTerminal} />,
    isActive: true,
    activeIcon: <Icon as={HiTerminal} />,
    text: "distro",
    screen: <Distro />,
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
            width={"32px"}
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
          width={"32px"}
          height={32}
        >
          {nav.activeIcon}
        </Box>
      </Box>
    )}
  </Box>
);
