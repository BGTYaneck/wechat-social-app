import supabase, { getBase64Image } from './supabase';

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
