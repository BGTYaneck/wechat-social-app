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
    useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconLogin, IconUser, IconLock } from '@tabler/icons';
import wechatLogo from '../../../assets/logo.png';
import { getCurrentUserId, registerWithEmail } from '../../../supabase/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    const isOpen = true;
    const navigate = useNavigate();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInfo>({
        defaultValues: {},
        resolver: yupResolver(RegisterSchema),
    });

    getCurrentUserId().then((value) => {
        if (value) navigate('/');
    });

    const onSubmit = async (data: RegisterInfo) => {
        // @ts-ignore
        if (data['password'] == data['repeat_password']) {
            // @ts-ignore
            try {
                await registerWithEmail(data['email'], data['password']);
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
        }
        navigate('/complete-profile');
    };

    return (
        <>
            <ScaleFade
                initialScale={0.5}
                in={isOpen}
            >
                <Center style={{ height: '100vh' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            bgGradient="linear(to-tr, red.400, red.500, red.600)"
                        >
                            Register to WeChat
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
