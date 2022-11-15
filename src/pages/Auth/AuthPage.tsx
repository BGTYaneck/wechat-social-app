import React from 'react';
import { Center } from '@chakra-ui/react';
import background from '../../assets/bg.jpg';
import Login from './components/Login';

type Props = {
    children: React.ReactNode;
};
const AuthPage = (props: Props) => {
    return (
        <Center
            backgroundImage={background}
            backgroundPosition="center"
            backgroundSize="cover"
        >
            {props.children}
        </Center>
    );
};
export default AuthPage;
