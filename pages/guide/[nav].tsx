import { Box } from "@chakra-ui/react";
import {
  GameGuideAppNavigationKey,
  GameGuideAppNavigationData,
  GameGuideAppLayout,
} from "@ui/components/GameGuideAppLayout";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const GameGuideAppPage = () => {
  const { t: to } = useTranslation("common");
  const router = useRouter();
  const nav = router.query.nav as GameGuideAppNavigationKey;
  return (
    <GameGuideAppLayout selectedNav={nav}>
      {nav && GameGuideAppNavigationData[nav].screen}
    </GameGuideAppLayout>
  );
};
export default GameGuideAppPage;
