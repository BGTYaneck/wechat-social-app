import supabase, { getBase64Image } from './supabase';
import { getCurrentUserId } from './auth';

export async function createPost(message: string, file?: File, group?: string) {
    if (file) {
        message += '微信' + getBase64Image(file);
    }
    const { error } = await supabase.from('posts').insert({
        author: await supabase.auth.getUser(),
        group: group ? group : null,
        content: message,
    });
    if (error) throw error;
}

export async function likePost(id: string) {
    const { data, error } = await supabase
        .from('likes')
        .select('post_id')
        .eq('post_id', id)
        .eq('user_id', await getCurrentUserId());
    if (error) throw error;
    if (data?.length === 0 || data === null) {
        const response = await supabase
            .from('likes')
            .insert({ user_id: await getCurrentUserId(), post_id: id });
        if (response.error) throw response.error;
    } else {
        const response = await supabase
            .from('likes')
            .delete()
            .eq('post_id', id)
            .eq('user_id', await getCurrentUserId());
        if (response.error) throw response.error
    }
}
