import React, { useEffect, useState } from 'react';
import { AspectRatio, Tooltip, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../supabase/auth';
import { getAvatar, getProfile } from '../../supabase/profiles';
import { Image } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/all';

interface ProfileData {
    id: string;
    name: string;
    created_at: string;
    description: string | null;
}

const UserProfile = () => {
    const [name, setName] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [desc, setDesc] = useState<string | null>('');
    const [src, setSrc] = useState(
        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
    );
    let id: string | undefined | null;
    id = useParams().id;
    if (id === undefined) {
        getCurrentUserId().then((value) => {
            id = value;
        });
    }
    useEffect(() => {
        getProfile(id).then((value: ProfileData) => {
            setName(value.name);
            setCreationDate(value.created_at);
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

    return (
        <div
            style={{
                backgroundColor: '#030C1A',
                width: '15rem',
                padding: '1.5rem',
            }}
        >
            <AspectRatio ratio={1}>
                <Image
                    src={src}
                    style={{
                        borderRadius: '30px',
                        marginBottom: '3px',
                        objectFit: 'fill',
                        border: '1px solid #333c47',
                    }}
                    alt={'Profile picture'}
                />
            </AspectRatio>

            <p
                style={{
                    fontSize: '22px',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                }}
            >
                {name}
                <AiFillEdit
                    style={{
                        width: '15px',
                        cursor: 'pointer',
                        opacity: '80%',
                    }}
                />
            </p>

            <p style={{ fontSize: '14px', color: '#333c47' }}>
                Joined {new Date(creationDate).toLocaleDateString()}
            </p>
            <p style={{ fontSize: '16px', color: '#333c47' }}>173 Friends</p>
            <p
                style={{
                    borderTop: '1px solid #333c47',
                    paddingTop: '10px',
                    marginTop: '2px',
                    opacity: '70%',
                    fontSize: '15px',
                }}
            >
                {desc}
            </p>
        </div>
    );
};

export default UserProfile;
