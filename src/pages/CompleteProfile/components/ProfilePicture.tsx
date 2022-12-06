import {
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    SlideFade,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface Props {
    callback: Function;
    photoParent: File;
}

const ProfilePicture = ({ callback, photoParent }: Props) => {
    const isOpen = true;
    let [photo, setPhoto] = useState(photoParent);
    const handleCallback = () => callback(photo);
    useEffect(() => {
        handleCallback();
    }, [photo]);
    const handlePhotoChange = (e: any) => {
        let inputValue = e.target.value;
        setPhoto(inputValue);
    };
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
