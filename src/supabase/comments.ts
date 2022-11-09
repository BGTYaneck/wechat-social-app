import supabase from './supabase';

export async function addComment(postId: string, content: string) {
    let { data, error } = await supabase
        .from('posts')
        .select('id')
        .eq('id', postId);
    if (error) throw error;
    if (data?.length === 0 || data === null) {
        throw new Error('Post does not exist');
    }
    let data2 = await supabase.from('comments').insert({
        author: await supabase.auth.getUser(),
        post: postId,
        content,
    });
    if (data2.error) throw error;
}
export async function deleteComment(commentId: string) {
    let { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);
    if (error) throw error;
}
