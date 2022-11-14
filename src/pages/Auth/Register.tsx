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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    IconLogin,
    IconUser,
    IconLock,
    IconBrandFacebook,
    IconBrandGoogle,
} from '@tabler/icons';
import wechatLogo from '../../assets/logo.png';
import { registerWithEmail } from '../../supabase/auth';

interface RegisterInfo {
    email: string;
    password: string;
    repeat_password: string;
}

const onSubmit = async (data: RegisterInfo) => {
    const navigate = useNavigate();
    // @ts-ignore
    if (data[1] == data[2]) {
        // @ts-ignore
        await registerWithEmail(data[0], data[1]);
        navigate('/login');
    }
};

const Register = () => {
    const { register, handleSubmit } = useForm<RegisterInfo>({
        defaultValues: {},
    });
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
                <br />
                <Button
                    leftIcon={<IconLogin />}
                    colorScheme="red"
                    borderRadius="xl"
                    width="xs"
                    type="submit"
                >
                    Register to wechat
                </Button>
                <Divider style={{ margin: '20px 0px 20px 0px' }} />

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
    );
};

export default Register;
