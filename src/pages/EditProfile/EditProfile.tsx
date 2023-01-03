import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import {
    FormControl,
    GridItem,
    Heading,
    SlideFade,
    Center,
    FormLabel,
    Input,
    Textarea,
    FormHelperText,
    SimpleGrid,
} from '@chakra-ui/react';
import placeholder from '../../assets/placeholder.jpg';
import { BiArrowBack } from 'react-icons/all';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../supabase/auth';
import { getAvatar, getProfile } from '../../supabase/profiles';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

interface ProfileDataEdit {
    name: string;
    surname: string;
    description: string | null;
    profilePicture: File;
}

const EditProfile = () => {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const isOpen = true;

    const handleImageUpload = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            // @ts-ignore
            current.file = file;
            reader.onload = (e) => {
                // @ts-ignore
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [desc, setDesc] = useState<string | null>('');
    const [src, setSrc] = useState(placeholder);
    let id: string | undefined | null;
    id = useParams().id;
    if (id === undefined) {
        getCurrentUserId().then((value) => {
            id = value;
        });
    }
    useEffect(() => {
        getProfile(id).then((value: ProfileDataEdit) => {
            setName(value.name);
            setSurname(value.surname);
            setDesc(value.description);
        });
        getAvatar().then((value) => {
            if (value) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // @ts-ignore
                    setSrc(e.target.result);
                };
                reader.readAsDataURL(value);
            }
        });
    }, []);

    const handleNameChange = (e: any) => {
        let inputValue = e.target.value;
        setName(inputValue);
    };
    const handleSurnameChange = (e: any) => {
        let inputValue = e.target.value;
        setSurname(inputValue);
    };
    const handleDescChange = (e: any) => {
        let inputValue = e.target.value;
        setDesc(inputValue);
    };
    const navigate = useNavigate();
    return (
        <>
            <Navigation />
            <SlideFade
                in={isOpen}
                offsetY="20px"
                style={{ marginTop: '6rem' }}
            >
                <BiArrowBack
                    style={{
                        width: '3rem',
                        height: '3rem',
                        position: 'absolute',
                        marginLeft: '20px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                    }}
                    className={'outlineHover'}
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <FormControl
                    as={GridItem}
                    colSpan={[6, 3]}
                >
                    <Center>
                        <Heading>Edit Profile</Heading>
                    </Center>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '1rem',
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={imageUploader}
                            style={{
                                display: 'none',
                            }}
                        />
                        <div
                            style={{
                                borderRadius: '30px',
                                height: '300px',
                                width: '300px',
                                border: '4px solid #E53E3E',
                            }}
                            /*@ts-ignore*/
                            onClick={() => imageUploader.current.click()}
                        >
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '25px',
                                }}
                                className={'uploadProfile'}
                                src={src}
                                ref={uploadedImage}
                                alt={'Profile picture'}
                            />
                        </div>
                        <p
                            style={{
                                opacity: '50%',
                                fontSize: '10px',
                                marginTop: '2px',
                                textAlign: 'center',
                            }}
                        >
                            300x300
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Center style={{ width: '25rem', gap: '1rem' }}>
                            <FormControl mr="5%">
                                <FormLabel
                                    htmlFor="first-name"
                                    fontWeight={'normal'}
                                >
                                    First name
                                </FormLabel>
                                <Input
                                    value={name}
                                    onChange={handleNameChange}
                                    style={{ width: '11.5rem' }}
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
                                    value={surname}
                                    onChange={handleSurnameChange}
                                    style={{ width: '11.5rem' }}
                                    id="last-name"
                                    placeholder="Doe"
                                    errorBorderColor="red.500"
                                    focusBorderColor="red.300"
                                />
                            </FormControl>
                        </Center>

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
                                    Your description
                                </FormLabel>
                                <Textarea
                                    /*@ts-ignore*/
                                    value={desc}
                                    onChange={handleDescChange}
                                    placeholder="I was born to be that true person, not really to be perfect.
                                     The thoughts of me, which others harbor, is none of my business.
                                     I am so much in love with the confidence that makeup gives to me.
                                     I am just an innocent girl searching for my heart.
                                     Anytime I hear them say that the sky is the limit to me, I think they are actually telling the truth.
                                     I desire to be your best Hello, and most difficult goodbye."
                                    rows={3}
                                    style={{
                                        height: '8rem',
                                        width: '30rem',
                                        maxWidth: '25rem',
                                    }}
                                    shadow="sm"
                                    errorBorderColor="red.500"
                                    focusBorderColor="red.300"
                                    fontSize={{
                                        sm: 'md',
                                    }}
                                />
                            </FormControl>
                        </SimpleGrid>
                    </div>
                </FormControl>
            </SlideFade>
        </>
    );
};

export default EditProfile;
