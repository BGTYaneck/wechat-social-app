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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconLogin, IconUser, IconLock } from '@tabler/icons';
import wechatLogo from '../../../assets/logo.png';
import { registerWithEmail } from '../../../supabase/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterInfo {
    email: string;
    password: string;
    repeat_password: string;
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect e-mail address!')
        .required('E-mail cannot be empty'),
    password: Yup.string()
        .min(6, 'Password too short.')
        .max(33, 'Password too long')
        .required('Password cannot be empty'),
    repeat_password: Yup.string()
        .min(6, 'Password too short.')
        .max(33, 'Password too long')
        .required('Password cannot be empty')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const Register = () => {
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
        console.log(data);
        // @ts-ignore
        if (data['password'] == data['repeat_password']) {
            // @ts-ignore
            await registerWithEmail(data['email'], data['password']);
            navigate('/login');
        }
    };

    const isOpen = true;

    return (
        <ScaleFade
            initialScale={0.5}
            in={isOpen}
        >
            <Center style={{ height: '100vh' }}>
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
                            placeholder="example@example.com"
                        />
                    </InputGroup>
                    <p style={{ color: 'red', fontSize: '12px' }}>
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
                    <p style={{ color: 'red', fontSize: '12px' }}>
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
                    <p style={{ color: 'red', fontSize: '12px' }}>
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
    );
};

export default Register;
