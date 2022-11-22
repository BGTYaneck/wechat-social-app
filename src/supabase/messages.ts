import supabase, { getBase64Image } from './supabase';

export async function createMessage(content: string | File, recipient: string) {
    let message =
        content instanceof File
            ? '微信\ufff1' + getBase64Image(content)
            : content;
    const { error } = await supabase.from('messages').insert({
        author: await supabase.auth.getUser(),
        recipient: recipient,
        content: message,
    });
    if (error) throw error;
}
