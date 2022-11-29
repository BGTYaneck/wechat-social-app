import React from 'react';
import {
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    SlideFade,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

const NameSurname = () => {
    const isOpen = true;
    return (
        <SlideFade
            in={isOpen}
            offsetY="20px"
        >
            <Heading
                w="100%"
                textAlign={'center'}
                fontWeight="normal"
                mb="2%"
            >
                Complete Registration
            </Heading>
            <form style={{ display: 'flex' }}>
                <FormControl mr="5%">
                    <FormLabel
                        htmlFor="first-name"
                        fontWeight={'normal'}
                    >
                        First name
                    </FormLabel>
                    <Input
                        id="first-name"
                        placeholder="John"
                        errorBorderColor="red.500"
                        focusBorderColor="red.300"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel
                        htmlFor="last-name"
                        fontWeight={'normal'}
                    >
                        Last name
                    </FormLabel>
                    <Input
                        id="last-name"
                        placeholder="Doe"
                        errorBorderColor="red.500"
                        focusBorderColor="red.300"
                    />
                </FormControl>
            </form>
        </SlideFade>
    );
};

export default NameSurname;
