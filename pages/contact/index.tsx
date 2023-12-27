import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  toaster,
} from "@ui/index";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  content: string;
};

const ContactPage = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      content: "",
    },
  });

  const onSubmit = handleSubmit((authInput) => {
    reset();
    toaster.success("Thank you. Your message has been sent successfully.")
  });

  return (
    <Box p={16}>
      <chakra.form onSubmit={onSubmit}>
        <Heading textAlign={"center"}>Arvan 3</Heading>
        <Stack spacing="2">
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="Content" isInvalid={!!errors.content}>
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder="What you have in your mind? Please share with us."
              {...register("content", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" size="md" fontSize="md" w="full">
            Send
          </Button>
        </Stack>
      </chakra.form>
    </Box>
  );
};
export default ContactPage;
