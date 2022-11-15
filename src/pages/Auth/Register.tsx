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
import wechatLogo from '../../assets/logo.png';
import { registerWithEmail } from '../../supabase/auth';
import background from '../../assets/bg.jpg';

interface RegisterInfo {
    email: string;
    password: string;
    repeat_password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterInfo>({
        defaultValues: {},
    });

    const onSubmit = async (data: RegisterInfo) => {
        // @ts-ignore
        if (data['password'] == data['repeat_password']) {
            // @ts-ignore
            await registerWithEmail(data['email'], data['password']);
            navigate('/login');
        }
    };

    const isOpen = true;

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
                            placeholder="example@example.com"
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
            </ScaleFade>
        </Center>
    );
};

export default Register;
