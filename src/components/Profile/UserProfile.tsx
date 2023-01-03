import React, { useEffect, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../supabase/auth';
import { getAvatar, getProfile } from '../../supabase/profiles';
import { Image } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/all';
import placeholder from '../../assets/placeholder.jpg';
import { getFriendsList } from '../../supabase/friends';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
    id: string;
    name: string;
    surname: string;
    created_at: string;
    description: string | null;
}

const UserProfile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [count, setCount] = useState<number | undefined>(0);
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
        getProfile(id).then((value: ProfileData) => {
            setName(value.name);
            setSurname(value.surname);
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

    getFriendsList().then((value) => {
        setCount(value?.length);
    });

    const navigate = useNavigate();

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
                {`${name} ${surname}`}
                <AiFillEdit
                    style={{
                        width: '15px',
                        cursor: 'pointer',
                        opacity: '80%',
                    }}
                    onClick={() => navigate('/edit-profile')}
                />
            </p>

            <p style={{ fontSize: '14px', color: '#333c47' }}>
                Joined {new Date(creationDate).toLocaleDateString()}
            </p>
            <p style={{ fontSize: '16px', color: '#333c47' }}>
                {count} Friends
            </p>
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
