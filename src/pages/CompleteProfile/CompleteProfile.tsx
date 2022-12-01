import React, { useState } from 'react';
import { Progress, Box, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Description from './components/Description';
import ProfilePicture from './components/ProfilePicture';
import NameSurname from './components/NameSurname';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

export default function multistep() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const navigate = useNavigate();
    return (
        <>
            <Box
                rounded="lg"
                maxWidth={800}
                p={6}
                m="50px auto"
                as="form"
            >
                <Progress
                    colorScheme="red"
                    value={progress}
                    mb="5%"
                    mx="5%"
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#3d4a5c',
                    }}
                ></Progress>
                {step === 1 ? (
                    <NameSurname />
                ) : step === 2 ? (
                    <Description />
                ) : (
                    <ProfilePicture />
                )}
                <ButtonGroup
                    mt="5%"
                    w="100%"
                >
                    <Flex
                        w="100%"
                        justifyContent="space-between"
                    >
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 33.33);
                                }}
                                isDisabled={step === 1}
                                colorScheme="red"
                                variant="solid"
                                w="7rem"
                                mr="5%"
                            >
                                &lt; Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 3}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 3) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 33.33);
                                    }
                                }}
                                colorScheme="red"
                                variant="outline"
                                className={'outlineHover'}
                            >
                                Next &gt;
                            </Button>
                        </Flex>
                        {step === 3 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => {
                                    navigate('/success');
                                }}
                            >
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}
