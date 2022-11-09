import { createClient } from '@supabase/supabase-js';
type FileTypes =
    | 'groupAvatar'
    | 'profileAvatar'
    | 'groupBanner'
    | 'profileBanner';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
}

export async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if (error) throw error;
}

export async function registerWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
}
export async function loginWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
    });
    if (error) throw error;
}
export async function uploadFile(file: File, type: FileTypes, id: string) {
    let path: string;
    switch (type) {
        case 'groupAvatar':
            path = `avatar/group/${id}`;
            break;
        case 'groupBanner':
            path = `banner/group/${id}`;
            break;
        case 'profileAvatar':
            path = `avatar/profile/${id}`;
            break;
        case 'profileBanner':
            path = `banner/profile/${id}`;
            break;
    }
    // path += '.png';
    let { error: uploadError } = await supabase.storage
        .from('public')
        .upload(path, file);
    if (uploadError) throw uploadError;
}
export async function uploadImageAsMessage(file: File) {
    let message = '微信';
    message += getBase64Image(file);
}

export function getBase64Image(img: File) {
    const reader = new FileReader();
    let dataUrl;
    reader.onloadend = () => {
        dataUrl = reader.result;
    };
    reader.readAsDataURL(img);
    return dataUrl;
}
