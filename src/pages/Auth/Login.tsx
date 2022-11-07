import React from "react";
import { Button, Input, Stack, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IconLogin, IconUser, IconLock } from '@tabler/icons';

const Login = () => {
  return (
    <div className="">
      <form>
        <InputGroup>
            <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            children={<IconUser />}
          />
          <Input type='text' placeholder='example_username' />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
            children={<IconLock />}
          />
          <Input type="password" placeholder='●●●●●●●●●●' />
        </InputGroup>

        <Button
          leftIcon=<IconLogin/>
          colorScheme="red"
          borderRadius="3xl"
          width="xs"
        >
          Log in to wechat
        </Button>
      </form>
    </div>
  );
};

export default Login;
