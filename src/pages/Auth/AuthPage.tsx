import React from 'react';
import { Center } from '@chakra-ui/react';
import background from '../../assets/bg.jpg';
import Login from './components/Login';

type Props = {
    children: React.ReactNode;
};
const AuthPage = (props: Props) => {
    return <Center>{props.children}</Center>;
};
export default AuthPage;
