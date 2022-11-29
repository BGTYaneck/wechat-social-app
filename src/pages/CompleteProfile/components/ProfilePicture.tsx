import {
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    SlideFade,
} from '@chakra-ui/react';
import React from 'react';

const ProfilePicture = () => {
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
                Upload a profile picture
            </Heading>
            <FormControl
                as={GridItem}
                colSpan={[6, 3]}
            ></FormControl>
        </SlideFade>
    );
};

export default ProfilePicture;
