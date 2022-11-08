import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Image,
  Heading,
  AspectRatio,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  IconLogin,
  IconUser,
  IconLock,
  IconBrandFacebook,
  IconBrandGoogle,
} from "@tabler/icons";
import wechatLogo from "../../assets/logo.png";

type Props = {};

interface LoginInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(33, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(33, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInfo>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {},
  });

  const onSubmit = (data: LoginInfo) => {
    console.log(data);
  };

  return (
    <Center
      h="100vh"
      w="100vw"
      backgroundImage="url(https://images8.alphacoders.com/467/467192.jpg)"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <form
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8%",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.35)",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AspectRatio maxW="400px" ratio={1.85 / 1}>
          <Image src={wechatLogo} alt="WeChat Logo" objectFit="cover" />
        </AspectRatio>
        <Center>
          <Heading>WeChat</Heading>
        </Center>
        <br />
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            children={<IconUser />}
          />
          <Input
            type="text"
            {...register("username")}
            placeholder="Your username"
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<IconLock />}
          />
          <Input
            type="password"
            {...register("password")}
            placeholder="●●●●●●●●●●"
          />
        </InputGroup>
        <Checkbox
          style={{ margin: "12px 0px 12px 2px" }}
          {...register("rememberMe")}
          defaultChecked
          colorScheme="red"
        >
          Remember me
        </Checkbox>
        <br />
        <Button
          leftIcon={<IconLogin />}
          colorScheme="red"
          borderRadius="xl"
          width="xs"
          type="submit"
        >
          Log in to wechat
        </Button>
        <Divider style={{ margin: "20px 0px 20px 0px" }} />
        <Center>
          <Button
            style={{ margin: "0 0 10px 0" }}
            leftIcon={<IconBrandGoogle />}
            colorScheme="blackAlpha"
            variant="outline"
            borderRadius="xl"
            width="xs"
          >
            Log in with Google
          </Button>
        </Center>
        <Button
          leftIcon={<IconBrandFacebook />}
          colorScheme="facebook"
          borderRadius="xl"
          width="xs"
        >
          Log in with Facebook
        </Button>
        <Center>
          <p
            style={{
              margin: "20px 0 0 0",
              fontSize: "14px",
              color: "hex(#d1d5db)",
            }}
          >
            Don't have an account?
          </p>
        </Center>
        <Center>
          <Link to={"/register"}>
            <p
              style={{
                fontSize: "12px",
                color: "hex(#d1d5db)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Register now!
            </p>
          </Link>
        </Center>
      </form>
    </Center>
  );
};
export default Login;
