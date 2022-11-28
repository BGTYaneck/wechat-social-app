import React, { useState } from 'react';
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
    Text,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Alert,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import {
    IconLogin,
    IconUser,
    IconLock,
    IconBrandFacebook,
    IconBrandGoogle,
    IconBrandChrome,
} from '@tabler/icons';
import wechatLogo from '../../../assets/logo.png';
import { FcGoogle } from 'react-icons/fc';
import {
    getCurrentUserId,
    loginWithEmail,
    loginWithFacebook,
    loginWithGoogle,
} from '../../../supabase/auth';

interface LoginInfo {
    email: string;
    password: string;
    rememberMe: boolean;
}
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect e-mail address!')
        .required('E-mail cannot be empty'),
    password: Yup.string()
        .min(6, 'Password too short.')
        .max(33, 'Password too long')
        .required('Password cannot be empty'),
});

const Login = () => {
    const [Error, setError] = useState('');
    const isOpen = true;
    const navigate = useNavigate();
    getCurrentUserId().then((value) => {
        if (value) navigate('/');
    });
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
            setError(e.message);
            return;
        }
    };

    const LoginWithGoogleBtn = (e: React.MouseEvent<HTMLElement>) => {
        loginWithGoogle();
    };

    return (
        <>
            <Alert
                status="error"
                style={{
                    display: Error != '' ? 'flex' : 'none',
                    flexDirection: 'column',
                    marginTop: '1rem',
                    position: 'fixed',
                    top: '0',
                    textAlign: 'center',
                    width: '100vw',
                }}
            >
                <AlertIcon />
                <AlertTitle>
                    We had a problem processing your request!
                </AlertTitle>
                <AlertDescription>{Error}</AlertDescription>
            </Alert>
            <ScaleFade
                initialScale={0.5}
                in={isOpen}
            >
                <form
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8%',
                        marginTop: '7.6rem',
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
                    >
                        Log in to wechat
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
                                boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                            }}
                            leftIcon={
                                <p style={{ width: '28px', height: '28px' }}>
                                    <FcGoogle
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </p>
                            }
                            colorScheme="alphaBlack"
                            variant="ghost"
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
            </ScaleFade>
        </>
    );
};
export default Login;
