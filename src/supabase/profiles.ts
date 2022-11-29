import supabase, { uploadFile } from './supabase';
import { getCurrentUserId } from './auth';

export async function uploadAvatar(img: File) {
    try {
        const userId = await getCurrentUserId();
        if (typeof userId === 'string') {
            await uploadFile(img, 'profileAvatar', userId);
        }
    } catch (e) {
        throw e;
    }
    return;
}

export async function pinPost(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('id')
        .eq('id', id)
        .eq('author', await getCurrentUserId());
    if (error) throw error;
    if (data?.length === 0 || data === null) {
        throw new Error('Invalid post');
    }
    let response = await supabase
        .from('profiles')
        .update({ pinned_post: data[0].id })
        .eq('id', await getCurrentUserId());
    if (response.error) throw response.error;
}

export async function getProfile(id?:string|null) {
    if (id === undefined) id = await getCurrentUserId();
    if (id === null) return;
    const {data, error} = await supabase.from('profiles').select().eq('id',id).single()
    if (error) throw error
    return data;
}

export async function getAvatar(id?:string|null) {
    if (id === undefined) id = await getCurrentUserId();
    if (id === null) return;
    const {data, error} = await supabase.storage.from('public').download(`avatar/profile/${id}`)
    if (error) throw error
    return data
}