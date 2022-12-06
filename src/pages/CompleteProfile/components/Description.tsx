import {
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    SimpleGrid,
    Textarea,
    SlideFade,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface Props {
    callback: Function;
    descParent: string;
}

const Description = ({ callback, descParent }: Props) => {
    const isOpen = true;
    let [desc, setDesc] = useState(descParent);
    const handleCallback = () => callback(desc);
    useEffect(() => {
        handleCallback();
    }, [desc]);
    const handleDescChange = (e: any) => {
        let inputValue = e.target.value;
        setDesc(inputValue);
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
            >
                Add a description
            </Heading>
            <SimpleGrid
                columns={1}
                spacing={6}
            >
                <FormControl
                    id="email"
                    mt={1}
                >
                    <FormLabel
                        fontSize="md"
                        fontWeight="md"
                    >
                        A brief description of yourself
                    </FormLabel>
                    <Textarea
                        value={desc}
                        onChange={handleDescChange}
                        placeholder="I was born to be that true person, not really to be perfect.
                                     The thoughts of me, which others harbor, is none of my business.
                                     I am so much in love with the confidence that makeup gives to me.
                                     I am just an innocent girl searching for my heart.
                                     Anytime I hear them say that the sky is the limit to me, I think they are actually telling the truth.
                                     I desire to be your best Hello, and most difficult goodbye."
                        rows={3}
                        style={{ height: '8rem' }}
                        shadow="sm"
                        errorBorderColor="red.500"
                        focusBorderColor="red.300"
                        fontSize={{
                            sm: 'md',
                        }}
                    />
                    <FormHelperText>
                        Don't worry! - You can edit all your information later
                        on!
                    </FormHelperText>
                </FormControl>
            </SimpleGrid>
        </SlideFade>
    );
};

export default Description;
