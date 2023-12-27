import { AuthLayout } from "@lib/auth/ui";
import { AuthForm } from "@lib/auth/ui/AuthForm";
import { SEO } from "@ui/index";
import useTranslation from "next-translate/useTranslation";

const LoginPage = () => {
  const { t } = useTranslation("auth");

  return (
    <>
      <SEO title={"Login"} />
      <AuthLayout header={t("login-header")} footer={<></>}>
        <AuthForm type="login" />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
