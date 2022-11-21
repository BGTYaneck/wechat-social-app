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
    ScaleFade,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconLogin, IconUser, IconLock } from '@tabler/icons';
import wechatLogo from '../../../assets/logo.png';
import { registerWithEmail } from '../../../supabase/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

interface RegisterInfo {
    email: string;
    password: string;
    repeat_password: string;
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .required('E-mail cannot be empty')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'E-mail is invalid or contains invalid symbols'
        ),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must at least contain 8 letters & 1 number'
        )
        .required('Password cannot be empty'),
    repeat_password: Yup.string()
        .required(' Repeat password cannot be empty')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const Register = () => {
    const [Error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInfo>({
        defaultValues: {},
        resolver: yupResolver(RegisterSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterInfo) => {
        // @ts-ignore
        if (data['password'] == data['repeat_password']) {
            // @ts-ignore
            try {
                await registerWithEmail(data['email'], data['password']);
            } catch (e: any) {
                setError(e.message);
                return;
            }
        }
        navigate('/login');
    };

    const isOpen = true;

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
                <Center style={{ height: '100vh' }}>
                    <form
                        style={{
                            backgroundColor: 'white',
                            padding: '40px',
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
                                placeholder="example@example.com"
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
                        <InputGroup style={{ margin: '20px 0 0 0' }}>
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
                                {...register('repeat_password')}
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
                            {errors.repeat_password?.message}
                        </p>
                        <Divider style={{ margin: '20px 0px 20px 0px' }} />

                        <Button
                            leftIcon={<IconLogin />}
                            colorScheme="red"
                            borderRadius="xl"
                            width="xs"
                            type="submit"
                        >
                            Register to wechat
                        </Button>
                        <Center>
                            <p
                                style={{
                                    margin: '20px 0 0 0',
                                    fontSize: '14px',
                                    color: 'hex(#d1d5db)',
                                }}
                            >
                                Already have an account?
                            </p>
                        </Center>
                        <Center>
                            <Link to={'/login'}>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: 'hex(#d1d5db)',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Log in now!
                                </p>
                            </Link>
                        </Center>
                    </form>
                </Center>
            </ScaleFade>
        </>
    );
};

export default Register;
