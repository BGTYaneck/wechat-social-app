import React from 'react';
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
    ScaleFade,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    IconLogin,
    IconUser,
    IconLock,
    IconBrandFacebook,
    IconBrandGoogle,
} from '@tabler/icons';
import wechatLogo from '../../assets/logo.png';
import {
    loginWithEmail,
    loginWithFacebook,
    loginWithGoogle,
} from '../../supabase/auth';
import background from '../../assets/bg.jpg';

interface LoginInfo {
    email: string;
    password: string;
    rememberMe: boolean;
}
const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Incorrect e-mail address!')
        .required('E-mail cannot be empty'),
    password: Yup.string()
        .min(3, 'Password too short.')
        .max(33, 'Password too long')
        .required('Password cannot be empty'),
});

const Login = () => {
    const isOpen = true;

    const { register, handleSubmit } = useForm<LoginInfo>({
        defaultValues: {},
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginInfo) => {
        // @ts-ignore
        await loginWithEmail(data['email'], data['password']);
    };

    const LoginWithGoogleBtn = (e: React.MouseEvent<HTMLElement>) => {
        loginWithGoogle();
    };

    const LoginWithFacebookBtn = (e: React.MouseEvent<HTMLElement>) => {
        loginWithFacebook();
    };

    return (
        <Center
            h="100vh"
            w="100vw"
            backgroundImage={background}
            backgroundPosition="center"
            backgroundSize="cover"
        >
            <ScaleFade
                initialScale={0.5}
                in={isOpen}
            >
                <form
                    style={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '8%',
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.35)',
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <AspectRatio
                        maxW="400px"
                        ratio={2 / 1}
                    >
                        <Image
                            src={wechatLogo}
                            alt="WeChat Logo"
                            objectFit="cover"
                        />
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
                            errorBorderColor="red.500"
                            focusBorderColor="red.300"
                            {...register('email')}
                            placeholder="your@email.com"
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
                            errorBorderColor="red.500"
                            focusBorderColor="red.300"
                            {...register('password')}
                            placeholder="●●●●●●●●●●"
                        />
                    </InputGroup>
                    <Checkbox
                        style={{ margin: '12px 0px 12px 2px' }}
                        {...register('rememberMe')}
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
                    <Divider style={{ margin: '20px 0px 20px 0px' }} />
                    <Center>
                        <Button
                            style={{ margin: '0 0 10px 0' }}
                            leftIcon={<IconBrandGoogle />}
                            colorScheme="blackAlpha"
                            variant="outline"
                            borderRadius="xl"
                            width="xs"
                            onClick={LoginWithGoogleBtn}
                        >
                            Log in with Google
                        </Button>
                    </Center>
                    <Button
                        leftIcon={<IconBrandFacebook />}
                        colorScheme="facebook"
                        borderRadius="xl"
                        width="xs"
                        onClick={LoginWithFacebookBtn}
                    >
                        Log in with Facebook
                    </Button>
                    <Center>
                        <p
                            style={{
                                margin: '20px 0 0 0',
                                fontSize: '14px',
                                color: 'hex(#d1d5db)',
                            }}
                        >
                            Don't have an account?
                        </p>
                    </Center>
                    <Center>
                        <Link to={'/register'}>
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: 'hex(#d1d5db)',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                Register now!
                            </p>
                        </Link>
                    </Center>
                </form>
            </ScaleFade>
        </Center>
    );
};
export default Login;
