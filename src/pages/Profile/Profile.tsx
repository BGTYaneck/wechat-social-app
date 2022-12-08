import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../supabase/auth';
import Navigation from '../../components/Navigation/Navigation';
import { getAvatar, getProfile } from '../../supabase/profiles';
import { Image } from '@chakra-ui/react';

interface ProfileData {
    id: string;
    name: string;
    pinned_post: string | null;
    created_at: string;
    status: string | null;
    description: string | null;
}

function Profile() {
    const [name, setName] = useState('');
    const [pinnedPost, setPinnedPost] = useState<string | null>(null);
    const [creationDate, setCreationDate] = useState('');
    const [status, setStatus] = useState<string | null>(null);
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
    // { id: "2202b6f6-4ed5-4cad-9e6d-3735f8a980e6", name: "Blancior Gancior", pinned_post: null, created_at: "2022-12-08T12:59:05.47056+00:00", status: null, description: "Prawdziwy Blancior Gancior" }
    useEffect(() => {
        getProfile(id).then((value: ProfileData) => {
            setName(value.name);
            setPinnedPost(value.pinned_post);
            setCreationDate(value.created_at);
            setStatus(value.status);
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
        <>
            <Navigation />
            {/*@ts-ignore*/}
            <div style={{ marginTop: '64px' }}>
                <p>{name}</p>
                <p>Joined {new Date(creationDate).toLocaleDateString()}</p>
                <p>{desc}</p>
                <Image src={src} />
            </div>
        </>
    );
}

export default Profile;
