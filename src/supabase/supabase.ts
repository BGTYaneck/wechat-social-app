import { createClient } from '@supabase/supabase-js';
export type FileTypes =
    | 'groupAvatar'
    | 'profileAvatar'
    | 'groupBanner'
    | 'profileBanner';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

//files
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

export function getBase64Image(img: File) {
    const reader = new FileReader();
    let dataUrl;
    reader.onloadend = () => {
        dataUrl = reader.result;
    };
    reader.readAsDataURL(img);
    return dataUrl;
}

export function base64ToImage(value: string): HTMLImageElement {
    var image = new Image();
    image.src = value;
    return image;
}

export default supabase;
