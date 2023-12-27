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

  return (
    <GameGuideAppLayout selectedNav={"home"}>
      {GameGuideAppNavigationData["home"].screen}
    </GameGuideAppLayout>
  );
};
export default GameGuideAppPage;
