import React, { useEffect, useState } from 'react';
import { Progress, Box, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import Description from './components/Description';
import ProfilePicture from './components/ProfilePicture';
import NameSurname from './components/NameSurname';
import { useNavigate } from 'react-router-dom';
import {
    getProfile,
    insertProfile,
    uploadAvatar,
} from '../../supabase/profiles';
import '../../index.css';
import { getCurrentUserId } from '../../supabase/auth';

interface NamePayload {
    name: string;
    surname: string;
}

export default function multistep() {
    useEffect(() => {
        getCurrentUserId().then((value) => {
            if (!value) navigate('/login');
            getProfile(value).then((value) => {
                if (value) navigate('/');
            });
        });
    }, []);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [desc, setDesc] = useState('');
    const [photo, setPhoto] = useState(new File([], ''));
    const navigate = useNavigate();

    const nameCallback = ({ name, surname }: NamePayload) => {
        setName(name);
        setSurname(surname);
    };

    const descCallback = (desc: string) => {
        setDesc(desc);
    };

    const photoCallback = (photo: File) => {
        setPhoto(photo);
    };

    // @ts-ignore
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
                    <NameSurname
                        callback={nameCallback}
                        nameParent={name}
                        surnameParent={surname}
                    />
                ) : step === 2 ? (
                    <Description
                        callback={descCallback}
                        descParent={desc}
                    />
                ) : (
                    <ProfilePicture
                        callback={photoCallback}
                        photoParent={photo}
                    />
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
                                    console.log(name, surname, desc, photo);
                                    insertProfile(`${name} ${surname}`, desc)
                                        .then(() => {
                                            uploadAvatar(photo)
                                                .then(() => {
                                                    navigate(
                                                        '/complete-profile/success'
                                                    );
                                                })
                                                .catch((reason) => {
                                                    navigate(
                                                        `/complete-profile/error?message=${reason.message}`
                                                    );
                                                });
                                        })
                                        .catch((reason) =>
                                            navigate(
                                                `/complete-profile/error?message=${reason.message}`
                                            )
                                        );
                                }}
                            >
                                Finish
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}
