import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  BsEnvelope,
  BsEnvelopeFill,
  BsFillEnvelopeXFill,
  BsMailbox,
} from "react-icons/bs";
import { FaEnvelope, FaEnvelopeSquare, FaRegEnvelope } from "react-icons/fa";
import {
  HiLockClosed,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiPhone,
  HiUser,
} from "react-icons/hi";
import { IoMail, IoMailOpenOutline, IoMailOutline } from "react-icons/io5";

//login model type
type WaitModel = {
  emailAddress: string;
};

export const WaitListScreen = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation("app");
  const router = useRouter();
  //Login mutation
  //   const mutation = useJoinWaitList();

  //Login action
  const onSubmit = (data: WaitModel) => {
    console.log(data);
    // mutation.mutate(data, {
    //   onError: (e: any) => {},
    //   onSuccess: () => {
    //     onClose();
    //     toaster.success("Таныг хүлээлгийн жагсаалтанд бүртгэлээ.");
    //   },
    // });
    toaster.success("Your email registred to wait list.");
  };
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WaitModel>({});
  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Wait list</Heading>
      <Text>
        We are working hard to bring you the best experience possible. Join our
        wait list and we will notify you as soon as we launch.
      </Text>
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="emailAddress" isInvalid={!!errors.emailAddress}>
          <FormLabel variant={"normal"}>Email Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlinePhone} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              type="email"
              {...register("emailAddress", {
                required: "Email address required",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.emailAddress && errors.emailAddress.message}
          </FormErrorMessage>
        </FormControl>

        <HStack gap={2} mt={8}>
          <Button onClick={onClose} variant={"secondary"} size="md" w="full">
            Cancel
          </Button>
          <Button type="submit" size="md" w="full">
            Join wait list
          </Button>
        </HStack>
      </chakra.form>
    </VStack>
  );
};
