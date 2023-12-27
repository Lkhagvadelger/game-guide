import {
  SEO,
  Text
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const HomePage = () => {
  const { t } = useTranslation("auth");
  const route = useRouter();
  return (
    <>
      <SEO title={"НЭГЦЭГ"} />
      <Text>Wanna see something</Text>
    </>
  );
};

export default HomePage;
