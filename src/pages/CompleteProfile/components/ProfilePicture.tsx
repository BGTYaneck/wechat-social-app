import React from 'react';
import { FormControl, GridItem, Heading, SlideFade } from '@chakra-ui/react';
import '../../../index.css';
import placeholder from '../../../assets/placeholder.jpg';

interface Props {
    callback: Function;
    photoParent: File;
}

const ProfilePicture = ({ callback, photoParent }: Props) => {
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
        callback(file);
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
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                            src={placeholder}
                            ref={uploadedImage}
                            alt={'Profile picture'}
                        />
                    </div>
                    <p
                        style={{
                            opacity: '50%',
                            fontSize: '14px',
                            marginTop: '2px',
                            textAlign: 'center',
                        }}
                    >
                        Leave empty to skip for now
                    </p>
                </div>
            </FormControl>
        </SlideFade>
    );
};

export default ProfilePicture;
