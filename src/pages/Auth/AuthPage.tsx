import React from 'react';
import { Center } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
};
const AuthPage = (props: Props) => {
    return <Center>{props.children}</Center>;
};
export default AuthPage;
