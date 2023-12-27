import { useLogin, User } from "@lib/auth/data/authHooks";
import {
  Button, chakra, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Input,
  Stack, Text, toaster, useDisclosure
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { BsDownload } from "react-icons/bs";
import { PasswordField } from "./PasswordField";
import { PasswordFieldWithConfirm } from "./PasswordFieldWithConfirm";
import { WaitModal } from "./WaitModal";

type Props = {
  type: "signup" | "login";
};

type FormValues = {
  email: string;
  password: string;
  isOnboarding: boolean;
};

const defaultPaths: Record<User["role"], string> = {
  ADMIN: "",
  USER: "",
};

export const AuthForm = ({ type }: Props) => {
  const loginMutation = useLogin();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { t: ta } = useTranslation("auth");
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "user1@example.com",
      password: "changeme",
      isOnboarding: false,
    },
  });

  watch("isOnboarding"); 

  const onSubmit = handleSubmit((authInput) => {
    loginMutation.mutate(authInput, {
      onError: (error: any) => {
        toaster.error(ta(error.translationKey));
      },
      onSuccess: (user) => {
        //onst nextPath: string = router.query.redirectTo
        // ? router.query.redirectTo.toString()
        // : defaultPaths[user.role];
        router.push("/");
      },
    });
  });

  return (
    <>
      {getValues("isOnboarding") ? (
        <></>
      ) : (
        <chakra.form onSubmit={onSubmit}>
          <Heading textAlign={"center"}>НЭГЦЭГ</Heading>
          <Stack spacing="2">
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            {type === "login" ? (
              <PasswordField
                label={"Password"}
                forgotPasswordLabel={""}
                error={errors.password}
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
            ) : (
              <PasswordFieldWithConfirm
                label={ta("password")}
                confirmLabel={ta("confirm-password")}
                error={errors.password}
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
            )}
            <Button
              type="submit"
              size="md"
              fontSize="md"
              isLoading={loginMutation.isLoading}
              w="full"
            >
              {type === "login" ? "Login" : "Sign Up"}
            </Button>
            <Flex w="full" textAlign={"center"} justifyContent="center">
              <Text w="32" onClick={onOpen} borderBottom="1px" cursor="pointer">
                <Icon as={BsDownload} mr="2" /> Join wait list
              </Text>
            </Flex>
            <WaitModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          </Stack>
        </chakra.form>
      )}
    </>
  );
};
