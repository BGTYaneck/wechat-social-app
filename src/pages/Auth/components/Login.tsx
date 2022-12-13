import React, { useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { IconLogin, IconUser, IconLock } from '@tabler/icons';
import wechatLogo from '../../../assets/logo.png';
import { FcGoogle } from 'react-icons/fc';
import {
    getCurrentUserId,
    loginWithEmail,
    loginWithGoogle,
} from '../../../supabase/auth';
import { useToast } from '@chakra-ui/react';

interface LoginInfo {
    email: string;
    password: string;
    rememberMe: boolean;
}
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('E-mail cannot be empty')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'E-mail is invalid or contains invalid symbols'
        ),
    password: Yup.string()
        .min(6, 'Password too short.')
        .max(33, 'Password too long')
        .required('Password cannot be empty'),
});

const Login = () => {
    const isOpen = true;
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getCurrentUserId().then((value) => {
            if (value) navigate('/auth/redirect');
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInfo>({
        defaultValues: {},
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginInfo) => {
        try {
            await loginWithEmail(data['email'], data['password']);
        } catch (e: any) {
            toast({
                title: 'Error',
                description: e.message.toString(),
                status: 'error',
                variant: 'subtle',
                isClosable: true,
                duration: 5000,
            });
            return;
        }
    };

    const LoginWithGoogleBtn = (e: React.MouseEvent<HTMLElement>) => {
        loginWithGoogle();
    };

    return (
        <>
            <ScaleFade
                initialScale={0.5}
                in={isOpen}
            >
                <Center style={{ height: '100vh' }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        target="/auth/redirect"
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
                        <p
                            style={{
                                color: 'red',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            {errors.email?.message}
                        </p>
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
                        <p
                            style={{
                                color: 'red',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            {errors.password?.message}
                        </p>
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
                            bgGradient="linear(to-tr, red.400, red.500, red.600)"
                        >
                            Log in to WeChat
                        </Button>
                        <Divider
                            style={{
                                margin: '20px 0px 20px 0px',
                            }}
                        />
                        <Center>
                            <Button
                                style={{
                                    margin: '0 0 10px 0',
                                }}
                                leftIcon={
                                    <FcGoogle
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                        }}
                                    />
                                }
                                colorScheme="white"
                                variant="outline"
                                borderRadius="xl"
                                width="xs"
                                onClick={LoginWithGoogleBtn}
                            >
                                Log in using Google
                            </Button>
                        </Center>
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
                </Center>
            </ScaleFade>
        </>
    );
};
export default Login;
